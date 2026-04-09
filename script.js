const sound = {
  hover: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
  click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
  tick:  new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'),
  
  init() {
    this.hover.volume = 0.1;
    this.click.volume = 0.2;
    this.tick.volume = 0.1;
  },
  playHover() { this.hover.currentTime = 0; this.hover.play().catch(()=>{}); },
  playClick() { this.click.currentTime = 0; this.click.play().catch(()=>{}); },
  playTick()  { this.tick.currentTime = 0; this.tick.play().catch(()=>{}); }
};
sound.init();

const i18n = {
  ar: {
    welcome: "أهلاً بك، أنا رؤف",
    intro: "أرحب بك لكي تبدأ في جعل فكرتك موقعاً حقيقياً",
    startBtn: "ابدأ الآن",
    techIntro: "هذه اللغات والتقنيات التي أصنع بها كل المواقع",
    next: "التالي",
    back: "رجوع",
    chooseCat: "اختر نوع مشروعك",
    catDesc: "حدد الفئة الأقرب لما تريد بناءه",
    qualityTitle: "الجودة هي معيارنا",
    qualityDesc: "نحن لا نستخدم قوالب جاهزة. كل سطر كود يكتب خصيصاً لمشروعك.",
    agree: "أوافق ✓",
    later: "لاحقاً",
    ideaPlaceholder: "💡 هل لديك فكرة خاصة أو تعديلات؟",
    selected: "المختارات",
    sendWA: "إرسال عبر واتساب 🚀",
    emptyCart: "المختارات فارغة حالياً.",
    landing: "صفحة هبوط",
    interactive: "موقع تفاعلي",
    dash: "لوحة تحكم",
    news: "بوابة أخبار",
    price: "السعر",
    total: "الإجمالي"
  },
  en: {
    welcome: "Welcome, I'm Raouf",
    intro: "I welcome you to start turning your idea into a real website",
    startBtn: "Get Started",
    techIntro: "These are the languages and techs I use to build websites",
    next: "Next",
    back: "Back",
    chooseCat: "Choose Project Type",
    catDesc: "Select the category that fits your needs",
    qualityTitle: "Quality is Our Standard",
    qualityDesc: "We don't use ready-made templates. Every line of code is custom-written.",
    agree: "I Agree ✓",
    later: "Later",
    ideaPlaceholder: "💡 Have a specific idea or edits?",
    selected: "Selected",
    sendWA: "Send to WhatsApp 🚀",
    emptyCart: "Selection is currently empty.",
    landing: "Landing Page",
    interactive: "Interactive Site",
    dash: "Dashboard",
    news: "News Portal",
    price: "Price",
    total: "Total"
  }
};

// ── STATE MANAGEMENT ──
let currentLang = localStorage.getItem('raouf_lang') || 'ar';
let currentTheme = localStorage.getItem('raouf_theme') || 'dark';
let currentStep = 0;
let selectedCat = '';
let cart = [];

function initAppState() {
  // Apply Theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('theme-icon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  
  // Apply Language
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  
  updateUI();
}

function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('raouf_lang', currentLang);
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  updateUI();
  if (selectedCat) renderGallery();
  sound.playClick();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('raouf_theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('theme-icon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  sound.playClick();
}

function updateUI() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (el.tagName === 'TEXTAREA') el.placeholder = t[key];
    else el.textContent = t[key];
  });
  document.getElementById('lang-btn').textContent = currentLang === 'ar' ? 'EN' : 'AR';
}

// ── NAVIGATION ──
function goToStep(n) {
  currentStep = n;
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  const target = document.getElementById(`s${n}`);
  if (target) target.style.display = 'flex';
  
  // Toggle Back Button
  const backBtn = document.getElementById('global-back');
  backBtn.style.display = n > 0 ? 'flex' : 'none';
  
  window.scrollTo(0,0);
}

function handleGlobalBack() {
  if (currentStep === 1) goToStep(0);
  else if (currentStep === 2) goToStep(1);
  else if (currentStep === 3) goToStep(2);
  sound.playClick();
}

function startExperience() {
  sound.playClick();
  goToStep(1);
  animateBadges();
}

function animateBadges() {
  const badges = document.querySelectorAll('.tbadge');
  badges.forEach((b, i) => {
    b.style.opacity = '0';
    b.style.animation = 'none';
    setTimeout(() => {
      b.style.animation = 'fadeIn 0.5s forwards, scalePop 0.5s forwards';
      sound.playTick();
    }, i * 150 + 500);
  });
}

// ── PROJECTS & ADD-ONS DATA ──
const addonsData = {
  'Landing Page': [
    { id: 'lp_dash', name: 'Admin Dashboard', ar: 'لوحة تحكم إدارية', price: 30 },
    { id: 'lp_seo',  name: 'Advanced SEO', ar: 'تهيئة محركات بحث متقدمة', price: 15 },
    { id: 'lp_lang', name: 'Multi-language', ar: 'دعم لغات متعددة', price: 20 }
  ],
  'Interactive Site': [
    { id: 'is_3d',   name: '3D Elements', ar: 'عناصر ثلاثية الأبعاد', price: 40 },
    { id: 'is_auth', name: 'User Accounts', ar: 'نظام حسابات مستخدمين', price: 35 },
    { id: 'is_pay',  name: 'Payment Gateway', ar: 'بوابة دفع إلكتروني', price: 50 }
  ],
  'Dashboard': [
    { id: 'db_real', name: 'Real-time Sync', ar: 'مزامنة بيانات لحظية', price: 45 },
    { id: 'db_pdf',  name: 'PDF Reporting', ar: 'نظام تقارير PDF', price: 25 },
    { id: 'db_role', name: 'Role Management', ar: 'إدارة صلاحيات الموظفين', price: 30 }
  ],
  'News Portal': [
    { id: 'np_app',  name: 'Mobile App Link', ar: 'ربط بتطبيق موبايل', price: 60 },
    { id: 'np_ads',  name: 'Ad Management', ar: 'نظام إدارة إعلانات', price: 20 },
    { id: 'np_sub',  name: 'Subscription System', ar: 'نظام اشتراكات مدفوعة', price: 40 }
  ]
};

function selectCat(cat) {
  selectedCat = cat;
  document.getElementById('disclaimer').style.display = 'flex';
  sound.playClick();
}

function handleYes() {
  document.getElementById('disclaimer').style.display = 'none';
  cart = []; // Reset cart for new category
  renderGallery();
  goToStep(3);
  sound.playClick();
}

function renderGallery() {
  const grid = document.getElementById('projects-grid');
  const addons = addonsData[selectedCat] || [];
  
  grid.innerHTML = addons.map(item => {
    const isSelected = cart.find(c => c.id === item.id);
    return `
      <div class="projcard ${isSelected ? 'selected' : ''}" onclick="toggleCart('${item.id}')">
        <div style="padding:15px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:900; font-size:15px;">${currentLang === 'ar' ? item.ar : item.name}</div>
            <div style="font-size:12px; color:var(--text-dim); mt-1">+$${item.price}</div>
          </div>
          <div style="font-size:20px;">${isSelected ? '✅' : '➕'}</div>
        </div>
      </div>
    `;
  }).join('');
  
  updateCartBadge();
}

function toggleCart(id) {
  const item = addonsData[selectedCat].find(x => x.id === id);
  const idx = cart.findIndex(c => c.id === id);
  if (idx > -1) cart.splice(idx, 1);
  else cart.push(item);
  renderGallery();
  sound.playClick();
}

function updateCartBadge() {
  document.getElementById('cart-count').textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-price').textContent = total;
}

function sendWA() {
  const idea = document.getElementById('idea-input').value;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  let msg = `*طلب مشروع جديد - متجر رؤف*\n`;
  msg += `--------------------------\n`;
  msg += `📂 القسم: ${selectedCat}\n`;
  
  if (cart.length > 0) {
    msg += `✨ الإضافات المختارة:\n`;
    cart.forEach(c => {
      msg += `  • ${c.ar} ($${c.price})\n`;
    });
    msg += `\n💰 إجمالي الإضافات: $${total}\n`;
  }
  
  if (idea.trim()) {
    msg += `\n💡 وصف الفكرة:\n${idea}\n`;
  }
  
  msg += `--------------------------\n`;
  msg += `أرغب في مناقشة تفاصيل التنفيذ والسعر النهائي للموقع.`;
  
  window.open(`https://wa.me/201273319681?text=${encodeURIComponent(msg)}`);
}

// Global Exports
window.toggleLang = toggleLang;
window.toggleTheme = toggleTheme;
window.startExperience = startExperience;
window.goToStep = goToStep;
window.handleGlobalBack = handleGlobalBack;
window.selectCat = selectCat;
window.handleYes = handleYes;
window.sendWA = sendWA;
window.toggleCart = toggleCart;

// Run Init
initAppState();
