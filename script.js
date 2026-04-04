/* ============================================================
   INJEKSI CSS TKA (STIMULUS & ENTER)
   ============================================================ */
if (!document.getElementById('tka-style')) {
  const style = document.createElement('style');
  style.id = 'tka-style';
  style.innerHTML = `
    #q-text { white-space: pre-line; line-height: 1.6; font-size: 16px; }
    .stimulus-box { background: #f5f7fa; padding: 15px; margin-bottom: 15px; border-radius: 8px; font-size: 14.5px; line-height: 1.6; white-space: pre-line; border-left: 4px solid var(--blue-500); color: var(--blue-900); }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   VARIABEL GLOBAL UJIAN
   ============================================================ */
let BANK_SOAL = [];
let SOAL = [];

/* ============================================================
   🔥 UPGRADE: SYSTEM TOAST MODERN (ANTI-DUPLICATE & MAX LIMIT)
   ============================================================ */
const TOAST_ICONS = {
  success: `<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>`,
  error: `<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  warning: `<svg viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  info: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`
};

let lastToastMessage = '';
let lastToastTime = 0;
const MAX_TOASTS = 3;

function showToast(type, title, message = '') {
  const now = Date.now();
  
  if (message === lastToastMessage && (now - lastToastTime) < 1500) {
    return;
  }
  
  lastToastMessage = message;
  lastToastTime = now;

  const container = document.getElementById('toast-container');
  
  if (container.children.length >= MAX_TOASTS) {
    const oldest = container.firstElementChild;
    if (oldest) {
      oldest.classList.replace('show', 'hide');
      setTimeout(() => oldest.remove(), 400); 
    }
  }

  const toast = document.createElement('div');
  toast.className = `toast-box ${type}`;
  toast.innerHTML = `
    <div class="toast-icon-wrapper">${TOAST_ICONS[type] || TOAST_ICONS.info}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <div class="toast-progress"><div class="toast-progress-bar"></div></div>
  `;
  
  container.appendChild(toast);
  
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.replace('show', 'hide');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================================
   🔥 UPGRADE: SYSTEM MODAL REUSABLE
   ============================================================ */
function showCustomModal({ type = 'info', title, message, htmlContent = '', confirmText = 'OK', cancelText = 'Batal', showCancel = true, onConfirm = null, onCancel = null }) {
  const container = document.getElementById('modal-container');
  container.innerHTML = ''; 

  let iconSvg, iconClass, btnClass;

  switch(type) {
    case 'confirm':
    case 'success':
      iconSvg = `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`;
      iconClass = 'confirm'; btnClass = 'go-success';
      break;
    case 'warning':
      iconSvg = `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`;
      iconClass = 'warning'; btnClass = 'go-primary';
      break;
    case 'danger':
      iconSvg = `<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>`;
      iconClass = 'danger'; btnClass = 'go-danger';
      break;
    default: 
      iconSvg = `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>`;
      iconClass = 'confirm'; btnClass = 'go-primary';
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-icon ${iconClass}"><svg viewBox="0 0 24 24">${iconSvg}</svg></div>
      <h3>${title}</h3>
      ${message ? `<p>${message}</p>` : ''}
      ${htmlContent ? `<div class="modal-content-html">${htmlContent}</div>` : ''}
      <div class="modal-btns">
        ${showCancel ? `<button class="modal-btn cancel ripple-target" id="dyn-modal-cancel">${cancelText}</button>` : ''}
        <button class="modal-btn ${btnClass} ripple-target" id="dyn-modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;

  container.appendChild(overlay);
  applyRippleEffect();

  requestAnimationFrame(() => overlay.classList.add('show'));

  const closeModal = () => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 300);
  };

  document.getElementById('dyn-modal-confirm').addEventListener('click', () => {
    closeModal();
    if(onConfirm) onConfirm();
  });

  if(showCancel) {
    document.getElementById('dyn-modal-cancel').addEventListener('click', () => {
      closeModal();
      if(onCancel) onCancel();
    });
  }
}

/* ============================================================
   🔥 RIPPLE EFFECT
   ============================================================ */
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");
  
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) existingRipple.remove();
  
  button.appendChild(circle);
}
function applyRippleEffect() {
  document.querySelectorAll('.ripple-target').forEach(btn => {
    btn.removeEventListener('mousedown', createRipple);
    btn.addEventListener('mousedown', createRipple);
  });
}
applyRippleEffect();

/* ============================================================
   🔥 SISTEM PEMUATAN SOAL DARI JSON (URUTAN TETAP)
   ============================================================ */

// Function Convert Data (Flattening JSON Group ke array flat)
function convertSoal(data) {
  let hasil = [];
  data.forEach(group => {
    group.questions.forEach(q => {
      hasil.push({
        ...q,
        mapel: group.mapel || q.mapel,
        stimulus: group.stimulus || null,
        group_id: group.group_id || null
      });
    });
  });
  return hasil;
}

// Function Load JSON (Tanpa Acak)
async function loadSoal() {
  try {
    const res = await fetch('data/soal.json');
    if (!res.ok) throw new Error('Fetch gagal');
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error('Format salah');

    // Langsung convert ke BANK_SOAL tanpa diacak
    BANK_SOAL = convertSoal(data);

    console.log("✅ Soal TKA berhasil dimuat sesuai urutan JSON");
  } catch (err) {
    console.warn("⚠️ Gagal memuat soal.json");
    console.error(err);
  }
}

// Langsung panggil load soal secara asinkron saat halaman dimuat
loadSoal();

/* ============================================================
   STATE
   ============================================================ */
let state = {
  nama:    '',
  materi:  'Acak',
  current: 0,
  answers: {},
  timer:   60 * 60,
  timerInterval: null,
  warnShown: false,
  direction: 'right',
  submitted: false
};

/* ============================================================
   MANAJEMEN SESSION LOKAL & AUTO SAVE
   ============================================================ */
function saveSession() {
  if (!state.nama || state.submitted) return;
  const sessionData = {
    nama: state.nama,
    materi: state.materi,
    soal: SOAL,
    jawaban: state.answers,
    timer: state.timer,
    current: state.current
  };
  localStorage.setItem("cbt_session_" + state.nama, JSON.stringify(sessionData));
  localStorage.setItem("cbt_last_user", state.nama);
}

let autoSaveTimeout;
function autoSave(silent = false) {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    saveSession();
    if (!silent) {
      showToast('success', 'Jawaban Tersimpan', 'Progres telah otomatis disinkronkan.');
    }
  }, 800); 
}

function loadSession(nama) {
  try {
    const data = localStorage.getItem("cbt_session_" + nama);
    if (!data) return false;
    
    const parsed = JSON.parse(data);
    if (!parsed.soal || parsed.soal.length === 0) return false;

    state.nama = parsed.nama;
    state.materi = parsed.materi || 'Acak';
    SOAL = parsed.soal;
    state.answers = parsed.jawaban || {};
    state.timer = parsed.timer;
    state.current = parsed.current || 0;
    
    return true;
  } catch (e) {
    console.error("Data sesi corrupt, melakukan reset...");
    clearSession(nama);
    return false;
  }
}

function clearSession(nama) {
  localStorage.removeItem("cbt_session_" + nama);
  localStorage.removeItem("cbt_last_user");
}

function resumeExam() {
  state.submitted = false;
  state.warnShown = false;
  
  showScreen('screen-exam');
  $('topbar-name').textContent = state.nama;
  $('topbar-avatar').textContent = state.nama.charAt(0).toUpperCase();

  buildNavGrid();
  renderQuestion();
  startTimer();
  updateStats();
  
  history.pushState({examActive: true}, document.title, location.href);
}

/* ============================================================
   UTIL
   ============================================================ */
const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ============================================================
   LOGIN & INIT
   ============================================================ */
$('btn-login').addEventListener('click', () => {
  const nama  = $('inp-nama').value.trim();
  const materi = $('inp-materi').value;
  let ok = true;

  if (!nama)  { $('inp-nama').classList.add('error');  $('err-nama').classList.add('show');  ok = false; }
  else        { $('inp-nama').classList.remove('error'); $('err-nama').classList.remove('show'); }

  if (!ok) return;

  if (loadSession(nama)) {
    showToast('success', 'Melanjutkan Sesi', 'Data ujianmu berhasil dipulihkan.');
    resumeExam();
  } else {
    state.nama  = nama;
    state.materi = materi;
    state.answers = {};
    state.current = 0;
    state.timer   = 60 * 60;
    state.warnShown = false;
    state.submitted = false;
    
    // Tampilan tombol Loading
    const btnLogin = $('btn-login');
    const originalText = btnLogin.innerHTML;
    btnLogin.innerHTML = 'Memuat Soal...';
    btnLogin.style.pointerEvents = 'none';

    // Memanggil loadSoal() lalu startExam()
    loadSoal().then(() => {
      btnLogin.innerHTML = originalText;
      btnLogin.style.pointerEvents = 'auto';
      startExam();
    });
  }
});

/* ============================================================
   EXAM
   ============================================================ */
function startExam() {
  generateExamQuestions();
  saveSession(); 

  showScreen('screen-exam');
  $('topbar-name').textContent = state.nama;
  $('topbar-avatar').textContent = state.nama.charAt(0).toUpperCase();

  buildNavGrid();
  renderQuestion();
  startTimer();
  updateStats();
  
  history.pushState({examActive: true}, document.title, location.href);
  showToast('success', 'Ujian Dimulai', 'Selamat mengerjakan, semoga sukses!');

  // Mode Serius (Fullscreen)
  const elem = document.documentElement;
  if (elem.requestFullscreen) { elem.requestFullscreen().catch(()=>{}); }
  else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen().catch(()=>{}); }
}

/* ── TIMER ── */
function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerInterval = setInterval(tickTimer, 1000);
  renderTimer();
}

function tickTimer() {
  if (state.submitted) { clearInterval(state.timerInterval); return; }
  state.timer--;
  renderTimer();
  
  saveSession(); 
  
  if (state.timer <= 5 * 60 && !state.warnShown) {
    state.warnShown = true;
    showCustomModal({
      type: 'warning',
      title: 'Waktu Hampir Habis!',
      message: 'Tersisa <strong>5 menit</strong>. Segera periksa dan kumpulkan jawabanmu sebelum waktu habis.',
      confirmText: 'Mengerti',
      showCancel: false
    });
  }
  if (state.timer <= 0) {
    clearInterval(state.timerInterval);
    doSubmit();
  }
}

function renderTimer() {
  const m = Math.floor(state.timer / 60);
  const s = state.timer % 60;
  $('timer-display').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const box = $('timer-box');
  box.classList.remove('warning','danger');
  if (state.timer <= 60)          box.classList.add('danger');
  else if (state.timer <= 5*60)   box.classList.add('warning');
}

/* ── BUILD NAV GRID ── */
function buildNavGrid() {
  const container = $('nav-grid');
  container.innerHTML = '';

  let groups = [];
  let currentLabel = '';
  let fromIndex = 0;

  SOAL.forEach((s, idx) => {
    let groupType = s.type === 'esai' ? 'Esai' : s.mapel;
    if (groupType !== currentLabel) {
      if (currentLabel !== '') {
        groups.push({ label: currentLabel, from: fromIndex, to: idx - 1 });
      }
      currentLabel = groupType;
      fromIndex = idx;
    }
    if (idx === SOAL.length - 1) {
      groups.push({ label: currentLabel, from: fromIndex, to: idx });
    }
  });

  groups.forEach(g => {
    const lbl = document.createElement('div');
    lbl.className = 'sidebar-mapel-label';
    lbl.textContent = g.label;
    container.appendChild(lbl);

    const grid = document.createElement('div');
    grid.className = 'num-grid';
    for (let i = g.from; i <= g.to; i++) {
      const btn = document.createElement('button');
      btn.className = 'num-btn';
      btn.id = `num-btn-${i}`;
      btn.textContent = i + 1;
      btn.addEventListener('click', () => goTo(i));
      grid.appendChild(btn);
    }
    container.appendChild(grid);
  });
}

function updateNavGrid() {
  SOAL.forEach((s, i) => {
    const btn = $(`num-btn-${i}`);
    if (!btn) return;
    btn.className = 'num-btn';
    if (i === state.current)          btn.classList.add('active');
    if (hasAnswer(s.id))              btn.classList.add('answered');
  });
}

function hasAnswer(soalId) {
  const v = state.answers[soalId];
  return v !== undefined && v !== null && String(v).trim() !== '';
}

/* ── RENDER QUESTION ── */
function renderQuestion() {
  const s = SOAL[state.current];
  const card = $('question-card');

  card.style.animation = 'none';
  card.offsetHeight; 
  card.style.animation = state.direction === 'right'
    ? 'slideRight .3s cubic-bezier(.4,0,.2,1) both'
    : 'slideLeft .3s cubic-bezier(.4,0,.2,1) both';

  $('q-badge').textContent = `Soal ${state.current + 1} / ${SOAL.length}`;
  $('q-mapel').textContent  = s.mapel;

  const typeTag = $('q-type');
  if (s.type === 'pg') {
    typeTag.textContent = 'Pilihan Ganda';
    typeTag.className   = 'question-type-tag pg';
  } else {
    typeTag.textContent = 'Esai';
    typeTag.className   = 'question-type-tag esai';
  }

  // 🌟 RENDER STIMULUS (Jika Ada)
  let stimulusBox = document.getElementById("stimulus");
  if (!stimulusBox) {
    stimulusBox = document.createElement("div");
    stimulusBox.id = "stimulus";
    stimulusBox.className = "stimulus-box";
    const qText = document.getElementById("q-text");
    if (qText) qText.parentNode.insertBefore(stimulusBox, qText);
  }

  if (s.stimulus) {
    stimulusBox.innerText = s.stimulus; // innerText otomatis mengurai \n dengan benar
    stimulusBox.style.display = "block";
  } else {
    stimulusBox.innerText = "";
    stimulusBox.style.display = "none";
  }

  // 🌟 RENDER TEKS SOAL
  const qTextEl = document.getElementById("q-text");
  if (qTextEl) {
    qTextEl.innerText = s.teks; // innerText otomatis mengurai \n dengan benar
  }

  const opts = $('q-options');
  opts.innerHTML = '';

  if (s.type === 'pg') {
    const list = document.createElement('div');
    list.className = 'options-list';
    const letters = ['A','B','C','D', 'E'];
    s.opsi.forEach((o, idx) => {
      const item = document.createElement('label');
      item.className = 'option-item' + (state.answers[s.id] === idx ? ' selected' : '');
      item.innerHTML = `
        <input type="radio" name="q${s.id}" value="${idx}" ${state.answers[s.id] === idx ? 'checked' : ''} />
        <div class="option-letter">${letters[idx]}</div>
        <div class="option-text">${escHtml(o)}</div>`;
      item.addEventListener('click', () => selectOption(s.id, idx, list));
      list.appendChild(item);
    });
    opts.appendChild(list);
  } else {
    const ta = document.createElement('textarea');
    ta.className = 'essay-area';
    ta.placeholder = 'Tuliskan jawabanmu di sini...';
    ta.value = state.answers[s.id] || '';
    ta.addEventListener('input', () => {
      state.answers[s.id] = ta.value;
      updateStats();
      updateNavGrid();
      autoSave(false); 
    });
    opts.appendChild(ta);
    const hint = document.createElement('div');
    hint.className = 'essay-hint';
    hint.textContent = 'Tulislah dengan jelas dan lengkap.';
    opts.appendChild(hint);
  }

  $('btn-prev').disabled = state.current === 0;
  const isLast = state.current === SOAL.length - 1;
  $('btn-next').classList.toggle('hidden', isLast);
  $('btn-submit-footer').classList.toggle('hidden', !isLast);

  updateNavGrid();
  updateStats();
  updateProgress();
}

function selectOption(soalId, idx, list) {
  state.answers[soalId] = idx;
  list.querySelectorAll('.option-item').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });
  updateStats();
  updateNavGrid();
  updateProgress();
  autoSave(false); 
}

/* ── NAVIGATION ── */
function goTo(index) {
  saveCurrentEssay();
  state.direction = index > state.current ? 'right' : 'left';
  state.current = index;
  renderQuestion();
}

function saveCurrentEssay() {
  const s = SOAL[state.current];
  if (s && s.type === 'esai') {
    const ta = document.querySelector('.essay-area');
    if (ta) {
      state.answers[s.id] = ta.value;
      saveSession(); 
    }
  }
}

$('btn-prev').addEventListener('click', () => {
  if (state.current > 0) goTo(state.current - 1);
});
$('btn-next').addEventListener('click', () => {
  if (state.current < SOAL.length - 1) goTo(state.current + 1);
});
$('btn-submit-footer').addEventListener('click', () => openSubmitModal());
$('btn-finish').addEventListener('click', () => openSubmitModal());

/* ── STATS & PROGRESS ── */
function updateStats() {
  const answered = SOAL.filter(s => hasAnswer(s.id)).length;
  $('stat-answered').textContent  = answered;
  $('stat-remaining').textContent = SOAL.length - answered;
}

function updateProgress() {
  const answered = SOAL.filter(s => hasAnswer(s.id)).length;
  const pct = Math.round((answered / SOAL.length) * 100);
  $('progress-fill').style.width = pct + '%';
  $('progress-pct').textContent  = pct + '%';
}

/* ============================================================
   GENERATOR EXAM (TIDAK ACAK)
   ============================================================ */
function generateExamQuestions() {
  // Gunakan seluruh isi BANK_SOAL secara utuh tanpa ada pengacakan
  // Urutan akan sama persis 100% seperti di soal.json
  SOAL = JSON.parse(JSON.stringify(BANK_SOAL));
}

/* ============================================================
   MODAL - USING NEW REUSABLE SYSTEM
   ============================================================ */
function openSubmitModal() {
  saveCurrentEssay();
  updateStats();
  const answered = SOAL.filter(s => hasAnswer(s.id)).length;
  const remaining = SOAL.length - answered;
  
  const isWarning = remaining > 0;
  
  showCustomModal({
    type: isWarning ? 'warning' : 'confirm',
    title: isWarning ? 'Masih Ada Soal Kosong!' : 'Kumpulkan Jawaban?',
    message: isWarning 
      ? `Ada <strong>${remaining} soal</strong> yang belum kamu jawab. Sangat disarankan untuk mengisi semua jawaban sebelum mengumpulkan.` 
      : 'Pastikan semua soal sudah kamu kerjakan. Jawaban yang belum diisi tidak bisa diubah setelah dikumpulkan.',
    htmlContent: `
      <div style="display:flex;gap:10px;margin-top:16px;">
        <div style="flex:1;background:var(--gray-50);padding:12px;border-radius:10px;">
          <div style="font-size:22px;font-weight:800;color:var(--blue-700);">${answered}</div>
          <div style="font-size:11px;color:var(--gray-500);">Soal dijawab</div>
        </div>
        <div style="flex:1;background:var(--gray-50);padding:12px;border-radius:10px;">
          <div style="font-size:22px;font-weight:800;color:${remaining > 0 ? 'var(--red-500)' : 'var(--blue-700)'};">${remaining}</div>
          <div style="font-size:11px;color:var(--gray-500);">Belum dijawab</div>
        </div>
      </div>
    `,
    confirmText: isWarning ? 'Tetap Kumpulkan' : 'Ya, Kumpulkan',
    cancelText: isWarning ? 'Cek Kembali' : 'Kembali',
    onConfirm: doSubmit
  });
}

/* ============================================================
   🔥 FUNGSI AUTO GRADING ESAI (NEW SMART GRADER)
   ============================================================ */
function gradeEssay(userAnswer, question) {
  const keywords = question.keywords;
  
  if (!userAnswer || typeof userAnswer !== 'string' || userAnswer.trim() === '') {
    return { 
      score: 0, 
      status: '❌ Kosong', 
      cssClass: 'danger', 
      found: [], 
      missing: keywords.map(kw => kw.kata[0]), 
      feedback: 'Kamu tidak mengisi jawaban apapun.', 
      insight: question.insight 
    };
  }

  const cleanAnswer = userAnswer.toLowerCase().replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = cleanAnswer === '' ? 0 : cleanAnswer.split(' ').length;

  if (wordCount < 5) {
    return {
      score: 0,
      status: '❌ Terlalu Pendek', 
      cssClass: 'danger',
      found: [],
      missing: keywords.map(kw => kw.kata[0]),
      feedback: `Jawaban terlalu pendek (${wordCount} kata). Ketik minimal 5 kata untuk menjelaskan alasanmu sesuai standar TKA.`,
      insight: question.insight
    };
  }

  let score = 0;
  let matchedKeywordsCount = 0;
  let hasMandatory = false;
  let isMandatoryMissing = false;
  
  let foundKws = [];
  let missingKws = [];

  keywords.forEach(kw => {
    if (kw.wajib) hasMandatory = true;

    const isMatch = kw.kata.some(k => {
      const regex = new RegExp(`\\b${k.toLowerCase()}\\b`, 'i');
      return regex.test(cleanAnswer);
    });

    if (isMatch) {
      score += kw.bobot;
      matchedKeywordsCount++;
      foundKws.push(kw.kata[0]); 
    } else {
      missingKws.push(kw.kata[0]); 
      if (kw.wajib) {
        isMandatoryMissing = true;
      }
    }
  });

  if (matchedKeywordsCount === 1) {
    score = Math.min(score, 30);
  }

  if (hasMandatory && isMandatoryMissing && matchedKeywordsCount > 1) {
    score = Math.min(score, 40); 
  }

  score = Math.min(score, 100);

  let status, cssClass;
  if (score === 0) { status = '❌ Salah'; cssClass = 'danger'; }
  else if (score < 100) { status = '⚠️ Sebagian Benar'; cssClass = 'warning'; }
  else { status = '✅ Benar'; cssClass = 'success'; }

  let feedback = `Skor akhir: ${score}. `;
  if (isMandatoryMissing && matchedKeywordsCount > 0) {
    feedback += "Jawabanmu belum tepat karena meleset dari inti permasalahan/kata kunci wajib.";
  } else if (score >= 90) {
    feedback += "Luar biasa! Analisis pemecahan masalahmu sangat komprehensif.";
  } else if (matchedKeywordsCount === 1) {
    feedback += "Jawabanmu terdeteksi sangat kurang. Harap jelaskan dengan argumentasi yang lebih utuh.";
  }

  return { score, status, cssClass, found: foundKws, missing: missingKws, feedback: feedback.trim(), insight: question.insight };
}

/* ============================================================
   🔥 FUNGSI PENJELASAN (INTERAKTIF PEMBELAJARAN)
   ============================================================ */
function explainPG(question, userAnsIdx) {
  const isCorrect = userAnsIdx === question.jawaban;
  const statusClass = isCorrect ? 'success' : 'danger';
  const icon = isCorrect ? '✅' : '❌';
  const title = isCorrect ? 'Jawaban Kamu Benar!' : 'Jawaban Salah';
  const letters = ['A', 'B', 'C', 'D', 'E'];
  
  let correctionHtml = '';
  if (!isCorrect && userAnsIdx !== undefined && userAnsIdx !== -1) {
    correctionHtml = `<div style="margin-bottom: 6px;">Jawaban yang tepat adalah: <strong>${letters[question.jawaban]}. ${escHtml(question.opsi[question.jawaban])}</strong></div>`;
  } else if (userAnsIdx === undefined || userAnsIdx === -1) {
    correctionHtml = `<div style="margin-bottom: 6px;">Kamu tidak menjawab. Jawaban yang tepat adalah: <strong>${letters[question.jawaban]}. ${escHtml(question.opsi[question.jawaban])}</strong></div>`;
  }

  return `
    <div class="explanation-box ${statusClass}">
      <div class="explanation-title">${icon} ${title}</div>
      ${correctionHtml}
      <div><strong>Pembahasan:</strong> ${question.explanation || 'Tidak ada penjelasan untuk soal ini.'}</div>
    </div>
  `;
}

function explainEssay(answer, question) {
  const grading = gradeEssay(answer, question);
  const percentage = grading.score;
  const found = grading.found || [];
  const missing = grading.missing || [];
  
  let statusStr, cssClass, icon, detailHtml = '';

  if (percentage === 0) {
    statusStr = grading.status; cssClass = 'danger'; icon = '❌';
    detailHtml = `<div><strong>Feedback:</strong> ${grading.feedback}</div>`;
  } else if (percentage < 100) {
    statusStr = grading.status; cssClass = 'warning'; icon = '⚠️';
    detailHtml = `
      <div><strong>Feedback:</strong> ${grading.feedback}</div>
      <div style="margin-top: 6px;"><strong>Kamu sudah menyebutkan:</strong> <br/>${found.map(k => `<span class="keyword-tag found">${k}</span>`).join('')}</div>
      <div><strong>Namun belum mencakup:</strong> <br/>${missing.map(k => `<span class="keyword-tag missing">${k}</span>`).join('')}</div>
    `;
  } else {
    statusStr = grading.status; cssClass = 'success'; icon = '✅';
    detailHtml = `
      <div><strong>Feedback:</strong> ${grading.feedback}</div>
      <div style="margin-top: 6px;"><strong>Kata kunci ditemukan:</strong> <br/>${found.map(k => `<span class="keyword-tag found">${k}</span>`).join('')}</div>
    `;
  }

  return `
    <div class="explanation-box ${cssClass}">
      <div class="explanation-title">${icon} ${statusStr}</div>
      ${detailHtml}
      <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(0,0,0,0.1);">
        <strong>💡 Insight (Penyebab umum kesalahan):</strong><br/> <span style="color:var(--amber-700)">${grading.insight || '-'}</span><br/><br/>
        <strong>Pembahasan Lengkap:</strong><br/> ${question.explanation || 'Tidak ada pembahasan untuk soal ini.'}
      </div>
    </div>
  `;
}

/* ============================================================
   SUBMIT & RESULT
   ============================================================ */
function doSubmit() {
  if (state.submitted) return;
  state.submitted = true;
  saveCurrentEssay();
  
  clearSession(state.nama); 
  clearInterval(state.timerInterval);
  
  if (document.exitFullscreen) { document.exitFullscreen().catch(()=>{}); }

  showResult();
  showToast('success', 'Ujian Selesai', 'Terima kasih, jawabanmu sudah dikumpulkan.');
}

function showResult() {
  showScreen('screen-result');

  const pgSoal = SOAL.filter(s => s.type === 'pg');
  const esaiSoal = SOAL.filter(s => s.type === 'esai');
  
  let correct = 0;
  let mapelStats = {};
  
  SOAL.forEach(s => {
    if (!mapelStats[s.mapel]) mapelStats[s.mapel] = { totalItems: 0, scoreEarned: 0 };
    mapelStats[s.mapel].totalItems++;
  });

  pgSoal.forEach(s => {
    const isCorrect = state.answers[s.id] === s.jawaban;
    if (isCorrect) {
      correct++;
      mapelStats[s.mapel].scoreEarned += 100;
    }
  });

  let esaiTotalScore = 0;
  esaiSoal.forEach(s => {
    const userAns = state.answers[s.id] || '';
    const grading = gradeEssay(userAns, s);
    esaiTotalScore += grading.score;
    mapelStats[s.mapel].scoreEarned += grading.score;
  });

  const rawScorePG = pgSoal.length > 0 ? (correct / pgSoal.length) * 100 : 0;
  const rawScoreEsai = esaiSoal.length > 0 ? (esaiTotalScore / esaiSoal.length) : 0;
  const finalWeightedScore = Math.round((rawScorePG * 0.60) + (rawScoreEsai * 0.40));

  $('result-name').textContent  = state.nama;
  $('result-kelas').textContent = 'Mode Ujian Default'; 
  
  $('rs-total').textContent = SOAL.length;
  document.querySelector('.tag.pg').textContent = `${pgSoal.length} Soal`;
  document.querySelector('.tag.essay').textContent = `${esaiSoal.length} Soal`;

  $('result-score').textContent = finalWeightedScore;
  $('rs-correct').textContent   = correct;
  $('rs-wrong').textContent     = pgSoal.length - correct;

  setTimeout(() => {
    const fill = Math.round((finalWeightedScore / 100) * 360);
    $('score-ring').style.background =
      `conic-gradient(rgba(255,255,255,.95) ${fill}deg, rgba(255,255,255,.15) ${fill}deg)`;
  }, 100);

  let weakestMapel = '';
  let lowestPct = 101;
  for (let m in mapelStats) {
    let pct = Math.round((mapelStats[m].scoreEarned / (mapelStats[m].totalItems * 100)) * 100);
    if (pct < lowestPct && mapelStats[m].totalItems > 0) {
      lowestPct = pct;
      weakestMapel = m;
    }
  }

  const analysisBox = $('analysis-box');
  const analysisText = $('analysis-text');
  if (weakestMapel) {
    analysisBox.style.display = 'flex';
    if (finalWeightedScore >= 80) {
      analysisText.innerHTML = `Luar biasa! Pemahamanmu secara umum sangat baik. Namun, kamu bisa meningkatkan lagi akurasi di materi <strong>${weakestMapel}</strong> (Skor: ${lowestPct}%). Pertahankan prestasimu!`;
    } else {
      analysisText.innerHTML = `Kamu perlu lebih banyak berlatih, terutama pada mata pelajaran <strong>${weakestMapel}</strong> karena ini merupakan area terlemahmu (Skor: ${lowestPct}%). Jangan menyerah, baca lagi pembahasannya di bawah!`;
    }
  }

  const timeSpent = (60 * 60) - state.timer; 
  let resultsArr = JSON.parse(localStorage.getItem('cbt_results') || '[]');
  resultsArr.push({ nama: state.nama, skor: finalWeightedScore, waktu: timeSpent, ts: Date.now() });
  
  resultsArr.sort((a, b) => b.skor - a.skor || a.waktu - b.waktu);
  resultsArr = resultsArr.slice(0, 10);
  localStorage.setItem('cbt_results', JSON.stringify(resultsArr));

  const lbList = $('leaderboard-list');
  lbList.innerHTML = '';
  resultsArr.forEach((r, idx) => {
    const isMe = r.ts === resultsArr.find(mr => mr.nama === state.nama && mr.skor === finalWeightedScore)?.ts;
    const mins = Math.floor(r.waktu / 60);
    const secs = r.waktu % 60;
    const timeStr = `${mins}m ${secs}s`;
    
    lbList.innerHTML += `
      <div class="lb-row ${isMe ? 'is-me' : ''}">
        <div class="lb-rank">#${idx + 1}</div>
        <div class="lb-name">${escHtml(r.nama)}${isMe ? ' (Kamu)' : ''}</div>
        <div class="lb-score">${r.skor}</div>
        <div class="lb-time">⏱️ ${timeStr}</div>
      </div>
    `;
  });

  const revPG = $('review-pg');
  revPG.innerHTML = '';
  pgSoal.forEach((s, i) => {
    const userAns = state.answers[s.id];
    const isCorrect = userAns === s.jawaban;
    const letters = ['A','B','C','D','E'];

    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <div class="review-item-num">Soal ${i + 1} &nbsp;·&nbsp; ${s.mapel}</div>
      <div class="review-question">${escHtml(s.teks)}</div>
      <div class="review-answer-wrap">
        ${userAns !== undefined
          ? `<div class="review-answer ${isCorrect ? 'correct' : 'wrong'}">
              ${isCorrect
                ? `<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/></svg>`
                : `<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>`}
              Jawaban kamu: <strong>${letters[userAns]}. ${escHtml(s.opsi[userAns])}</strong>
             </div>`
          : `<div class="review-answer wrong">
              <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Tidak dijawab
             </div>`}
      </div>
      ${explainPG(s, userAns !== undefined ? userAns : -1)}
    `;
    revPG.appendChild(div);
  });

  const revEsai = $('review-esai');
  revEsai.innerHTML = '';
  
  esaiSoal.forEach((s, i) => {
    const userAns = state.answers[s.id] || '';
    const grading = gradeEssay(userAns, s); 

    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <div class="review-item-num">Soal ${pgSoal.length + 1 + i} &nbsp;·&nbsp; ${s.mapel}</div>
      <div class="review-question">${escHtml(s.teks).replace(/\n/g,'<br/>')}</div>
      <div class="essay-review">${escHtml(userAns) || '<em style="color:var(--gray-400)">Tidak dijawab</em>'}</div>
      
      <div class="essay-grade-badge ${grading.cssClass}">
        Skor Diperoleh: ${grading.score}%
      </div>
      
      ${explainEssay(userAns, s)}
    `;
    revEsai.appendChild(div);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   RESTART EXAM / MULAI LAGI
   ============================================================ */
$('btn-restart').addEventListener('click', () => {
  showCustomModal({
    type: 'danger',
    title: 'Mulai Ujian Baru?',
    message: 'Apakah kamu yakin ingin meninggalkan hasil ini dan memulai ujian baru?',
    confirmText: 'Mulai Baru',
    cancelText: 'Batal',
    onConfirm: () => {
      state.answers = {};
      state.submitted = false;
      state.current = 0;
      showScreen('screen-login');
      applyRippleEffect();
    }
  });
});

/* ============================================================
   🔥 CUSTOM RELOAD WARNING & NAVIGATION TRAP 
   ============================================================ */
let cheatWarningCount = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !state.submitted && state.nama && document.getElementById('screen-exam').classList.contains('active')) {
    cheatWarningCount++;
    showToast('error', '⚠️ Pelanggaran!', 'Sistem mendeteksi kamu keluar dari tab ujian. Aktivitas mencurigakan dicatat.');
    
    if (cheatWarningCount >= 3) {
      showCustomModal({
        type: 'danger',
        title: 'Ujian Dihentikan Paksa!',
        message: 'Kamu telah keluar dari halaman ujian lebih dari 3 kali. Sesuai aturan CBT Profesional, ujianmu otomatis dikumpulkan.',
        confirmText: 'Lihat Hasil',
        showCancel: false,
        onConfirm: doSubmit
      });
    }
  }
});

window.addEventListener('keydown', function(e) {
  const isRefreshKey = (e.key === 'F5') || (e.ctrlKey && e.key === 'r') || (e.ctrlKey && e.key === 'R');
  
  if (isRefreshKey) {
    if (!state.submitted && state.nama && document.getElementById('screen-exam').classList.contains('active')) {
      e.preventDefault(); 
      
      showCustomModal({
        type: 'warning',
        title: 'Yakin Ingin Keluar?',
        message: 'Kamu sedang berada di tengah ujian. Progress terakhir yang belum tersinkronisasi akan hilang.',
        confirmText: 'Keluar',
        cancelText: 'Lanjut Ujian',
        onConfirm: () => {
          state.submitted = true; 
          window.location.reload(); 
        }
      });
    }
  }
});

window.addEventListener('beforeunload', e => {
  if (!state.submitted && state.nama) {
    e.preventDefault();
    e.returnValue = ''; 
  }
});

window.addEventListener('popstate', (e) => {
  if (!state.submitted && state.nama && document.getElementById('screen-exam').classList.contains('active')) {
    history.pushState({examActive: true}, document.title, location.href);
    
    showCustomModal({
      type: 'danger',
      title: 'Yakin Ingin Keluar?',
      message: 'Kamu sedang mengerjakan ujian. Yakin ingin kembali ke halaman sebelumnya?',
      confirmText: 'Ya, Keluar',
      cancelText: 'Lanjut Ujian',
      onConfirm: () => {
        state.submitted = true; 
        window.history.back(); 
      }
    });
  }
});

/* ============================================================
   INIT & SESSION CHECK SAAT HALAMAN DIBUKA
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const lastUser = localStorage.getItem('cbt_last_user');
  
  if (lastUser && localStorage.getItem('cbt_session_' + lastUser)) {
    showCustomModal({
      type: 'info',
      title: 'Sesi Ujian Ditemukan',
      message: `Sistem menemukan ujian yang belum selesai atas nama <strong>${lastUser}</strong>. Lanjutkan progres kamu atau mulai dari awal?`,
      confirmText: 'Lanjutkan',
      cancelText: 'Mulai Ulang',
      onConfirm: () => {
        if (loadSession(lastUser)) {
          resumeExam();
          showToast('success', 'Sesi Dipulihkan', 'Selamat melanjutkan ujian.');
        } else {
          showScreen('screen-login');
        }
      },
      onCancel: () => {
        clearSession(lastUser);
        showScreen('screen-login');
        showToast('warning', 'Sesi Dihapus', 'Silakan masukkan nama baru.');
      }
    });
  } else {
    showScreen('screen-login');
  }
});
