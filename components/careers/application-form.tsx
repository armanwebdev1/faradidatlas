"use client";

import type { Language } from "@/lib/i18n";
import { useApplicationForm } from "./use-application-form";
import { CvUploadField } from "./cv-upload-field";

interface ApplicationFormProps {
  lang: Language;
  jobId: string | number;
  jobTitle: string;
}

export function ApplicationForm({
  lang,
  jobId,
  jobTitle,
}: ApplicationFormProps) {
  const {
    t,
    copy,
    formData,
    fileInputRef,
    submitted,
    formError,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
    formatFileSize,
    getError,
  } = useApplicationForm({ lang, jobId, jobTitle });

  const backendEnabled = process.env.NEXT_PUBLIC_ENABLE_BACKEND === "true";
  const labelBase = "form-label mb-2";
  const inputBase = "form-input";
  const errorClass =
    "border-destructive/60 focus:border-destructive/70 focus:ring-destructive/20";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="form-card relative isolate overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-accent-warm-gold/30 via-white/40 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-gradient-to-tr from-foreground/5 via-white to-transparent blur-3xl -z-10" />

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy">
          {copy.jobLabel}
        </p>
        <h2 className="mt-3 text-responsive-section text-foreground tracking-tight">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-foreground/70">
          {copy.subtitle}
        </p>
        <div className="mt-4 inline-flex max-w-full items-center gap-3 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-foreground/80">
          <span className="h-2 w-2 rounded-full bg-accent-warm-gold" />
          <span className="min-w-0 truncate">{jobTitle}</span>
        </div>
      </div>

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

      {formError && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-xs sm:text-sm text-destructive">
          {formError}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50 mb-4">
            {t.pages.careers.personalDetails}
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
                <p id="email-error" className="mt-2 text-xs text-destructive">
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
                <p id="phone-error" className="mt-2 text-xs text-destructive">
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
            {t.pages.careers.resume}
          </p>
          <CvUploadField
            fileInputRef={fileInputRef}
            file={formData.cv}
            error={getError("cv")}
            onChange={handleFileChange}
            label={copy.labels.cv}
            requiredLabel={copy.required}
            fileHint={copy.fileHint}
            formatFileSize={formatFileSize}
            labelBase={labelBase}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-lg w-full mt-8 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? t.pages.careers.submitting
          : copy.submit}
      </button>

      {submitted && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-700 animate-fade-in-up">
          {backendEnabled
            ? copy.success
            : t.pages.careers.emailPaused}
        </div>
      )}
    </form>
  );
}
