import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { jobs } from "@/components/careers/job-data";
import { parseEmailRecipients } from "@/lib/email";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const maxFileSize = 5 * 1024 * 1024;
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedExtensions = new Set(["pdf", "doc", "docx"]);

const careerSchema = z.object({
  lang: z.enum(["en", "fa"]),
  jobId: z.coerce.number().int().positive(),
  jobTitle: z.string().trim().min(2).max(180),
  firstName: z.string().trim().min(2).max(120),
  lastName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(220),
  phone: z.string().trim().min(7).max(80),
  location: z.string().trim().max(160).optional(),
  experience: z.string().trim().min(1).max(80),
  website: z.string().trim().optional(),
  turnstileToken: z.string().trim().optional(),
});

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function isAllowedFile(file: File) {
  const extension = fileExtension(file.name);
  return (
    file.size > 0 &&
    file.size <= maxFileSize &&
    (allowedMimeTypes.has(file.type) || allowedExtensions.has(extension))
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    if (process.env.NEXT_PUBLIC_ENABLE_BACKEND !== "true") {
      return NextResponse.json(
        { ok: false, message: "Email delivery is paused for now." },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const payload = careerSchema.parse({
      lang: formData.get("lang"),
      jobId: formData.get("jobId"),
      jobTitle: formData.get("jobTitle"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location") || undefined,
      experience: formData.get("experience"),
      website: formData.get("website") || undefined,
      turnstileToken: formData.get("turnstileToken") || undefined,
    });

    if (payload.website) {
      return NextResponse.json({ ok: true });
    }

    const job = jobs.find((item) => item.id === payload.jobId);
    if (!job) {
      return NextResponse.json(
        { ok: false, message: "Unknown career opportunity." },
        { status: 400 },
      );
    }

    const cv = formData.get("cv");
    if (!(cv instanceof File) || !isAllowedFile(cv)) {
      return NextResponse.json(
        { ok: false, message: "Please upload a PDF, DOC, or DOCX under 5 MB." },
        { status: 400 },
      );
    }

    const turnstileOk = await verifyTurnstile(payload.turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, message: "Security check failed." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = parseEmailRecipients(
      process.env.CAREERS_TO_EMAIL || process.env.LEAD_TO_EMAIL,
    );
    const from =
      process.env.LEAD_FROM_EMAIL ||
      `Faradid Atlas <noreply@${new URL(siteConfig.url).hostname}>`;

    if (!apiKey || to.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Email delivery is not configured." },
        { status: 503 },
      );
    }

    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const fullName = `${payload.firstName} ${payload.lastName}`;
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Career application: ${payload.jobTitle} - ${fullName}`,
      html: `<h1>New Faradid Atlas career application</h1>
        <p><strong>Role:</strong> ${escapeHtml(payload.jobTitle)}</p>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
        <p><strong>Location:</strong> ${escapeHtml(payload.location || "")}</p>
        <p><strong>Experience:</strong> ${escapeHtml(payload.experience)}</p>`,
      text: [
        `Role: ${payload.jobTitle}`,
        `Name: ${fullName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Location: ${payload.location || ""}`,
        `Experience: ${payload.experience}`,
      ].join("\n"),
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: "Invalid application details." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Could not send application." },
      { status: 500 },
    );
  }
}
