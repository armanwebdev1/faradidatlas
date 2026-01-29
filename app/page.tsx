import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  // Get accept-language header to detect user's preferred language
  const headersList = await headers(); // ✅ Await the promise
  const acceptLanguage = headersList.get("accept-language") || "";

  // Check if Persian (fa) is in the accept-language header
  const prefersPersian =
    acceptLanguage.includes("fa") || acceptLanguage.startsWith("fa");

  redirect(prefersPersian ? "/fa" : "/en");
}
