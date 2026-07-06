import type React from "react";
import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { ContactFormData, ContactField, ContactErrors } from "./contact-form-types";
import { getInitialFormData, toLatinDigits } from "./contact-form-types";
import { getContactCopy } from "./contact-form-copy";

export function useContactForm({
  lang,
  initialProductInterest,
}: {
  lang: Language;
  initialProductInterest?: string;
}) {
  const copy = getContactCopy(lang);

  const [formData, setFormData] = useState(() =>
    getInitialFormData(initialProductInterest),
  );

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncedInterest, setSyncedInterest] = useState(initialProductInterest);

  if (initialProductInterest && initialProductInterest !== syncedInterest) {
    setSyncedInterest(initialProductInterest);
    setFormData((prev) => ({
      ...prev,
      productInterest: initialProductInterest,
    }));
  }

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

  return {
    formData,
    submitted,
    formError,
    fieldErrors,
    isSubmitting,
    copy,
    getError,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
