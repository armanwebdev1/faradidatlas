"use client";

import type React from "react";
import { useEffect, useState } from "react";
import type { Language } from "@/lib/i18n";

interface ContactFormProps {
  lang: Language;
  initialProductInterest?: string;
}

function getInitialFormData(productInterest = "") {
  return {
    company: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    productInterest,
    volume: "",
    destination: "",
    timeline: "",
    message: "",
    website: "",
  };
}

type ContactFormData = ReturnType<typeof getInitialFormData>;
type ContactField = keyof ContactFormData;
type ContactErrors = Partial<Record<ContactField, string>>;

function toLatinDigits(value: string) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianIndex = persianDigits.indexOf(digit);
    if (persianIndex !== -1) return String(persianIndex);

    const arabicIndex = arabicDigits.indexOf(digit);
    return arabicIndex !== -1 ? String(arabicIndex) : digit;
  });
}

export function ContactForm({
  lang,
  initialProductInterest,
}: ContactFormProps) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(initialProductInterest),
  );

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputBase = "form-input";
  const labelBase = "form-label mb-2";
  const errorClass =
    "border-destructive/60 focus:border-destructive/70 focus:ring-destructive/20";
  const copy =
    lang === "en"
      ? {
          required: "required",
          fixFields: "Please fix the highlighted fields before sending.",
          success:
            "Thank you. Your inquiry has been received. Our team will review the details and contact you.",
          errors: {
            companyRequired: "Company name is required.",
            companyLength: "Company name should be at least 2 characters.",
            nameRequired: "Contact name is required.",
            nameLength: "Contact name should be at least 2 characters.",
            emailRequired: "Email is required.",
            emailInvalid: "Please enter a valid email address.",
            phoneRequired: "Phone number is required.",
            phoneInvalid: "Please enter a valid phone number.",
            productRequired: "Please choose a product interest.",
            messageLength: "Additional details must be under 3000 characters.",
            paused:
              "Email delivery is not active yet. Please check the Vercel environment variables and redeploy.",
            notConfigured:
              "Email delivery is not configured yet. Please check the Resend API key and recipient emails.",
            security: "Security check failed. Please try again.",
            invalid: "Please review the inquiry details and try again.",
            generic: "Unable to send inquiry. Please try again.",
          },
        }
      : {
          required: "ضروری",
          fixFields: "لطفاً فیلدهای مشخص‌شده را اصلاح کنید.",
          success:
            "سپاسگزاریم. درخواست شما دریافت شد؛ تیم فرادید اطلس جزئیات را بررسی می‌کند و با شما تماس خواهد گرفت.",
          errors: {
            companyRequired: "وارد کردن نام شرکت ضروری است.",
            companyLength: "نام شرکت باید حداقل ۲ حرف باشد.",
            nameRequired: "وارد کردن نام و نام خانوادگی ضروری است.",
            nameLength: "نام باید حداقل ۲ حرف باشد.",
            emailRequired: "وارد کردن ایمیل ضروری است.",
            emailInvalid: "لطفاً یک ایمیل معتبر وارد کنید.",
            phoneRequired: "وارد کردن شماره تماس ضروری است.",
            phoneInvalid: "لطفاً یک شماره تماس معتبر وارد کنید.",
            productRequired: "لطفاً محصول موردنظر را انتخاب کنید.",
            messageLength: "توضیحات تکمیلی باید کمتر از ۳۰۰۰ کاراکتر باشد.",
            paused:
              "ارسال ایمیل هنوز در تنظیمات سایت فعال نشده است. لطفاً تنظیمات Vercel را بررسی کنید و سایت را دوباره منتشر کنید.",
            notConfigured:
              "ارسال ایمیل هنوز کامل تنظیم نشده است. لطفاً کلید Resend و ایمیل‌های گیرنده را بررسی کنید.",
            security: "بررسی امنیتی ناموفق بود. لطفاً دوباره تلاش کنید.",
            invalid: "لطفاً جزئیات درخواست را بررسی و دوباره ارسال کنید.",
            generic: "امکان ارسال درخواست وجود ندارد. لطفاً دوباره تلاش کنید.",
          },
        };
  const productOptions = [
    { value: "rice", labelEn: "Rice", labelFa: "برنج" },
    { value: "legumes", labelEn: "Legumes", labelFa: "حبوبات" },
    { value: "spices", labelEn: "Spices", labelFa: "ادویه‌جات" },
    { value: "nuts", labelEn: "Nuts", labelFa: "آجیل" },
    { value: "seeds", labelEn: "Seeds", labelFa: "دانه‌ها" },
    { value: "sugar", labelEn: "Sugar", labelFa: "شکر" },
    { value: "multiple", labelEn: "Multiple Products", labelFa: "چند محصول" },
  ];
  const hasInitialProductOption =
    !!initialProductInterest &&
    !productOptions.some((option) => option.value === initialProductInterest);

  useEffect(() => {
    if (!initialProductInterest) return;

    setFormData((prev) => ({
      ...prev,
      productInterest: initialProductInterest,
    }));
  }, [initialProductInterest]);

  const validateField = (name: ContactField, value: string) => {
    const trimmed = value.trim();

    switch (name) {
      case "company":
        if (!trimmed) return copy.errors.companyRequired;
        if (trimmed.length < 2) return copy.errors.companyLength;
        return "";
      case "name":
        if (!trimmed) return copy.errors.nameRequired;
        if (trimmed.length < 2) return copy.errors.nameLength;
        return "";
      case "email": {
        if (!trimmed) return copy.errors.emailRequired;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) return copy.errors.emailInvalid;
        return "";
      }
      case "phone": {
        if (!trimmed) return copy.errors.phoneRequired;
        const digits = toLatinDigits(trimmed).replace(/\D/g, "");
        if (digits.length < 7) return copy.errors.phoneInvalid;
        return "";
      }
      case "productInterest":
        if (!trimmed) return copy.errors.productRequired;
        return "";
      case "message":
        if (trimmed.length > 3000) return copy.errors.messageLength;
        return "";
      default:
        return "";
    }
  };

  const validateForm = (data: ContactFormData) => {
    const nextErrors: ContactErrors = {};

    (
      [
        "company",
        "name",
        "email",
        "phone",
        "productInterest",
        "message",
      ] satisfies ContactField[]
    ).forEach((field) => {
      const message = validateField(field, data[field]);
      if (message) {
        nextErrors[field] = message;
      }
    });

    return nextErrors;
  };

  const getError = (field: ContactField) => fieldErrors[field];

  const getSubmitErrorMessage = (message?: string) => {
    if (!message) return copy.errors.generic;
    const normalized = message.toLowerCase();

    if (normalized.includes("paused")) return copy.errors.paused;
    if (normalized.includes("not configured")) return copy.errors.notConfigured;
    if (normalized.includes("security")) return copy.errors.security;
    if (normalized.includes("invalid")) return copy.errors.invalid;

    return lang === "en" ? message : copy.errors.generic;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      const field = name as ContactField;
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const field = e.target.name as ContactField;
    const message = validateField(field, e.target.value);

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setSubmitted(false);

    try {
      const nextErrors = validateForm(formData);

      if (Object.keys(nextErrors).length > 0) {
        setFieldErrors(nextErrors);
        setFormError(copy.fixFields);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, lang }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || copy.errors.generic);
      }

      setSubmitted(true);
      setFieldErrors({});
      setFormData(getInitialFormData(initialProductInterest));
    } catch (error) {
      setFormError(
        error instanceof Error
          ? getSubmitErrorMessage(error.message)
          : copy.errors.generic,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="form-card relative isolate overflow-hidden animate-fade-in-up"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-accent/25 via-white to-transparent blur-3xl -z-10" />
      <h2 className="text-responsive-section text-primary mb-3">
        {lang === "en" ? "B2B Inquiry Form" : "فرم درخواست همکاری"}
      </h2>
      <p className="text-responsive-body text-foreground/70 mb-6 sm:mb-8">
        {lang === "en"
          ? "Tell us about your product needs, destination, and expected volume so the team can review a practical supply path."
          : "نوع محصول، مقصد و حجم تقریبی موردنیازتان را با ما در میان بگذارید تا تیم فرادید اطلس مسیر مناسب تأمین را بررسی کند."}
      </p>

      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Form grid - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6">
        {/* Company */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Company Name" : "نام شرکت"}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("company") ? errorClass : ""}`}
            placeholder={lang === "en" ? "Your company" : "نام شرکت"}
            aria-invalid={!!getError("company")}
            aria-describedby="company-error"
          />
          <FieldError id="company-error" message={getError("company")} />
        </div>

        {/* Name */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Contact Name" : "نام و نام خانوادگی"}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("name") ? errorClass : ""}`}
            placeholder={lang === "en" ? "Full name" : "نام کامل"}
            aria-invalid={!!getError("name")}
            aria-describedby="name-error"
          />
          <FieldError id="name-error" message={getError("name")} />
        </div>

        {/* Email */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Email" : "ایمیل"}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("email") ? errorClass : ""}`}
            placeholder="contact@company.com"
            aria-invalid={!!getError("email")}
            aria-describedby="email-error"
          />
          <FieldError id="email-error" message={getError("email")} />
        </div>

        {/* Phone */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Phone" : "شماره تماس"}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("phone") ? errorClass : ""}`}
            placeholder="+1 (555) 123-4567"
            aria-invalid={!!getError("phone")}
            aria-describedby="phone-error"
          />
          <FieldError id="phone-error" message={getError("phone")} />
        </div>

        {/* Role */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Your Role" : "نوع همکاری"}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
          >
            <option value="">
              {lang === "en"
                ? "Select role..."
                : "نوع همکاری را انتخاب کنید..."}
            </option>
            <option value="individual">
              {lang === "en" ? "Individual buyer" : "خریدار فردی"}
            </option>
            <option value="wholesaler">
              {lang === "en" ? "Wholesaler" : "عمده‌فروش"}
            </option>
            <option value="organization">
              {lang === "en" ? "Organization" : "سازمان یا شرکت"}
            </option>
            <option value="governmental-body">
              {lang === "en" ? "Governmental body" : "نهاد دولتی"}
            </option>
            <option value="other">{lang === "en" ? "Other" : "سایر"}</option>
          </select>
        </div>

        {/* Product Interest */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Product Interest" : "محصول موردنظر"}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("productInterest") ? errorClass : ""}`}
            aria-invalid={!!getError("productInterest")}
            aria-describedby="productInterest-error"
          >
            <option value="">
              {lang === "en" ? "Select product..." : "محصول را انتخاب کنید..."}
            </option>
            {hasInitialProductOption && (
              <option value={initialProductInterest}>
                {initialProductInterest}
              </option>
            )}
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {lang === "en" ? option.labelEn : option.labelFa}
              </option>
            ))}
          </select>
          <FieldError
            id="productInterest-error"
            message={getError("productInterest")}
          />
        </div>

        {/* Volume */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Expected Volume" : "حجم مورد نیاز"}
          </label>
          <input
            type="text"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={
              lang === "en" ? "Approximate quantity" : "مقدار تقریبی"
            }
          />
        </div>

        {/* Destination */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Destination Country" : "کشور مقصد"}
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={
              lang === "en" ? "Country" : "مثلاً ایران، عمان یا امارات"
            }
          />
        </div>

        {/* Timeline */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Timeline" : "زمان‌بندی"}
          </label>
          <input
            type="text"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={
              lang === "en"
                ? "Expected purchase or delivery timing"
                : "زمان مورد نظر برای خرید یا تحویل"
            }
          />
        </div>
      </div>

      {/* Message - responsive */}
      <div className="mb-6">
        <label className={labelBase}>
          {lang === "en" ? "Additional Details" : "توضیحات تکمیلی"}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={`${inputBase} resize-none ${getError("message") ? errorClass : ""}`}
          placeholder={
            lang === "en"
              ? "Tell us more about your requirements..."
              : "درباره نیاز، شرایط همکاری یا جزئیات سفارش بیشتر توضیح دهید..."
          }
          aria-invalid={!!getError("message")}
          aria-describedby="message-error"
        />
        <FieldError id="message-error" message={getError("message")} />
      </div>

      {/* Submit - responsive */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-lg w-full mb-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? lang === "en"
            ? "Sending..."
            : "در حال ارسال..."
          : lang === "en"
            ? "Send Inquiry"
            : "ارسال درخواست"}
      </button>

      {formError && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs sm:text-sm animate-fade-in-up">
          {formError}
        </div>
      )}

      {/* Success message - responsive */}
      {submitted && (
        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-xs sm:text-sm animate-fade-in-up">
          {copy.success}
        </div>
      )}
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-xs text-destructive">
      {message}
    </p>
  );
}
