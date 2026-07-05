import type { Language } from "@/lib/i18n";

export function getContactCopy(lang: Language) {
  return lang === "en"
    ? {
        required: "required",
        fixFields: "Please fix the highlighted fields before sending.",
        success:
          "Thank you. Your inquiry has been received. Our team will review the details and contact you.",
        errors: {
          companyRequired: "Company name is required.",
          companyLength: "Company name should be at least 2 characters.",
          nameRequired: "Contact name is required.",
          nameLength: "Contact name should be at least 2 characters.",
          emailRequired: "Email is required.",
          emailInvalid: "Please enter a valid email address.",
          phoneRequired: "Phone number is required.",
          phoneInvalid: "Please enter a valid phone number.",
          productRequired: "Please choose a product interest.",
          messageLength: "Additional details must be under 3000 characters.",
          paused:
            "Email delivery is not active yet. Please check the Vercel environment variables and redeploy.",
          notConfigured:
            "Email delivery is not configured yet. Please check the Resend API key and recipient emails.",
          security: "Security check failed. Please try again.",
          invalid: "Please review the inquiry details and try again.",
          generic: "Unable to send inquiry. Please try again.",
        },
      }
    : {
        required: "ضروری",
        fixFields: "لطفاً فیلدهای مشخص‌شده را اصلاح کنید.",
        success:
          "سپاسگزاریم. درخواست شما دریافت شد؛ تیم فرادید اطلس جزئیات را بررسی می‌کند و با شما تماس خواهد گرفت.",
        errors: {
          companyRequired: "وارد کردن نام شرکت ضروری است.",
          companyLength: "نام شرکت باید حداقل ۲ حرف باشد.",
          nameRequired: "وارد کردن نام و نام خانوادگی ضروری است.",
          nameLength: "نام باید حداقل ۲ حرف باشد.",
          emailRequired: "وارد کردن ایمیل ضروری است.",
          emailInvalid: "لطفاً یک ایمیل معتبر وارد کنید.",
          phoneRequired: "وارد کردن شماره تماس ضروری است.",
          phoneInvalid: "لطفاً یک شماره تماس معتبر وارد کنید.",
          productRequired: "لطفاً محصول موردنظر را انتخاب کنید.",
          messageLength: "توضیحات تکمیلی باید کمتر از ۳۰۰۰ کاراکتر باشد.",
          paused:
            "ارسال ایمیل هنوز در تنظیمات سایت فعال نشده است. لطفاً تنظیمات Vercel را بررسی کنید و سایت را دوباره منتشر کنید.",
          notConfigured:
            "ارسال ایمیل هنوز کامل تنظیم نشده است. لطفاً کلید Resend و ایمیل‌های گیرنده را بررسی کنید.",
          security: "بررسی امنیتی ناموفق بود. لطفاً دوباره تلاش کنید.",
          invalid: "لطفاً جزئیات درخواست را بررسی و دوباره ارسال کنید.",
          generic: "امکان ارسال درخواست وجود ندارد. لطفاً دوباره تلاش کنید.",
        },
      };
}
