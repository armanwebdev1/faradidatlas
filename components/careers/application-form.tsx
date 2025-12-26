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
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8">
      <h2 className="text-3xl font-bold text-primary mb-2">
        {lang === "en" ? "Apply for Position" : "درخواست برای موقعیت"}
      </h2>
      <p className="text-neutral mb-8">{jobTitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {lang === "en" ? "First Name" : "نام"}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {lang === "en" ? "Last Name" : "نام خانوادگی"}
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{lang === "en" ? "Email" : "ایمیل"}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{lang === "en" ? "Phone" : "تلفن"}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {lang === "en" ? "Location" : "مکان"}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {lang === "en" ? "Years of Experience" : "سال‌های تجربه"}
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
          >
            <option value="">Select...</option>
            <option value="0-2">0-2 years</option>
            <option value="2-5">2-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>

      {/* CV Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          {lang === "en" ? "Upload CV (PDF, DOC)" : "بارگذاری CV (PDF، DOC)"}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          required
          className="w-full px-4 py-2 border border-border rounded bg-white text-foreground focus:outline-none focus:border-primary"
        />
        <p className="text-xs text-neutral mt-2">
          {lang === "en" ? "Maximum file size: 5 MB" : "حداکثر حجم فایل: ۵ مگابایت"}
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-accent transition-colors"
      >
        {lang === "en" ? "Submit Application" : "ارسال درخواست"}
      </button>

      {/* Success message */}
      {submitted && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
          {lang === "en"
            ? "Thank you! Your application has been submitted. We'll contact you soon."
            : "متشکریم! درخواست شما ارسال شد. ما به زودی با شما تماس می‌گیریم."}
        </div>
      )}
    </form>
  )
}
