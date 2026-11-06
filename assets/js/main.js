/**
 * Movewise - Home-to-Home Moving & Verified Interior Design
 * CS491 Senior Design Project, Bilkent University
 * Interactive Logic & Bilingual Translation Engine
 */

// Furniture Database for Simulator
const FURNITURE_DATA = {
  sofa: {
    name_tr: "3 Kişilik L Koltuk",
    name_en: "3-Seater Sectional Sofa",
    length: 225,
    width: 95,
    height: 85,
    weightKg: 78,
    crewNeeded: 2,
    tiltPossible: true,
    minStraightPass: 95,
    minTiltedPass: 80,
    disassemblyPart: "Ayaklar / Kolçaklar",
    disassemblyPart_en: "Legs / Armrests"
  },
  bed: {
    name_tr: "Çift Kişilik Baza & Yatak",
    name_en: "King Size Bed & Base",
    length: 200,
    width: 160,
    height: 55,
    weightKg: 65,
    crewNeeded: 2,
    tiltPossible: true,
    minStraightPass: 160,
    minTiltedPass: 85,
    disassemblyPart: "Baza Başlığı",
    disassemblyPart_en: "Headboard"
  },
  wardrobe: {
    name_tr: "Masif Gardırop",
    name_en: "Solid Wardrobe",
    length: 120,
    width: 65,
    height: 215,
    weightKg: 95,
    crewNeeded: 3,
    tiltPossible: false,
    minStraightPass: 75,
    minTiltedPass: 70,
    disassemblyPart: "Kapaklar & Raflar",
    disassemblyPart_en: "Doors & Shelves"
  },
  table: {
    name_tr: "6 Kişilik Yemek Masası",
    name_en: "6-Person Dining Table",
    length: 180,
    width: 90,
    height: 76,
    weightKg: 52,
    crewNeeded: 2,
    tiltPossible: true,
    minStraightPass: 90,
    minTiltedPass: 78,
    disassemblyPart: "Masa Ayakları",
    disassemblyPart_en: "Table Legs"
  }
};

// Bilingual dictionary
const TRANSLATIONS = {
  tr: {
    // Nav
    nav_about: "Hakkında",
    nav_how: "Nasıl Çalışır?",
    nav_features: "Özellikler",
    nav_simulator: "Geçiş Simülatörü",
    nav_target: "Kullanıcılar",
    nav_team: "Ekip & CS491",
    nav_docs: "Dokümanlar",
    btn_proposal: "Proje Teklifi (PDF)",
    
    // Hero
    hero_badge: "Bilkent Üniversitesi • CS491 Kıdemli Tasarım Projesi",
    hero_title: "Evden Eve Taşınma & Doğrulanmış İç Mekân Tasarımı",
    hero_subtitle: "Her bir eşya için eski kapıdan yeni odaya adım adım doğrulanmış bir yolculuk. LiDAR oda taraması, fizik tabanlı geçiş analizi ve akıllı kamyon yükleme planlaması tek çatı altında.",
    hero_btn_explore: "Sistemi Keşfet",
    hero_btn_pdf: "Öneri Raporunu İncele (PDF)",
    tag_lidar: "iPhone LiDAR 3D Oda & Eşya Taraması",
    tag_motion: "Piyano Taşıyıcı Algoritması ile Darboğaz Analizi",
    tag_layout: "Doğrulanmış Yerleşim & Kamyon Yükleme",

    // Metrics
    metric_1_val: "Uçtan Uca",
    metric_1_lbl: "Eski evden yeni eve tek plan",
    metric_2_val: "LiDAR Destekli",
    metric_2_lbl: "Milimetrik 3D mekân haritalama",
    metric_3_val: "Fizik Doğrulamalı",
    metric_3_lbl: "Sığma, dönüş ve kapı açılım kontrolü",
    metric_4_val: "Akıllı Lojistik",
    metric_4_lbl: "Ters sıralı kamyon yükleme planı",

    // Problem vs Solution
    ps_badge: "Problem & Çözüm",
    ps_title: "Taşınma Bir Tahmin Oyunu, Yerleşim İse Kör Bir Denemedir",
    ps_desc: "Bugüne kadar oda tarama, nakliyat teklifleri ve iç mekân tasarımı birbirinden kopuk araçlarla yapılıyordu. Movewise bu süreci baştan sona birleştiriyor.",
    prob_title: "Geleneksel Taşınmanın Çıkmazı",
    prob_1: "Eski evde harika duran kanepe, yeni evin dar merdiveninde veya kapısında takılıp kalır.",
    prob_2: "Nakliyatçılar her iki evi de görmeden ezbere fiyat ve kamyon boyutu belirler.",
    prob_3: "Yeni mobilya alırken geçiş koridorları, prizler ve gerçek ölçüler göz ardı edilir.",
    prob_4: "Kamyona rastgele yüklenen eşyalar yeni evde karmaşaya ve hasara yol açar.",
    sol_title: "Movewise'ın Bütünleşik Çözümü",
    sol_1: "Her eşyanın eski odasından kamyona, oradan yeni odadaki yerine kadar adım adım geçiş simülasyonu.",
    sol_2: "iPhone LiDAR ile hızlı 3D tarama ve belirsizlik toleranslı hareket planlaması (motion planning).",
    sol_3: "Ters sıralı kamyon yükleme (LIFO): Yeni eve ilk inecek eşya en son yüklenir.",
    sol_4: "Katalog ürünleri ve mevcut mobilyalar için mimari kural doğrulamalı iç mekân tasarımı.",

    // Pipeline
    pipe_badge: "İşleyiş Mimarisi",
    pipe_title: "4 Aşamada Kusursuz Taşınma ve Tasarım",
    pipe_desc: "Mobil LiDAR tarama uygulamasından bulut tabanlı 3D planlama paneline uzanan kesintisiz iş akışı.",
    step1_title: "1. 3D LiDAR Tarama",
    step1_desc: "iPhone LiDAR ile odalar, kapılar, koridorlar ve merdivenler taranır. Erişilemeyen alanlar manuel kat planı veya ölçü olarak girilir.",
    step1_tag: "Oda & Eşya Envanteri",
    step2_title: "2. Darboğaz & Fizik Analizi",
    step2_desc: "Klasik 'Piyano Taşıyıcı Problemi' algoritmalarıyla kapı eşikleri, merdiven boşlukları, döndürme ve eğme açıları milimetrik hesaplanır.",
    step2_tag: "Geçiş Simülasyonu",
    step3_title: "3. Akıllı Kamyon Yükleme",
    step3_desc: "Eşyaların yerleştirilme sırasına göre kamyon hacmi modellenir; ters sırada yükleme planı, tahmini personel ve süre çıkarılır.",
    step3_tag: "Lojistik Optimizasyonu",
    step4_title: "4. Doğrulanmış İç Mekân",
    step4_desc: "Yeni evin her odası için sirkülasyon alanı, priz ve tesisat kısıtlarına uyumlu, gerçek ölçülü yerleşim alternatifleri üretilir.",
    step4_tag: "Mimari Kurallara Uygun",

    // Simulator
    sim_badge: "İnteraktif Demo",
    sim_title: "Darboğaz & Sığma Simülatörü",
    sim_desc: "Aşağıdan bir mobilya seçin ve kapı/koridor genişliğini değiştirerek Movewise'ın geçiş fizibilitesini gerçek zamanlı test edin.",
    sim_furn_label: "Mobilya Seçimi",
    sim_door_label: "Kapı / Koridor Net Genişliği",
    sim_status_pass: "Sorunsuz Geçiş (Düz Geçer)",
    sim_status_warn: "Açılı / Eğerek Geçiş Mümkün",
    sim_status_fail: "Darboğaz! Demonte Edilmeli veya Geçmez",
    sim_stat_clearance: "Net Boşluk Payı",
    sim_stat_crew: "Gerekli Ekip",
    sim_stat_weight: "Eşya Ağırlığı",

    // Comparison
    comp_badge: "Farkımız",
    comp_title: "Mevcut Çözümlerle Karşılaştırma",
    comp_desc: "Movewise, piyasadaki tek boyutlu araçların aksine tüm taşıma zincirini birleştiren ilk platformdur.",
    th_solution: "Çözüm",
    th_strength: "Güçlü Yönü",
    th_limitation: "Kısıtı / Eksik Yönü",
    th_movewise: "Movewise Yaklaşımı",

    // Target Audience
    target_badge: "Değer Önerisi",
    target_title: "Kimin İçin Tasarlandı?",
    target_desc: "Movewise hem bireysel kullanıcıların hem de profesyonel sektörün kritik operasyonel maliyetlerini sıfırlar.",
    t1_title: "Nakliyat Firmaları",
    t1_prob: "Körlemesine verilen hatalı teklifler",
    t1_val: "Her iki evin yapısına göre ekip sayısı, kamyon tipi, demontaj ihtiyacı ve yükleme sırasını önceden veren keşif raporu.",
    t2_title: "Ev Taşıyan Bireyler",
    t2_prob: "Eşyaların yeni eve sığmama endişesi",
    t2_val: "Eski evden yeni eve mobilyaların akıbetini gösteren garantili ve stres önleyici dijital taşınma rehberi.",
    t3_title: "Evini Döşeyenler",
    t3_prob: "Ölçüleri göz ardı eden yerleşimler",
    t3_val: "Mevcut eşyalar ile katalog ürünlerini gerçek priz, kapı açılımı ve sirkülasyon kurallarıyla birleştiren rehber.",
    t4_title: "Mobilya Satıcıları",
    t4_prob: "Kapıdan dönen yüksek maliyetli teslimatlar",
    t4_val: "Müşterinin sepetindeki mobilyaların binaya ve kapılara sığacağını satın alma anında doğrulayan entegrasyon.",

    // Team
    team_badge: "Proje Ekibi",
    team_title: "Bilkent CS491 Geliştirici Ekibi",
    team_desc: "Bilkent Üniversitesi Bilgisayar Mühendisliği Bölümü Öğrencileri tarafından geliştirilen bitirme projesi.",
    academic_title: "Bilkent Üniversitesi Bilgisayar Mühendisliği",
    academic_desc: "CS491 & CS492 Kıdemli Tasarım Projesi (Senior Design Project) • 2026-2027",
    btn_download_pdf: "Öneri Raporunu İndir",

    // Documents
    docs_badge: "Proje Takvimi",
    docs_title: "Proje Dokümanları & Raporlar",
    docs_desc: "CS491/492 süresince hazırlanan ve güncellenen tüm resmi akademik teslimler.",
    doc1_status: "Tamamlandı & Erişilebilir",
    doc1_title: "Proje Önerisi (Short Proposal)",
    doc1_desc: "Problem tanımı, kısıtlar, sistem mimarisi, literatür karşılaştırması ve değerlendirme planını içeren ilk teklif metni.",
    doc1_btn: "PDF Görüntüle / İndir",
    doc2_status: "Hazırlık Aşamasında",
    doc2_title: "Gereksinim & Analiz Raporu",
    doc2_desc: "Kullanıcı senaryoları, sistem kısıtları, fonksiyonel gereksinimler ve veri modeli analizleri.",
    doc2_btn: "Çok Yakında",
    doc3_status: "Planlandı",
    doc3_title: "Detaylı Mimari & Tasarım",
    doc3_desc: "3D modelleme motoru, hareket planlayıcı algoritmaları ve mobil/web entegrasyon şeması.",
    doc3_btn: "Çok Yakında",

    // Footer
    footer_rights: "Tüm hakları saklıdır.",
    footer_quick_links: "Hızlı Bağlantılar",
    footer_academic: "Akademik Bağlantılar"
  },
  en: {
    // Nav
    nav_about: "About",
    nav_how: "How It Works",
    nav_features: "Features",
    nav_simulator: "Fit Simulator",
    nav_target: "Users",
    nav_team: "Team & CS491",
    nav_docs: "Documents",
    btn_proposal: "Project Proposal (PDF)",

    // Hero
    hero_badge: "Bilkent University • CS491 Senior Design Project",
    hero_title: "Home-to-Home Moving & Verified Interior Design",
    hero_subtitle: "A step-by-step verified journey for every item from old door to new room. LiDAR scanning, physics-backed passage feasibility, and smart truck loading order in one unified platform.",
    hero_btn_explore: "Explore System",
    hero_btn_pdf: "Read Proposal (PDF)",
    tag_lidar: "iPhone LiDAR 3D Room & Inventory Scan",
    tag_motion: "Piano Mover's Bottleneck Analysis",
    tag_layout: "Verified Layout & Truck Loading Order",

    // Metrics
    metric_1_val: "End-to-End",
    metric_1_lbl: "One plan from old home to new home",
    metric_2_val: "LiDAR Powered",
    metric_2_lbl: "Accurate 3D spatial scanning",
    metric_3_val: "Physics Verified",
    metric_3_lbl: "Clearance, tilt & door swing checks",
    metric_4_val: "Smart Logistics",
    metric_4_lbl: "Reverse truck unloading sequence",

    // Problem vs Solution
    ps_badge: "Problem & Solution",
    ps_title: "Moving is Guesswork, Furnishing is a Blind Experiment",
    ps_desc: "Until now, room scanning, moving estimates, and interior design lived in isolated tools. Movewise connects the entire journey under one roof.",
    prob_title: "The Moving Dilemma",
    prob_1: "A sofa fitting the old home gets stuck in the new entrance or narrow staircase.",
    prob_2: "Moving companies quote without seeing both homes, causing surprise delays.",
    prob_3: "Furniture is bought without accounting for walkways, door swings, and sockets.",
    prob_4: "Unplanned truck loading creates chaos and damage during destination unloading.",
    sol_title: "The Movewise Solution",
    sol_1: "Step-by-step motion feasibility from source room, through stairs, into the truck, and onto destination placement.",
    sol_2: "Fast iPhone LiDAR scanning with uncertainty estimation and geometric motion planning.",
    sol_3: "Reverse unloading order (LIFO): items needed first are packed last.",
    sol_4: "Guided interior layout honoring clearances, fixed utilities, and catalog dimensions.",

    // Pipeline
    pipe_badge: "System Architecture",
    pipe_title: "Seamless 4-Stage Move & Design Pipeline",
    pipe_desc: "From the mobile LiDAR scanning app to the cloud-powered 3D web planning panel.",
    step1_title: "1. 3D LiDAR Scanning",
    step1_desc: "Rooms, doors, corridors, and stairs are captured using iPhone LiDAR. Inaccessible zones are added manually via floorplan input.",
    step1_tag: "Room & Item Inventory",
    step2_title: "2. Bottleneck & Motion Feasibility",
    step2_desc: "Solving the classic 'Piano Mover's Problem' to calculate clearance, tilting, rotation angles, and narrow bottleneck navigation.",
    step2_tag: "Motion Simulation",
    step3_title: "3. Smart Truck Loading",
    step3_desc: "Cargo volume is organized in reverse unloading sequence, computing crew size, estimated hours, and disassembly needs.",
    step3_tag: "Logistics Optimization",
    step4_title: "4. Verified Interior Design",
    step4_desc: "Rooms in destination home are arranged according to interior guidelines: clearances, conversation zones, and plumbing constraints.",
    step4_tag: "Guideline Compliant",

    // Simulator
    sim_badge: "Interactive Demo",
    sim_title: "Passage & Fit Simulator",
    sim_desc: "Select a furniture item and adjust doorway/corridor width to test Movewise's feasibility algorithms in real time.",
    sim_furn_label: "Select Furniture Item",
    sim_door_label: "Clear Doorway / Hallway Width",
    sim_status_pass: "Feasible Pass (Straight Passage)",
    sim_status_warn: "Feasible with Tilting / Rotation",
    sim_status_fail: "Bottleneck Detected! Disassembly Required",
    sim_stat_clearance: "Safety Clearance",
    sim_stat_crew: "Crew Required",
    sim_stat_weight: "Item Weight",

    // Comparison
    comp_badge: "Innovation",
    comp_title: "Comparison with Existing Solutions",
    comp_desc: "Movewise is the first platform that brings scanning, interior design, and home-to-home move planning under one roof.",
    th_solution: "Solution",
    th_strength: "Strength",
    th_limitation: "Limitation",
    th_movewise: "Movewise Advantage",

    // Target Audience
    target_badge: "Value Proposition",
    target_title: "Built For Every Stakeholder",
    target_desc: "Movewise eliminates friction and costly surprises for both consumers and logistics professionals.",
    t1_title: "Moving Companies",
    t1_prob: "Quotes given without seeing both homes",
    t1_val: "Pre-move survey with crew size, truck space, disassembly requirements, and optimized loading order.",
    t2_title: "Home Movers",
    t2_prob: "Anxiety over whether items will fit",
    t2_val: "One transparent plan proving what fits and how to move each piece without surprises.",
    t3_title: "Home Furnishers",
    t3_prob: "Layouts ignoring real spatial dimensions",
    t3_val: "Guided design taking into account clearances, door swings, and wall sockets.",
    t4_title: "Furniture Retailers",
    t4_prob: "Expensive failed deliveries and returns",
    t4_val: "Pre-purchase path validation confirming the item can physically enter the customer's apartment.",

    // Team
    team_badge: "Project Team",
    team_title: "Bilkent CS491 Development Team",
    team_desc: "Senior Design Project developed by Computer Engineering students at Bilkent University.",
    academic_title: "Bilkent University Computer Engineering",
    academic_desc: "CS491 & CS492 Senior Design Project • Academic Year 2026-2027",
    btn_download_pdf: "Download Proposal PDF",

    // Documents
    docs_badge: "Project Milestones",
    docs_title: "Project Deliverables & Reports",
    docs_desc: "All official academic deliverables produced during CS491/492.",
    doc1_status: "Completed & Available",
    doc1_title: "Short Project Proposal",
    doc1_desc: "Problem definition, constraints, system overview, related work comparison, and evaluation methodology.",
    doc1_btn: "View / Download PDF",
    doc2_status: "In Progress",
    doc2_title: "Requirements & Analysis Report",
    doc2_desc: "User stories, system constraints, functional requirements, and preliminary data specifications.",
    doc2_btn: "Coming Soon",
    doc3_status: "Scheduled",
    doc3_title: "Detailed Design & Architecture",
    doc3_desc: "3D spatial engine, motion planning algorithm specifications, and cloud API contracts.",
    doc3_btn: "Coming Soon",

    // Footer
    footer_rights: "All rights reserved.",
    footer_quick_links: "Quick Links",
    footer_academic: "Academic Links"
  }
};

// English-only for now. The Turkish dictionary above is kept dormant so it can be re-enabled later.
let currentLang = 'en';
let selectedFurnitureKey = 'sofa';
let currentDoorWidth = 85;

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initSimulator();
  initScrollEffects();
  initMobileMenu();
});

// Setup Language
function initLanguage() {
  updateLanguageUI();

  const trBtn = document.getElementById('lang-tr-btn');
  const enBtn = document.getElementById('lang-en-btn');

  if (trBtn && enBtn) {
    trBtn.addEventListener('click', () => setLanguage('tr'));
    enBtn.addEventListener('click', () => setLanguage('en'));
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('movewise_lang', lang);
  updateLanguageUI();
  updateSimulatorResults();
  // re-split and replay the hero headline in the new language
  if (window.MovewiseMotion) window.MovewiseMotion.refreshText();
}

function updateLanguageUI() {
  // keeps CSS uppercase correct (Turkish dotted İ only for Turkish text)
  document.documentElement.lang = currentLang;
  const trBtn = document.getElementById('lang-tr-btn');
  const enBtn = document.getElementById('lang-en-btn');

  if (trBtn && enBtn) {
    trBtn.classList.toggle('active', currentLang === 'tr');
    enBtn.classList.toggle('active', currentLang === 'en');
  }

  // Update text nodes with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });

  // Update furniture button labels in simulator
  Object.keys(FURNITURE_DATA).forEach(key => {
    const btn = document.querySelector(`.furn-btn[data-key="${key}"] .furn-name`);
    if (btn) {
      btn.textContent = currentLang === 'tr' ? FURNITURE_DATA[key].name_tr : FURNITURE_DATA[key].name_en;
    }
  });
}

// Simulator Setup
function initSimulator() {
  const furnButtons = document.querySelectorAll('.furn-btn');
  const doorSlider = document.getElementById('door-width-slider');
  const doorValDisplay = document.getElementById('door-width-val');

  furnButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      furnButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFurnitureKey = btn.getAttribute('data-key');
      updateSimulatorResults();
    });
  });

  if (doorSlider) {
    doorSlider.addEventListener('input', (e) => {
      currentDoorWidth = parseInt(e.target.value, 10);
      if (doorValDisplay) {
        doorValDisplay.textContent = `${currentDoorWidth} cm`;
      }
      updateSimulatorResults();
    });
  }

  updateSimulatorResults();
}

function updateSimulatorResults() {
  const furn = FURNITURE_DATA[selectedFurnitureKey];
  if (!furn) return;

  const statusBox = document.getElementById('sim-status-box');
  const statusText = document.getElementById('sim-status-text');
  const statusIcon = document.getElementById('sim-status-icon');
  const clearanceVal = document.getElementById('sim-clearance-val');
  const crewVal = document.getElementById('sim-crew-val');
  const weightVal = document.getElementById('sim-weight-val');
  const adviseText = document.getElementById('sim-advise-text');

  if (crewVal) crewVal.textContent = `${furn.crewNeeded} ${currentLang === 'tr' ? 'Kişi' : 'Movers'}`;
  if (weightVal) weightVal.textContent = `${furn.weightKg} kg`;

  let clearance = 0;
  let statusClass = 'status-pass';
  let statusMsg = '';
  let advice = '';

  if (currentDoorWidth >= furn.minStraightPass) {
    // Fits straight
    clearance = currentDoorWidth - furn.minStraightPass;
    statusClass = 'status-pass';
    statusMsg = currentLang === 'tr' ? TRANSLATIONS.tr.sim_status_pass : TRANSLATIONS.en.sim_status_pass;
    statusIcon.textContent = '✓';
    advice = currentLang === 'tr' 
      ? `Genişlik yeterli. Eşya döndürme gerekmeksizin düz hat üzerinde güvenle taşınabilir (+${clearance} cm emniyet payı).` 
      : `Adequate opening. Piece can be moved straight along trajectory without tilting (+${clearance} cm safety margin).`;
  } else if (currentDoorWidth >= furn.minTiltedPass && furn.tiltPossible) {
    // Fits with rotation/tilt
    clearance = currentDoorWidth - furn.minTiltedPass;
    statusClass = 'status-warn';
    statusMsg = currentLang === 'tr' ? TRANSLATIONS.tr.sim_status_warn : TRANSLATIONS.en.sim_status_warn;
    statusIcon.textContent = '↻';
    advice = currentLang === 'tr' 
      ? `Düz geçişte ${furn.minStraightPass - currentDoorWidth} cm dar. Ancak Movewise hareket algoritması 35°-45° eğme/döndürme ile geçişi onaylar.` 
      : `Deficit of ${furn.minStraightPass - currentDoorWidth} cm on straight entry. Movewise motion planner clears path with 35°-45° tilt.`;
  } else {
    // Blocked or Disassembly needed
    clearance = currentDoorWidth - (furn.tiltPossible ? furn.minTiltedPass : furn.minStraightPass);
    statusClass = 'status-fail';
    statusMsg = currentLang === 'tr' ? TRANSLATIONS.tr.sim_status_fail : TRANSLATIONS.en.sim_status_fail;
    statusIcon.textContent = '✕';
    advice = currentLang === 'tr' 
      ? `Darboğaz tespit edildi! Geçiş için [${furn.disassemblyPart}] demonte edilmeli veya pencere/asansör alternatifi değerlendirilmelidir.` 
      : `Bottleneck detected! Disassembly of [${furn.disassemblyPart_en}] required or alternative entrance must be evaluated.`;
  }

  if (statusBox) {
    const nextClass = `sim-status-banner ${statusClass}`;
    if (statusBox.className !== nextClass) {
      statusBox.className = nextClass;
      if (statusBox.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        statusBox.animate(
          [{ transform: 'scale(0.96)', opacity: 0.6 }, { transform: 'scale(1)', opacity: 1 }],
          { duration: 450, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }
    }
  }
  if (statusText) statusText.textContent = statusMsg;
  if (clearanceVal) {
    clearanceVal.textContent = `${clearance >= 0 ? '+' : ''}${clearance} cm`;
    clearanceVal.style.color = clearance >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)';
  }
  if (adviseText) adviseText.textContent = advice;

  // Render SVG representation
  renderSimVisual(furn, currentDoorWidth, clearance >= 0);
}

// Simulator visual: the SVG is built once, then geometry is tweened toward
// its target each frame so slider changes glide instead of jumping.
const simVisual = { built: false, cur: null, target: null, raf: 0, state: '' };

function buildSimSvg(canvasBox) {
  canvasBox.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 400 200" style="overflow: visible;" aria-hidden="true">
      <!-- Walls (extend past the viewBox edges) -->
      <rect id="sim-wall-l" x="-300" y="20" height="30" fill="#0E1A33" stroke="#2B3D5C" stroke-width="2"/>
      <rect id="sim-wall-r" y="20" height="30" fill="#0E1A33" stroke="#2B3D5C" stroke-width="2"/>
      <line id="sim-jamb-l" y1="10" y2="60" stroke="#8197A6" stroke-width="3" stroke-linecap="round"/>
      <line id="sim-jamb-r" y1="10" y2="60" stroke="#8197A6" stroke-width="3" stroke-linecap="round"/>

      <!-- Dimension line -->
      <line id="sim-dim" class="sim-dim-line" y1="35" y2="35" stroke="#B9C8D3" stroke-dasharray="3 3"/>
      <text id="sim-dim-text" x="200" y="31" fill="#B9C8D3" font-size="11" font-family="JetBrains Mono, monospace" text-anchor="middle"></text>

      <!-- Planned path -->
      <path d="M 200 40 L 200 200" stroke="rgba(77, 120, 240, 0.45)" stroke-width="2" stroke-dasharray="4 4" class="sim-dim-line"/>

      <!-- Furniture item -->
      <g transform="translate(200, 115)">
        <g id="sim-move" class="sim-move">
          <g id="sim-rot" class="sim-rot">
            <rect id="sim-furn" rx="6" fill-opacity="0.25" stroke-width="2"/>
            <text id="sim-furn-label" x="0" y="4" fill="#ffffff" font-size="10" font-weight="bold" font-family="Plus Jakarta Sans, sans-serif" text-anchor="middle"></text>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
          </g>
        </g>
      </g>
    </svg>`;
  simVisual.built = true;
}

function applySimGeometry(g) {
  const left = (400 - g.door) / 2;
  const right = (400 + g.door) / 2;
  const set = (id, attrs) => {
    const el = document.getElementById(id);
    if (el) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  };
  set('sim-wall-l', { width: left + 300 });
  set('sim-wall-r', { x: right, width: 400 - right + 300 });
  set('sim-jamb-l', { x1: left, x2: left });
  set('sim-jamb-r', { x1: right, x2: right });
  set('sim-dim', { x1: left + 5, x2: right - 5 });
  set('sim-furn', { x: -g.w / 2, y: -g.l / 2, width: g.w, height: g.l });
}

function tweenSim() {
  const c = simVisual.cur, t = simVisual.target;
  let done = true;
  ['door', 'w', 'l'].forEach((k) => {
    c[k] += (t[k] - c[k]) * 0.2;
    if (Math.abs(t[k] - c[k]) > 0.3) done = false; else c[k] = t[k];
  });
  applySimGeometry(c);
  simVisual.raf = done ? 0 : requestAnimationFrame(tweenSim);
}

function renderSimVisual(furn, doorWidth, isPassable) {
  const canvasBox = document.getElementById('sim-canvas-box');
  if (!canvasBox) return;
  if (!simVisual.built) buildSimSvg(canvasBox);

  // Visual scale
  const scale = 1.3;
  const doorPixelWidth = Math.max(100, Math.min(220, doorWidth * scale));
  const isTilted = isPassable && doorWidth < furn.minStraightPass && doorWidth >= furn.minTiltedPass;
  let furnW = Math.max(60, Math.min(180, (doorWidth >= furn.minStraightPass ? furn.width : (furn.minTiltedPass || furn.width)) * scale * 0.85));
  const furnL = Math.max(80, Math.min(160, furn.height * scale));

  // keep the drawing honest: passing items fit the gap, blocked items visibly collide
  if (isPassable) furnW = Math.min(furnW, doorPixelWidth - 10);
  else furnW = Math.min(240, Math.max(furnW, doorPixelWidth + 18));

  const state = !isPassable ? 'fail' : (isTilted ? 'warn' : 'pass');
  const furnColor = state === 'fail' ? '#FF2400' : state === 'warn' ? '#F2A93B' : '#4D78F0';

  simVisual.target = { door: doorPixelWidth, w: furnW, l: furnL };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!simVisual.cur || reduce) {
    simVisual.cur = { ...simVisual.target };
    applySimGeometry(simVisual.cur);
  } else if (!simVisual.raf) {
    simVisual.raf = requestAnimationFrame(tweenSim);
  }

  const furnRect = document.getElementById('sim-furn');
  furnRect.style.fill = furnColor;
  furnRect.style.stroke = furnColor;
  document.getElementById('sim-rot').style.transform = `rotate(${isTilted ? -22 : 0}deg)`;
  document.getElementById('sim-dim-text').textContent = `${doorWidth} cm`;
  document.getElementById('sim-furn-label').textContent = currentLang === 'tr' ? furn.name_tr : furn.name_en;

  // the item stops with its leading edge against the wall when blocked
  const move = document.getElementById('sim-move');
  move.style.setProperty('--stop', `${50 + furnL / 2 - 115 + 3}px`);
  const animState = state === 'fail' ? 'is-fail' : 'is-pass';
  if (simVisual.state !== animState) {
    move.classList.remove('is-pass', 'is-fail');
    void move.getBoundingClientRect();
    move.classList.add(animState);
    simVisual.state = animState;
  }
}

// Scroll Effects (Navbar shadow & blur)
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Hamburger Menu
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}
