"use client";

import type React from "react";
import { useState } from "react";
import type { Language } from "@/lib/i18n";

interface ContactFormProps {
  lang: Language;
}

export function ContactForm({ lang }: ContactFormProps) {
  const backendEnabled = process.env.NEXT_PUBLIC_ENABLE_BACKEND === "true";
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    productInterest: "",
    volume: "",
    destination: "",
    timeline: "",
    message: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputBase = "form-input";
  const labelBase = "form-label mb-2";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setSubmitted(false);

    try {
      if (!backendEnabled) {
        setSubmitted(true);
        setFormData({
          company: "",
          name: "",
          email: "",
          phone: "",
          role: "",
          productInterest: "",
          volume: "",
          destination: "",
          timeline: "",
          message: "",
          website: "",
        });
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
        throw new Error(result.message || "Unable to send inquiry.");
      }

      setSubmitted(true);
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        productInterest: "",
        volume: "",
        destination: "",
        timeline: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : lang === "en"
            ? "Unable to send inquiry."
            : "امکان ارسال درخواست وجود ندارد.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            {lang === "en" ? "Company Name" : "نام شرکت"}
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={inputBase}
            placeholder={lang === "en" ? "Your company" : "نام شرکت"}
          />
        </div>

        {/* Name */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Contact Name" : "نام و نام خانوادگی"}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputBase}
            placeholder={lang === "en" ? "Full name" : "نام کامل"}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Email" : "ایمیل"}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputBase}
            placeholder="contact@company.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Phone" : "شماره تماس"}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputBase}
            placeholder="+1 (555) 123-4567"
          />
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
            {lang === "en" ? "Product Interest" : "محصول موردنظر"}
          </label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="">
              {lang === "en" ? "Select product..." : "محصول را انتخاب کنید..."}
            </option>
            <option value="rice">{lang === "en" ? "Rice" : "برنج"}</option>
            <option value="legumes">
              {lang === "en" ? "Legumes" : "حبوبات"}
            </option>
            <option value="spices">
              {lang === "en" ? "Spices" : "ادویه‌جات"}
            </option>
            <option value="nuts">{lang === "en" ? "Nuts" : "آجیل"}</option>
            <option value="seeds">{lang === "en" ? "Seeds" : "دانه‌ها"}</option>
            <option value="sugar">{lang === "en" ? "Sugar" : "شکر"}</option>
            <option value="multiple">
              {lang === "en" ? "Multiple Products" : "چند محصول"}
            </option>
          </select>
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
          rows={4}
          className={`${inputBase} resize-none`}
          placeholder={
            lang === "en"
              ? "Tell us more about your requirements..."
              : "درباره نیاز، شرایط همکاری یا جزئیات سفارش بیشتر توضیح دهید..."
          }
        />
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
          {backendEnabled
            ? lang === "en"
              ? "Thank you! Your inquiry has been received. Our team will review the details and contact you."
              : "سپاسگزاریم. درخواست شما دریافت شد؛ تیم فرادید اطلس جزئیات را بررسی می‌کند و با شما تماس خواهد گرفت."
            : lang === "en"
              ? "Thank you! Email delivery is paused for now, so this inquiry was not sent."
              : "سپاسگزاریم. در حال حاضر ارسال ایمیل غیرفعال است؛ بنابراین این درخواست ارسال نشد."}
        </div>
      )}
    </form>
  );
}
