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
    short_tr: "Koltuk",
    short_en: "Sofa",
    length: 225,
    width: 95,
    height: 85,
    weightKg: 78,
    crewNeeded: 2,
    pose_en: ["upright", "on its back"],
    pose_tr: ["dik", "sırt üstü"],
    // taking the legs off lowers it by 12 cm
    remedy: { en: "Taking off the legs", tr: "Ayaklar sökülürse", height: 73 }
  },
  bed: {
    name_tr: "Çift Kişilik Baza & Yatak",
    name_en: "King Size Bed & Base",
    short_tr: "Baza",
    short_en: "Bed base",
    length: 200,
    width: 160,
    height: 62,
    weightKg: 65,
    crewNeeded: 2,
    pose_en: ["flat", "on edge"],
    pose_tr: ["yatay", "kenarı üstünde"],
    remedy: null // no part comes off that changes its size
  },
  piano: {
    name_tr: "Duvar Piyanosu",
    name_en: "Upright Piano",
    short_tr: "Piyano",
    short_en: "Piano",
    length: 150,
    width: 62,
    height: 125,
    weightKg: 230,
    crewNeeded: 3,
    pose_en: ["upright", null],
    pose_tr: ["dik", null],
    remedy: null // a piano always travels upright, and nothing comes off
  },
  table: {
    name_tr: "6 Kişilik Yemek Masası",
    name_en: "6-Person Dining Table",
    short_tr: "Masa",
    short_en: "Table",
    length: 180,
    width: 90,
    height: 76,
    weightKg: 52,
    crewNeeded: 2,
    pose_en: ["upright", "on its side"],
    pose_tr: ["dik", "yan yatık"],
    // with the legs off, only the 8 cm top and frame remain
    remedy: { en: "Taking off the legs", tr: "Ayaklar sökülürse", height: 8 }
  }
};

// Drawn status icons (match the page's line-icon set)
const SIM_ICONS = {
  pass: '<svg class="icon" viewBox="0 0 24 24" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  warn: '<svg class="icon" viewBox="0 0 24 24" focusable="false"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  fail: '<svg class="icon" viewBox="0 0 24 24" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};

// Under this many cm of spare room a pass counts as tight (scan tolerance)
const SIM_TOLERANCE_CM = 3;

// Bilingual dictionary
const TRANSLATIONS = {
  tr: {
    // Nav
    nav_about: "Hakkında",
    nav_how: "Nasıl Çalışır?",
    nav_features: "Karşılaştırma",
    nav_simulator: "Geçiş Simülatörü",
    nav_target: "Kimin İçin?",
    nav_team: "Ekip & CS491",
    nav_docs: "Dokümanlar",
    btn_proposal: "Proje Teklifi (PDF)",
    
    // Hero
    hero_badge: "Bilkent Üniversitesi • CS491 Kıdemli Tasarım Projesi",
    hero_title: "Evden Eve Taşınma & Doğrulanmış İç Mekân Tasarımı",
    hero_subtitle: "Her eşya için eski kapıdan yeni odaya adım adım doğrulanmış bir yolculuk. LiDAR tarama bugün prototip olarak çalışıyor; geçiş kontrolleri ve kamyon yükleme sırası aynı planın sonraki aşamaları.",
    hero_btn_explore: "Nasıl Çalıştığını Gör",
    hero_btn_pdf: "Öneri Raporunu İncele (PDF)",

    // Problem vs Solution
    ps_title: "Taşınma Bir Tahmin Oyunu, Yerleşim İse Kör Bir Denemedir",
    ps_desc: "Bugün oda tarama, nakliyat teklifleri ve iç mekân tasarımı ayrı araçlarla yapılıyor. Movewise bunları tek bir yolculukta birleştiriyor.",
    prob_title: "Geleneksel Taşınmanın Çıkmazı",
    prob_1: "Eski evde harika duran kanepe, yeni evin dar merdiveninde veya kapısında takılıp kalır.",
    prob_2: "Nakliyatçılar her iki evi de görmeden ezbere fiyat ve kamyon boyutu belirler.",
    prob_3: "Yeni mobilya alırken geçiş koridorları, prizler ve gerçek ölçüler göz ardı edilir.",
    prob_4: "Kamyona rastgele yüklenen eşyalar yeni evde karmaşaya ve hasara yol açar.",
    sol_title: "Movewise Yaklaşımı",
    sol_1: "Her eşyayı adım adım kontrol edecek: eski odasından merdivenlere, kamyona ve yeni odadaki yerine kadar.",
    sol_2: "Bugün prototip olarak çalışan iPhone LiDAR taramasının üzerine belirsizlik tahmini ve hareket planlaması ekleyecek.",
    sol_3: "Kamyonu ters boşaltma sırasına (LIFO) göre yükleyecek: yeni evde ilk lazım olan eşya en son biner.",
    sol_4: "İç mekân yerleşimini geçiş payları, sabit tesisat ve katalog ölçülerine göre yönlendirecek.",

    // Pipeline
    pipe_title: "4 Aşamada Taşınma ve Tasarım",
    pipe_desc: "Bugün prototip olarak çalışan mobil LiDAR tarama uygulamasından planlanan 3D web planlama paneline.",
    step1_title: "1. 3D LiDAR Tarama",
    step1_desc: "iPhone LiDAR ile odalar, kapılar, koridorlar ve merdivenler taranır. Erişilemeyen alanlar manuel kat planı veya ölçü olarak girilir.",
    step1_tag: "Çalışan prototip",
    step2_title: "2. Darboğaz & Fizik Analizi",
    step2_desc: "Katı bir cismin dar bir alandan geçirilip geçirilemeyeceğini soran klasik Piyano Taşıyıcı Problemi'ne dayanarak rotadaki her dar geçiş için boşluk, eğme ve döndürme hesaplanacak.",
    step2_tag: "Planlandı",
    step3_title: "3. Akıllı Kamyon Yükleme",
    step3_desc: "Eşyaların yerleştirilme sırasına göre kamyon hacmi modellenir; ters sırada yükleme planı, tahmini personel ve süre çıkarılacak.",
    step3_tag: "Planlandı",
    step4_title: "4. Doğrulanmış İç Mekân",
    step4_desc: "Yeni evin her odası için sirkülasyon alanı, priz ve tesisat kısıtlarına uyumlu, gerçek ölçülü yerleşim alternatifleri üretilecek.",
    step4_tag: "Planlandı",

    // Simulator
    sim_title: "Darboğaz & Sığma Simülatörü",
    sim_desc: "Örnek mobilyalarla iki duraklı bir rota üzerinde sadeleştirilmiş demo: genişliğini sizin belirlediğiniz giriş kapısı, ardından 86 cm sabit bir merdiven sahanlığı (dönüşü ve kapı yüksekliği modellenmiyor). Karar en dar noktaya göre verilir.",
    sim_furn_label: "Mobilya",
    sim_door_label: "Giriş kapısı net genişliği",
    sim_status_pass: "Tüm rotadan geçer",
    sim_status_tight: "Geçer, ama {where} sıkı",
    sim_status_fail: "{where} geçilmiyor",

    // Comparison
    comp_title: "Mevcut Çözümlerle Karşılaştırma",
    comp_desc: "Mevcut araçlar taşınmanın yalnızca bir parçasını çözüyor. Movewise tarama, taşınma planı ve iç mekân yerleşimini tek bir bağlantılı planda birleştiriyor.",
    th_solution: "Çözüm",
    th_strength: "Güçlü Yönü",
    th_limitation: "Kısıtı / Eksik Yönü",
    th_movewise: "Movewise Yaklaşımı",

    // Target Audience
    target_title: "Kimin İçin?",
    target_desc: "Movewise kimin için tasarlanıyor ve her biri ondan ne alacak.",
    t1_title: "Nakliyat Firmaları",
    t1_prob: "Körlemesine verilen hatalı teklifler",
    t1_val: "Ekip sayısını, kamyon alanını, demontaj ihtiyacını ve yükleme sırasını önceden belirleyecek bir keşif.",
    t2_title: "Ev Taşıyan Bireyler",
    t2_prob: "Eşyaların yeni eve sığmama endişesi",
    t2_val: "Neyin sığacağını ve her eşyanın nasıl taşınacağını gösterecek tek bir plan.",
    t3_title: "Evini Döşeyenler",
    t3_prob: "Ölçüleri göz ardı eden yerleşimler",
    t3_val: "Geçiş paylarını, kapı açılımlarını ve prizleri hesaba katacak rehberli yerleşim.",
    t4_title: "Mobilya Satıcıları",
    t4_prob: "Kapıdan dönen yüksek maliyetli teslimatlar",
    t4_val: "Eşyanın müşterinin evine girip giremeyeceğini satın almadan önce test edecek bir yol kontrolü.",

    // Team
    team_title: "Bilkent CS491 Geliştirici Ekibi",
    team_desc: "Bilkent Üniversitesi Bilgisayar Mühendisliği öğrencilerinin CS491 & CS492 bitirme projesi, 2026–2027.",
    academic_title: "Bilkent Üniversitesi Bilgisayar Mühendisliği",
    academic_desc: "CS491 & CS492 Kıdemli Tasarım Projesi (Senior Design Project) • 2026-2027",

    // Documents
    docs_title: "Proje Dokümanları & Raporlar",
    docs_desc: "CS491/492 süresince hazırlanan ve güncellenen tüm resmi akademik teslimler.",
    doc1_status: "Erişilebilir",
    doc1_title: "Proje Önerisi (Short Proposal)",
    doc1_desc: "Problem tanımı, kısıtlar, sistem mimarisi, literatür karşılaştırması ve değerlendirme planını içeren ilk teklif metni.",
    doc1_btn: "PDF'i Aç",
    doc2_status: "Hazırlık Aşamasında",
    doc2_title: "Gereksinim & Analiz Raporu",
    doc2_desc: "Kullanıcı senaryoları, sistem kısıtları, fonksiyonel gereksinimler ve veri modeli analizleri.",
    doc3_status: "Planlandı",
    doc3_title: "Detaylı Mimari & Tasarım",
    doc3_desc: "3D modelleme motoru, hareket planlayıcı algoritmaları ve mobil/web entegrasyon şeması.",

    // Footer
    footer_rights: "Tüm hakları saklıdır.",
    footer_quick_links: "Hızlı Bağlantılar",
    footer_academic: "Akademik Bağlantılar"
  },
  en: {
    // Nav
    nav_about: "About",
    nav_how: "How It Works",
    nav_features: "Comparison",
    nav_simulator: "Fit Simulator",
    nav_target: "Who It's For",
    nav_team: "Team & CS491",
    nav_docs: "Documents",
    btn_proposal: "Proposal (PDF)",

    // Hero
    hero_badge: "Bilkent CS491 Senior Design Project",
    hero_title: "Home-to-Home Moving & Verified Interior Design",
    hero_subtitle: "A step-by-step, verified journey for every item, from the old door to the new room. LiDAR scanning works today as a prototype; passage checks and truck loading order are the next stages of the same plan.",
    hero_btn_explore: "See How It Works",
    hero_btn_pdf: "Read the Proposal (PDF)",

    // Problem vs Solution
    ps_title: "Moving is Guesswork, Furnishing is a Blind Experiment",
    ps_desc: "Today, room scanning, moving estimates and interior design live in separate tools. Movewise connects them into one journey.",
    prob_title: "The Moving Dilemma",
    prob_1: "A sofa that fit the old home gets stuck at the new entrance or on a narrow staircase.",
    prob_2: "Moving companies quote without seeing both homes, so delays and extra costs surface on moving day.",
    prob_3: "Furniture is bought without accounting for walkways, door swings and sockets.",
    prob_4: "Trucks loaded without a plan lead to chaos and damage when unloading at the new home.",
    sol_title: "The Movewise Approach",
    sol_1: "Will check each item step by step: from its current room, down the stairs, into the truck and into its place in the new home.",
    sol_2: "Will build on iPhone LiDAR scanning, which works today as a prototype, adding uncertainty estimation and motion planning.",
    sol_3: "Will load the truck in reverse unloading order (LIFO): items needed first at the new home go in last.",
    sol_4: "Will guide the interior layout around clearances, fixed utilities and catalog dimensions.",

    // Pipeline
    pipe_title: "The 4-Stage Move & Design Pipeline",
    pipe_desc: "From the mobile LiDAR scanning app, working today as a prototype, to a planned 3D web planning panel.",
    step1_title: "1. 3D LiDAR Scanning",
    step1_desc: "Rooms, doors, corridors and stairs are captured with iPhone LiDAR. Areas that can't be scanned are added by hand from a floor plan.",
    step1_tag: "Working prototype",
    step2_title: "2. Bottleneck & Motion Feasibility",
    step2_desc: "Based on the classic Piano Mover's Problem, which asks whether a rigid object can be moved through a tight space: clearance, tilt and rotation will be calculated for every narrow passage along the route.",
    step2_tag: "Planned",
    step3_title: "3. Smart Truck Loading",
    step3_desc: "The load will be ordered for reverse unloading, with crew size, estimated hours and disassembly needs worked out.",
    step3_tag: "Planned",
    step4_title: "4. Verified Interior Design",
    step4_desc: "Rooms in the new home will be arranged by interior guidelines: clearances, conversation zones and plumbing constraints.",
    step4_tag: "Planned",

    // Simulator
    sim_title: "Passage & Fit Simulator",
    sim_desc: "A simplified demo with sample furniture on a two-stop route: the front door, whose width you set, then a stair landing fixed at 86 cm (its turn isn\'t modeled, nor is door height). The verdict comes from the tightest point.",
    sim_furn_label: "Furniture item",
    sim_door_label: "Front door clear width",
    sim_status_pass: "Fits the whole route",
    sim_status_tight: "Fits, but tight at the {where}",
    sim_status_fail: "Doesn't fit at the {where}",

    // Comparison
    comp_title: "Comparison with Existing Solutions",
    comp_desc: "Existing tools each solve one part of a move. Movewise links scanning, move planning and interior layout into one connected plan.",
    th_solution: "Solution",
    th_strength: "Strength",
    th_limitation: "Limitation",
    th_movewise: "How Movewise Differs",

    // Target Audience
    target_title: "Who It's For",
    target_desc: "Who Movewise is being designed for, and what each of them would get from it.",
    t1_title: "Moving Companies",
    t1_prob: "Quotes given without seeing both homes",
    t1_val: "A pre-move survey that would set crew size, truck space, disassembly needs and loading order.",
    t2_title: "Home Movers",
    t2_prob: "Anxiety over whether items will fit",
    t2_val: "One plan that would show what fits and how to move each piece.",
    t3_title: "Home Furnishers",
    t3_prob: "Layouts ignoring real spatial dimensions",
    t3_val: "Guided layouts that would account for clearances, door swings and wall sockets.",
    t4_title: "Furniture Retailers",
    t4_prob: "Expensive failed deliveries and returns",
    t4_val: "A pre-purchase path check that would test whether the item can get into the customer's home.",

    // Team
    team_title: "Bilkent CS491 Development Team",
    team_desc: "CS491 & CS492 Senior Design Project, academic year 2026–2027, by Computer Engineering students at Bilkent University.",
    academic_title: "Bilkent University Computer Engineering",
    academic_desc: "CS491 & CS492 Senior Design Project • Academic Year 2026-2027",

    // Documents
    docs_title: "Project Deliverables & Reports",
    docs_desc: "Official CS491/492 deliverables, published here as each one is completed.",
    doc1_status: "Available",
    doc1_title: "Short Project Proposal",
    doc1_desc: "Problem definition, constraints, system overview, related work comparison and evaluation methodology.",
    doc1_btn: "Open PDF",
    doc2_status: "In Progress",
    doc2_title: "Requirements & Analysis Report",
    doc2_desc: "User stories, system constraints, functional requirements and preliminary data specifications.",
    doc3_status: "Scheduled",
    doc3_title: "Detailed Design & Architecture",
    doc3_desc: "3D spatial engine, motion planning algorithm specifications and cloud API contracts.",

    // Footer
    footer_rights: "All rights reserved.",
    footer_quick_links: "Quick Links",
    footer_academic: "Academic Links"
  }
};

// English-only for now. The Turkish dictionary above is kept dormant so it can be re-enabled later.
let currentLang = 'en';
let selectedFurnitureKey = 'table';
let currentDoorWidth = 80;

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
  try { localStorage.setItem('movewise_lang', lang); } catch (e) { /* storage blocked: language still switches for this visit */ }
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
      furnButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
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
      doorSlider.setAttribute('aria-valuetext', `${currentDoorWidth} cm`);
      updateSimulatorResults();
    });
  }

  updateSimulatorResults();
}

// A two-stop route: the front door (the slider) and a stair landing fixed at
// SIM_LANDING_CM. Items are carried lengthwise; door height is not modeled.
// At each stop the item goes upright (the opening must clear its depth) or,
// if it is lower than it is deep, tipped (the opening must clear its height).
const SIM_LANDING_CM = 86;

function simProfile(furn, dims) {
  const d = dims || furn;
  return { upright: d.width, side: d.height < d.width ? d.height : null };
}

const fmtGap = (cm) => `${cm > 0 ? '+' : ''}${cm} cm`;

// Choose the pose at one opening. Upright is preferred only while it is not
// tight; otherwise the pose with more room wins. Widening an opening can
// therefore never make the verdict worse.
function simPassage(prof, opening) {
  const up = opening - prof.upright;
  const side = prof.side === null ? null : opening - prof.side;
  const pose = (up >= SIM_TOLERANCE_CM || side === null || up >= side) ? 0 : 1;
  return { up, side, pose, gap: pose ? side : up };
}

const simState = (gap) => (gap <= 0 ? 'fail' : gap < SIM_TOLERANCE_CM ? 'tight' : 'pass');

function updateSimulatorResults() {
  const furn = FURNITURE_DATA[selectedFurnitureKey];
  if (!furn) return;

  const tr = currentLang === 'tr';
  const T = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const poses = tr ? furn.pose_tr : furn.pose_en;
  const prof = simProfile(furn);

  const stops = [
    { id: 'door', name: tr ? 'giriş kapısı' : 'front door', opening: currentDoorWidth },
    { id: 'landing', name: tr ? 'merdiven sahanlığı' : 'stair landing', opening: SIM_LANDING_CM },
  ].map((s) => ({ ...s, ...simPassage(prof, s.opening) }));
  // the tightest point decides the route (ties go to the first stop reached)
  const tightest = stops.reduce((a, b) => (b.gap < a.gap ? b : a));
  const state = simState(tightest.gap);

  const where = tightest.name;
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const name = (tr ? furn.short_tr : furn.short_en).toLowerCase();
  let statusClass, statusMsg, icon;
  if (state === 'pass') {
    statusClass = 'status-pass'; statusMsg = T.sim_status_pass; icon = SIM_ICONS.pass;
  } else if (state === 'tight') {
    statusClass = 'status-warn'; statusMsg = T.sim_status_tight.replace('{where}', where); icon = SIM_ICONS.warn;
  } else {
    statusClass = 'status-fail'; statusMsg = T.sim_status_fail.replace('{where}', where); icon = SIM_ICONS.fail;
  }
  // the verdict carries its number, so the live region announces slider changes
  // the stop is already named unless the route passes; then say where the margin is smallest
  statusMsg += state === 'pass'
    ? (tr ? ` (${where}: ${fmtGap(tightest.gap)})` : ` (${fmtGap(tightest.gap)} at the ${where})`)
    : ` (${fmtGap(tightest.gap)})`;

  // one or two sentences of advice; the per-stop numbers live in the route strip
  const poseAt = (s) => poses[s.pose];
  let advice;
  if (state === 'fail') {
    advice = tr
      ? `${cap(where)} ${name} için dar: en iyi ihtimalle ${poseAt(tightest)} ${fmtGap(tightest.gap)}, en az 1 cm boşluk gerekir.`
      : `The ${where} is too narrow for the ${name}: ${poseAt(tightest)} it has ${fmtGap(tightest.gap)}, and it needs at least 1 cm of room.`;
    const r = furn.remedy;
    if (r) {
      const fixed = simPassage(simProfile(furn, {
        width: r.width !== undefined ? r.width : furn.width,
        height: r.height !== undefined ? r.height : furn.height,
      }), tightest.opening);
      advice += fixed.gap > 0
        ? (tr ? ` ${r.tr} ${fmtGap(fixed.gap)} olur.` : ` ${r.en}, it would have ${fmtGap(fixed.gap)} there.`)
        : (tr ? ` ${r.tr} bile yetmez; başka bir giriş gerekir.` : ` ${r.en} is not enough; it needs another way in.`);
    } else {
      advice += tr ? ' Sökülüp boyutunu küçülten bir parçası yok; başka bir giriş gerekir.' : ' No part comes off that makes it smaller; it needs another way in.';
    }
  } else {
    advice = tr
      ? `${cap(poseAt(tightest))} taşınınca en dar nokta olan ${where} ${fmtGap(tightest.gap)} ile geçilir.`
      : `Carried ${poseAt(tightest)}, the ${name} clears the tightest point, the ${where}, with ${fmtGap(tightest.gap)}.`;
    if (state === 'tight') {
      advice += tr ? ` Bu, ${SIM_TOLERANCE_CM} cm'lik ölçüm toleransının içinde; sıkı.` : ` That is inside the ${SIM_TOLERANCE_CM} cm scan tolerance, so it is tight.`;
    }
  }
  // say why a pose with less room was chosen: movers keep the normal pose when it isn't tight
  const preferred = stops.find((s) => s.pose === 0 && s.side !== null && s.side > s.up);
  if (preferred && state !== 'fail') {
    advice += tr
      ? ` ${cap(preferred.name)} ${poses[0]} geçilir; ${poses[1]} daha fazla yer kalırdı (${fmtGap(preferred.side)}) ama gerek yok.`
      : ` At the ${preferred.name} it stays ${poses[0]}, the easier way to carry it, though ${poses[1]} would give ${fmtGap(preferred.side)}.`;
  } else if (tightest.pose === 1 && state !== 'fail') {
    advice += tr
      ? ` ${cap(poses[0])} geçmesi için ${prof.upright} cm'den geniş açıklık gerekirdi.`
      : ` ${cap(poses[0])} it would need more than ${prof.upright} cm.`;
  }

  // route strip: every stop with its pose and clearance, the tightest one marked
  const stateClass = { pass: 'is-pass', tight: 'is-tight', fail: 'is-fail' };
  stops.forEach((s) => {
    const li = document.getElementById(`sim-stop-${s.id}`);
    if (!li) return;
    li.className = `sim-stop ${stateClass[simState(s.gap)]}${s === tightest ? ' is-tightest' : ''}`;
    li.querySelector('.sim-stop-name').textContent = cap(s.name) + (s.id === 'landing' ? (tr ? ' (düz geçiş)' : ' (straight run)') : '');
    li.querySelector('.sim-stop-detail').textContent = `${s.opening} cm · ${poses[s.pose]} ${fmtGap(s.gap)}`;
  });

  const spec = document.getElementById('sim-item-spec');
  if (spec) {
    const dims = `${furn.length} × ${furn.width} × ${furn.height} cm · ${furn.weightKg} kg · ${furn.crewNeeded} ${tr ? 'kişi' : 'movers'}`;
    const sidePart = prof.side !== null ? ` · ${poses[1]} &gt; ${prof.side} cm` : (tr ? ' · hep dik taşınır' : ' · always carried upright');
    spec.innerHTML = `${dims}<br><span>${tr ? 'Gereken açıklık:' : 'Opening needed:'}</span> ${poses[0]} &gt; ${prof.upright} cm${sidePart}`;
  }

  const statusBox = document.getElementById('sim-status-box');
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
  const statusIcon = document.getElementById('sim-status-icon');
  const statusText = document.getElementById('sim-status-text');
  const adviseText = document.getElementById('sim-advise-text');
  if (statusIcon) statusIcon.innerHTML = icon;
  if (statusText) statusText.textContent = statusMsg;
  if (adviseText) adviseText.textContent = advice;
  const slider = document.getElementById('door-width-slider');
  if (slider) slider.setAttribute('aria-valuetext', `${currentDoorWidth} cm`);

  // the drawing shows the tightest point on the route
  renderSimVisual(furn, tightest, prof, poses, state);
}

// Simulator visual: a plan view drawn to one linear scale (SIM_PX_PER_CM), so the
// gap between the jambs and the item's width are directly comparable. The SVG is
// built once; geometry is tweened toward its target so slider changes glide.
const SIM_PX_PER_CM = 1.4;
const SIM_WALL_Y = 40;       // wall band: y 40..70, doorway centre at 55
const SIM_ITEM_ORIGIN_Y = 130;
const simVisual = { built: false, cur: null, target: null, raf: 0, key: '', tipTimer: 0, tipping: false };
const SIM_TIP_AT_MS = 1150; // when the item stops at the wall and is tipped

function buildSimSvg(canvasBox) {
  canvasBox.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 400 200" style="overflow: visible;" aria-hidden="true">
      <defs>
        <!-- section hatch, as walls are drawn on a plan -->
        <pattern id="sim-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#EBE5D7"/>
          <line x1="0" y1="0" x2="0" y2="6" stroke="#B5AC99" stroke-width="1.2"/>
        </pattern>
      </defs>
      <!-- Dimension line above the doorway -->
      <line id="sim-dim" y1="22" y2="22" stroke="#6B665C" stroke-width="1"/>
      <line id="sim-dim-tl" y1="17" y2="27" stroke="#6B665C" stroke-width="1"/>
      <line id="sim-dim-tr" y1="17" y2="27" stroke="#6B665C" stroke-width="1"/>
      <text id="sim-dim-text" x="200" y="15" fill="#4A463F" font-size="11" font-family="IBM Plex Mono, monospace" text-anchor="middle"></text>
      <text id="sim-stop-name" x="4" y="33" fill="#6B665C" font-size="9" letter-spacing="0.04em" font-family="IBM Plex Mono, monospace"></text>

      <!-- Walls (extend past the viewBox edges) -->
      <rect id="sim-wall-l" x="-300" y="${SIM_WALL_Y}" height="30" fill="url(#sim-hatch)" stroke="#1C1B18" stroke-width="1.5"/>
      <rect id="sim-wall-r" y="${SIM_WALL_Y}" height="30" fill="url(#sim-hatch)" stroke="#1C1B18" stroke-width="1.5"/>
      <line id="sim-jamb-l" y1="${SIM_WALL_Y - 10}" y2="${SIM_WALL_Y + 40}" stroke="#1C1B18" stroke-width="3" stroke-linecap="round"/>
      <line id="sim-jamb-r" y1="${SIM_WALL_Y - 10}" y2="${SIM_WALL_Y + 40}" stroke="#1C1B18" stroke-width="3" stroke-linecap="round"/>

      <!-- Planned path -->
      <path d="M 200 ${SIM_WALL_Y + 30} L 200 200" stroke="rgba(217, 83, 30, 0.55)" stroke-width="2" stroke-dasharray="4 4" class="sim-dim-line"/>

      <!-- Furniture item (plan view footprint); clipped just above the wall,
           so an item that passes reads as continuing into the next room -->
      <clipPath id="sim-clip"><rect x="-300" y="${SIM_WALL_Y - 6}" width="1000" height="400"/></clipPath>
      <g clip-path="url(#sim-clip)">
      <g transform="translate(200, ${SIM_ITEM_ORIGIN_Y})">
        <g id="sim-move" class="sim-move">
          <rect id="sim-furn" rx="4" fill-opacity="0.16" stroke-width="2"/>
          <text id="sim-mode-note" x="0" fill="#4A463F" stroke="#FBF9F4" stroke-width="3" paint-order="stroke" font-size="10" font-family="IBM Plex Mono, monospace" text-anchor="middle"></text>
          <text id="sim-furn-label" x="0" fill="#1C1B18" stroke="#FBF9F4" stroke-width="3" paint-order="stroke" font-size="10" font-weight="bold" font-family="IBM Plex Sans, sans-serif" text-anchor="middle"></text>
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
  set('sim-dim', { x1: left, x2: right });
  set('sim-dim-tl', { x1: left, x2: left });
  set('sim-dim-tr', { x1: right, x2: right });
  set('sim-furn', { x: -g.w / 2, y: -g.l / 2, width: g.w, height: g.l });
  set('sim-furn-label', { y: g.l / 2 - 8 });
  set('sim-mode-note', { y: g.l / 2 + 14 });
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

function renderSimVisual(furn, stop, prof, poses, state) {
  const canvasBox = document.getElementById('sim-canvas-box');
  if (!canvasBox) return;
  if (!simVisual.built) buildSimSvg(canvasBox);
  const tr = currentLang === 'tr';

  // one linear scale for opening and item: the drawing never disagrees with the verdict
  const doorPx = stop.opening * SIM_PX_PER_CM;
  const uprightPx = prof.upright * SIM_PX_PER_CM;
  const finalPx = (stop.pose ? prof.side : prof.upright) * SIM_PX_PER_CM;
  // depth along the route is schematic (it does not affect the width check)
  const depthPx = Math.max(46, Math.min(100, furn.length * 0.45));

  const visual = state;
  const furnColor = visual === 'fail' ? '#B42318' : visual === 'tight' ? '#C98A12' : '#2E6B4E';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animClass = stop.pose ? (visual === 'fail' ? 'is-tip-fail' : 'is-tip') : (visual === 'fail' ? 'is-fail' : 'is-pass');
  const key = `${selectedFurnitureKey}:${stop.id}:${animClass}`;
  const replay = simVisual.key !== key;

  const modeNote = document.getElementById('sim-mode-note');
  const tippedLabel = poses[1] || '';
  const uprightLabel = poses[0];

  if (replay) {
    clearTimeout(simVisual.tipTimer);
    simVisual.tipping = stop.pose === 1 && !reduce;
    if (simVisual.tipping) {
      // approach in its normal pose, stop at the wall, tip, then go through
      simVisual.tipTimer = setTimeout(() => {
        simVisual.tipping = false;
        simVisual.target.w = finalPx;
        if (modeNote) modeNote.textContent = tippedLabel;
        if (!simVisual.raf) simVisual.raf = requestAnimationFrame(tweenSim);
      }, SIM_TIP_AT_MS);
    }
  }

  const drawnW = simVisual.tipping ? uprightPx : finalPx;
  simVisual.target = { door: doorPx, w: drawnW, l: depthPx };
  if (!simVisual.cur || reduce) {
    simVisual.cur = { ...simVisual.target };
    applySimGeometry(simVisual.cur);
  } else if (replay && simVisual.tipping) {
    simVisual.cur.w = uprightPx;
    simVisual.cur.l = depthPx;
    if (!simVisual.raf) simVisual.raf = requestAnimationFrame(tweenSim);
  } else if (!simVisual.raf) {
    simVisual.raf = requestAnimationFrame(tweenSim);
  }
  if (modeNote) modeNote.textContent = simVisual.tipping ? uprightLabel : (stop.pose ? tippedLabel : uprightLabel);

  const furnRect = document.getElementById('sim-furn');
  furnRect.style.fill = furnColor;
  furnRect.style.stroke = furnColor;
  document.getElementById('sim-dim-text').textContent = `${stop.opening} cm`;
  document.getElementById('sim-furn-label').textContent = tr ? furn.short_tr : furn.short_en;
  const stopName = document.getElementById('sim-stop-name');
  if (stopName) stopName.textContent = stop.name.toUpperCase();

  // resting place: an item that fits is caught mid-passage, its front already
  // through the opening (clipped above the wall); one that doesn't rests
  // with its nose against the wall
  const wallStop = (SIM_WALL_Y + 30 + 3 + depthPx / 2) - SIM_ITEM_ORIGIN_Y;
  const throughStop = (SIM_WALL_Y + 15 + depthPx * 0.1) - SIM_ITEM_ORIGIN_Y;
  const rest = visual === 'fail' ? wallStop : throughStop;
  const move = document.getElementById('sim-move');
  move.style.setProperty('--stop', `${rest}px`);
  move.style.setProperty('--pre', `${wallStop + 6}px`);

  if (replay) {
    move.classList.remove('is-pass', 'is-fail', 'is-tip', 'is-tip-fail');
    void move.getBoundingClientRect();
    move.classList.add(animClass);
    simVisual.key = key;
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
    const ICON_OPEN = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    const ICON_CLOSE = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
    const setOpen = (open) => {
      navLinks.classList.toggle('open', open);
      document.documentElement.classList.toggle('menu-open', open);
      toggleBtn.setAttribute('aria-expanded', String(open));
      toggleBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggleBtn.innerHTML = open ? ICON_CLOSE : ICON_OPEN;
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setOpen(false);
        toggleBtn.focus();
      }
    });

    toggleBtn.addEventListener('click', () => {
      setOpen(!navLinks.classList.contains('open'));
    });

    // Close on link click, and on a tap anywhere outside the menu
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        setOpen(false);
      }
    });
  }
}
