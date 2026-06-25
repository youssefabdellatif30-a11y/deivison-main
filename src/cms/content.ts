// ────────────────────────────────────────────────────────────────
//  DiVision Eyewear — Homemade CMS
//  Edit all site text here. Supports English, French and Arabic.
// ────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'fr' | 'ar';

export const LANGUAGES: { code: Lang; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
];

// ─── Type: exact shape every language must satisfy ──────────────
export interface SiteContent {
  meta: {
    tagline: string;       // top bar one-liner
    phone: string;
    email: string;
  };
  navbar: {
    home: string;
    collections: string;
    about: string;
    contact: string;
    b2bButton: string;
    dropdownOptical: string;
    dropdownSunglasses: string;
    dropdownItems: {
      optical: string[];
      sunglasses: string[];
    };
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    sub: string;
    cta1: string;
    cta2: string;
    stats: { num: string; label: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body1: string;
    body2: string;
    pillars: { title: string; desc: string }[];
    statLabels: string[];   // Production Started, Wholesale Focus, Made in Tunisia
  };
  collections: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    viewAll: string;
    showing: string;        // use {n} placeholder e.g. "Showing {n} styles"
    filters: string[];      // All, Optical, Sunglasses, Women's, Men's
    priceLockText: string;
    priceLockCta: string;
    b2bBadge: string;
    products: {
      name: string;
      category: string;
      badge: string | null;
    }[];
  };
  b2bcta: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    sub: string;
    features: string[];
    cta: string;
  };
  footer: {
    desc: string;
    newsletter: string;
    newsletterPlaceholder: string;
    cols: {
      collections: { title: string; links: string[] };
      company:     { title: string; links: string[] };
      support:     { title: string; links: string[] };
    };
    copyright: string;
    legal: string[];
  };
  modal: {
    smallLabel: string;
    title: string;
    tabLogin: string;
    tabRegister: string;
    demoLabel: string;
    demoHint: string;
    emailLabel: string;
    emailPlaceholder: string;
    passLabel: string;
    passPh: string;
    loginBtn: string;
    errorMsg: string;
    noAccount: string;
    requestAccess: string;
    companySection: string;
    firstName: string;
    lastName: string;
    companyName: string;
    bizEmail: string;
    country: string;
    phone: string;
    termsNote: string;
    submitBtn: string;
    successTitle: string;
    successBody: string;
  };
  b2bBar: {
    text: string;
    boldPart: string;
    logout: string;
  };
}

// ─── ENGLISH ────────────────────────────────────────────────────
const en: SiteContent = {
  meta: {
    tagline: 'Wholesale Eyewear Manufacturer · Tunisia',
    phone: '+216 12 345 678',
    email: 'division.eyewear@gmail.com',
  },
  navbar: {
    home: 'Home',
    collections: 'Collections',
    about: 'About',
    contact: 'Contact',
    b2bButton: 'B2B Portal',
    dropdownOptical: 'Optical',
    dropdownSunglasses: 'Sunglasses',
    dropdownItems: {
      optical: ["Men's Frames", "Women's Frames", 'Unisex Frames', 'Rimless'],
      sunglasses: ['Aviator', 'Wayfarer', 'Sport', 'Luxury'],
    },
  },
  hero: {
    eyebrow: 'Crafted in Tunisia · Producing since 2022',
    titleLine1: 'Where craft',
    titleLine2: 'meets ',
    titleAccent: 'vision',
    sub: 'Wholesale eyewear designed and produced in Tunisia for opticians, optical stores, and professional buyers.',
    cta1: 'Explore Collections',
    cta2: 'B2B Access',
    stats: [
      { num: '2022', label: 'Production started' },
      { num: 'B2B',  label: 'Wholesale supply' },
      { num: 'TN',   label: 'Made in Tunisia' },
    ],
  },
  about: {
    eyebrow: 'Our Story',
    title: 'Tunisian precision, ',
    titleAccent: 'global vision',
    body1: 'Producing since 2022, DiVision Eyewear focuses on practical, well-finished optical frames and sunglasses for professional opticians and wholesale buyers.',
    body2: 'We work with optical professionals, offering clear wholesale pricing, seasonal catalogues, and direct support for repeat orders.',
    pillars: [
      { title: 'Handcrafted Quality', desc: 'Acetate & titanium frames built to last.' },
      { title: 'B2B Exclusive',       desc: 'Tailored service for optical retailers.' },
      { title: 'Direct Supply',       desc: 'Simple ordering and reliable follow-up.' },
    ],
    statLabels: ['Production Started', 'Wholesale Focus', 'Made in Tunisia'],
  },
  collections: {
    eyebrow: 'Our Range',
    title: 'Featured ',
    titleAccent: 'collections',
    viewAll: 'View All',
    showing: 'Showing {n} styles',
    filters: ['All', 'Optical', 'Sunglasses', "Women's", "Men's"],
    priceLockText: 'to see wholesale price',
    priceLockCta: 'Sign in',
    b2bBadge: 'B2B Price',
    products: [
      { name: 'Méditerranée', category: "Women's Optical Frame", badge: 'New' },
      { name: 'Carthage',     category: "Men's Optical Frame",   badge: null },
      { name: 'Havana',       category: 'Unisex Sunglasses',     badge: 'New 2025' },
      { name: 'Crystal',      category: 'Unisex Sunglasses',     badge: null },
    ],
  },
  b2bcta: {
    eyebrow: 'B2B Portal',
    title: 'Access exclusive ',
    titleAccent: 'wholesale pricing',
    sub: 'Join our network of trusted optical retailers. Access full wholesale prices, seasonal catalogues, and priority ordering — all through your dedicated B2B account.',
    features: ['Wholesale Prices', 'Season Catalogue', 'Priority Orders', 'Dedicated Support'],
    cta: 'Access B2B Portal',
  },
  footer: {
    desc: 'Eyewear producer based in Tunis, Tunisia. Supplying opticians and wholesale buyers since 2022.',
    newsletter: 'Trade newsletter',
    newsletterPlaceholder: 'your@email.com',
    cols: {
      collections: {
        title: 'Collections',
        links: ['Optical Frames', 'Sunglasses'],
      },
      company: {
        title: 'Company',
        links: ['About Us'],
      },
      support: {
        title: 'Support',
        links: ['B2B Portal', 'Returns', 'Contact Us'],
      },
    },
    copyright: '© 2025 DiVision Eyewear. All rights reserved.',
    legal: ['Privacy Policy', 'Terms', 'Cookie Settings'],
  },
  modal: {
    smallLabel: 'DiVision Eyewear',
    title: 'B2B Portal',
    tabLogin: 'Sign In',
    tabRegister: 'Register',
    demoLabel: 'Access note',
    demoHint: 'B2B portal access is approved by DiVision.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@company.com',
    passLabel: 'Password',
    passPh: '••••••••',
    loginBtn: 'Access Portal',
    errorMsg: 'Portal login is not available here. Please request access from DiVision.',
    noAccount: 'No account?',
    requestAccess: 'Request access',
    companySection: 'Company Information',
    firstName: 'First name',
    lastName: 'Last name',
    companyName: 'Company / store name',
    bizEmail: 'Business email',
    country: 'Country',
    phone: 'Phone',
    termsNote: 'By submitting, you agree to our terms of wholesale service. Applications are reviewed within 48 hours.',
    submitBtn: 'Submit Application',
    successTitle: 'Application received!',
    successBody: 'Our team will review your request and contact you within 48 hours.',
  },
  b2bBar: {
    text: 'B2B Portal Active — You are viewing ',
    boldPart: 'wholesale prices.',
    logout: 'Log out',
  },
};

// ─── FRENCH ─────────────────────────────────────────────────────
const fr: SiteContent = {
  meta: {
    tagline: 'Fabricant de lunettes en gros · Tunisie',
    phone: '+216 12 345 678',
    email: 'division.eyewear@gmail.com',
  },
  navbar: {
    home: 'Accueil',
    collections: 'Collections',
    about: 'À propos',
    contact: 'Contact',
    b2bButton: 'Portail B2B',
    dropdownOptical: 'Optique',
    dropdownSunglasses: 'Solaires',
    dropdownItems: {
      optical: ['Montures hommes', 'Montures femmes', 'Montures mixtes', 'Sans monture'],
      sunglasses: ['Aviateur', 'Wayfarer', 'Sport', 'Luxe'],
    },
  },
  hero: {
    eyebrow: 'Fabriqué en Tunisie · Production depuis 2022',
    titleLine1: "Là où l'artisanat",
    titleLine2: 'rencontre la ',
    titleAccent: 'vision',
    sub: "Lunettes de gros conçues et produites en Tunisie pour les opticiens, magasins d'optique et acheteurs professionnels.",
    cta1: 'Explorer les collections',
    cta2: 'Accès B2B',
    stats: [
      { num: '2022', label: 'Début production' },
      { num: 'B2B',  label: 'Approvisionnement pro' },
      { num: 'TN',   label: 'Fabriqué en Tunisie' },
    ],
  },
  about: {
    eyebrow: 'Notre histoire',
    title: 'Précision tunisienne, ',
    titleAccent: 'vision mondiale',
    body1: "En production depuis 2022, DiVision Eyewear se concentre sur des montures optiques et solaires bien finies pour les opticiens et acheteurs de gros.",
    body2: "Nous travaillons avec des professionnels de l'optique, avec des tarifs de gros clairs, des catalogues saisonniers et un suivi direct pour les commandes répétées.",
    pillars: [
      { title: 'Qualité artisanale', desc: 'Montures en acétate et titane pour durer.' },
      { title: 'Exclusivité B2B',    desc: 'Service personnalisé pour les opticiens.' },
      { title: 'Approvisionnement direct', desc: 'Commande simple et suivi fiable.' },
    ],
    statLabels: ['Début production', 'Focus grossiste', 'Fabriqué en Tunisie'],
  },
  collections: {
    eyebrow: 'Notre gamme',
    title: 'Collections ',
    titleAccent: 'phares',
    viewAll: 'Voir tout',
    showing: '{n} styles affichés',
    filters: ['Tout', 'Optique', 'Solaires', 'Femmes', 'Hommes'],
    priceLockText: 'pour voir le prix de gros',
    priceLockCta: 'Se connecter',
    b2bBadge: 'Prix B2B',
    products: [
      { name: 'Méditerranée', category: 'Monture optique femme',   badge: 'Nouveau' },
      { name: 'Carthage',     category: 'Monture optique homme',   badge: null },
      { name: 'Havana',       category: 'Lunettes solaires mixtes', badge: 'Nouveau 2025' },
      { name: 'Crystal',      category: 'Lunettes solaires mixtes', badge: null },
    ],
  },
  b2bcta: {
    eyebrow: 'Portail B2B',
    title: 'Accédez aux tarifs ',
    titleAccent: 'exclusifs de gros',
    sub: "Rejoignez notre réseau d'opticiens de confiance. Accédez aux tarifs de gros complets, aux catalogues saisonniers et aux commandes prioritaires — via votre espace B2B dédié.",
    features: ['Prix de gros', 'Catalogue saisonnier', 'Commandes prioritaires', 'Support dédié'],
    cta: 'Accéder au portail B2B',
  },
  footer: {
    desc: "Producteur de lunettes basé à Tunis, Tunisie. Fournisseur d'opticiens et acheteurs de gros depuis 2022.",
    newsletter: 'Newsletter professionnelle',
    newsletterPlaceholder: 'votre@email.com',
    cols: {
      collections: {
        title: 'Collections',
        links: ['Montures optiques', 'Lunettes solaires'],
      },
      company: {
        title: 'Entreprise',
        links: ['À propos'],
      },
      support: {
        title: 'Assistance',
        links: ['Portail B2B', 'Retours', 'Contactez-nous'],
      },
    },
    copyright: '© 2025 DiVision Eyewear. Tous droits réservés.',
    legal: ['Politique de confidentialité', 'Conditions', 'Paramètres cookies'],
  },
  modal: {
    smallLabel: 'DiVision Eyewear',
    title: 'Portail B2B',
    tabLogin: 'Se connecter',
    tabRegister: "S'inscrire",
    demoLabel: "Note d'accès",
    demoHint: "L'accès au portail B2B est approuvé par DiVision.",
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'vous@entreprise.com',
    passLabel: 'Mot de passe',
    passPh: '••••••••',
    loginBtn: 'Accéder au portail',
    errorMsg: "La connexion au portail n'est pas disponible ici. Veuillez demander l'accès à DiVision.",
    noAccount: 'Pas de compte ?',
    requestAccess: "Demander l'accès",
    companySection: "Informations sur l'entreprise",
    firstName: 'Prénom',
    lastName: 'Nom',
    companyName: "Nom de l'entreprise / magasin",
    bizEmail: 'E-mail professionnel',
    country: 'Pays',
    phone: 'Téléphone',
    termsNote: "En soumettant, vous acceptez nos conditions de service de gros. Les candidatures sont examinées sous 48 heures.",
    submitBtn: 'Soumettre la candidature',
    successTitle: 'Candidature reçue !',
    successBody: 'Notre équipe examinera votre demande et vous contactera dans les 48 heures.',
  },
  b2bBar: {
    text: 'Portail B2B actif — Vous consultez les ',
    boldPart: 'prix de gros.',
    logout: 'Se déconnecter',
  },
};

// ─── ARABIC ─────────────────────────────────────────────────────
const ar: SiteContent = {
  meta: {
    tagline: 'مصنّع نظارات بالجملة · تونس',
    phone: '+216 12 345 678',
    email: 'division.eyewear@gmail.com',
  },
  navbar: {
    home: 'الرئيسية',
    collections: 'المجموعات',
    about: 'عنّا',
    contact: 'اتصل بنا',
    b2bButton: 'بوابة B2B',
    dropdownOptical: 'بصري',
    dropdownSunglasses: 'شمسية',
    dropdownItems: {
      optical: ['إطارات رجالية', 'إطارات نسائية', 'إطارات مشتركة', 'بدون إطار'],
      sunglasses: ['أفياتور', 'ويفيرر', 'رياضي', 'فاخر'],
    },
  },
  hero: {
    eyebrow: 'صُنع في تونس · تأسّس 2019',
    titleLine1: 'حيث الحرفية',
    titleLine2: 'تلتقي بـ',
    titleAccent: 'الرؤية',
    sub: 'نظارات فاخرة مصمّمة ومصنّعة في تونس. موثوق بها من قِبَل تجار البصريات في أوروبا والشرق الأوسط وأفريقيا.',
    cta1: 'استكشف المجموعات',
    cta2: 'الوصول B2B',
    stats: [
      { num: '+200', label: 'نمط إطار' },
      { num: '+12',  label: 'سوق تصدير' },
      { num: '+5K',  label: 'شريك تجزئة' },
    ],
  },
  about: {
    eyebrow: 'قصّتنا',
    title: 'دقة تونسية، ',
    titleAccent: 'رؤية عالمية',
    body1: 'تأسّست عام 2019، تجمع DiVision Eyewear بين الحرفية الموروثة والتصميم العصري. كل إطار مصمّم في ورشتنا بتونس العاصمة ومُصدَّر إلى تجار البصريات في أوروبا والشرق الأوسط وأفريقيا.',
    body2: 'نعمل حصراً مع محترفي البصريات، ونقدّم أسعار جملة تنافسية وكتالوجات موسمية وإدارة حسابات مخصصة — دون أي علاوة للعلامة التجارية.',
    pillars: [
      { title: 'جودة يدوية',    desc: 'إطارات من الأسيتات والتيتانيوم مصمّمة للصمود.' },
      { title: 'حصري B2B',      desc: 'خدمة مخصصة لتجار البصريات.' },
      { title: 'تصدير مباشر',   desc: 'آجال تسليم أسرع وهوامش ربح أفضل.' },
    ],
    statLabels: ['أنماط الإطارات', 'شركاء التجزئة', 'أسواق التصدير'],
  },
  collections: {
    eyebrow: 'مجموعتنا',
    title: 'المجموعات ',
    titleAccent: 'المميزة',
    viewAll: 'عرض الكل',
    showing: 'عرض {n} من الأنماط',
    filters: ['الكل', 'بصري', 'شمسية', 'نسائي', 'رجالي'],
    priceLockText: 'لعرض سعر الجملة',
    priceLockCta: 'سجّل الدخول',
    b2bBadge: 'سعر B2B',
    products: [
      { name: 'ميديتيرانيه', category: 'إطار بصري نسائي',        badge: 'جديد' },
      { name: 'قرطاج',       category: 'إطار بصري رجالي',        badge: null },
      { name: 'هافانا',      category: 'نظارة شمسية مشتركة',     badge: 'جديد 2025' },
      { name: 'كريستال',     category: 'نظارة شمسية مشتركة',     badge: null },
    ],
  },
  b2bcta: {
    eyebrow: 'بوابة B2B',
    title: 'الوصول إلى ',
    titleAccent: 'أسعار الجملة الحصرية',
    sub: 'انضم إلى شبكتنا من تجار البصريات الموثوقين. احصل على أسعار الجملة الكاملة والكتالوجات الموسمية وأولوية الطلبات — عبر حسابك B2B المخصص.',
    features: ['أسعار الجملة', 'الكتالوج الموسمي', 'الطلبات ذات الأولوية', 'دعم متخصص'],
    cta: 'الوصول إلى بوابة B2B',
  },
  footer: {
    desc: 'مصنّع نظارات فاخر مقرّه تونس العاصمة. نزوّد تجار البصريات في أوروبا ومنطقة الشرق الأوسط وشمال أفريقيا وأفريقيا منذ 2019.',
    newsletter: 'النشرة التجارية',
    newsletterPlaceholder: 'بريدك@الإلكتروني.com',
    cols: {
      collections: {
        title: 'المجموعات',
        links: ['الإطارات البصرية', 'النظارات الشمسية', 'مجموعة الأطفال', 'الملحقات'],
      },
      company: {
        title: 'الشركة',
        links: ['عنّا', 'الاستدامة', 'وظائف', 'الصحافة'],
      },
      support: {
        title: 'الدعم',
        links: ['بوابة B2B', 'تتبّع الطلب', 'المرتجعات', 'اتصل بنا'],
      },
    },
    copyright: '© 2025 DiVision Eyewear. جميع الحقوق محفوظة.',
    legal: ['سياسة الخصوصية', 'الشروط والأحكام', 'إعدادات ملفات تعريف الارتباط'],
  },
  modal: {
    smallLabel: 'DiVision Eyewear',
    title: 'بوابة B2B',
    tabLogin: 'تسجيل الدخول',
    tabRegister: 'التسجيل',
    demoLabel: 'ملاحظة الوصول',
    demoHint: 'تتم الموافقة على الوصول إلى بوابة B2B من طرف DiVision.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'أنت@شركتك.com',
    passLabel: 'كلمة المرور',
    passPh: '••••••••',
    loginBtn: 'الوصول إلى البوابة',
    errorMsg: 'تسجيل الدخول إلى البوابة غير متاح هنا. يرجى طلب الوصول من DiVision.',
    noAccount: 'لا حساب لديك؟',
    requestAccess: 'طلب الوصول',
    companySection: 'معلومات الشركة',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    companyName: 'اسم الشركة / المتجر',
    bizEmail: 'البريد الإلكتروني المهني',
    country: 'البلد',
    phone: 'الهاتف',
    termsNote: 'بالإرسال، أنت توافق على شروط خدمة الجملة. يتم مراجعة الطلبات خلال 48 ساعة.',
    submitBtn: 'إرسال الطلب',
    successTitle: 'تم استلام طلبك!',
    successBody: 'سيقوم فريقنا بمراجعة طلبك والتواصل معك خلال 48 ساعة.',
  },
  b2bBar: {
    text: 'بوابة B2B نشطة — أنت تعرض ',
    boldPart: 'أسعار الجملة.',
    logout: 'تسجيل الخروج',
  },
};

// ─── Export ──────────────────────────────────────────────────────
export const content: Record<Lang, SiteContent> = { en, fr, ar };
export default content;
