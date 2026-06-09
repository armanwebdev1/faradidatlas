"use client";

import type React from "react";
import { useState } from "react";
import type { Language } from "@/lib/i18n";

interface ContactFormProps {
  lang: Language;
}

export function ContactForm({ lang }: ContactFormProps) {
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
  });

  const [submitted, setSubmitted] = useState(false);
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
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
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
      });
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-card relative isolate overflow-hidden animate-fade-in-up"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-accent/25 via-white to-transparent blur-3xl -z-10" />
      <h2 className="text-responsive-section text-primary mb-3">
        {lang === "en" ? "B2B Inquiry Form" : "فرم درخواست B2B"}
      </h2>
      <p className="text-responsive-body text-foreground/70 mb-6 sm:mb-8">
        {lang === "en"
          ? "Tell us about your product needs, destination, and expected volume so the team can review a practical supply path."
          : "درباره محصول مورد نیاز، مقصد و حجم تقریبی بگویید تا تیم ما مسیر عملی تامین را بررسی کند."}
      </p>

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
            placeholder={lang === "en" ? "Your company" : "شرکت شما"}
          />
        </div>

        {/* Name */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Contact Name" : "نام تماس"}
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
            {lang === "en" ? "Phone" : "تلفن"}
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
            {lang === "en" ? "Your Role" : "نقش شما"}
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="">
              {lang === "en" ? "Select role..." : "نقش را انتخاب کنید..."}
            </option>
            <option value="individual">
              {lang === "en" ? "Individual buyer" : "خریدار فردی"}
            </option>
            <option value="wholesaler">
              {lang === "en" ? "Wholesaler" : "عمده‌فروش"}
            </option>
            <option value="organization">
              {lang === "en" ? "Organization" : "سازمان"}
            </option>
            <option value="governmental-body">
              {lang === "en" ? "Governmental body" : "نهاد دولتی"}
            </option>
            <option value="other">{lang === "en" ? "Other" : "دیگر"}</option>
          </select>
        </div>

        {/* Product Interest */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Product Interest" : "محصول مورد علاقه"}
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
            <option value="rice">
              {lang === "en" ? "Rice" : "برنج"}
            </option>
            <option value="legumes">
              {lang === "en" ? "Legumes" : "حبوبات"}
            </option>
            <option value="spices">
              {lang === "en" ? "Spices" : "ادویه‌جات"}
            </option>
            <option value="nuts">
              {lang === "en" ? "Nuts" : "آجیل"}
            </option>
            <option value="seeds">
              {lang === "en" ? "Seeds" : "دانه‌ها"}
            </option>
            <option value="sugar">
              {lang === "en" ? "Sugar" : "شکر"}
            </option>
            <option value="multiple">
              {lang === "en" ? "Multiple Products" : "محصولات متعدد"}
            </option>
          </select>
        </div>

        {/* Volume */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Expected Volume" : "حجم مورد انتظار"}
          </label>
          <input
            type="text"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            className={inputBase}
            placeholder={lang === "en" ? "Approximate quantity" : "مقدار تقریبی"}
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
            placeholder={lang === "en" ? "Country" : "کشور"}
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
                : "زمان مورد انتظار خرید یا تحویل"
            }
          />
        </div>
      </div>

      {/* Message - responsive */}
      <div className="mb-6">
        <label className={labelBase}>
          {lang === "en" ? "Additional Details" : "جزئیات اضافی"}
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
              : "بیشتر در مورد نیاز‌های خود بگویید..."
          }
        />
      </div>

      {/* Submit - responsive */}
      <button type="submit" className="btn btn-primary btn-lg w-full mb-4">
        {lang === "en" ? "Send Inquiry" : "ارسال درخواست"}
      </button>

      {/* Success message - responsive */}
      {submitted && (
        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-xs sm:text-sm animate-fade-in-up">
          {lang === "en"
            ? "Thank you! Your inquiry has been received. Our team will review the details and contact you."
            : "متشکریم! درخواست شما دریافت شد. تیم ما جزئیات را بررسی می‌کند و با شما تماس می‌گیرد."}
        </div>
      )}
    </form>
  );
}
