"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"

interface ApplicationFormProps {
  lang: Language
  jobId: number
  jobTitle: string
}

export function ApplicationForm({ lang, jobId, jobTitle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cv: null as File | null,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Form header - responsive typography */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1.5 sm:mb-2">
        {lang === "en" ? "Apply for Position" : "درخواست برای موقعیت"}
      </h2>
      <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base font-medium">{jobTitle}</p>

      {/* Form fields - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 md:mb-8">
        {/* First Name */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "First Name" : "نام"} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder={lang === "en" ? "John" : "علی"}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "Last Name" : "نام خانوادگی"} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder={lang === "en" ? "Doe" : "علی‌پور"}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "Email" : "ایمیل"} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="hello@example.com"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "Phone" : "تلفن"} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={lang === "en" ? "+1 (555) 123-4567" : "+98 (XXX) XXX-XXXX"}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "Location" : "مکان"}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={lang === "en" ? "City, Country" : "شهر، کشور"}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
            {lang === "en" ? "Years of Experience" : "سال‌های تجربه"}
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
          >
            <option value="">{lang === "en" ? "Select..." : "انتخاب کنید..."}</option>
            <option value="0-2">{lang === "en" ? "0-2 years" : "۰-۲ سال"}</option>
            <option value="2-5">{lang === "en" ? "2-5 years" : "۲-۵ سال"}</option>
            <option value="5-10">{lang === "en" ? "5-10 years" : "۵-۱۰ سال"}</option>
            <option value="10+">{lang === "en" ? "10+ years" : "۱۰+ سال"}</option>
          </select>
        </div>
      </div>

      {/* CV Upload - responsive */}
      <div className="mb-8 md:mb-10">
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2.5">
          {lang === "en" ? "Upload CV (PDF, DOC)" : "بارگذاری CV (PDF، DOC)"} <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dashed border-gray-300 rounded-lg bg-white text-foreground text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1.5 sm:mt-2">
          {lang === "en" ? "Maximum file size: 5 MB" : "حداکثر حجم فایل: ۵ مگابایت"}
        </p>
      </div>

      {/* Submit Button - responsive */}
      <button
        type="submit"
        className="w-full px-4 sm:px-6 py-2.5 sm:py-3 md:py-4 bg-primary text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-amber-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {lang === "en" ? "Submit Application" : "ارسال درخواست"}
      </button>

      {/* Success message - responsive */}
      {submitted && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700 text-xs sm:text-sm font-medium animate-fade-in-up">
          {lang === "en"
            ? "Thank you! Your application has been submitted. We'll contact you soon."
            : "متشکریم! درخواست شما ارسال شد. ما به زودی با شما تماس می‌گیریم."}
        </div>
      )}
    </form>
  )
}
