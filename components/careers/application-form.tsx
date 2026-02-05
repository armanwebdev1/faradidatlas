"use client";

import type React from "react";

import { useRef, useState } from "react";
import type { Language } from "@/lib/i18n";

interface ApplicationFormProps {
  lang: Language;
  jobId: number;
  jobTitle: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  cv: File | null;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type TouchedFields = Partial<Record<keyof FormValues, boolean>>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_FILE_EXTENSIONS = ["pdf", "doc", "docx"];

export function ApplicationForm({
  lang,
  jobId,
  jobTitle,
}: ApplicationFormProps) {
  const initialFormData: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cv: null,
  };

  const [formData, setFormData] = useState<FormValues>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const copy =
    lang === "en"
      ? {
          title: "Your application",
          subtitle: "Share your details so we can get in touch.",
          jobLabel: "Position",
          formError: "Please fix the highlighted fields and try again.",
          success:
            "Thank you! Your application has been submitted. We'll contact you soon.",
          labels: {
            firstName: "First name",
            lastName: "Last name",
            email: "Email",
            phone: "Phone",
            location: "Location",
            experience: "Years of experience",
            cv: "Upload CV",
          },
          placeholders: {
            firstName: "John",
            lastName: "Doe",
            email: "hello@example.com",
            phone: "+1 (555) 123-4567",
            location: "City, Country",
          },
          experienceOptions: [
            { value: "", label: "Select..." },
            { value: "0-2", label: "0-2 years" },
            { value: "2-5", label: "2-5 years" },
            { value: "5-10", label: "5-10 years" },
            { value: "10+", label: "10+ years" },
          ],
          required: "Required",
          fileHint: "PDF or DOC. Maximum file size: 5 MB.",
          submit: "Submit application",
          errors: {
            firstNameRequired: "First name is required.",
            firstNameLength: "First name should be at least 2 characters.",
            lastNameRequired: "Last name is required.",
            lastNameLength: "Last name should be at least 2 characters.",
            emailRequired: "Email is required.",
            emailInvalid: "Please enter a valid email address.",
            phoneRequired: "Phone number is required.",
            phoneInvalid: "Please enter a valid phone number.",
            locationInvalid: "Location should be at least 2 characters.",
            experienceRequired: "Please select your experience level.",
            cvRequired: "Please upload your CV.",
            cvType: "File must be PDF or Word format.",
            cvSize: "File size must be 5 MB or less.",
          },
        }
      : {
          title: "درخواست شما",
          subtitle: "جزئیات خود را وارد کنید تا با شما تماس بگیریم.",
          jobLabel: "موقعیت شغلی",
          formError: "لطفاً فیلدهای مشخص‌شده را اصلاح کنید.",
          success:
            "متشکریم! درخواست شما ارسال شد. به زودی با شما تماس می‌گیریم.",
          labels: {
            firstName: "نام",
            lastName: "نام خانوادگی",
            email: "ایمیل",
            phone: "تلفن",
            location: "مکان",
            experience: "سال‌های تجربه",
            cv: "بارگذاری رزومه",
          },
          placeholders: {
            firstName: "علی",
            lastName: "علی‌پور",
            email: "hello@example.com",
            phone: "+98 (XXX) XXX-XXXX",
            location: "شهر، کشور",
          },
          experienceOptions: [
            { value: "", label: "انتخاب کنید..." },
            { value: "0-2", label: "۰-۲ سال" },
            { value: "2-5", label: "۲-۵ سال" },
            { value: "5-10", label: "۵-۱۰ سال" },
            { value: "10+", label: "۱۰+ سال" },
          ],
          required: "الزامی",
          fileHint: "فرمت PDF یا DOC. حداکثر حجم فایل: ۵ مگابایت.",
          submit: "ارسال درخواست",
          errors: {
            firstNameRequired: "نام الزامی است.",
            firstNameLength: "نام باید حداقل ۲ حرف باشد.",
            lastNameRequired: "نام خانوادگی الزامی است.",
            lastNameLength: "نام خانوادگی باید حداقل ۲ حرف باشد.",
            emailRequired: "ایمیل الزامی است.",
            emailInvalid: "لطفاً یک ایمیل معتبر وارد کنید.",
            phoneRequired: "شماره تلفن الزامی است.",
            phoneInvalid: "لطفاً شماره تلفن معتبر وارد کنید.",
            locationInvalid: "مکان باید حداقل ۲ حرف باشد.",
            experienceRequired: "سطح تجربه را انتخاب کنید.",
            cvRequired: "لطفاً رزومه خود را بارگذاری کنید.",
            cvType: "فرمت فایل باید PDF یا Word باشد.",
            cvSize: "حجم فایل باید حداکثر ۵ مگابایت باشد.",
          },
        };

  const labelBase =
    "block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 mb-2";
  const inputBase =
    "w-full rounded-2xl border border-foreground/10 bg-white/90 px-3 sm:px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 placeholder:text-foreground/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-foreground/20";
  const errorClass =
    "border-destructive/60 focus:border-destructive/70 focus:ring-destructive/20";

  const validateField = (
    name: keyof FormValues,
    value: FormValues[keyof FormValues],
  ) => {
    switch (name) {
      case "firstName": {
        const trimmed = String(value || "").trim();
        if (!trimmed) return copy.errors.firstNameRequired;
        if (trimmed.length < 2) return copy.errors.firstNameLength;
        return "";
      }
      case "lastName": {
        const trimmed = String(value || "").trim();
        if (!trimmed) return copy.errors.lastNameRequired;
        if (trimmed.length < 2) return copy.errors.lastNameLength;
        return "";
      }
      case "email": {
        const trimmed = String(value || "").trim();
        if (!trimmed) return copy.errors.emailRequired;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return copy.errors.emailInvalid;
        return "";
      }
      case "phone": {
        const trimmed = String(value || "").trim();
        if (!trimmed) return copy.errors.phoneRequired;
        const digits = trimmed.replace(/\D/g, "");
        if (digits.length < 7) return copy.errors.phoneInvalid;
        return "";
      }
      case "location": {
        const trimmed = String(value || "").trim();
        if (!trimmed) return "";
        if (trimmed.length < 2) return copy.errors.locationInvalid;
        return "";
      }
      case "experience": {
        if (!value) return copy.errors.experienceRequired;
        return "";
      }
      case "cv": {
        if (!value) return copy.errors.cvRequired;
        const file = value as File;
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
        const isTypeAllowed =
          ALLOWED_FILE_TYPES.includes(file.type) ||
          ALLOWED_FILE_EXTENSIONS.includes(extension);
        if (!isTypeAllowed) return copy.errors.cvType;
        if (file.size > MAX_FILE_SIZE) return copy.errors.cvSize;
        return "";
      }
      default:
        return "";
    }
  };

  const validateForm = (data: FormValues) => {
    const nextErrors: FormErrors = {};
    (Object.keys(data) as Array<keyof FormValues>).forEach((field) => {
      const message = validateField(field, data[field]);
      if (message) {
        nextErrors[field] = message;
      }
    });
    return nextErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormValues;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (touched[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormValues;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, cv: file }));
    setTouched((prev) => ({ ...prev, cv: true }));
    setErrors((prev) => ({
      ...prev,
      cv: validateField("cv", file),
    }));
  };

  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      location: true,
      experience: true,
      cv: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setFormError(copy.formError);
      return;
    }

    setFormError("");
    console.log("Form submitted:", { ...formData, jobId });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData(initialFormData);
      setErrors({});
      setTouched({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 3000);
  };

  const getError = (field: keyof FormValues) =>
    touched[field] ? errors[field] : "";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative isolate overflow-hidden rounded-3xl border border-foreground/10 bg-white/90 p-6 sm:p-8 md:p-10 shadow-[0_35px_80px_-60px_rgba(10,10,10,0.5)]"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-accent-warm-gold/30 via-white/40 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-gradient-to-tr from-foreground/5 via-white to-transparent blur-3xl -z-10" />

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-accent-warm-gold">
          {copy.jobLabel}
        </p>
        <h2
          className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight"
          style={{
            fontFamily:
              lang === "en"
                ? "var(--font-hero)"
                : "Estedad, var(--font-hero)",
          }}
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-foreground/70">
          {copy.subtitle}
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-foreground/80">
          <span className="h-2 w-2 rounded-full bg-accent-warm-gold" />
          {jobTitle}
        </div>
      </div>

      {formError && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-xs sm:text-sm text-destructive">
          {formError}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50 mb-4">
            {lang === "en" ? "Personal details" : "اطلاعات فردی"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div>
              <label className={labelBase}>
                {copy.labels.firstName}{" "}
                <span className="text-destructive">({copy.required})</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="given-name"
                placeholder={copy.placeholders.firstName}
                className={`${inputBase} ${getError("firstName") ? errorClass : ""}`}
                aria-invalid={!!getError("firstName")}
                aria-describedby="firstName-error"
              />
              {getError("firstName") && (
                <p
                  id="firstName-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("firstName")}
                </p>
              )}
            </div>

            <div>
              <label className={labelBase}>
                {copy.labels.lastName}{" "}
                <span className="text-destructive">({copy.required})</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="family-name"
                placeholder={copy.placeholders.lastName}
                className={`${inputBase} ${getError("lastName") ? errorClass : ""}`}
                aria-invalid={!!getError("lastName")}
                aria-describedby="lastName-error"
              />
              {getError("lastName") && (
                <p
                  id="lastName-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("lastName")}
                </p>
              )}
            </div>

            <div>
              <label className={labelBase}>
                {copy.labels.email}{" "}
                <span className="text-destructive">({copy.required})</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="email"
                placeholder={copy.placeholders.email}
                className={`${inputBase} ${getError("email") ? errorClass : ""}`}
                aria-invalid={!!getError("email")}
                aria-describedby="email-error"
              />
              {getError("email") && (
                <p
                  id="email-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("email")}
                </p>
              )}
            </div>

            <div>
              <label className={labelBase}>
                {copy.labels.phone}{" "}
                <span className="text-destructive">({copy.required})</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="tel"
                placeholder={copy.placeholders.phone}
                className={`${inputBase} ${getError("phone") ? errorClass : ""}`}
                aria-invalid={!!getError("phone")}
                aria-describedby="phone-error"
              />
              {getError("phone") && (
                <p
                  id="phone-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("phone")}
                </p>
              )}
            </div>

            <div>
              <label className={labelBase}>{copy.labels.location}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="address-level2"
                placeholder={copy.placeholders.location}
                className={`${inputBase} ${getError("location") ? errorClass : ""}`}
                aria-invalid={!!getError("location")}
                aria-describedby="location-error"
              />
              {getError("location") && (
                <p
                  id="location-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("location")}
                </p>
              )}
            </div>

            <div>
              <label className={labelBase}>
                {copy.labels.experience}{" "}
                <span className="text-destructive">({copy.required})</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`${inputBase} ${getError("experience") ? errorClass : ""}`}
                aria-invalid={!!getError("experience")}
                aria-describedby="experience-error"
              >
                {copy.experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {getError("experience") && (
                <p
                  id="experience-error"
                  className="mt-2 text-xs text-destructive"
                >
                  {getError("experience")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50 mb-4">
            {lang === "en" ? "Resume" : "رزومه"}
          </p>
          <div className="rounded-2xl border border-dashed border-foreground/20 bg-white/70 px-4 py-5">
            <label className={`${labelBase} mb-3`}>
              {copy.labels.cv}{" "}
              <span className="text-destructive">({copy.required})</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
              className={`w-full text-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-foreground/90 ${
                getError("cv") ? "text-destructive" : ""
              }`}
              aria-invalid={!!getError("cv")}
              aria-describedby="cv-error"
            />
            <p className="mt-3 text-xs text-foreground/60">{copy.fileHint}</p>
            {formData.cv && (
              <p className="mt-2 text-xs text-foreground/70">
                {formData.cv.name} - {formatFileSize(formData.cv.size)}
              </p>
            )}
            {getError("cv") && (
              <p id="cv-error" className="mt-2 text-xs text-destructive">
                {getError("cv")}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-foreground px-6 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent-warm-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {copy.submit}
      </button>

      {submitted && (
        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-xs sm:text-sm text-green-700 animate-fade-in-up">
          {copy.success}
        </div>
      )}
    </form>
  );
}
