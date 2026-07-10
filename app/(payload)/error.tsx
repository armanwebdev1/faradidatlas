"use client";

import { useEffect } from "react";

export default function PayloadError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Payload/CMS Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6 py-12 max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          CMS Error
        </h1>
        <p className="text-gray-600 mb-8">
          The admin panel encountered an error. This may be a temporary
          database issue.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
