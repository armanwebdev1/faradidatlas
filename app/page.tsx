import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  if (acceptLanguage.includes("ar") || acceptLanguage.startsWith("ar")) {
    redirect("/ar");
  }

  if (acceptLanguage.includes("fa") || acceptLanguage.startsWith("fa")) {
    redirect("/fa");
  }

  redirect("/en");
}
