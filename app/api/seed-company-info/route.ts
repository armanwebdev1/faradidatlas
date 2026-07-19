import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (body?.secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const locales = ['en', 'fa', 'ar'] as const

  for (const locale of locales) {
    const data = buildData(locale)
    await payload.updateGlobal({
      slug: 'company-info',
      locale,
      data,
    })
  }

  return NextResponse.json({ success: true })
}

function t(locale: string, en: string, fa: string, ar: string) {
  return locale === 'en' ? en : locale === 'fa' ? fa : ar
}

function buildData(locale: string) {
  return {
    hero: {
      eyebrow: t(locale, 'About Faradid Atlas', 'درباره فرادید اطلس', 'عن فراديد أطلس'),
      headline: t(locale, 'A name trusted for quality food sourcing', 'نامی قابل اعتماد در تأمین مواد غذایی باکیفیت', 'اسم موثوق في تزوين الغذاء عالي الجودة'),
      description: t(locale, 'With over fifteen years of experience in food sourcing and trading, Faradid Atlas provide reliable import and distribution solutions through a strong network of suppliers and business partners.', 'با بیش از پانزده سال تجربه در تأمین و تجارت مواد غذایی، فرادید اطلس راهکارهای قابل اعتماد واردات و توزیع را از طریق شبکه‌ای قوی از تأمین‌کنندگان و شرکای تجاری ارائه می‌دهد.', 'بخبرة تمتد لأكثر من خمسة عشر عامًا في تزوين وتجارة المواد الغذائية، توفر فراديد أطلس حلول استيراد وتوزيع موثوقة من خلال شبكة قوية من الموردين وشركاء الأعمال.'),
      imageAlt: t(locale, 'Faradid Atlas operations', 'عملیات فرادید اطلس', 'عمليات فراديد أطلس'),
      foodSecurityPractical: t(locale, 'Practical food security through direct supply', 'امنیت غذایی عملی از مسیر تأمین مستقیم', 'أمن غذائي عملي من خلال التوريد المباشر'),
      storyP1: t(locale, 'With over fifteen years of experience in food sourcing and trading, Faradid Atlas provide reliable import and distribution solutions through a strong network of suppliers and business partners.', 'با بیش از پانزده سال تجربه در تأمین و تجارت مواد غذایی، فرادید اطلس راهکارهای قابل اعتماد واردات و توزیع را از طریق شبکه‌ای قوی از تأمین‌کنندگان و شرکای تجاری ارائه می‌دهد.', 'بخبرة تمتد لأكثر من خمسة عشر عامًا في تزوين وتجارة المواد الغذائية، توفر فراديد أطلس حلول استيراد وتوزيع موثوقة من خلال شبكة قوية من الموردين وشركاء الأعمال.'),
      storyP2: t(locale, 'From sourcing rice and legumes in India and Pakistan to delivering them through a reliable network in Iran, the focus is always on consistency, quality, and building lasting relationships.', 'از تأمین برنج و حبوبات در هند و پاکستان تا تحویل آن‌ها از طریق شبکه‌ای قابل اعتماد در ایران، تمرکز همواره بر ثبات، کیفیت و ایجاد روابط پایدار بوده است.', 'من تزوين الأرز والبقوليات في الهند وباكستان إلى توصيلها عبر شبكة موثوقة في إيران، يظل التركيز دائمًا على الاتساق وجودة وبناء علاقات دائمة.'),
      missionLabel: t(locale, 'Our mission', 'مأموریت ما', 'مهمتنا'),
      missionText: t(locale, 'To shorten the global food supply chain, remove unnecessary intermediaries, and create lasting value for individuals, wholesalers, organizations, and governmental bodies.', 'ساده‌تر کردن مسیر تأمین مواد غذایی، کاهش واسطه‌های غیرضروری و ایجاد ارزش پایدار برای مشتریان، عمده‌فروشان، سازمان‌ها و نهادهای دولتی.', 'تبسيط سلسلة توريد الغذاء العالمي وتقليل الوسطاء غير الضروريين وإنشاء قيمة مستدامة للأفراد والتجار بالجملة والمؤسسات والهيئات الحكومية.'),
      blockquote: t(locale, 'Building lasting value through consistent quality and direct supply.', 'ایجاد ارزش پایدار از طریق کیفیت مستمر و تأمین مستقیم.', 'بناء قيمة دائمة من خلال الجودة المستمرة والتوريد المباشر.'),
    },
    aboutStats: [
      { value: 2009, labelEn: 'Established', labelFa: 'سال آغاز فعالیت', labelAr: 'سنة التأسيس' },
      { value: 4, labelEn: 'Rice brands', labelFa: 'برند برنج', labelAr: 'علامات أرز تجارية' },
      { value: 5, labelEn: 'Company offices', labelFa: 'دفتر شرکت', labelAr: 'مكاتب الشركة' },
      { value: 25, labelEn: 'Portfolio products', labelFa: 'محصول در سبد تامین', labelAr: 'منتجات المحفظة' },
    ],
    companyPresence: {
      alt: t(locale, 'Regional supply chain operations', 'زنجیره تامین منطقه‌ای فرادید اطلس', 'عمليات سلسلة التوريد الإقليمية لفراديد أطلس'),
      heading: t(locale, 'A supply network shaped by access and accountability', 'شبکه‌ای برای تأمین منظم، در دسترس و قابل اتکا', 'شبكة توريد تشكلت بالوصول والمساءلة'),
      paragraph1: t(locale, 'Our company offices are listed in Tehran, Isfahan, Dubai, and Oman, with operational and storage support in Iran including Shahrekord.', 'فرادید اطلس در تهران، اصفهان، دبی و عمان دفتر دارد و با پشتیبانی عملیاتی و انباری در ایران، از جمله شهرکرد، مسیر تأمین را منظم‌تر و قابل اتکاتر می‌کند.', 'يوجد لمجموعتنا مكاتب في طهران وأصفهان ودبي وعمان، مع دعم تشغيلي وتخزيني في إيران بما في ذلك شهركرد.'),
      paragraph2: t(locale, 'This footprint helps the company manage procurement, storage, and distribution so top-grade food products can move continuously and on time across Iran.', 'این گستره به شرکت کمک می‌کند فرایند تأمین، نگهداری و توزیع را با هماهنگی بیشتری مدیریت کند تا محصولات غذایی باکیفیت، به‌موقع و به‌صورت مستمر در اختیار بازار قرار بگیرند.', 'تساعد هذه الشبكة الشركة على إدارة المشتريات والتخزين والتوزيع بحيث يمكن لمنتجات الغذاء عالية الجودة التحرك باستمرار وفي الوقت المناسب عبر إيران.'),
      quote: t(locale, 'The goal is simple: keep high-quality essential food products available, fairly priced, and ready for the buyers who depend on them.', 'هدف روشن است: تأمین مواد غذایی اساسی با کیفیت قابل اعتماد، قیمت‌گذاری منطقی و آمادگی برای پاسخ‌گویی به خریدارانی که به عرضه منظم نیاز دارند.', 'الهدف بسيط: الحفاظ على توفر المنتجات الغذائية الأساسية عالية الجودة بأسعار عادلة وجاهزة للمشترين الذين يعتمدون عليها.'),
    },
    strategicFramework: {
      eyebrow: t(locale, 'Vision, Mission, Values', 'چشم‌انداز، مأموریت و ارزش‌ها', 'الرؤية والمهمة والقيم'),
      title: t(locale, 'A clear framework for sustainable food supply', 'مسیر روشن ما برای تأمین پایدار مواد غذایی', 'إطار واضح لإمداد الغذاء المستدام'),
      intro: t(locale, "Faradid Atlas' direction is built around sustainable leadership, shorter supply chains, professional ethics, and access to high-quality essential foods.", 'فرادید اطلس مسیر خود را بر پایه تأمین پایدار، ارتباط مستقیم با منابع معتبر، اخلاق حرفه‌ای و دسترسی به مواد غذایی اساسی باکیفیت بنا کرده است.', 'بُنيت استراتيجية فراديد أطلس على أساس التوريد المستدام والتواصل المباشر مع المصادر الموثوقة والأخلاق المهنية والوصول إلى أغذية أساسية عالية الجودة.'),
      vision: {
        label: t(locale, 'Vision', 'چشم‌انداز', 'الرؤية'),
        title: t(locale, 'Sustainable leadership by 2030', 'رشد پایدار تا سال ۱۴۰۹ / ۲۰۳۰', 'النمو المستدام بحلول عام 2030'),
        body: t(locale, "By 2030, Faradid Atlas aims to reach a 25% share of Iran's essential food products market while expanding its operating focus across the United Arab Emirates, India, and Oman. The company seeks to be recognized for high-quality, sustainable, and innovative food solutions.", 'فرادید اطلس تا سال ۱۴۰۹ شمسی / ۲۰۳۰ میلادی، دستیابی به جایگاهی پررنگ‌تر در بازار مواد غذایی اساسی ایران و توسعه فعالیت در امارات متحده عربی، هند و عمان را دنبال می‌کند. هدف ما این است که به‌عنوان مجموعه‌ای قابل اعتماد در ارائه راهکارهای غذایی باکیفیت، پایدار و نوآورانه شناخته شویم.', 'تهدف فراديد أطلس بحلول عام 2030 إلى الوصول إلى حصة أكبر في سوق المنتجات الغذائية الأساسية في إيران وتوسيع نطاق عملها في الإمارات العربية المتحدة والهند وعمان. يسعى المشروع ليكون معروفاً بحلول غذائية عالية الجودة ومستدام ومبتكرة.'),
        notes: [
          { text: t(locale, 'Market research points to a large Iranian food market opportunity by 2030.', 'برآوردهای بازار، رشد قابل توجه صنعت مواد غذایی ایران تا سال ۲۰۳۰ را نشان می‌دهد.', 'تشير أبحاث السوق إلى فرص كبيرة في صناعة الأغذية الإيرانية بحلول عام 2030.') },
          { text: t(locale, 'The same vision calls for 15-20% annual growth and attention to 8-10% annual demand growth in cost-effective grains and legumes.', 'افزایش تقاضا برای غلات و حبوبات مقرون‌به‌صرفه، فرصت مهمی برای توسعه سهم بازار ایجاد می‌کند.', 'الطلب المتزايد على الحبوب والبقوليات الفعالة من حيث التكلفة يوفر فرصة مهمة لتنمية الحصة السوقية.') },
          { text: t(locale, 'Regional food import demand is expected to keep rising across the Middle East.', 'نیاز رو‌به‌رشد خاورمیانه به واردات مواد غذایی، اهمیت زنجیره‌های تأمین منظم و قابل اتکا را بیشتر می‌کند.', 'الطلب المتزايد في الشرق الأوسط على واردات الأغذية يزيد من أهمية سلاسل التوريد المنتظمة والموثوقة.') },
        ],
      },
      mission: {
        label: t(locale, 'Mission', 'مأموریت', 'المهمة'),
        title: t(locale, 'Shorter routes from trusted suppliers to buyers', 'ارتباط مستقیم‌تر میان تأمین‌کننده معتبر و خریدار', 'توصيل مباشر أكثر من الموردين الموثوقين إلى المشترين'),
        body: t(locale, 'The mission is to shorten the global food supply chain, remove unnecessary intermediaries, and create lasting value for individuals, wholesalers, organizations, and governmental bodies. Faradid Atlas works directly with first-tier suppliers, especially in India and Pakistan, to balance quality, cost, and continuity.', 'مأموریت ما ساده‌تر کردن مسیر تأمین مواد غذایی، کاهش واسطه‌های غیرضروری و ایجاد ارزش پایدار برای مشتریان، عمده‌فروشان، سازمان‌ها و نهادهای دولتی است. فرادید اطلس با تأمین‌کنندگان معتبر، به‌ویژه در هند و پاکستان، همکاری مستقیم دارد تا کیفیت، هزینه و تداوم تأمین را هم‌زمان مدیریت کند.', 'مهمتنا هي تبسيط سلسلة توريد الغذاء وتقليل الوسطاء غير الضروريين وإنشاء قيمة مستدامة للعملاء والتجار بالجملة والمؤسسات والهيئات الحكومية. تعمل فراديد أطلس بشكل مباشر مع الموردين من الدرجة الأولى، لا سيما في الهند وباكستان، لتحقيق التوازن بين الجودة والتكلفة واستمرارية التوريد.'),
        notes: [
          { text: t(locale, 'Quality discipline is guided by ISO 22000.', 'کنترل کیفیت بر پایه استانداردهای معتبر، از جمله ISO 22000 انجام می‌شود.', 'يتم إجراء مراقبة الجودة وفقاً لمعايير ISO 22000 المرجعية.') },
          { text: t(locale, 'Pricing is shaped by rational margins and competitive market conditions.', 'قیمت‌گذاری با در نظر گرفتن شرایط بازار و حاشیه سود منطقی شکل می‌گیرد.', 'يشكل التسعير شروط السوق وحوافز الربح المعقولية.') },
          { text: t(locale, 'Accessibility is supported by Iranian offices, regional presence, and digital sales channels.', 'دفاتر ایران، حضور منطقه‌ای و کانال‌های فروش دیجیتال، دسترسی خریداران را آسان‌تر می‌کند.', 'تسهل المكاتب الإيرانية والحضور الإقليمي وقنوات المبيعات الرقمية الوصول للمشترين.') },
        ],
      },
      valuesSection: {
        label: t(locale, 'Values', 'ارزش‌ها', 'القيم'),
        title: t(locale, 'The standards behind daily decisions', 'اصولی که تصمیم‌های ما را شکل می‌دهند', 'المبادئ التي تشكل قراراتنا اليومية'),
        body: t(locale, "The company's values are customer-centricity, sustainability, professional ethics, innovation, and superior quality. They are reinforced through training, performance evaluation, and value-based supplier selection.", 'مشتری‌مداری، پایداری، اخلاق حرفه‌ای، نوآوری و کیفیت برتر، ارزش‌های اصلی فرادید اطلس هستند. این ارزش‌ها در انتخاب تأمین‌کنندگان، شیوه همکاری با مشتریان، آموزش نیروها و تصمیم‌های روزانه شرکت نقش مستقیم دارند.', 'التركيز على المستهلك والاستدامة والأخلاق المهنية والابتكار والجودة العالية هي القيم الأساسية لفراديد أطلس. تلعب هذه الأدوار دوراً مباشراً في اختيار الموردين وطريقة التعاون مع العملاء وتدريب الموظفين والقرارات اليومية للشركة.'),
      },
    },
    ceo: {
      eyebrow: t(locale, 'Leadership', 'مدیریت', 'القيادة'),
      heading: t(locale, 'Leadership grounded in strategy and experience', 'رهبری مبتنی بر تجربه، دانش و نگاه راهبردی', 'قيادة مبنية على الاستراتيجية والخبرة'),
      name: t(locale, 'Dr. Sohrab Bakhtiar', 'دکتر سهراب بختیار', 'الدكتور سهراب بختيار'),
      title: t(locale, 'Chief Executive Officer', 'مدیرعامل', 'الرئيس التنفيذي'),
      connectorWord: t(locale, 'of', 'شرکت', 'لشركة'),
      bio: t(locale, 'Dr. Sohrab Bakhtiar, CEO of Faradid Atlas, holds a Ph.D. in International Economics from the University of Tehran and a Ph.D. in Strategic Management from Vrije Universiteit Brussel (VUB), Belgium. With decades of experience in senior policy-making and executive management positions, he is recognized as an experienced leader and expert in the field of macroeconomic strategies. Furthermore, backed by three generations of continuous family involvement in the trade of essential commodities, he possesses valuable theoretical knowledge and practical expertise in commerce, international trade, and supply chain management.', 'دکتر سهراب بختیار، مدیرعامل شرکت فرادید اطلس، دانش‌آموخته دکترای اقتصاد بین‌الملل از دانشگاه تهران و دکترای مدیریت استراتژیک از دانشگاه (VUB) بروکسل بلژیک است. ایشان با بهره‌گیری از دهه‌ها تجربه در سطوح عالی سیاست‌گذاری و مدیریت، از مدیران باسابقه و صاحب‌نظر در حوزه راهبردهای کلان اقتصادی به شمار می‌روند. همچنین، با پشتوانه سه نسل فعالیت مستمر خانوادگی در حوزه تجارت کالاهای اساسی، از دانش نظری و تجربه عملی ارزشمندی در عرصه بازرگانی، و مدیریت زنجیره تأمین برخوردار هستند.', 'الدكتور سهراب بختيار، الرئيس التنفيذي لشركة فراديد أطلس، حاصل على درجة الدكتوراه في الاقتصاد الدولي من جامعة طهران، ودرجة الدكتوراه في الإدارة الاستراتيجية من جامعة بروكسل الحرة (VUB) في بلجيكا. وبفضل عقود من الخبرة في المستويات العليا لصنع السياسات والإدارة التنفيذية، يُعدّ من القيادات ذات الخبرة والرؤية المتخصصة في مجال الاستراتيجيات الاقتصادية الكلية. كما يمتلك، مستندًا إلى ثلاثة أجيال من النشاط العائلي المتواصل في مجال تجارة السلع الأساسية، مزيجًا قيّمًا من المعرفة الأكاديمية والخبرة العملية في مجالات التجارة، وإدارة سلسلة التوريد.'),
    },
    offeringsSection: {
      title: t(locale, 'What we offer', 'خدمات ما', 'ما نقدمه'),
      description: t(locale, 'From sourcing and quality control to distribution and documentation, Faradid Atlas manages the key stages of the food supply chain.', 'از تأمین و کنترل کیفیت تا توزیع و مستندسازی، فرادید اطلس مراحل کلیدی زنجیره تأمین مواد غذایی را مدیریت می‌کند.', 'من التوريد ومراقبة الجودة إلى التوزيع والتوثيق، تدير فراديد أطلس المراحل الرئيسية لسلسلة توريد الغذاء.'),
    },
    offerings: [
      {
        title: t(locale, 'Sourcing & Import', 'تأمین و واردات', 'التوريد والاستيراد'),
        description: t(locale, 'Direct supplier coordination for rice, legumes, spices, nuts, seeds, sugar, and other essentials.', 'هماهنگی مستقیم با تأمین‌کنندگان معتبر برای تأمین برنج، حبوبات، ادویه‌ها، مغزها، دانه‌ها، شکر و سایر اقلام غذایی اساسی.', 'التنسيق المباشر مع الموردين الموثوقين لتوريد الأرز والبقوليات والتوابل والمكسرات والبذور والسكر والسلع الغذائية الأساسية الأخرى.'),
      },
      {
        title: t(locale, 'Quality & Documentation', 'کنترل کیفیت و مستندات', 'مراقبة الجودة والتوثيق'),
        description: t(locale, 'Quality checks, hygiene standards, import documentation, and ISO-led operating discipline.', 'بررسی کیفیت، رعایت معیارهای بهداشتی، آماده‌سازی اسناد واردات و پیشبرد فرایندها بر پایه نظم عملیاتی و استانداردهای معتبر.', 'فحوصات الجودة والالتزام بمعايير النظافة وإعداد وثائق الاستيراد ودفع العمليات بناءً على نظام تشغيل راقب ومعايير موثوقة.'),
      },
      {
        title: t(locale, 'Distribution & Access', 'توزیع و دسترسی', 'التوزيع والوصول'),
        description: t(locale, 'Regional offices, branches, and warehouses that support retailers, wholesalers, and institutions.', 'دفاتر، شعب و پشتیبانی انبار در منطقه، برای پاسخ‌گویی به نیاز خرده‌فروشان، عمده‌فروشان، سازمان‌ها و خریداران تجاری.', 'المكاتب والفرع والمستودعات الإقليمية لدعم تجار التجزئة والجملة والمؤسسات والمشترين التجاريين.'),
      },
    ],
    valuesSection: {
      title: t(locale, 'Core Values', 'ارزش‌های اصلی', 'القيم الأساسية'),
      subtitle: t(locale, 'The principles behind every decision', 'اصولی که پشت هر تصمیم قرار دارد', 'المبادئ وراء كل قرار'),
      intro: t(locale, 'These five values guide every interaction, from sourcing decisions to customer service and team collaboration.', 'این پنج ارزش، هر تعامل را هدایت می‌کنند؛ از تصمیم‌های تأمین تا خدمات مشتری و همکاری تیمی.', 'هذه القيم الخمس توجّه كل تفاعل، من قرارات التوريد إلى خدمة العملاء والتعاون بين الفرق.'),
    },
    values: [
      { title: t(locale, 'Customer-Centricity', 'مشتری‌مداری', 'التركيز على العميل'), description: t(locale, 'Prompt feedback, practical buyer-specific solutions, and long-term trust reflected in strong customer retention goals.', 'پاسخ‌گویی دقیق، درک نیاز خریداران و ارائه راهکارهایی متناسب با شرایط هر همکاری، پایه شکل‌گیری اعتماد بلندمدت با مشتریان ماست.', 'الاستجابة الدقيقة وفهم احتياجات المشترين وتقديم حلول مخصصة لكل تعاون هي أساس بناء الثقة طويلة الأمد مع عملائنا.') },
      { title: t(locale, 'Sustainability', 'پایداری', 'الاستدامة'), description: t(locale, 'Responsible sourcing, recyclable packaging, local community support, and a stated goal to reduce waste by 20% by 1407 SH.', 'ما به تأمین مسئولانه، کاهش ضایعات، استفاده بهتر از منابع و حمایت از جوامع محلی در مسیر زنجیره تأمین توجه داریم.', 'نحرص على التوريد المسؤول وتقليل الهدر واستخدام الموارد بشكل أفضل ودعم المجتمعات المحلية على طول سلسلة التوريد.') },
      { title: t(locale, 'Professional Ethics', 'اخلاق حرفه‌ای', 'الأخلاق المهنية'), description: t(locale, 'Transparency, integrity, fair contracts, anti-corruption discipline, and customs-regulation compliance.', 'شفافیت، درستکاری، قراردادهای منصفانه، رعایت مقررات گمرکی و پایبندی به اصول حرفه‌ای، اساس همکاری‌های ما را شکل می‌دهد.', 'الشفافية والنزاهة والعقود العادلة والامتثال للوائح الجمارك والالتزام بالمبادئ المهنية هي أساس تعاوننا.') },
      { title: t(locale, 'Innovation', 'نوآوری', 'الابتكار'), description: t(locale, 'Digital sales channels, supply-chain traceability, ready-to-use spice blends, and agility toward plant-based demand.', 'توسعه کانال‌های فروش دیجیتال، بهبود ردیابی زنجیره تأمین و توجه به نیازهای تازه بازار، بخشی از نگاه نوآورانه ماست.', 'توسيع قنوات المبيعات الرقمية وتحسين التتبع عبر سلسلة التوريد والاستجابة لاحتياجات السوق الجديدة هي جزء من رؤيتنا المبتكرة.') },
      { title: t(locale, 'Superior Quality', 'کیفیت برتر', 'جودة عالية'), description: t(locale, 'Rigorous control at import, warehousing, and distribution stages to protect product trust and brand reputation.', 'کنترل دقیق در مراحل واردات، انبارداری و توزیع به ما کمک می‌کند کیفیت محصول، اعتماد خریداران و اعتبار برندها حفظ شود.', 'المراقبة الدقيقة في مراحل الاستيراد والتخزين والتوزيع تساعدنا على الحفاظ على جودة المنتج وثقة المشترين وسمعة العلامات التجارية.') },
    ],
    joinTeam: {
      title: t(locale, 'Work with Faradid Atlas', 'مسیر همکاری با فرادید اطلس را آغاز کنید', 'اعمل مع فراديد أطلس'),
      description: t(locale, 'Whether you are a buyer, supplier, or future teammate, we value practical thinking, professional ethics, and long-term trust.', 'چه خریدار باشید، چه تأمین‌کننده یا همکار آینده، برای ما نگاه عملی، اخلاق حرفه‌ای و اعتماد بلندمدت پایه هر همکاری است.', 'سواء كنت مشترياً أو مورداً أو زميلاً مستقبلياً، نقدّر التفكير العملي والأخلاق المهنية والثقة طويلة الأمد.'),
      ctaText: t(locale, 'Start a conversation', 'شروع گفتگو', 'ابدأ محادثة'),
      ctaUrl: '/contact',
    },
  }
}
