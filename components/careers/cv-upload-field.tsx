import type { RefObject } from "react";

interface CvUploadFieldProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  file: File | null;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  requiredLabel: string;
  fileHint: string;
  formatFileSize: (size: number) => string;
  labelBase: string;
}

export function CvUploadField({
  fileInputRef,
  file,
  error,
  onChange,
  label,
  requiredLabel,
  fileHint,
  formatFileSize,
  labelBase,
}: CvUploadFieldProps) {
  return (
    <div className="rounded-2xl border border-dashed border-foreground/20 bg-white/70 px-4 py-5">
      <label className={`${labelBase} mb-3`}>
        {label}{" "}
        <span className="text-destructive">({requiredLabel})</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onChange}
        accept=".pdf,.doc,.docx"
        required
        className={`w-full max-w-full text-sm text-foreground file:mr-4 file:max-w-full file:rounded-full file:border-0 file:bg-brand-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-navy/90 ${
          error ? "text-destructive" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby="cv-error"
      />
      <p className="mt-3 text-xs text-foreground/60">{fileHint}</p>
      {file && (
        <p className="mt-2 text-xs text-foreground/70">
          {file.name} - {formatFileSize(file.size)}
        </p>
      )}
      {error && (
        <p id="cv-error" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
