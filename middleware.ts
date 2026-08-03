import { NextResponse, type NextRequest } from "next/server";

const VALID_LANGS = ["en", "fa", "ar"];
const KNOWN_PATHS = [
  "products",
  "contact",
  "about",
  "careers",
  "faq",
  "blog",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return NextResponse.next();

  const firstSegment = segments[0];

  if (VALID_LANGS.includes(firstSegment)) {
    if (segments.length >= 2) {
      const secondSegment = segments[1];
      if (!KNOWN_PATHS.includes(secondSegment)) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (KNOWN_PATHS.includes(firstSegment)) {
    const acceptLang = req.headers.get("accept-language") || "";
    let lang = "en";
    if (acceptLang.includes("fa")) lang = "fa";
    else if (acceptLang.includes("ar")) lang = "ar";

    const rest = segments.slice(1).join("/");
    const newPath = rest ? `/${lang}/${firstSegment}/${rest}` : `/${lang}/${firstSegment}`;
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon|robots|sitemap|manifest|.*\\..*).*)"],
};
