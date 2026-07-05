export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  cv: File | null;
  website: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;
export type TouchedFields = Partial<Record<keyof FormValues, boolean>>;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ALLOWED_FILE_EXTENSIONS = ["pdf", "doc", "docx"];
