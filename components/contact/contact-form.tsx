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
          ? "Tell us about your business needs. We'll respond within 24-48 hours."
          : "به ما در مورد نیاز‌های تجاری خود بگویید. ما در ۲۴-۴۸ ساعت پاسخ خواهیم داد."}
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
            <option value="buyer">
              {lang === "en" ? "Buyer/Importer" : "خریدار/واردکننده"}
            </option>
            <option value="distributor">
              {lang === "en" ? "Distributor" : "توزیع‌کننده"}
            </option>
            <option value="retailer">
              {lang === "en" ? "Retailer" : "فروشنده"}
            </option>
            <option value="food-manufacturer">
              {lang === "en" ? "Food Manufacturer" : "تولیدکننده غذایی"}
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
            <option value="saffron">
              {lang === "en" ? "Saffron" : "زعفران"}
            </option>
            <option value="dates">{lang === "en" ? "Dates" : "خرما"}</option>
            <option value="pistachios">
              {lang === "en" ? "Pistachios" : "فستق"}
            </option>
            <option value="almonds">
              {lang === "en" ? "Almonds" : "بادام"}
            </option>
            <option value="herbs">
              {lang === "en" ? "Dried Herbs" : "گیاهان خشک"}
            </option>
            <option value="multiple">
              {lang === "en" ? "Multiple Products" : "محصولات متعدد"}
            </option>
          </select>
        </div>

        {/* Volume */}
        <div>
          <label className={labelBase}>
            {lang === "en" ? "Estimated Monthly Volume" : "حجم تقریبی ماهانه"}
          </label>
          <select
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="">
              {lang === "en" ? "Select volume..." : "حجم را انتخاب کنید..."}
            </option>
            <option value="100-500">{"100-500 kg"}</option>
            <option value="500-1000">{"500-1,000 kg"}</option>
            <option value="1000-5000">{"1,000-5,000 kg"}</option>
            <option value="5000+">{"5,000+ kg"}</option>
          </select>
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
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={inputBase}
          >
            <option value="">
              {lang === "en"
                ? "Select timeline..."
                : "زمان‌بندی را انتخاب کنید..."}
            </option>
            <option value="immediate">
              {lang === "en"
                ? "Immediate (within 2 weeks)"
                : "فوری (در ۲ هفته)"}
            </option>
            <option value="short">
              {lang === "en"
                ? "Short-term (1-3 months)"
                : "کوتاه‌مدت (۱-۳ ماه)"}
            </option>
            <option value="medium">
              {lang === "en"
                ? "Medium-term (3-6 months)"
                : "میان‌مدت (۳-۶ ماه)"}
            </option>
            <option value="long">
              {lang === "en" ? "Long-term (6+ months)" : "بلند‌مدت (۶+ ماه)"}
            </option>
          </select>
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
            ? "Thank you! Your inquiry has been received. We'll contact you within 24-48 hours."
            : "متشکریم! درخواست شما دریافت شد. ما در ۲۴-۴۸ ساعت با شما تماس می‌گیریم."}
        </div>
      )}
    </form>
  );
}

