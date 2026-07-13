import { ProductCard } from "@/components/products/product-card";
import {
  categoryLabels,
  products,
  type ProductCategory,
} from "@/components/products/product-data";
import { absoluteUrl, localizedPath } from "@/lib/site";
import { translations, type Language } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Rich SEO content per category — 300+ words, all three languages   */
/* ------------------------------------------------------------------ */

export const categorySEOContent: Record<
  ProductCategory,
  {
    title: { en: string; fa: string; ar: string };
    subtitle: { en: string; fa: string; ar: string };
    content: { en: string; fa: string; ar: string };
  }
> = {
  rice: {
    title: {
      en: "Rice — Basmati, Jasmine & Long Grain",
      fa: "برنج — باسماتی، جاسمین و دانه‌بلند",
      ar: "الأرز — بسمتي وياسمين وحبّ طويل",
    },
    subtitle: {
      en: "Sourced from India and Pakistan, delivered across the Middle East",
      fa: "تأمین از هند و پاکستان، توزیع در سراسر خاورمیانه",
      ar: "مصدره من الهند وباكستان، يُسلّم عبر الشرق الأوسط",
    },
    content: {
      en: `Faradid Atlas is a leading wholesale rice supplier and rice import specialist, providing B2B buyers across Iran, the UAE, and Oman with a comprehensive range of premium rice varieties. Our wholesale basmati rice portfolio includes extra-long grain basmati, long grain sella basmati, aromatic jasmine rice, and parboiled rice sourced directly from India and Pakistan — the world's most respected rice-producing regions. As a dedicated rice supplier, we work closely with first-tier mills and agricultural cooperatives to ensure every shipment of wholesale rice meets strict quality and food safety standards, including ISO 22000 certification.\n\nOur long grain rice selection features the 1121 variety — widely regarded as the finest basmati in global markets — alongside premium sella, steam-processed, and white basmati options. Each product in our wholesale rice catalog undergoes rigorous quality verification before entering our supply chain, ensuring consistent grain length, clean aroma, and reliable cooking performance. Whether you are a wholesaler seeking bulk basmati rice for retail distribution, a foodservice operator sourcing long grain rice for institutional supply, or a retail chain looking for branded rice products, Faradid Atlas delivers dependable B2B rice supply with transparent documentation.\n\nWe offer flexible packaging options ranging from consumer-friendly 5 kg and 10 kg bags to industrial 25 kg and 50 kg sacks, all branded under our recognized labels — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing network, including facilities in Tehran, Isfahan, Dubai, and Oman, ensures consistent availability and rapid fulfillment for wholesale rice orders across the Middle East. For businesses seeking a reliable wholesale rice import partner, Faradid Atlas provides the sourcing expertise, quality assurance, and supply chain reliability needed to maintain a steady flow of premium rice products to your market.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده عمده برنج و متخصص واردات برنج، طیف گسترده‌ای از انواع برنج مرغوب را برای خریداران B2B در ایران، امارات و عمان عرضه می‌کند. سبد برنج باسماتی عمده ما شامل برنج باسماتی دانه‌بلند، برنج سلا دانه‌بلند، برنج جاسمین خوش‌عطر و برنج پاربویل شده از هند و پاکستان است؛ مناطقی که معتبرترین مراکز تولید برنج در جهان محسوب می‌شوند. به‌عنوان تأمین‌کننده تخصصی برنج، ما با کارخانه‌های درجه‌یک و تعاونی‌های کشاورزی همکاری نزدیک داریم تا هر محموله برنج عمده با استانداردهای کیفیت و ایمنی غذایی سختگیرانه از جمله گواهینامه ISO 22000 مطابقت داشته باشد.\n\nانتخاب برنج دانه‌بلند ما شامل رقم ۱۱۲۱ است که به‌طور گسترده بهترین باسماتی در بازارهای جهانی شناخته می‌شود؛ در کنار برنج سلا ممتاز، بخاری و سفید. هر محصول در کاتالوگ برنج عمده ما پیش از ورود به زنجیره تأمین، کیفیت‌سنجی دقیق را پشت سر می‌گذارد تا طول دانه یکنواخت، عطر تمیز و عملکرد پخت قابل اعتماد تضمین شود. چه عمده‌فروشی باشید که به دنبال برنج باسماتی عمده برای توزیع خرده‌فروشی هستید، چه خدمات غذایی که برنج دانه‌بلند برای عرضه سازمانی تأمین می‌کنید، یا زنجیره فروشگاهی که محصولات برنج برنددار می‌خواهید، فرادید اطلس تأمین B2B قابل اعتماد با مستندات شفاف ارائه می‌دهد.\n\nما گزینه‌های بسته‌بندی انعطاف‌پذیر از کیسه‌های ۵ و ۱۰ کیلوگرمی مصرفی تا گونی‌های ۲۵ و ۵۰ کیلوگرمی صنعتی ارائه می‌دهیم که همگی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات — عرضه می‌شوند. شبکه انبارداری منطقه‌ای ما از جمله امکانات در تهران، اصفهان، دبی و عمان، در دسترس بودن پایدار و تسریع در اجرای سفارشات برنج عمده در سراسر خاورمیانه را تضمین می‌کند. برای کسب‌وکارهایی که به دنبال شریک قابل اعتماد واردات برنج عمده هستند، فرادید اطلس تخصص تأمین، تضمین کیفیت و قابلیت اطمینان زنجیره تأمین مورد نیاز برای حفظ جریان پایدار محصولات برنج مرغوب به بازار شما را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّد أرز بالجملة رائدًا ومتخصصًا في استيراد الأرز، حيث يوفّر لمشتريات B2B في إيران والإمارات وعمان مجموعة شاملة من أصناف الأرز الممتازة. تتضمن مجموعة الأرز البسمتي بالجملة لدينا أرز بسمتي حبّ طويل فائق الطول، وأرز بسمتي سلا حبّ طويل، وأرز ياسمين عطري، وأرز مبّرّد مصدره مباشرة من الهند وباكستان — أكثر مناطق إنتاج الأرز شهرةً وثقةً في العالم. بصفتنا مورّدًا متخصصًا في الأرز، نعمل عن كثب مع مطاحن الدرجة الأولى والتعاونيات الزراعية لضمان مطابقة كل شحنة أرز بالجملة لمعايير صارمة من الجودة والسلامة الغذائية، بما في ذلك شهادة ISO 22000.\n\nيتضمن اختيارنا من الأرز الحبّ الطويل صنف ١١٢١ — المعروف عالميًا كأفضل أنواع البسمتي في الأسواق العالمية — إلى جانب خيارات البسمتي سلا الممتازة والأرز المبخاري والأبيض. يخضع كل منتج في كتالوج الأرز بالجملة لدينا لعملية تحقق صارمة من الجودة قبل دخول سلسلة التوريد، مما يضمن طول الحبّ المتسق والرائحة النظيفة وأداء الطهي الموثوق. سواء كنت تاجرًا بالجملة يبحث عن أرز بسمتي بالجملة لتوزيع التجزئة، أو مزوّد خدمات طعام ي愶رّ أرز حبّ طويل لتوريد المؤسسات، أو سلسلة متاجر تبحث عن منتجات أرز ب marque، يوفّر فراديد أطلس توريد أرز B2B موثوقًا مع توثيق شفاف.\n\nنقدّم خيارات تعبئة مرنة تتراوح من أكياس ٥ و١٠ كجم للمستهلك إلى أكياس ٢٥ و٥٠ كجم للقطاع الصناعي، وجميعها تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين الإقليمية لدينا، بما في ذلك المرافق في طهران وأصفهان ودبي وعمان، التوفر المستقر والتنفيذ السريع لطلبات الأرز بالجملة عبر الشرق الأوسط. للشركات التي تبحث عن شريك موثوق في استيراد الأرز بالجملة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة والموثوقية في سلسلة التوريد اللازمة للحفاظ على تدفق مستمر من منتجات الأرز الممتازة إلى سوقك.`,
    },
  },
  legumes: {
    title: {
      en: "Legumes — Beans, Lentils & Chickpeas",
      fa: "حبوبات — لوبیا، عدس و نخود",
      ar: "البقوليات — فاصوليا وعدس وحمص",
    },
    subtitle: {
      en: "Essential staples for food manufacturers and wholesale buyers",
      fa: "اقلام اساسی برای تولیدکنندگان غذا و خریداران عمده",
      ar: "أساسيات للمصنعين والتجار بالجملة",
    },
    content: {
      en: `Faradid Atlas is a premier wholesale legumes supplier and pulses distributor, offering B2B buyers across Iran, the UAE, and Oman a diverse portfolio of high-quality beans, lentils, chickpeas, mung beans, kidney beans, and pinto beans. Our wholesale legumes are sourced from trusted origins including Canada, the USA, Turkey, and regional producers, ensuring reliable protein-rich staples for food manufacturers, wholesalers, foodservice operators, and retail distribution channels. As an experienced pulses supplier, we understand the critical importance of consistent quality, competitive pricing, and dependable supply in the B2B food industry.\n\nOur wholesale legumes catalog features navy beans, white beans in both carton and bag formats, red lentils, green lentils, chickpeas, desi chickpeas, mung beans, kidney beans, pinto beans, and black-eyed peas — each selected against strict quality benchmarks for size, purity, moisture content, and freedom from foreign matter. Every product in our pulses supply chain undergoes quality verification to meet international food safety standards, including ISO 22000 certification. Whether you are sourcing chickpeas for hummus production, lentils for institutional foodservice, or beans for retail packaging, Faradid Atlas delivers wholesale legumes with full traceability and transparent documentation.\n\nWe provide flexible packaging solutions tailored to B2B requirements, including bulk bags, consumer packs, and customized private-label options under our recognized brands — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing and distribution network across Tehran, Isfahan, Dubai, and Oman enables efficient fulfillment and consistent availability for wholesale legume orders. For food manufacturers seeking chickpeas B2B supply, distributors looking for wholesale lentils, or retailers building a comprehensive pulses portfolio, Faradid Atlas provides the sourcing expertise, quality assurance, and supply chain reliability your business needs.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده پیشرو حبوبات عمده و توزیع‌کننده پالس، پرتفوی متنوعی از حبوبات با کیفیت شامل لوبیا، عدس، نخود، ماش، لوبیا قرمز و لوبیا چیتی را برای خریداران B2B در ایران، امارات و عمان عرضه می‌کند. حبوبات عمده ما از مبادی معتبر از جمله کانادا، آمریکا، ترکیه و تولیدکنندگان منطقه‌ای تأمین می‌شود و اقلام اساسی غنی از پروتئین برای تولیدکنندگان غذا، عمده‌فروشان، خدمات غذایی و کانال‌های توزیع خرده‌فروشی فراهم می‌کند. به‌عنوان تأمین‌کننده باتجربه پالس، ما اهمیت حیاتی کیفیت یکنواخت، قیمت رقابتی و تأمین قابل اعتماد در صنعت غذای B2B را درک می‌کنیم.\n\nکاتالوگ حبوبات عمده ما شامل لوبیا سفید در فرمت‌های کارتن و کیسه، عدس قرمز، عدس سبز، نخود، نخود دسی، ماش، لوبیا قرمز، لوبیا چیتی و لوبیا چشم بلبلی است؛ هر یک بر اساس معیارهای سختگیرانه کیفیت از نظر اندازه، خلوص، رطوبت و عاری بودن از مواد خارجی انتخاب می‌شوند. هر محصول در زنجیره تأمین حبوبات ما کیفیت‌سنجی می‌شود تا با استانداردهای بین‌المللی ایمنی غذایی از جمله گواهینامه ISO 22000 مطابقت داشته باشد. چه نخود برای تولید حمص تأمین می‌کنید، چه عدس برای خدمات غذایی سازمانی یا لوبیا برای بسته‌بندی خرده‌فروشی نیاز دارید، فرادید اطلس حبوبات عمده با ردیابی کامل و مستندات شفاف ارائه می‌دهد.\n\nما راهکارهای بسته‌بندی انعطاف‌پذیر متناسب با نیازهای B2B ارائه می‌دهیم شامل بسته‌های عمده، بسته‌های مصرفی و گزینه‌های برچسب خصوصی سفارشی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات. شبکه انبارداری و توزیع منطقه‌ای ما در تهران، اصفهان، دبی و عمان اجرای کارآمد و در دسترس بودن پایدار سفارشات حبوبات عمده را ممکن می‌سازد. برای تولیدکنندگان غذا که نخود B2B تأمین می‌کنند، توزیع‌کنندگانی که به دنبال عدس عمده هستند یا خرده‌فروشانی که پرتفوی جامع حبوبات می‌سازند، فرادید اطلس تخصص تأمین، تضمین کیفیت و قابلیت اطمینان زنجیره تأمین مورد نیاز کسب‌وکار شما را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّد رائدًا للبقوليات بالجملة وموزّعًا للحبوب، حيث يوفّر لمشتريات B2B في إيران والإمارات وعمان مجموعة متنوعة من الفاصوليا والعدس والحمص ولونبيا مونغ والفاصوليا الحمراء والفاصوليا بينتو عالية الجودة. يتم توريد البقوليات بالجملة لدينا من مصادر موثوقة تشمل كندا والولايات المتحدة وتركيا والمصنعين الإقليميين، مما يوفّر أساسيات غنية بالبروتين لمصنعي الأغذية والتجار بالجملة ومزوّدي خدمات الطعام وقنوات التوزيع بالتجزئة. بصفتنا مورّدًا خبيرًا في الحبوب، ندرك الأهمية الحاسمة للجودة المتسقة والأسعار التنافسية والتوريد الموثوق في صناعة الأغذية B2B.\n\nيتضمن كتالوج البقوليات بالجملة لدينا الفاصوليا النافية والبيضاء بأحجام كرتونية و袋装، والعدس الأحمر والأخضر، والحمص والحمص الديسي، ولونبيا مونغ والفاصوليا الحمراء والفاصوليا بينتو ولونبيا العين السوداء — كلها مختارة وفق معايير صارمة للحجم والنقاء ومحتوى الرطوبة وخلوها من المواد الغريبة. يخضع كل منتج في سلسلة توريد البقوليات لدينا للتحقق من الجودة للوفاء بمعايير السلامة الغذائية الدولية بما في ذلك شهادة ISO 22000. سواء كنت تورّد حمصًا لإنتاج الحمص المُهروس، أو عدسًا لخدمات الطعام المؤسسية، أو فاصوليا للتغليف بالتجزئة، يوفّر فراديد أطلس بقوليات بالجملة مع التتبع الكامل والتوثيق الشفاف.\n\nنقدّم حلول تعبئة مرنة مصممة لمتطلبات B2B تشمل أكياس بالجملة وأكياس للمستهلك وخيارات علامة تجارية خاصة مخصصة تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين والتوزيع الإقليمية لدينا في طهران وأصفهان ودبي وعمان التنفيذ الفعال والتوفر المستقر لطلبات البقوليات بالجملة. لمصنعي الأغذية الذين يورّدون حمصًا B2B أو الموزعين الذين يبحثون عن عدس بالجملة أو تجار التجزئة الذين يبنون مجموعة بقوليات شاملة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة والموثوقية في سلسلة التوريد التي تحتاجها أعمالك.`,
    },
  },
  seeds: {
    title: {
      en: "Seeds & Kernels — Sunflower, Pumpkin & Sesame",
      fa: "دانه‌ها و مغزها — آفتابگردان، کدو و کنجد",
      ar: "البذور واللبّ — عباد الشمس، يقطين وسمسم",
    },
    subtitle: {
      en: "For snack producers, bakeries and food manufacturers",
      fa: "برای تولیدکنندگان تنقلات، نانوایی‌ها و کارخانجات غذا",
      ar: "لمصنعي الوجبات الخفيفة والمخابز والأغذية",
    },
    content: {
      en: `Faradid Atlas is a trusted wholesale seeds supplier and kernels distributor, providing B2B buyers across Iran, the UAE, and Oman with a comprehensive range of sunflower seeds, pumpkin seeds, sesame seeds, popcorn corn, and desiccated coconut. Our wholesale seeds portfolio is curated for snack manufacturers, bakery producers, foodservice operators, and retail distribution channels that demand consistent quality, competitive pricing, and reliable supply. As an experienced seeds supplier, we understand the specific requirements of commercial buyers who source bulk seeds and kernels for production and retail purposes.\n\nOur wholesale seeds catalog includes sunflower seed kernels, sunflower seeds in shell, pumpkin seed kernels, pumpkin seeds, sesame seeds, popcorn kernels, and desiccated coconut powder — each processed and packaged to maintain freshness, nutritional value, and clean presentation. Every product in our seeds supply chain undergoes strict quality verification for size uniformity, moisture content, oil quality, and freedom from contaminants, ensuring compliance with international food safety standards including ISO 22000. Whether you are a snack producer sourcing sunflower seeds for roasting and seasoning, a bakery buyer needing pumpkin seeds for specialty products, or a food manufacturer requiring sesame seeds for tahini and confectionery, Faradid Atlas delivers wholesale seeds with full traceability.\n\nWe offer flexible packaging solutions for wholesale seeds including bulk sacks, retail-ready bags, and customized private-label packaging under our recognized brands — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing network across Tehran, Isfahan, Dubai, and Oman ensures consistent stock availability and efficient fulfillment for B2B seed orders. For popcorn corn buyers seeking commercial-grade kernels, snack manufacturers looking for wholesale sunflower seeds, or food producers building a diverse kernels portfolio, Faradid Atlas provides the sourcing expertise, quality assurance, and dependable supply chain your business requires.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده معتبر دانه‌های عمده و توزیع‌کننده مغزها، طیف جامعی از تخمه آفتابگردان، تخمه کدو، کنجد، ذرت پاپ‌کورن و پودر نارگیل را برای خریداران B2B در ایران، امارات و عمان فراهم می‌کند. پرتفوی دانه‌های عمده ما برای تولیدکنندگان تنقلات، تولیدکنندگان نانوایی، خدمات غذایی و کانال‌های توزیع خرده‌فروشی که کیفیت یکنواخت، قیمت رقابتی و تأمین قابل اعتماد می‌خواهند، گردآوری شده است. به‌عنوان تأمین‌کننده باتجربه دانه‌ها، ما نیازهای خاص خریداران تجاری که دانه‌ها و مغزهای عمده برای تولید و خرده‌فروشی تأمین می‌کنند را درک می‌کنیم.\n\nکاتالوگ دانه‌های عمده ما شامل مغز تخمه آفتابگردان، تخمه آفتابگردان با پوست، مغز تخمه کدو، تخمه کدو، کنجد، دانه پاپ‌کورن و پودر نارگیل است؛ هر یک فرآوری و بسته‌بندی شده برای حفظ تازگی، ارزش غذایی و ارائه تمیز. هر محصول در زنجیره تأمین دانه‌های ما کیفیت‌سنجی دقیق برای یکنواختی اندازه، محتوای رطوبت، کیفیت روغن و عاری بودن از آلاینده‌ها را پشت سر می‌گذارد و با استانداردهای بین‌المللی ایمنی غذایی از جمله ISO 22000 مطابقت دارد. چه تولیدکننده تنقلات باشید که تخمه آفتابگردان برای بودادن و ادویه‌گذاری تأمین می‌کنید، چه خریدار نانوایی که مغز تخمه کدو برای محصولات تخصصی نیاز دارید یا تولیدکننده غذا که کنجد برای طحینه و شیرینی‌پزی می‌خواهید، فرادید اطلس دانه‌های عمده با ردیابی کامل ارائه می‌دهد.\n\nما راهکارهای بسته‌بندی انعطاف‌پذیر برای دانه‌های عمده شامل گونی‌های عمده، کیسه‌های آماده خرده‌فروشی و بسته‌بندی برچسب خصوصی سفارشی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات — ارائه می‌دهیم. شبکه انبارداری منطقه‌ای ما در تهران، اصفهان، دبی و عمان در دسترس بودن پایدار موجودی و اجرای کارآمد سفارشات B2B دانه‌ها را تضمین می‌کند. برای خریداران ذرت پاپ‌کورن که دانه‌های درجه تجاری نیاز دارند، تولیدکنندگان تنقلاتی که به دنبال تخمه آفتابگردان عمده هستند یا تولیدکنندگان غذا که پرتفوی متنوع مغزها می‌سازند، فرادید اطلس تخصص تأمین، تضمین کیفیت و زنجیره تأمین قابل اعتماد مورد نیاز کسب‌وکار شما را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّدًا موثوقًا للبذور بالجملة وموزّعًا للبزور، حيث يوفّر لمشتريات B2B في إيران والإمارات وعمان مجموعة شاملة من بذور عباد الشمس وبذور اليقطين وبذور السمسم وحبوب البوب كورن ومسحوق جوز الهند المجفف. يتم تجميع مجموعة البذور بالجملة لدينا لتصنيع الوجبات الخفيفة ومصنعي المخابز ومزوّدي خدمات الطعام وقنوات التوزيع بالتجزئة التي تتطلب جودة متسقة وأسعارًا تنافسية وتوريدًا موثوقًا. بصفتنا مورّدًا خبيرًا في البذور، نفهم المتطلبات المحددة للمشترين التجاريين الذين يوردون بذورًا وملبّنات بالجملة لأغراض الإنتاج والتجزئة.\n\nيتضمن كتالوج البذور بالجملة لدينا لبّ بذور عباد الشمس وبذور عباد الشمس بالقشرة ولفّ بذور اليقطين وبذور اليقطين وبذور السمسم وحبوب البوب كورن ومسحوق جوز الهند المجفف — كلها معالجة ومعبأة للحفاظ على النضال والقيمة الغذائية والعرو النظيف. يخضع كل منتج في سلسلة توريد البذور لدينا لتحقق صارم من الجودة من حيث توحيد الحجم ومحتوى الرطوبة وجودة الزيت وخلوها من الملوثات، مما يضمن الامتثال لمعايير السلامة الغذائية الدولية بما في ذلك ISO 22000. سواء كنت مصنّع وجبات خفيفة يورّد بذور عباد الشمس للتحميص والتتبيل، أو مشتري مخابز يحتاج لبّ بذور اليقطين لمنتجات متخصصة، أو مصنّع أغذية يحتاج بذور السمسم للطحينة والحلويات، يوفّر فراديد أطلس بذورًا بالجملة مع التتبع الكامل.\n\nنقدّم حلول تعبئة مرنة للبذور بالجملة تشمل أكياسًا بالجملة وأكياسًا جاهزة للتجزئة وتعبئة علامة تجارية خاصة مخصصة تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين الإقليمية لدينا في طهران وأصفهان ودبي وعمان التوفر المستمر للمخزون والتنفيذ الفعال لطلبات البذور B2B. لمشتري حبوب البوب كورن الذين يبحثون عن حبوب درجة تجارية أو مصنعي الوجبات الخفيفة الذين يبحثون عن بذور عباد الشمس بالجملة أو مصنعي الأغذية الذين يبنون مجموعة ملّبّنات متنوعة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة وسلسلة التوريد الموثوقة التي تحتاجها أعمالك.`,
    },
  },
  nuts: {
    title: {
      en: "Nuts — Walnuts, Cashews & Peanuts",
      fa: "مغزها — گردو، بادام هندی و بادام زمینی",
      ar: "المكسرات — جوز وكاجيو وفول سوداني",
    },
    subtitle: {
      en: "Premium quality from trusted origins",
      fa: "کیفیت ممتاز از مبادی معتبر",
      ar: "جودة ممتازة من مصادر موثوقة",
    },
    content: {
      en: `Faradid Atlas is a leading wholesale nuts supplier and distributor of premium nut varieties, serving B2B buyers across Iran, the UAE, and Oman with walnut kernels, cashew nuts, peanuts, desiccated coconut, and other high-value nut products. Our wholesale nuts portfolio is carefully curated for snack manufacturers, confectionery producers, bakery operators, foodservice chains, and retail distribution channels that demand consistent quality and reliable B2B supply. As an experienced nuts supplier, we source directly from first-tier producers and processing facilities to ensure every product meets rigorous food safety and quality benchmarks.\n\nOur wholesale nuts catalog features premium walnut kernels — sourced from Iran and the USA — available in halves, pieces, and light-grade selections; roasted cashew nuts in various grades; blanched and roasted peanuts; and desiccated coconut powder for bakery and confectionery applications. Each product in our nuts supply chain is processed under strict quality controls, with testing for size uniformity, moisture content, oil oxidation levels, and sensory characteristics to meet ISO 22000 food safety standards. Whether you are sourcing walnut kernels for premium snack packaging, cashew nuts for food manufacturing, or peanuts for wholesale distribution, Faradid Atlas delivers bulk nuts with full traceability and consistent quality.\n\nWe offer flexible packaging formats for wholesale nuts, including vacuum packs, cartons, bulk sacks, and customized private-label solutions under our recognized brands — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing network in Tehran, Isfahan, Dubai, and Oman ensures consistent stock levels and rapid fulfillment for B2B nut orders across the Middle East. For confectionery producers seeking premium walnut kernels, snack manufacturers needing wholesale cashew nuts, or retailers building a comprehensive nuts portfolio, Faradid Atlas provides the sourcing expertise, quality assurance, and supply chain reliability essential for sustained commercial success.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده پیشرو مغزهای عمده و توزیع‌کننده انواع مغزهای ممتاز، خریداران B2B در ایران، امارات و عمان را با مغز گردو، بادام هندی، بادام زمینی، پودر نارگیل و سایر محصولات مغز با ارزش بالا خدمت‌رسانی می‌کند. پرتفوی مغزهای عمده ما با دقت برای تولیدکنندگان تنقلات، تولیدکنندگان شیرینی‌پزی، نانوایی‌ها، زنجیره‌های خدمات غذایی و کانال‌های توزیع خرده‌فروشی که کیفیت یکنواخت و تأمین B2B قابل اعتماد می‌خواهند، گردآوری شده است. به‌عنوان تأمین‌کننده باتجربه مغزها، ما مستقیماً از تولیدکنندگان درجه‌یک و امکانات فرآوری تأمین می‌کنیم تا هر محصول معیارهای سختگیرانه ایمنی غذایی و کیفیت را رعایت کند.\n\nکاتالوگ مغزهای عمده ما شامل مغز گردوی ممتاز — تأمین شده از ایران و آمریکا — در اشکال نیمه، پاره و انتخاب‌های درجه روشن؛ بادام هندی بوداده در درجه‌های مختلف؛ بادام زمینی پوست‌کنده و بوداده؛ و پودر نارگیل برای کاربردهای نانوایی و شیرینی‌پزی است. هر محصول در زنجیره تأمین مغزهای ما تحت کنترل کیفیت دقیق فرآوری می‌شود و آزمایش‌های یکنواختی اندازه، محتوای رطوبت، سطح اکسیداسیون روغن و ویژگی‌های حسی برای رعایت استانداردهای ایمنی غذایی ISO 22000 انجام می‌شود. چه مغز گردو برای بسته‌بندی تنقلات ممتاز تأمین می‌کنید، چه بادام هندی برای تولید غذا نیاز دارید یا بادام زمینی برای توزیع عمده می‌خواهید، فرادید اطلس مغزهای عمده با ردیابی کامل و کیفیت یکنواخت ارائه می‌دهد.\n\nما فرمت‌های بسته‌بندی انعطاف‌پذیر برای مغزهای عمده شامل بسته‌های خلاء، کارتن، گونی‌های عمده و راهکارهای برچسب خصوصی سفارشی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات — ارائه می‌دهیم. شبکه انبارداری منطقه‌ای ما در تهران، اصفهان، دبی و عمان سطوح موجودی پایدار و اجرای سریع سفارشات B2B مغزها در سراسر خاورمیانه را تضمین می‌کند. برای تولیدکنندگان شیرینی‌پزی که مغز گردوی ممتاز نیاز دارند، تولیدکنندگان تنقلاتی که بادام هندی عمده می‌خواهند یا خرده‌فروشانی که پرتفوی جامع مغزها می‌سازند، فرادید اطلس تخصص تأمین، تضمین کیفیت و قابلیت اطمینان زنجیره تأمین ضروری برای موفقیت تجاری پایدار را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّدًا رائدًا للمكسرات بالجملة وموزّعًا لأصناف ممتازة منها، حيث يخدم مشتريات B2B في إيران والإمارات وعمان بلبّ الجوز ومكسرات الكاجيو والفول السوداني ومسحوق جوز الهند ومنتجات مكسرات عالية القيمة أخرى. يتم تجميع مجموعة المكسرات بالجملة لدينا بعناية لتصنيع الوجبات الخفيفة ومصنعي الحلويات ومشغلي المخابز وسلسلات خدمات الطعام وقنوات التوزيع بالتجزئة التي تتطلب جودة متسقة وتوريد B2B موثوقًا. بصفتنا مورّدًا خبيرًا في المكسرات، نتورّد مباشرة من المصنعين من الدرجة الأولى ومنشآت المعالجة لضمان تلبية كل منتج لمعايير صارمة من السلامة الغذائية والجودة.\n\nيتضمن كتالوج المكسرات بالجملة لدينا لبّ جوز ممتاز — مصدره إيران والولايات المتحدة — متوفر بنصف لبّ وقطع وتصنيفات درجة فاتحة؛ مكسرات كاجيو محمّصة بدرجات مختلفة؛ فول سوداني متقشّر ومحمّص؛ ومسحوق جوز الهند للمخابز والحلويات. يخضع كل منتج في سلسلة توريد المكسرات لدينا لمعالجة تحت ضوابط صارمة للجودة مع اختبارات لتوحيد الحجم ومحتوى الرطوبة ومستويات تأكسد الزيت والخصائس الحسية للوفاء بمعايير السلامة الغذائية ISO 22000. سواء كنت تورّد لبّ جوز لتغليف الوجبات الخفيفة الفاخرة أو مكسرات كاجيو لتصنيع الأغذية أو فول سوداني للتوزيع بالجملة، يوفّر فراديد أطلس مكسرات بالجملة مع التتبع الكامل والجودة المتسقة.\n\nنقدّم صيغ تعبئة مرنة للمكسرات بالجملة تشمل التعبئة الفراغية والكرتونات والأكياس الكبيرة وحلول العلامة التجارية الخاصة المخصصة تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين الإقليمية لدينا في طهران وأصفهان ودبي وعمان مستويات مخزون متسقة وتنفيذًا سريعًا لطلبات المكسرات B2B عبر الشرق الأوسط. لمصنعي الحلويات الذين يبحثون عن لبّ جوز ممتاز أو مصنعي الوجبات الخفيفة الذين يحتاجون مكسرات كاجيو بالجملة أو تجار التجزئة الذين يبنون مجموعة مكسرات شاملة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة وموثوقية سلسلة التوريد الضرورية للنجاح التجاري المستدام.`,
    },
  },
  spices: {
    title: {
      en: "Spices — Turmeric, Pepper & Cardamom",
      fa: "ادویه‌ها — زردچوبه، فلفل و هل",
      ar: "التوابل — كركم وفلفل وهيل",
    },
    subtitle: {
      en: "Aromatic flavors for foodservice and retail",
      fa: "عطر و طعم برای خدمات غذایی و خرده‌فروشی",
      ar: "نكهات عطرية لمطاعم ومتاجر التجزئة",
    },
    content: {
      en: `Faradid Atlas is a premier wholesale spices supplier and distributor, offering B2B buyers across Iran, the UAE, and Oman a comprehensive portfolio of premium turmeric, black pepper, cardamom, and other essential spice varieties. Our wholesale spices are sourced from reputable origins — including India, the world's largest spice producer — and processed under strict quality controls to preserve aroma, color, and culinary flavor. As an experienced spices supplier, we serve food manufacturers, foodservice operators, wholesalers, and retail distribution channels that demand consistent quality and dependable B2B supply in the global spice trade.\n\nOur wholesale spices catalog features ground turmeric in various grades, whole and ground black pepper, green and white cardamom, and complementary seasonings — each selected for purity, volatile oil content, curcumin levels (for turmeric), and piperine concentration (for black pepper). Every product in our spices supply chain undergoes rigorous quality verification, including laboratory testing for heavy metals, pesticide residues, and microbiological standards, ensuring compliance with ISO 22000 food safety certification. Whether you are sourcing turmeric for food coloring and flavoring, black pepper for commercial food production, or cardamom for premium beverage and confectionery applications, Faradid Atlas delivers wholesale spices with full traceability and transparent documentation.\n\nWe provide flexible packaging solutions for wholesale spices, ranging from small retail packs to bulk containers and customized private-label options under our recognized brands — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing network across Tehran, Isfahan, Dubai, and Oman ensures consistent availability and efficient fulfillment for B2B spice orders. For food manufacturers seeking wholesale turmeric, foodservice operators sourcing black pepper in bulk, or retailers building a comprehensive spices portfolio, Faradid Atlas provides the sourcing expertise, quality assurance, and supply chain reliability your commercial operation requires.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده پیشرو ادویه‌های عمده و توزیع‌کننده آن‌ها، پرتفوی جامعی از زردچوبه ممتاز، فلفل سیاه، هل و سایر انواع ادویه ضروری را برای خریداران B2B در ایران، امارات و عمان عرضه می‌کند. ادویه‌های عمده ما از مبادی معتبر — از جمله هند، بزرگترین تولیدکننده ادویه در جهان — تأمین و تحت کنترل کیفیت دقیق فرآوری می‌شوند تا عطر، رنگ و طعم آشپزی حفظ شود. به‌عنوان تأمین‌کننده باتجربه ادویه‌ها، ما تولیدکنندگان غذا، خدمات غذایی، عمده‌فروشان و کانال‌های توزیع خرده‌فروشی را خدمت‌رسانی می‌کنیم که کیفیت یکنواخت و تأمین B2B قابل اعتماد در تجارت جهانی ادویه می‌خواهند.\n\nکاتالوگ ادویه‌های عمده ما شامل زردچوبه آسیاب‌شده در درجه‌های مختلف، فلفل سیاه کامل و آسیاب‌شده، هل سبز و سفید و چاشنی‌های مکمل است؛ هر یک بر اساس خلوص، محتوای روغن فرار، سطوح کورکومین (برای زردچوبه) و غلظت پپرین (برای فلفل سیاه) انتخاب می‌شوند. هر محصول در زنجیره تأمین ادویه‌های ما کیفیت‌سنجی دقیق از جمله آزمایشگاه برای فلزات سنگین، باقیمانده سموم دفع آفات و استانداردهای میکروبیولوژیکی را پشت سر می‌گذارد و با گواهینامه ایمنی غذایی ISO 22000 مطابقت دارد. چه زردچوبه برای رنگ‌آمیزی و طعم‌دهی غذا تأمین می‌کنید، چه فلفل سیاه برای تولید غذای تجاری یا هل برای نوشیدنی‌ها و شیرینی‌پزی ممتاز نیاز دارید، فرادید اطلس ادویه‌های عمده با ردیابی کامل و مستندات شفاف ارائه می‌دهد.\n\nما راهکارهای بسته‌بندی انعطاف‌پذیر برای ادویه‌های عمده ارائه می‌دهیم شامل بسته‌های خرده‌فروشی کوچک تا ظروف عمده و گزینه‌های برچسب خصوصی سفارشی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات. شبکه انبارداری منطقه‌ای ما در تهران، اصفهان، دبی و عمان در دسترس بودن پایدار و اجرای کارآمد سفارشات B2B ادویه‌ها را تضمین می‌کند. برای تولیدکنندگان غذا که زردچوبه عمده نیاز دارند، خدمات غذایی که فلفل سیاه عمده تأمین می‌کنند یا خرده‌فروشانی که پرتفوی جامع ادویه‌ها می‌سازند، فرادید اطلس تخصص تأمین، تضمین کیفیت و قابلیت اطمینان زنجیره تأمین مورد نیاز عملیات تجاری شما را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّدًا أولًا للتوابل بالجملة وموزّعًا لها، حيث يوفّر لمشتريات B2B في إيران والإمارات وعمان مجموعة شاملة من الكركم الممتاز والفلفل الأسود والهيل وأنواع التوابل الأخرى. يتم توريد التوابل بالجملة لدينا من مصادر ذات سمعة طيبة — بما في ذلك الهند، أكبر منتج للتوابل في العالم — وتُعالَج تحت ضوابط صارمة للجودة للحفاظ على النكهة واللون وال aroma الطهاري. بصفتنا مورّدًا خبيرًا في التوابل، نخدم مصنعي الأغذية ومزوّدي خدمات الطعام والتجار بالجملة وقنوات التوزيع بالتجزئة التي تتطلب جودة متسقة وتوريد B2B موثوقًا في تجارة التوابل العالمية.\n\nيتضمن كتالوج التوابل بالجملة لدينا كركم مطحون بدرجات مختلفة وفلفل أسود كامل ومطحون وهيل أخضر وأبيض وتوابل تكميلية — كلها مختارة من حيث النقاء ومحتوى الزيوت الطيارة ومستويات الكركومين (للكركم) وتركيز البايرين (للفلفل الأسود). يخضع كل منتج في سلسلة توريد التوابل لدينا لتحقق صارم من الجودة يشمل الاختبار المخبري لل metals الثقيلة وبقايا المبيدات الحشرية ومعايير ميكروبيولوجية، مما يضمن الامتثال لشهادة السلامة الغذائية ISO 22000. سواء كنت تورّد كركمًا لصبغ وتنكيه الأغذية أو فلفلًا أسود لإنتاج الأغذية التجارية أو هيلًا لمشروبات وحلويات فاخرة، يوفّر فراديد أطلس توابلًا بالجملة مع التتبع الكامل والتوثيق الشفاف.\n\nنقدّم حلول تعبئة مرنة للتوابل بالجملة تتراوح من أكياس التجزئة الصغيرة إلى الحاويات بالجملة وخيارات العلامة التجارية الخاصة المخصصة تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين الإقليمية لدينا في طهران وأصفهان ودبي وعمان التوفر المستقر والتنفيذ الفعال لطلبات التوابل B2B. لمصنعي الأغذية الذين يبحثون عن كركم بالجملة أو مزوّدي خدمات الطعام الذين يورّدون فلفلًا أسود بالجملة أو تجار التجزئة الذين يبنون مجموعة توابل شاملة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة وموثوقية سلسلة التوريد التي تحتاجها أعمالك.`,
    },
  },
  sugar: {
    title: {
      en: "Sugar & Sweeteners",
      fa: "شکر و شیرین‌کننده‌ها",
      ar: "السكر والمحليات",
    },
    subtitle: {
      en: "Refined sugar for industrial and commercial use",
      fa: "شکر تصفیه‌شده برای مصارف صنعتی و تجاری",
      ar: "سكر مكرر للاستخدام الصناعي والتجاري",
    },
    content: {
      en: `Faradid Atlas is a trusted wholesale sugar supplier and sweeteners distributor, providing B2B buyers across Iran, the UAE, and Oman with high-quality refined sugar products for industrial, commercial, and retail applications. Our wholesale sugar portfolio includes white refined sugar, specialty sugar, and bulk sweeteners sourced from reputable global producers, ensuring consistent quality, competitive pricing, and reliable supply for food manufacturers, beverage producers, confectionery businesses, bakeries, and wholesale distribution channels. As an experienced sugar supplier, we understand the critical importance of purity, grain consistency, and dependable delivery schedules in the B2B sweetener market.\n\nOur wholesale sugar catalog features ICUMSA 45 white refined sugar, plantation white sugar, and specialty grades — each selected for strict compliance with international quality standards for color, polarization, moisture content, and ash content. Every product in our sugar supply chain undergoes rigorous quality verification and testing to meet ISO 22000 food safety certification and international trade specifications. Whether you are sourcing refined sugar for food and beverage manufacturing, bulk sugar for confectionery production, or packaged sugar for retail distribution, Faradid Atlas delivers wholesale sugar with full traceability, transparent documentation, and consistent product performance.\n\nWe offer flexible packaging and logistics solutions for wholesale sugar, including bulk shipments in jumbo bags, 50 kg polypropylene bags, and customized retail packaging under our recognized brands — 21, Mizban, Golbanoo, and Hayat. Our regional warehousing network across Tehran, Isfahan, Dubai, and Oman provides efficient storage and rapid distribution for B2B sugar orders, ensuring your supply chain remains uninterrupted. For beverage manufacturers seeking wholesale refined sugar, confectionery producers needing bulk sweeteners, or distributors building a comprehensive sugar portfolio, Faradid Atlas provides the sourcing expertise, quality assurance, and supply chain reliability essential for long-term commercial partnerships.`,
      fa: `فرادید اطلس به‌عنوان تأمین‌کننده معتبر شکر عمده و توزیع‌کننده شیرین‌کننده‌ها، محصولات شکر تصفیه‌شده با کیفیت بالا را برای کاربردهای صنعتی، تجاری و خرده‌فروشی به خریداران B2B در ایران، امارات و عمان ارائه می‌دهد. پرتفوی شکر عمده ما شامل شکر سفید تصفیه‌شده، شکر تخصصی و شیرین‌کننده‌های عمده از تولیدکنندگان معتبر جهانی است و کیفیت یکنواخت، قیمت رقابتی و تأمین قابل اعتماد برای تولیدکنندگان غذا، نوشیدنی‌ها، کسب‌وکارهای شیرینی‌پزی، نانوایی‌ها و کانال‌های توزیع عمده فراهم می‌کند. به‌عنوان تأمین‌کننده باتجربه شکر، ما اهمیت حیاتی خلوص، یکنواختی دانه و برنامه‌های تحویل قابل اعتماد در بازار شیرین‌کننده‌های B2B را درک می‌کنیم.\n\nکاتالوگ شکر عمده ما شامل شکر سفید تصفیه‌شده ICUMSA 45، شکر سفید مزارع و درجه‌های تخصصی است؛ هر یک بر اساس رعایت دقیق استانداردهای کیفی بین‌المللی از نظر رنگ، قطبش، محتوای رطوبت و خاکستر انتخاب می‌شوند. هر محصول در زنجیره تأمین شکر ما کیفیت‌سنجی دقیق و آزمایش برای رعایت گواهینامه ایمنی غذایی ISO 22000 و مشخصات تجارت بین‌المللی را پشت سر می‌گذارد. چه شکر تصفیه‌شده برای تولید غذا و نوشیدنی تأمین می‌کنید، چه شکر عمده برای تولید شیرینی‌پزی یا شکر بسته‌بندی‌شده برای توزیع خرده‌فروشی نیاز دارید، فرادید اطلس شکر عمده با ردیابی کامل، مستندات شفاف و عملکرد محصول یکنواخت ارائه می‌دهد.\n\nما راهکارهای بسته‌بندی و لجستیک انعطاف‌پذیر برای شکر عمده ارائه می‌دهیم شامل حمل‌ونقل عمده در کیسه‌های جامبو، کیسه‌های پلی‌پروپیلن ۵۰ کیلوگرمی و بسته‌بندی خرده‌فروشی سفارشی تحت برندهای شناخته‌شده ما — ۲۱، میزبان، گلبانو و حیات. شبکه انبارداری منطقه‌ای ما در تهران، اصفهان، دبی و عمان ذخیره‌سازی کارآمد و توزیع سریع سفارشات B2B شکر را فراهم می‌کند و زنجیره تأمین شما را بدون وقفه نگه می‌دارد. برای تولیدکنندگان نوشیدنی که شکر تصفیه‌شده عمده نیاز دارند، تولیدکنندگان شیرینی‌پزی که شیرین‌کننده‌های عمده می‌خواهند یا توزیع‌کنندگانی که پرتفوی جامع شکر می‌سازند، فرادید اطلس تخصص تأمین، تضمین کیفیت و قابلیت اطمینان زنجیره تأمین ضروری برای مشارکت‌های تجاری بلندمدت را فراهم می‌کند.`,
      ar: `يُعدّ فراديد أطلس مورّدًا موثوقًا للسكر بالجملة وموزّعًا للمحليات، حيث يوفّر لمشتريات B2B في إيران والإمارات وعمان منتجات سكر مكرر عالية الجودة للاستخدامات الصناعية والتجارية والتجزئة. تتضمن مجموعة السكر بالجملة لدينا سكرًا أبيض مكررًا وسكرًا متخصصًا ومحليات بالجملة مصدرها مصنعين عالميين موثوقين، مما يوفّر جودة متسقة وأسعارًا تنافسية وتوريدًا موثوقًا لمصنعي الأغذية ومنتجي المشروبات وأعمال الحلويات والمخابز وقنوات التوزيع بالجملة. بصفتنا مورّدًا خبيرًا في السكر، ندرك الأهمية الحاسمة للنقاء وتناسق الحبوب ومواعيد التسليم الموثوقة في سوق المحليات B2B.\n\nيتضمن كتالوج السكر بالجملة لدينا سكرًا أبيض مكررًا ICUMSA 45 وسكرًا أبيض مزرعيًا وأصنافًا متخصصة — كلها مختارة وفق معايير صارمة للامتثال لمعايير الجودة الدولية من حيث اللون والقطبية ومحتوى الرطوبة والرماد. يخضع كل منتج في سلسلة توريد السكر لدينا للتحقق الصارم من الجودة والاختبار للوفاء بشهادة السلامة الغذائية ISO 22000 ومواصفات التجارة الدولية. سواء كنت تورّد سكرًا مكررًا لإنتاج الأغذية والمشروبات أو سكرًا بالجملة للحلويات أو سكرًا معبأًا للتوزيع بالتجزئة، يوفّر فراديد أطلس سكرًا بالجملة مع التتبع الكامل والتوثيق الشفاف وأداء المنتج المتسق.\n\nنقدّم حلول تعبئة ولوجستيات مرنة للسكر بالجملة تشمل شحنات بالجملة في أكياس جامبو وأكياس بولي بروبلين ٥٠ كجم وتغليف تجزئة مخصص تحت العلامات التجارية المعروفة لدينا — ٢١ وميزبان وگلبانو وحياة. تضمن شبكة التخزين الإقليمية لدينا في طهران وأصفهان ودبي وعمان تخزينًا فعالًا وتوزيعًا سريعًا لطلبات السكر B2B، مما يحافظ على عدم انقطاع سلسلة التوريد الخاصة بك. لمصنعي المشروبات الذين يبحثون عن سكر مكرر بالجملة أو مصنعي الحلويات الذين يحتاجون محليات بالجملة أو الموزعين الذين يبنون مجموعة سكر شاملة، يوفّر فراديد أطلس خبرة التوريد وضمان الجودة وموثوقية سلسلة التوريد الضرورية للشراكات التجارية طويلة الأمد.`,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface CategoryLandingProps {
  category: ProductCategory;
  lang: Language;
  categoryData?: any;
}

function getLocalized(value: any, lang: Language): string {
  if (!value) return ""
  if (typeof value === "string") return value
  if (typeof value === "object" && value[lang]) return value[lang]
  if (typeof value === "object" && value.en) return value.en
  return ""
}

export function CategoryLanding({ category, lang, categoryData }: CategoryLandingProps) {
  const t = translations[lang];
  const isRTL = lang === "fa" || lang === "ar";
  const catLabel = categoryLabels[category][lang];
  const fallbackSeo = categorySEOContent[category];

  const seoTitle = getLocalized(categoryData?.seo?.title, lang) || fallbackSeo.title[lang];
  const seoSubtitle = getLocalized(categoryData?.seo?.subtitle, lang) || fallbackSeo.subtitle[lang];
  const seoContent = getLocalized(categoryData?.seo?.content, lang) || fallbackSeo.content[lang];
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <>
      {/* Hero */}
      <section className="w-full h-48 sm:h-56 md:h-64 relative overflow-hidden bg-linear-to-br from-secondary/40 to-secondary/60">
        <Image
          src="/optimized/products-hero.webp"
          alt={catLabel}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 to-black/10" />
        <div className="absolute inset-0 px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex items-center">
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 sm:gap-8">
              <div className="flex-1">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-hero"
                  style={{
                    fontFamily:
                      lang === "fa"
                        ? "Estedad, var(--font-hero)"
                        : "var(--font-hero)",
                  }}
                >
                  {catLabel}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg">
                  {seoSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="container-wide px-4 sm:px-6 pt-6 sm:pt-8"
      >
        <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-xs sm:text-sm text-foreground/70 shadow-sm backdrop-blur">
          <Link
            href={`/${lang}`}
            className="line-accent transition-colors hover:text-primary"
          >
            {t.breadcrumbs.home}
          </Link>
          <span
            className="h-1.5 w-1.5 rounded-full bg-foreground/30"
            aria-hidden="true"
          />
          <Link
            href={`/${lang}/products`}
            className="line-accent transition-colors hover:text-primary"
          >
            {t.breadcrumbs.products}
          </Link>
          <span
            className="h-1.5 w-1.5 rounded-full bg-foreground/30"
            aria-hidden="true"
          />
          <span className="text-foreground font-medium line-clamp-1">
            {catLabel}
          </span>
        </div>
      </nav>

      {/* Product Grid */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-primary mb-2 font-hero"
            style={{
              fontFamily:
                lang === "fa"
                  ? "Estedad, var(--font-hero)"
                  : "var(--font-hero)",
            }}
          >
            {seoTitle}
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 mb-8">
            {categoryProducts.length}{" "}
            {lang === "en" ? "products" : lang === "fa" ? "محصول" : "منتج"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Rich SEO Content */}
      <section className="py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-primary mb-6 font-hero"
            style={{
              fontFamily:
                lang === "fa"
                  ? "Estedad, var(--font-hero)"
                  : "var(--font-hero)",
            }}
          >
            {catLabel}
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
            {seoContent.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Internal Links */}
          <div className="mt-12 pt-8 border-t border-foreground/10">
            <h3
              className="text-xl font-semibold text-primary mb-4 font-hero"
              style={{
                fontFamily:
                  lang === "fa"
                    ? "Estedad, var(--font-hero)"
                    : "var(--font-hero)",
              }}
            >
              {lang === "en"
                ? `Browse Our ${catLabel} Products`
                : lang === "fa"
                  ? `مشاهده محصولات ${catLabel}`
                  : `تصفح منتجات ${catLabel}`}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categoryProducts.map((product) => {
                const productName =
                  lang === "en"
                    ? product.nameEn
                    : lang === "fa"
                      ? product.nameFa
                      : product.nameAr;
                return (
                  <li key={product.id}>
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent-warm-gold transition-colors py-1"
                    >
                      <svg
                        className={`w-3.5 h-3.5 shrink-0 ${isRTL ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {productName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-hero"
            style={{
              fontFamily:
                lang === "fa"
                  ? "Estedad, var(--font-hero)"
                  : "var(--font-hero)",
            }}
          >
            {lang === "en"
              ? `Need Wholesale ${catLabel}?`
              : lang === "fa"
                ? `نیاز به ${catLabel} عمده دارید؟`
                : `هل تحتاج ${catLabel} بالجملة؟`}
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 mb-6 max-w-2xl mx-auto">
            {lang === "en"
              ? `Contact our B2B team to discuss your ${catLabel.toLowerCase()} sourcing needs, volume requirements, and delivery timelines.`
              : lang === "fa"
                ? `با تیم B2B ما تماس بگیرید تا نیازهای تأمین ${catLabel}، حجم موردنیاز و زمان‌بندی تحویل را بررسی کنید.`
                : `اتصل بفريقنا B2B لمناقشة احتياجات توريد ${catLabel} والكميات المطلوبة والجدول الزمني للتسليم.`}
          </p>
          <Link
            href={`/${lang}/contact?product=${category}#contact-form`}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
          >
            {t.pages.products.startInquiry}
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${absoluteUrl(localizedPath(lang, `products/${category}`))}#webpage`,
              url: absoluteUrl(localizedPath(lang, `products/${category}`)),
              name:
                lang === "en"
                  ? `Faradid Atlas ${catLabel}`
                  : `فرادید اطلس ${catLabel}`,
              description: seoContent.slice(0, 160),
              inLanguage: lang,
              mainEntity: {
                "@id": `${absoluteUrl(localizedPath(lang, `products/${category}`))}#products`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${absoluteUrl(localizedPath(lang, `products/${category}`))}#products`,
              name:
                lang === "en" ? `${catLabel} Products` : lang === "fa" ? `محصولات ${catLabel}` : `منتجات ${catLabel}`,
              description: seoContent.slice(0, 160),
              inLanguage: lang,
              itemListElement: categoryProducts.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(
                  localizedPath(lang, `products/${product.slug}`),
                ),
                name:
                  lang === "en"
                    ? product.nameEn
                    : lang === "fa"
                      ? product.nameFa
                      : product.nameAr,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.breadcrumbs.home,
                  item: absoluteUrl(localizedPath(lang)),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.breadcrumbs.products,
                  item: absoluteUrl(localizedPath(lang, "products")),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: catLabel,
                  item: absoluteUrl(
                    localizedPath(lang, `products/${category}`),
                  ),
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
