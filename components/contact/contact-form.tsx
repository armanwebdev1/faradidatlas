"use client";

import type { Language } from "@/lib/i18n";
import { useContactForm } from "./use-contact-form";
import { FieldError } from "./field-error";
import { productOptions, hasInitialProductOption } from "./contact-form-types";

interface ContactFormProps {
  lang: Language;
  initialProductInterest?: string;
}

export function ContactForm({
  lang,
  initialProductInterest,
}: ContactFormProps) {
  const {
    formData,
    submitted,
    formError,
    isSubmitting,
    copy,
    getError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm({ lang, initialProductInterest });

  const inputBase = "form-input";
  const labelBase = "form-label mb-2";
  const errorClass =
    "border-destructive/60 focus:border-destructive/70 focus:ring-destructive/20";
  const showExtraOption = hasInitialProductOption(initialProductInterest);

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
            {showExtraOption && (
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
