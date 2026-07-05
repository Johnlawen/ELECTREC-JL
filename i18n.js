// ─── INTERNATIONALIZATION (i18n) ─────────────────────────────────────────────
// Supports: Hebrew (he), Arabic (ar), Russian (ru)

const TRANSLATIONS = {
  he: {
    dir: 'rtl',
    lang: 'he',
    // Header
    searchPlaceholder: 'חיפוש מוצרים...',
    navHome: 'דף הבית',
    navCategories: 'קטגוריות',
    navSales: 'מבצעים',
    navContact: 'צור קשר',
    navAbout: 'אודותינו',
    // Hero
    heroTitle: 'עיצוב. אור. השראה',
    heroSubtitle: 'גופי תאורה מעוצבים שמשדרגים כל חלל',
    heroFeat1Title: 'משלוח מהיר',
    heroFeat1Sub: 'לכל חלקי הארץ',
    heroFeat2Title: 'איכות ללא פשרות',
    heroFeat2Sub: 'חומרים מובחרים',
    heroFeat3Title: 'עיצוב יוקרתי',
    heroFeat3Sub: 'מגוון גופים מעוצבים',
    heroBtnView: 'לצפייה במוצרים',
    heroBtnCatalog: 'קטלוג מלא',
    // Sections
    featuredTitle: 'מוצרים מובחרים',
    categoriesTitle: 'קטגוריות',
    salesTitle: 'מבצעים חמים',
    // Product card
    addToCart: 'הוסף לסל',
    outOfStock: 'אזל המלאי',
    // Cart Drawer
    cartTitle: 'סל הקניות שלך',
    cartEmpty: 'סל הקניות שלך ריק',
    cartTotalItems: 'סה"כ מוצרים:',
    cartTotalPrice: 'סה"כ לתשלום:',
    cartSubmit: 'שליחת הזמנה',
    cartSending: 'שולח הזמנה...',
    // Checkout form
    checkoutTitle: 'פרטי משלוח ויצירת קשר',
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    phone: 'טלפון',
    email: 'אימייל (אופציונלי)',
    location: 'יישוב וכתובת למשלוח',
    firstNamePlaceholder: 'שם פרטי',
    lastNamePlaceholder: 'שם משפחה',
    phonePlaceholder: 'מספר טלפון',
    emailPlaceholder: 'כתובת אימייל',
    locationPlaceholder: 'עיר, רחוב, מספר בית',
    // Order success
    orderSuccess: 'ההזמנה התקבלה בהצלחה!',
    orderSuccessMsg: 'תודה שקנית אצלנו. פרטי ההזמנה נשלחו לצוות הניהול.',
    orderWriteDown: 'רשום את מספר ההזמנה למעקב.',
    continueShopping: 'המשך בקניות',
    // Footer
    footerImport: 'יבוא ושיווק גופי תאורה מעוצבים לבתים, משרדים ופרויקטים',
    footerCats: 'קטגוריות',
    footerInfo: 'מידע',
    footerContact: 'צור קשר',
    footerAbout: 'אודותינו',
    footerProjects: 'פרויקטים',
    footerFAQ: 'שאלות נפוצות',
    footerReturns: 'מדיניות החזרות',
    footerTerms: 'תנאי שימוש',
    footerAddress: 'סאפוריה 700 בנין 69, נצרת 16450',
    footerPhone: 'טלפון',
    footerEmail: 'אימייל',
    footerCopyright: '© 2024 חשמל ג\'יי.אל לאון בע"מ. כל הזכויות שמורות.',
    // Product detail
    homeLabel: 'דף הבית',
    reviewsCount: '(24 ביקורות)',
    taxShipping: 'כולל מע"מ | משלוח חינם לכל הארץ',
    colorVariant: 'צבע גוף תאורה',
    sizeVariant: 'מידה',
    buyNow: 'קנה עכשיו',
    trustShipTitle: 'משלוח מהיר',
    trustShipSub: 'לכל חלקי הארץ',
    trustWarrTitle: 'אחריות מלאה',
    trustWarrSub: 'שקט נפשי',
    trustQualTitle: 'איכות ללא פשרות',
    trustQualSub: 'חומרים מובחרים',
    technicalDetails: 'פרטים טכניים',
    tabDescription: 'תיאור המוצר',
    tabShipping: 'משלוחים והחזרות',
    // Errors
    orderError: 'אירעה שגיאה בשליחת ההזמנה. אנא נסה שנית או צור קשר.',
  },

  ar: {
    dir: 'rtl',
    lang: 'ar',
    // Header
    searchPlaceholder: 'البحث عن المنتجات...',
    navHome: 'الرئيسية',
    navCategories: 'الفئات',
    navSales: 'العروض',
    navContact: 'تواصل معنا',
    navAbout: 'من نحن',
    // Hero
    heroTitle: 'تصميم. ضوء. إلهام',
    heroSubtitle: 'إضاءة مصممة بعناية لترقية كل مكان',
    heroFeat1Title: 'توصيل سريع',
    heroFeat1Sub: 'لجميع أنحاء البلاد',
    heroFeat2Title: 'جودة بلا تنازل',
    heroFeat2Sub: 'مواد ممتازة',
    heroFeat3Title: 'تصميم فاخر',
    heroFeat3Sub: 'مجموعة متنوعة من القطع',
    heroBtnView: 'عرض المنتجات',
    heroBtnCatalog: 'الكتالوج الكامل',
    // Sections
    featuredTitle: 'منتجات مميزة',
    categoriesTitle: 'الفئات',
    salesTitle: 'عروض ساخنة',
    // Product card
    addToCart: 'أضف للسلة',
    outOfStock: 'نفد المخزون',
    // Cart Drawer
    cartTitle: 'سلة تسوقك',
    cartEmpty: 'سلة تسوقك فارغة',
    cartTotalItems: 'إجمالي المنتجات:',
    cartTotalPrice: 'المجموع الكلي:',
    cartSubmit: 'إرسال الطلب',
    cartSending: 'جاري إرسال الطلب...',
    // Checkout form
    checkoutTitle: 'بيانات الشحن والتواصل',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني (اختياري)',
    location: 'المدينة والعنوان للشحن',
    firstNamePlaceholder: 'الاسم الأول',
    lastNamePlaceholder: 'اسم العائلة',
    phonePlaceholder: 'رقم الهاتف',
    emailPlaceholder: 'البريد الإلكتروني',
    locationPlaceholder: 'المدينة، الشارع، رقم البناية',
    // Order success
    orderSuccess: 'تم استلام طلبك بنجاح!',
    orderSuccessMsg: 'شكراً لتسوقك معنا. تم إرسال تفاصيل الطلب لفريق الإدارة.',
    orderWriteDown: 'احتفظ برقم الطلب للمتابعة.',
    continueShopping: 'مواصلة التسوق',
    // Footer
    footerImport: 'استيراد وتسويق إضاءة مصممة للمنازل والمكاتب والمشاريع',
    footerCats: 'الفئات',
    footerInfo: 'معلومات',
    footerContact: 'تواصل معنا',
    footerAbout: 'من نحن',
    footerProjects: 'المشاريع',
    footerFAQ: 'أسئلة شائعة',
    footerReturns: 'سياسة الإرجاع',
    footerTerms: 'شروط الاستخدام',
    footerAddress: 'صفورية 700 بناية 69، الناصرة 16450',
    footerPhone: 'هاتف',
    footerEmail: 'بريد إلكتروني',
    footerCopyright: '© 2024 كهرباء جي إل. جميع الحقوق محفوظة.',
    // Product detail
    homeLabel: 'الرئيسية',
    reviewsCount: '(24 تقييم)',
    taxShipping: 'شامل الضريبة | شحن مجاني لجميع أنحاء البلاد',
    colorVariant: 'لون الجسم',
    sizeVariant: 'المقاس',
    buyNow: 'اشتري الآن',
    trustShipTitle: 'توصيل سريع',
    trustShipSub: 'لجميع أنحاء البلاد',
    trustWarrTitle: 'ضمان كامل',
    trustWarrSub: 'راحة بال',
    trustQualTitle: 'جودة بلا تنازل',
    trustQualSub: 'مواد ممتازة',
    technicalDetails: 'التفاصيل التقنية',
    tabDescription: 'وصف المنتج',
    tabShipping: 'الشحن والإرجاع',
    // Errors
    orderError: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا.',
  },

  ru: {
    dir: 'ltr',
    lang: 'ru',
    // Header
    searchPlaceholder: 'Поиск товаров...',
    navHome: 'Главная',
    navCategories: 'Категории',
    navSales: 'Акции',
    navContact: 'Контакты',
    navAbout: 'О нас',
    // Hero
    heroTitle: 'Дизайн. Свет. Вдохновение',
    heroSubtitle: 'Дизайнерские светильники для любого интерьера',
    heroFeat1Title: 'Быстрая доставка',
    heroFeat1Sub: 'По всей стране',
    heroFeat2Title: 'Качество без компромиссов',
    heroFeat2Sub: 'Превосходные материалы',
    heroFeat3Title: 'Роскошный дизайн',
    heroFeat3Sub: 'Разнообразие моделей',
    heroBtnView: 'Смотреть товары',
    heroBtnCatalog: 'Полный каталог',
    // Sections
    featuredTitle: 'Популярные товары',
    categoriesTitle: 'Категории',
    salesTitle: 'Горячие акции',
    // Product card
    addToCart: 'В корзину',
    outOfStock: 'Нет в наличии',
    // Cart Drawer
    cartTitle: 'Ваша корзина',
    cartEmpty: 'Ваша корзина пуста',
    cartTotalItems: 'Всего товаров:',
    cartTotalPrice: 'Итого к оплате:',
    cartSubmit: 'Отправить заказ',
    cartSending: 'Отправка заказа...',
    // Checkout form
    checkoutTitle: 'Данные доставки и контакты',
    firstName: 'Имя',
    lastName: 'Фамилия',
    phone: 'Номер телефона',
    email: 'Email (необязательно)',
    location: 'Город и адрес доставки',
    firstNamePlaceholder: 'Имя',
    lastNamePlaceholder: 'Фамилия',
    phonePlaceholder: 'Номер телефона',
    emailPlaceholder: 'Адрес электронной почты',
    locationPlaceholder: 'Город, улица, номер дома',
    // Order success
    orderSuccess: 'Заказ успешно получен!',
    orderSuccessMsg: 'Спасибо за покупку. Данные заказа отправлены команде управления.',
    orderWriteDown: 'Запишите номер заказа для отслеживания.',
    continueShopping: 'Продолжить покупки',
    // Footer
    footerImport: 'Импорт и продажа дизайнерских светильников для домов, офисов и проектов',
    footerCats: 'Категории',
    footerInfo: 'Информация',
    footerContact: 'Контакты',
    footerAbout: 'О нас',
    footerProjects: 'Проекты',
    footerFAQ: 'Часто задаваемые вопросы',
    footerReturns: 'Политика возврата',
    footerTerms: 'Условия использования',
    footerAddress: 'Сафурия 700, здание 69, Назарет 16450',
    footerPhone: 'Телефон',
    footerEmail: 'Email',
    footerCopyright: '© 2024 Электрика JL Leon. Все права защищены.',
    // Product detail
    homeLabel: 'Главная',
    reviewsCount: '(24 отзыва)',
    taxShipping: 'Включая НДС | Бесплатная доставка по всей стране',
    colorVariant: 'Цвет корпуса',
    sizeVariant: 'Размер',
    buyNow: 'Купить сейчас',
    trustShipTitle: 'Быстрая доставка',
    trustShipSub: 'По всей стране',
    trustWarrTitle: 'Полная гарантия',
    trustWarrSub: 'Спокойствие',
    trustQualTitle: 'Качество без компромиссов',
    trustQualSub: 'Превосходные материалы',
    technicalDetails: 'Технические характеристики',
    tabDescription: 'Описание товара',
    tabShipping: 'Доставка и возврат',
    // Errors
    orderError: 'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте снова или свяжитесь с нами.',
  }
};

// ─── LANGUAGE ENGINE ─────────────────────────────────────────────────────────

const I18N_KEY = 'jl_lang';
const SUPPORTED_LANGS = ['he', 'ar', 'ru'];
const LANG_LABELS = { he: 'עברית', ar: 'العربية', ru: 'Русский' };
const LANG_FLAGS  = { he: '🇮🇱', ar: '🇸🇦', ru: '🇷🇺' };

function getCurrentLang() {
  return localStorage.getItem(I18N_KEY) || 'he';
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  localStorage.setItem(I18N_KEY, lang);
  applyLang(lang);
}

function t(key) {
  const lang = getCurrentLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['he'][key]) || key;
}

function applyLang(lang) {
  const def = TRANSLATIONS[lang] || TRANSLATIONS['he'];
  
  // Apply direction and lang to html element
  document.documentElement.setAttribute('dir', def.dir);
  document.documentElement.setAttribute('lang', def.lang);

  // Update all data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (def[key] !== undefined) {
      el.textContent = def[key];
    }
  });

  // Update all data-i18n-placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (def[key] !== undefined) {
      el.placeholder = def[key];
    }
  });

  // Highlight the active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ─── INJECT LANGUAGE SWITCHER INTO HEADER ────────────────────────────────────

function injectLangSwitcher() {
  // Build the dropdown HTML
  const currentLang = getCurrentLang();
  const html = `
    <div class="lang-switcher" id="lang-switcher">
      <button class="lang-switcher-toggle" id="lang-switcher-toggle" aria-label="שינוי שפה">
        <span class="lang-flag">${LANG_FLAGS[currentLang]}</span>
        <span class="lang-label">${LANG_LABELS[currentLang]}</span>
        <i class="ph ph-caret-down lang-caret"></i>
      </button>
      <div class="lang-dropdown" id="lang-dropdown">
        ${SUPPORTED_LANGS.map(l => `
          <button class="lang-btn ${l === currentLang ? 'active' : ''}" data-lang="${l}" onclick="selectLang('${l}')">
            <span>${LANG_FLAGS[l]}</span>
            <span>${LANG_LABELS[l]}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Find the header-actions div and prepend the switcher
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    headerActions.insertAdjacentHTML('afterbegin', html);
  }

  // Toggle dropdown
  const toggle = document.getElementById('lang-switcher-toggle');
  const dropdown = document.getElementById('lang-dropdown');
  if (toggle && dropdown) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      toggle.querySelector('.lang-caret').style.transform = dropdown.classList.contains('open') ? 'rotate(180deg)' : '';
    });
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      const caret = toggle.querySelector('.lang-caret');
      if (caret) caret.style.transform = '';
    });
  }
}

function selectLang(lang) {
  setLang(lang);
  // Update toggle button label+flag
  const toggle = document.getElementById('lang-switcher-toggle');
  if (toggle) {
    toggle.querySelector('.lang-flag').textContent = LANG_FLAGS[lang];
    toggle.querySelector('.lang-label').textContent = LANG_LABELS[lang];
  }
  // Close dropdown
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) dropdown.classList.remove('open');
  // Re-render dynamic content (product cards, cart drawer, etc.)
  window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang } }));
}

// ─── INIT ON LOAD ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectLangSwitcher();
  applyLang(getCurrentLang());
});
