"use client";

import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { useContactForm } from "./use-contact-form";
import { FieldError } from "./field-error";
import { productOptions as defaultProductOptions, hasInitialProductOption } from "./contact-form-types";

interface ContactFormProps {
  lang: Language;
  initialProductInterest?: string;
  productOptions?: Array<{ value: string; labelEn: string; labelFa: string; labelAr: string }>;
}

export function ContactForm({
  lang,
  initialProductInterest,
  productOptions: cmsProductOptions,
}: ContactFormProps) {
  const productOptions = cmsProductOptions ?? defaultProductOptions;
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

  const t = translations[lang];

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
        {t.pages.contact.b2bInquiryForm}
      </h2>
      <p className="text-responsive-body text-foreground/70 mb-6 sm:mb-8">
        {t.pages.contact.formDescription}
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
            {t.pages.contact.companyNameLabel}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("company") ? errorClass : ""}`}
            placeholder={t.pages.contact.yourCompanyPlaceholder}
            aria-invalid={!!getError("company")}
            aria-describedby="company-error"
          />
          <FieldError id="company-error" message={getError("company")} />
        </div>

        {/* Name */}
        <div>
          <label className={labelBase}>
            {t.pages.contact.contactNameLabel}{" "}
            <span className="text-destructive">({copy.required})</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${getError("name") ? errorClass : ""}`}
            placeholder={t.pages.contact.fullNamePlaceholder}
            aria-invalid={!!getError("name")}
            aria-describedby="name-error"
          />
          <FieldError id="name-error" message={getError("name")} />
        </div>

        {/* Email */}
        <div>
          <label className={labelBase}>
            {t.pages.contact.email}{" "}
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
            {t.pages.contact.phone}{" "}
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
            {t.pages.contact.yourRole}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
          >
            <option value="">
              {t.pages.contact.selectRolePlaceholder}
            </option>
            <option value="individual">
              {t.pages.contact.individualBuyer}
            </option>
            <option value="wholesaler">
              {t.pages.contact.wholesaler}
            </option>
            <option value="organization">
              {t.pages.contact.organization}
            </option>
            <option value="governmental-body">
              {t.pages.contact.governmentalBody}
            </option>
            <option value="other">{t.pages.contact.other}</option>
          </select>
        </div>

        {/* Product Interest */}
        <div>
          <label className={labelBase}>
            {t.pages.contact.productInterestLabel}{" "}
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
              {t.pages.contact.selectProductPlaceholder}
            </option>
            {showExtraOption && (
              <option value={initialProductInterest}>
                {initialProductInterest}
              </option>
            )}
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {lang === "en" ? option.labelEn : lang === "fa" ? option.labelFa : option.labelAr}
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
            {t.pages.contact.expectedVolume}
          </label>
          <input
            type="text"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={t.pages.contact.approxQuantityPlaceholder}
          />
        </div>

        {/* Destination */}
        <div>
          <label className={labelBase}>
            {t.pages.contact.destinationCountry}
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={t.pages.contact.countryPlaceholder}
          />
        </div>

        {/* Timeline */}
        <div>
          <label className={labelBase}>
            {t.pages.contact.timelineLabel}
          </label>
          <input
            type="text"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputBase}
            placeholder={t.pages.contact.timelinePlaceholder}
          />
        </div>
      </div>

      {/* Message - responsive */}
      <div className="mb-6">
        <label className={labelBase}>
          {t.pages.contact.additionalDetails}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={`${inputBase} resize-none ${getError("message") ? errorClass : ""}`}
          placeholder={t.pages.contact.additionalDetailsPlaceholder}
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
          ? t.pages.contact.sending
          : t.pages.contact.sendInquiry}
      </button>

      {formError && (
        <div className="mb-4 p-3 sm:p-4 bg-destructive/5 border border-destructive/20 rounded-2xl text-destructive text-xs sm:text-sm animate-fade-in-up">
          {formError}
        </div>
      )}

      {/* Success message - responsive */}
      {submitted && (
        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs sm:text-sm animate-fade-in-up">
          {copy.success}
        </div>
      )}
    </form>
  );
}
