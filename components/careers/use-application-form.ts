import { useRef, useState, useCallback } from "react";
import type React from "react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import type { FormValues, FormErrors, TouchedFields } from "./application-form-types";
import {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  ALLOWED_FILE_EXTENSIONS,
} from "./application-form-types";
import { getApplicationCopy } from "./application-form-copy";

interface UseApplicationFormProps {
  lang: Language;
  jobId: string | number;
  jobTitle: string;
}

export function useApplicationForm({ lang, jobId, jobTitle }: UseApplicationFormProps) {
  const t = translations[lang];
  const copy = getApplicationCopy(lang);
  const backendEnabled = process.env.NEXT_PUBLIC_ENABLE_BACKEND === "true";

  const initialFormData: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    cv: null,
    website: "",
  };

  const [formData, setFormData] = useState<FormValues>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateField = useCallback(
    (name: keyof FormValues, value: FormValues[keyof FormValues]) => {
      switch (name) {
        case "firstName": {
          const trimmed = String(value || "").trim();
          if (!trimmed) return copy.errors.firstNameRequired;
          if (trimmed.length < 2) return copy.errors.firstNameLength;
          return "";
        }
        case "lastName": {
          const trimmed = String(value || "").trim();
          if (!trimmed) return copy.errors.lastNameRequired;
          if (trimmed.length < 2) return copy.errors.lastNameLength;
          return "";
        }
        case "email": {
          const trimmed = String(value || "").trim();
          if (!trimmed) return copy.errors.emailRequired;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(trimmed)) return copy.errors.emailInvalid;
          return "";
        }
        case "phone": {
          const trimmed = String(value || "").trim();
          if (!trimmed) return copy.errors.phoneRequired;
          const digits = trimmed.replace(/\D/g, "");
          if (digits.length < 7) return copy.errors.phoneInvalid;
          return "";
        }
        case "location": {
          const trimmed = String(value || "").trim();
          if (!trimmed) return "";
          if (trimmed.length < 2) return copy.errors.locationInvalid;
          return "";
        }
        case "experience": {
          if (!value) return copy.errors.experienceRequired;
          return "";
        }
        case "cv": {
          if (!value) return copy.errors.cvRequired;
          const file = value as File;
          const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
          const isTypeAllowed =
            ALLOWED_FILE_TYPES.includes(file.type) ||
            ALLOWED_FILE_EXTENSIONS.includes(extension);
          if (!isTypeAllowed) return copy.errors.cvType;
          if (file.size > MAX_FILE_SIZE) return copy.errors.cvSize;
          return "";
        }
        default:
          return "";
      }
    },
    [copy],
  );

  const validateForm = useCallback(
    (data: FormValues) => {
      const nextErrors: FormErrors = {};
      (Object.keys(data) as Array<keyof FormValues>).forEach((field) => {
        const message = validateField(field, data[field]);
        if (message) {
          nextErrors[field] = message;
        }
      });
      return nextErrors;
    },
    [validateField],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof FormValues;
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      if (touched[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: validateField(fieldName, value),
        }));
      }
    },
    [touched, validateField],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof FormValues;
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    },
    [validateField],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setFormData((prev) => ({ ...prev, cv: file }));
      setTouched((prev) => ({ ...prev, cv: true }));
      setErrors((prev) => ({
        ...prev,
        cv: validateField("cv", file),
      }));
    },
    [validateField],
  );

  const formatFileSize = useCallback((size: number) => {
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const nextErrors = validateForm(formData);
      setErrors(nextErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        location: true,
        experience: true,
        cv: true,
      });

      if (Object.keys(nextErrors).length > 0) {
        setFormError(copy.formError);
        return;
      }

      setFormError("");
      setIsSubmitting(true);
      setSubmitted(false);

      try {
        if (!backendEnabled) {
          setSubmitted(true);
          setFormData(initialFormData);
          setErrors({});
          setTouched({});
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          return;
        }

        const payload = new FormData();
        payload.append("lang", lang);
        payload.append("jobId", String(jobId));
        payload.append("jobTitle", jobTitle);
        payload.append("firstName", formData.firstName);
        payload.append("lastName", formData.lastName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("location", formData.location);
        payload.append("experience", formData.experience);
        payload.append("website", formData.website);
        if (formData.cv) {
          payload.append("cv", formData.cv);
        }

        const response = await fetch("/api/careers", {
          method: "POST",
          body: payload,
        });
        const result = (await response.json()) as {
          ok?: boolean;
          message?: string;
        };

        if (!response.ok || !result.ok) {
          throw new Error(result.message || copy.formError);
        }

        setSubmitted(true);
        setFormData(initialFormData);
        setErrors({});
        setTouched({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        setFormError(error instanceof Error ? error.message : copy.formError);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, lang, jobId, jobTitle, backendEnabled, validateForm, copy, initialFormData],
  );

  const getError = useCallback(
    (field: keyof FormValues) => (touched[field] ? errors[field] : ""),
    [touched, errors],
  );

  return {
    t,
    copy,
    formData,
    errors,
    touched,
    submitted,
    formError,
    isSubmitting,
    fileInputRef,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
    formatFileSize,
    getError,
  };
}
