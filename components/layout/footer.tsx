import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { getContactInfo } from "@/lib/fetch/contact-info";

interface FooterProps {
  lang: Language;
}

type FooterLinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

const categoryLabelsLocal: Record<string, { en: string; fa: string; ar: string }> = {
  rice: { en: "Rice", fa: "برنج", ar: "أرز" },
  legumes: { en: "Legumes & Pulses", fa: "حبوبات", ar: "بقوليات" },
  seeds: { en: "Seeds & Kernels", fa: "دانه‌ها و مغز تخمه‌ها", ar: "بذور ولب" },
  nuts: { en: "Nuts", fa: "مغزها", ar: "مكسرات" },
  spices: { en: "Spices & Seasonings", fa: "ادویه‌ها و چاشنی‌ها", ar: "توابل وبهارات" },
  sugar: { en: "Sweeteners", fa: "شکر و شیرین‌کننده‌ها", ar: "سكر ومحليات" },
};

const productCategoriesLocal = ["rice", "legumes", "seeds", "nuts", "spices", "sugar"];

export async function Footer({ lang }: FooterProps) {
  const t_trans = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  const contactInfo = await getContactInfo(lang);
  const footerContactEmail = contactInfo?.email ?? "info@faradidatlas.com";
  const footerPhones: { value: string; display: string; whatsappHref?: string }[] = (contactInfo?.phones ?? []).map((p: any) => ({
    value: p.value ?? "",
    display: p.display ?? "",
    whatsappHref: p.whatsappHref ?? "",
  }));
  const brandHomeLabel =
    lang === "en" ? "Faradid Atlas home" : lang === "fa" ? "خانه فرادید اطلس" : "الرئيسية فراديد أطلس";
  const brandPrimary = lang === "en" ? "Faradid" : lang === "fa" ? "فرادید" : "فراديد";
  const brandSecondary = lang === "en" ? "Atlas" : lang === "fa" ? "اطلس" : "اطلس";

  const productCategoryLinks = productCategoriesLocal.map((category) => ({
    href: `/${lang}/products?category=${category}#product-catalog`,
    label: categoryLabelsLocal[category]?.[lang] ?? category,
  }));

  const productLinks: FooterLinkItem[] = [
    { href: `/${lang}/products#product-catalog`, label: t_trans.pages.products.title },
    ...productCategoryLinks,
  ];
  const navigationLinks: FooterLinkItem[] = [
    { href: `/${lang}`, label: t_trans.nav.home },
    { href: `/${lang}/products#product-catalog`, label: t_trans.nav.products },
    { href: `/${lang}#products`, label: t_trans.footer.featuredProducts },
    { href: `/${lang}#markets`, label: t_trans.footer.markets },
  ];
  const companyLinks: FooterLinkItem[] = [
    { href: `/${lang}/about`, label: t_trans.nav.about },
    { href: `/${lang}/careers`, label: t_trans.nav.careers },
    { href: `/${lang}/faq`, label: t_trans.nav.faq },
    { href: `/${lang}/blog`, label: t_trans.nav.blog },
  ];
  const resourceLinks: FooterLinkItem[] = [
    { href: `/${lang}/contact#contact-form`, label: t_trans.pages.contact.sendMessage },
    { href: `/${lang}/contact#contact-offices`, label: t_trans.pages.contact.ourOffices },
    { href: `/${lang}/faq`, label: t_trans.pages.faq.subtitle },
    { href: "/sitemap.xml", label: t_trans.footer.sitemap, external: true },
  ];

  return (
    <footer dir={dir} className="relative overflow-hidden border-t border-brand-navy/30 bg-[#111722] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-navy/35" />
      <div className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div className="mb-8">
                <Link href={`/${lang}`} aria-label={brandHomeLabel} className={`group mb-4 inline-flex items-center gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}>
                  <Image src="/brand/faradid-atlas-mark-light.png" alt="" width={56} height={56} sizes="56px" className="h-11 w-11 object-contain opacity-95 transition duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(48,59,112,0.55)] sm:h-12 sm:w-12" />
                  <span className="flex flex-col leading-none">
                    <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent sm:text-2xl">{brandPrimary}</span>
                    <span className={`mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-accent/80 ${isRTL ? "tracking-normal" : "tracking-[0.24em]"}`}>{brandSecondary}</span>
                  </span>
                </Link>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">{t_trans.footer.tagline}</p>
              </div>
            </div>

            <FooterColumn title={t_trans.footer.navigation} links={navigationLinks} bold />
            <FooterColumn title={t_trans.footer.products} links={productLinks} />
            <FooterColumn title={t_trans.footer.company} links={companyLinks} />
            <FooterColumn title={t_trans.footer.resources} links={resourceLinks} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">{t_trans.pages.contact.subtitle}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{t_trans.footer.address}</span>
                </div>
                {footerContactEmail && (
                  <a href={`mailto:${footerContactEmail}`} aria-label={lang === "ar" ? `أرسل إلينا على ${footerContactEmail}` : lang === "fa" ? `ایمیل به ${footerContactEmail}` : `Email us at ${footerContactEmail}`} className="group/email flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-accent">
                    <Mail className="w-4 h-4 shrink-0 text-inherit" />
                    <span dir="ltr" className="text-inherit underline-offset-4 group-hover/email:underline">{footerContactEmail}</span>
                  </a>
                )}
                <div className="space-y-4">
                  {footerPhones.map((phone) => (
                    <div key={phone.value} className="group/phone flex items-start gap-3 text-sm">
                      <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/70 transition-colors duration-300 group-hover/phone:text-accent" />
                      <div className="flex flex-col">
                        <a href={`tel:${phone.value}`} aria-label={lang === "ar" ? `اتصل على ${phone.display}` : lang === "fa" ? `تماس با ${phone.display}` : `Call us at ${phone.display}`} className="text-sm text-white/70 transition-colors duration-300 hover:text-accent">
                          <span dir="ltr" className="text-inherit tabular-nums underline-offset-4 hover:underline">{phone.display}</span>
                        </a>
                        {phone.whatsappHref && (
                          <a href={phone.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={lang === "ar" ? `تحدث مع ${phone.display} عبر WhatsApp` : lang === "fa" ? `چت با ${phone.display} در WhatsApp` : `Chat with ${phone.display} on WhatsApp`} className="mt-1 inline-flex items-center gap-1 text-xs text-white/60 transition-colors duration-300 hover:text-[#25D366]">
                            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                            <span>{lang === "ar" ? "واتساب ↗" : lang === "fa" ? "واتساپ ↗" : "WhatsApp ↗"}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/${lang}/contact`} className="inline-flex text-sm text-white/70 hover:text-accent transition-colors duration-300">{t_trans.pages.contact.sendMessage}</Link>
              </div>
            </div>
          </div>

          <div className="relative py-8 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-white/40 leading-relaxed font-light">&copy; 2026 Faradid Atlas Foods. {t_trans.footer.copyright} | <span className="text-white/50">ISO 22000</span></p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href={`/${lang}/faq`} className="text-xs text-white/60 hover:text-accent transition-colors duration-300">{t_trans.nav.faq}</Link>
              <Link href={`/${lang}/blog`} className="text-xs text-white/60 hover:text-accent transition-colors duration-300">{t_trans.nav.blog}</Link>
              <Link href={`/${lang}/contact`} className="text-xs text-white/60 hover:text-accent transition-colors duration-300">{t_trans.nav.contact}</Link>
              <a href="/sitemap.xml" className="text-xs text-white/60 hover:text-accent transition-colors duration-300">{t_trans.footer.sitemap}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, bold }: { title: string; links: FooterLinkItem[]; bold?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-accent/90">{title}</p>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterTextLink link={link} bold={bold} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterTextLink({ link, bold }: { link: FooterLinkItem; bold?: boolean }) {
  const className = `text-sm ${bold ? "font-bold" : "font-normal"} text-white/70 hover:text-accent transition-colors duration-300 relative group`;
  const content = (
    <span className="relative">
      {link.label}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
    </span>
  );
  if (link.external) {
    return <a href={link.href} className={className}>{content}</a>;
  }
  return <Link href={link.href} className={className}>{content}</Link>;
}
