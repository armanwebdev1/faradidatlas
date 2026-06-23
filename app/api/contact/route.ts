import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { parseEmailRecipients } from "@/lib/email";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const defaultLeadToEmail = "ahmadpour.web@gmail.com,info.faradidco@gmail.com";

const contactSchema = z.object({
  lang: z.enum(["en", "fa"]),
  company: z.string().trim().min(1).max(160),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(220),
  phone: z.string().trim().min(7).max(80),
  role: z.string().trim().max(80).optional(),
  productInterest: z.string().trim().max(80).optional(),
  volume: z.string().trim().max(160).optional(),
  destination: z.string().trim().max(160).optional(),
  timeline: z.string().trim().max(160).optional(),
  message: z.string().trim().max(3000).optional(),
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

function renderRows(data: Record<string, string | undefined>) {
  return Object.entries(data)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(value ?? "")}</td></tr>`,
    )
    .join("");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    if (process.env.NEXT_PUBLIC_ENABLE_BACKEND !== "true") {
      return NextResponse.json(
        { ok: false, message: "Email delivery is paused for now." },
        { status: 503 },
      );
    }

    const payload = contactSchema.parse(await request.json());

    if (payload.website) {
      return NextResponse.json({ ok: true });
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
      process.env.LEAD_TO_EMAIL || defaultLeadToEmail,
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

    const resend = new Resend(apiKey);
    const subjectPrefix = payload.productInterest
      ? "Faradid Atlas product inquiry"
      : "Faradid Atlas contact inquiry";
    const subject = `${subjectPrefix}: ${payload.productInterest || payload.company}`;
    const rows = renderRows({
      Language: payload.lang,
      Company: payload.company,
      Name: payload.name,
      Email: payload.email,
      Phone: payload.phone,
      Role: payload.role,
      "Product Interest": payload.productInterest,
      Volume: payload.volume,
      Destination: payload.destination,
      Timeline: payload.timeline,
      Message: payload.message,
    });

    await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject,
      html: `<h1>New Faradid Atlas inquiry</h1><table style="border-collapse:collapse">${rows}</table>`,
      text: Object.entries({
        Language: payload.lang,
        Company: payload.company,
        Name: payload.name,
        Email: payload.email,
        Phone: payload.phone,
        Role: payload.role,
        "Product Interest": payload.productInterest,
        Volume: payload.volume,
        Destination: payload.destination,
        Timeline: payload.timeline,
        Message: payload.message,
      })
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: "Invalid inquiry details." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Could not send inquiry." },
      { status: 500 },
    );
  }
}
