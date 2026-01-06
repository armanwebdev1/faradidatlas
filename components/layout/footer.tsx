"use client";

import Link from "next/link";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer
      dir={dir}
      className="relative bg-gradient-to-b from-primary to-primary/95 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  FaraDid
                </span>
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Global premium food trading with international standards and
                certified excellence.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-all duration-300 hover:bg-white/5 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation sections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#products`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    Featured Products
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#markets`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    Markets
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    {t.nav.about}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/careers`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    {t.nav.careers}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/faq`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    {t.nav.faq}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    {t.nav.contact}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:sales@faraded.com"
                  className="text-sm text-white/70 hover:text-accent transition-colors duration-300 relative group"
                >
                  <span className="relative">
                    Email
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent/90">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:sales@faraded.com"
                className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="break-all">sales@faraded.com</span>
              </a>
              <a
                href="tel:+98123456789"
                className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span>+98 (123) 456-789</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Global Trading Operations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-8 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-start">
            <p className="text-xs text-white/60 leading-relaxed font-light">
              &copy; 2025 FaraDid Foods. All rights reserved. |{" "}
              <span className="text-accent/80">ISO 22000</span> |{" "}
              <span className="text-accent/80">HACCP Certified</span>
            </p>
          </div>
          <div className="text-center md:text-end">
            <div className="flex justify-center md:justify-end gap-6">
              <a
                href="#"
                className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-white/60 hover:text-accent transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
