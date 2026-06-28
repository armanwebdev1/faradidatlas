import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  categoryLabels,
  productCategories,
  products,
} from "@/components/products/product-data";
import { publicContactEmail, publicPhoneNumbers } from "@/lib/contact-info";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

interface FooterProps {
  lang: Language;
}

type FooterLinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const brandHomeLabel =
    lang === "en" ? "Faradid Atlas home" : "خانه فرادید اطلس";
  const brandPrimary = lang === "en" ? "Faradid" : "فرادید";
  const brandSecondary = lang === "en" ? "Atlas" : "اطلس";

  const productCategoryLinks = productCategories
    .map((category) => ({
      count: products.filter((product) => product.category === category)
        .length,
      link: {
        href: `/${lang}/products?category=${category}#product-catalog`,
        label: categoryLabels[category][lang],
      },
    }))
    .filter((item) => item.count > 0)
    .map((item) => item.link);
  const productLinks: FooterLinkItem[] = [
    {
      href: `/${lang}/products#product-catalog`,
      label: t.pages.products.title,
    },
    ...productCategoryLinks,
  ];
  const navigationLinks: FooterLinkItem[] = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/products#product-catalog`, label: t.nav.products },
    { href: `/${lang}#products`, label: t.footer.featuredProducts },
    { href: `/${lang}#markets`, label: t.footer.markets },
  ];
  const companyLinks: FooterLinkItem[] = [
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/careers`, label: t.nav.careers },
    {
      href: `/${lang}/careers#open-roles`,
      label: t.pages.careers.openPositions,
    },
    { href: `/${lang}/faq`, label: t.nav.faq },
  ];
  const resourceLinks: FooterLinkItem[] = [
    {
      href: `/${lang}/contact#contact-form`,
      label: t.pages.contact.sendMessage,
    },
    {
      href: `/${lang}/contact#contact-offices`,
      label: t.pages.contact.ourOffices,
    },
    { href: `/${lang}/faq`, label: t.pages.faq.subtitle },
    { href: "/sitemap.xml", label: t.footer.sitemap, external: true },
  ];

  return (
    <footer
      dir={dir}
      className="relative overflow-hidden border-t border-brand-navy/30 bg-[#111722] text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-navy/35" />

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {/* Brand section */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div className="mb-8">
                <Link
                  href={`/${lang}`}
                  aria-label={brandHomeLabel}
                  className={`group mb-4 inline-flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <Image
                    src="/brand/faradid-atlas-mark-light.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-11 w-11 object-contain opacity-95 transition duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(48,59,112,0.55)] sm:h-12 sm:w-12"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {brandPrimary}
                    </span>
                    <span
                      className={`mt-1 text-xs font-medium text-white/65 transition-colors duration-300 group-hover:text-accent/80 ${
                        isRTL ? "tracking-normal" : "tracking-[0.24em]"
                      }`}
                    >
                      {brandSecondary}
                    </span>
                  </span>
                </Link>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {t.footer.tagline}
                </p>
              </div>

              <Link
                href={`/${lang}/contact`}
                className="inline-flex text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>

            <FooterColumn title={t.footer.navigation} links={navigationLinks} />

            <FooterColumn title={t.footer.products} links={productLinks} />

            <FooterColumn title={t.footer.company} links={companyLinks} />

            <FooterColumn title={t.footer.resources} links={resourceLinks} />

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
                {t.pages.contact.subtitle}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.footer.address}</span>
                </div>
                <a
                  href={`mailto:${publicContactEmail}`}
                  className="flex items-start gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-accent"
                  dir="ltr"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{publicContactEmail}</span>
                </a>
                <div className="space-y-2">
                  {publicPhoneNumbers.map((phone) => (
                    <div
                      key={phone.value}
                      className="flex items-center gap-3 text-sm text-white/70"
                      dir="ltr"
                    >
                      <a
                        href={phone.href}
                        className="flex items-center gap-3 transition-colors duration-300 hover:text-accent"
                      >
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{phone.display}</span>
                      </a>
                      <a
                        href={phone.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Chat with ${phone.display} on WhatsApp`}
                        className="text-white/70 transition-colors duration-300 hover:text-[#25D366]"
                      >
                        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                      </a>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex text-sm text-white/70 hover:text-accent transition-colors duration-300"
                >
                  {t.pages.contact.sendMessage}
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-8 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-start">
              <p className="text-xs text-white/60 leading-relaxed font-light">
                &copy; 2026 Faradid Atlas Foods. {t.footer.copyright} |{" "}
                <span className="text-accent/80">ISO 22000</span>
              </p>
            </div>
            <div className="text-center md:text-end">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:justify-end">
                <Link
                  href={`/${lang}/faq`}
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.nav.faq}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.nav.contact}
                </Link>
                <a
                  href="/sitemap.xml"
                  className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
                >
                  {t.footer.sitemap}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-accent/90">
        {title}
      </h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <FooterTextLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterTextLink({ link }: { link: FooterLinkItem }) {
  const className =
    "text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group";
  const content = (
    <span className="relative">
      {link.label}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
    </span>
  );

  if (link.external) {
    return (
      <a href={link.href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}
