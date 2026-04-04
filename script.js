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
   DATA: BANK SOAL HOTS FALLBACK (TIDAK DIHAPUS)
   Ubah `const` menjadi `let` agar bisa di-override oleh JSON
   ============================================================ */
let BANK_SOAL = [
  // --- SOAL LAMA (ID 1-30) ---
  { 
    id: 1, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'inferensi',
    teks: 'Bacalah teks berikut dengan saksama!\n\n"Desa Sukatani dulunya merupakan wilayah yang gersang dan sulit air. Namun, sejak Pak Kades menggerakkan warga untuk menanam pohon aren di sepanjang bukit, kondisi perlahan berubah. Kini, desa tersebut menjadi rimbun, air tanah kembali melimpah, dan warga bahkan mendapatkan penghasilan tambahan dari menjual gula aren."\n\nKesimpulan tersirat (yang tidak tertulis langsung) dari teks tersebut adalah...', 
    opsi: ['Pohon aren dapat tumbuh di tanah yang gersang dan kurang air.', 'Warga desa Sukatani sekarang menjadi kaya raya karena gula aren.', 'Penghijauan lingkungan dapat membawa dampak positif bagi alam dan ekonomi warga.', 'Pak Kades memaksa warganya menanam pohon aren agar bisa berjualan gula.'], 
    jawaban: 2, 
    explanation: 'Kesimpulan tersirat harus mewakili pesan utama bacaan tanpa mengulangi teks secara harfiah. Teks menunjukkan bahwa aksi penghijauan berhasil memperbaiki alam sekaligus memberikan keuntungan finansial.',
    insight: 'Banyak siswa salah karena memilih jawaban yang tersurat di teks, bukan menarik kesimpulan secara keseluruhan (HOTS).'
  },
  { 
    id: 2, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'sebab-akibat',
    teks: 'Berdasarkan teks "Desa Sukatani" pada soal sebelumnya, mengapa saat ini air tanah di desa tersebut kembali melimpah?', 
    opsi: ['Karena warga desa tidak lagi menggunakan air secara boros.', 'Karena akar pohon aren yang ditanam warga membantu menyerap dan menahan air hujan di dalam tanah.', 'Karena Pak Kades membuat sumur resapan yang besar di tengah desa.', 'Karena warga menjual gula aren untuk membeli air bersih dari luar desa.'], 
    jawaban: 1, 
    explanation: 'Dalam konteks IPA (ekologi), pohon berperan penting dalam siklus air. Akarnya berfungsi menahan dan menyimpan air hujan.',
    insight: 'Sebagian siswa salah mengira pembangunan fisik (sumur resapan) adalah penyebabnya, padahal teks berfokus pada fungsi ekologis pohon.'
  },
  { 
    id: 3, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'analisis',
    teks: '"Setelah berhasil membangun bisnis kerajinan anyaman bambu, Bu Rina menjadi buah bibir di kampungnya. Meskipun pesanan datang dari luar negeri, ia tetap ramah dan mau mengajarkan keterampilannya kepada ibu-ibu lain secara gratis."\n\nMakna ungkapan "buah bibir" pada teks di atas adalah...', 
    opsi: ['Orang yang suka banyak bicara', 'Orang yang selalu memakai lipstik', 'Bahan pembicaraan orang banyak (terkenal)', 'Orang yang sombong karena kaya'], 
    jawaban: 2, 
    explanation: 'Ungkapan "buah bibir" berarti sesuatu atau seseorang yang sedang ramai dibicarakan oleh banyak orang (terkenal/viral).',
    insight: 'Siswa yang kurang literasi idiom sering menerjemahkan makna harfiah (berkaitan dengan mulut/bicara).'
  },
  { 
    id: 4, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Perhatikan jadwal piket dan sedekah Jumat Kelas 6 di bawah ini!\n- Senin: Andi, Budi, Citra\n- Selasa: Deni, Eka, Farid\n- Rabu: Gita, Hasan, Indah\n\nPada hari Selasa, Farid sakit dan tidak masuk sekolah. Berdasarkan sikap gotong royong, tindakan yang paling tepat dilakukan oleh Deni dan Eka adalah...', 
    opsi: ['Melaporkan Farid ke guru agar dihukum karena tidak piket.', 'Mengerjakan tugas piket berdua saja dengan ikhlas tanpa mengeluh.', 'Meninggalkan sebagian tugas piket agar Farid yang mengerjakannya besok.', 'Meminta siswa dari hari Rabu untuk menggantikan Farid.'], 
    jawaban: 1, 
    explanation: 'Sikap gotong royong mengharuskan kita untuk saling membantu, terutama saat ada teman berhalangan hadir karena sakit.',
    insight: 'Siswa sering memisahkan antara keadilan tugas (harus diganti) dengan empati sosial (mengerjakan dengan ikhlas).'
  },
  { 
    id: 5, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'inferensi',
    teks: '"Hafiz selalu menyisihkan sebagian uang sakunya untuk anak yatim. Ia percaya bahwa menyumbangkan harta tidak akan membuat seseorang jatuh miskin, melainkan justru membersihkan harta tersebut."\n\nPesan moral dari perilaku Hafiz adalah...', 
    opsi: ['Kita harus memamerkan uang kita kepada anak yatim.', 'Bersedekah harus dilakukan jika kita sudah memiliki banyak uang.', 'Berbagi kepada sesama dapat mensucikan harta dan membawa keberkahan.', 'Lebih baik tidak jajan di sekolah agar uangnya bisa disumbangkan semua.'], 
    jawaban: 2, 
    explanation: 'Pesan utamanya adalah sedekah tidak membuat miskin, tapi justru membersihkan harta dan membawa berkah.',
    insight: 'Soal ini cukup mudah, kesalahan biasanya terjadi akibat kurang teliti membaca keseluruhan opsi.'
  },
  { 
    id: 6, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Kemajuan teknologi membuat komunikasi menjadi sangat *efisien*. Kita bisa menghubungi kerabat di luar negeri hanya dalam hitungan detik menggunakan panggilan video.\n\nAntonim dari kata bercetak miring dalam kalimat tersebut adalah...', 
    opsi: ['Cepat', 'Tepat guna', 'Boros waktu / Lambat', 'Modern'], 
    jawaban: 2, 
    explanation: 'Efisien berarti tepat guna. Maka antonim (lawan kata) yang paling tepat adalah boros waktu atau lambat.',
    insight: 'Banyak siswa terjebak memilih sinonimnya (Cepat/Tepat guna) alih-alih membaca perintah "Antonim".'
  },
  { 
    id: 7, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Bacalah informasi berikut!\nNyamuk *Aedes aegypti* memiliki ciri belang hitam-putih pada tubuhnya dan biasanya menggigit pada pagi hingga sore hari. Nyamuk ini berkembang biak di genangan air bersih. Sementara itu, nyamuk biasa (Culex) umumnya menggigit pada malam hari dan berkembang biak di air kotor atau selokan.\n\nBerdasarkan teks di atas, manakah pernyataan perbandingan yang paling tepat?', 
    opsi: ['Kedua nyamuk sama-sama berbahaya jika menggigit pada malam hari.', 'Aedes aegypti menyukai air kotor, sedangkan nyamuk biasa menyukai air bersih.', 'Cara mencegah Aedes aegypti adalah menguras bak mandi, sedangkan nyamuk biasa dengan membersihkan selokan.', 'Nyamuk biasa memiliki belang hitam-putih, sedangkan Aedes aegypti tidak.'], 
    jawaban: 2, 
    explanation: 'Aedes di air bersih (bak mandi) dan Culex di air kotor (selokan). Tindakan pencegahan harus sesuai habitatnya.',
    insight: 'Butuh pemahaman komparatif. Siswa salah jika mencampuradukkan data habitat kedua nyamuk.'
  },
  { 
    id: 8, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Berdasarkan teks tentang nyamuk pada soal sebelumnya, apa yang sebaiknya kamu lakukan jika melihat ban bekas yang terisi air hujan di halaman rumahmu?', 
    opsi: ['Dibiarkan saja karena air hujan sangat bersih dan segar.', 'Segera membuang airnya dan mengubur atau mendaur ulang ban tersebut.', 'Menyemprotnya dengan pewangi ruangan agar tidak bau.', 'Memindahkan ban tersebut ke dalam rumah agar nyamuk tidak masuk.'], 
    jawaban: 1, 
    explanation: 'Ban bekas berisi air hujan adalah habitat air bersih yang sangat disukai nyamuk Aedes aegypti untuk bertelur.',
    insight: 'Penerapan teori ke praktik nyata. Siswa salah jika menganggap air hujan bersih itu aman.'
  },
  { 
    id: 9, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'inferensi',
    teks: '"Meskipun di sekolah sudah disediakan fasilitas kotak sampah yang terpisah (organik dan anorganik), beberapa siswa masih sering membuang bungkus plastik ke kotak sampah daun."\n\nKalimat tersebut menunjukkan adanya masalah berupa...', 
    opsi: ['Kurangnya fasilitas tempat sampah di sekolah.', 'Tidak adanya petugas kebersihan yang berjaga.', 'Kurangnya kesadaran dan kepedulian siswa terhadap pemilahan sampah.', 'Plastik dan daun memiliki jenis sampah yang sama.'], 
    jawaban: 2, 
    explanation: 'Fasilitas sudah ada, tetapi perilaku siswanya yang salah. Ini menunjukkan masalah kesadaran/kepedulian.',
    insight: 'Membiasakan siswa mencari akar masalah dari suatu fenomena sosial.'
  },
  { 
    id: 10, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'analisis',
    teks: 'Perhatikan kalimat surat resmi berikut!\n"Dengan hormat, kami mengundang bapak/ibu wali murid untuk hadir pada acara pengambilan raport yang akan dilaksanakan pada Hari senin."\n\nKesalahan penggunaan huruf kapital pada kalimat di atas terdapat pada kata...', 
    opsi: ['Hormat dan Hadir', 'Bapak/ibu dan senin', 'Mengundang dan Raport', 'Acara dan Hari'], 
    jawaban: 1, 
    explanation: 'Sapaan resmi harus menggunakan huruf kapital (Bapak/Ibu), dan nama hari juga harus diawali kapital (Senin).',
    insight: 'Ketelitian PUEBI dasar yang sering diremehkan siswa saat menulis.'
  },
  { 
    id: 11, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'inferensi',
    teks: 'Rani melihat seorang nenek kesulitan menyeberang jalan. Tanpa pikir panjang, Rani langsung menghampiri dan menuntun nenek tersebut dengan sabar hingga sampai di seberang. Teman-teman Rani memujinya.\n\nSikap Rani sangat sesuai dengan peribahasa...', 
    opsi: ['Berakit-rakit ke hulu, berenang-renang ke tepian', 'Bagaikan air dengan minyak', 'Ringan tangan, berat perut', 'Ringan tulang, mudah menolong (Ringan tangan)'], 
    jawaban: 3, 
    explanation: 'Sikap suka menolong dan cepat bertindak diistilahkan dengan peribahasa/ungkapan "ringan tulang" atau "ringan tangan".',
    insight: 'Penguasaan peribahasa sesuai konteks tindakan moral.'
  },
  { 
    id: 12, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'hard', skill: 'sebab-akibat',
    teks: 'Warga desa bergotong royong membersihkan selokan setiap bulan. Mengapa menjaga kebersihan selokan di lingkungan tempat tinggal sangat berkaitan erat dengan kesehatan warga? Jelaskan alasan logismu!', 
    keywords: [
      { kata: ['nyamuk', 'dbd', 'demam berdarah'], wajib: true, bobot: 40 },
      { kata: ['penyakit', 'bakteri', 'kuman'], wajib: true, bobot: 30 },
      { kata: ['banjir', 'genangan', 'mampet'], wajib: false, bobot: 20 },
      { kata: ['kesehatan', 'bersih'], wajib: false, bobot: 10 }
    ], 
    explanation: 'Selokan kotor/mampet = genangan air. Genangan = sarang nyamuk DBD & bakteri. Selokan bersih = genangan hilang = rantai penyakit terputus.',
    insight: 'Banyak siswa salah karena hanya menjawab "agar tidak banjir" tanpa mengaitkannya secara logis dengan penyebab biologis (nyamuk/penyakit).'
  },
  { 
    id: 13, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'analisis',
    teks: 'Berdasarkan teks tentang "Desa Sukatani", jelaskan minimal 2 dampak positif penanaman pohon aren bagi desa tersebut, dilihat dari segi EKONOMI (keuangan) dan EKOLOGI (lingkungan)!', 
    keywords: [
      { kata: ['air', 'tanah', 'hijau', 'menyerap', 'akar'], wajib: true, bobot: 50 },
      { kata: ['gula', 'uang', 'penghasilan', 'jual'], wajib: true, bobot: 50 }
    ], 
    explanation: 'Ekologi: Pohon rimbun & akar menyimpan cadangan air. Ekonomi: Tambahan penghasilan dari jual gula aren.',
    insight: 'Kesalahan umum: Siswa gagal membedakan mana yang dampak ekonomi dan mana yang dampak ekologi, sering terjawab tumpang tindih.'
  },
  { 
    id: 14, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'hard', skill: 'logika',
    teks: 'Saat ulangan, Budi melihat Anton sedang menyontek. Budi membiarkannya karena merasa kasihan jika Anton mendapat nilai jelek. \n\nMenurut pendapatmu, mengapa tindakan Budi "membiarkan Anton menyontek" justru merusak masa depan Anton? Jelaskan alasanmu dari segi pembentukan karakter!', 
    keywords: [
      { kata: ['bohong', 'jujur', 'curang'], wajib: true, bobot: 40 },
      { kata: ['mandiri', 'usaha', 'berusaha'], wajib: true, bobot: 30 },
      { kata: ['malas', 'bodoh', 'bergantung'], wajib: false, bobot: 20 },
      { kata: ['terbiasa', 'kebiasaan'], wajib: false, bobot: 10 }
    ], 
    explanation: 'Mendukung ketidakjujuran membuat Anton terbiasa curang. Anton tidak akan mandiri, menjadi pemalas, dan kehilangan kemampuan berusaha sendiri di masa depan.',
    insight: 'Siswa sering menjawab terlalu dangkal seperti "karena menyontek itu dosa", tanpa menjelaskan rantai sebab-akibat pembentukan karakter mentalitas pemalas.'
  },
  { 
    id: 15, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'inferensi',
    teks: 'Kamu ditugaskan menulis laporan pengamatan tentang kondisi sampah di pasar tradisional. Mengapa dalam menulis laporan pengamatan, kita harus menggunakan fakta atau data nyata dan TIDAK BOLEH memasukkan karangan/pendapat pribadi yang berlebihan?', 
    keywords: [
      { kata: ['fakta', 'nyata', 'sebenarnya'], wajib: true, bobot: 40 },
      { kata: ['objektif', 'akurat', 'pasti'], wajib: true, bobot: 30 },
      { kata: ['bukti', 'data'], wajib: false, bobot: 20 },
      { kata: ['informasi', 'pembaca'], wajib: false, bobot: 10 }
    ], 
    explanation: 'Laporan pengamatan harus memberikan informasi akurat. Jika diisi karangan, informasi menjadi subjektif dan tidak valid sebagai acuan data.',
    insight: 'Banyak siswa yang belum memahami konsep dasar penulisan saintifik/laporan, di mana validitas data lebih penting dari opini.'
  },
  { 
    id: 16, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'pecahan',
    teks: 'Perhatikan data sumbangan beras kelas 6 untuk korban bencana:\n- Kelas 6A: 25,5 kg\n- Kelas 6B: 30 kg\n- Kelas 6C: 24,5 kg\n\nBeras tersebut akan disalurkan dalam kantong plastik yang masing-masing berisi 2,5 kg. Berapa banyak kantong beras yang bisa dibuat oleh panitia?', 
    opsi: ['30 kantong', '32 kantong', '35 kantong', '40 kantong'], 
    jawaban: 1, 
    explanation: 'Total = 80 kg. Jumlah kantong = 80 / 2,5 = 32 kantong.',
    insight: 'Siswa salah hitung pada pembagian desimal 80 dibagi 2,5.'
  },
  { 
    id: 17, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'pecahan',
    teks: 'Berdasarkan soal sebelumnya (ada 32 kantong beras), jika sebanyak 8 kantong telah dibagikan ke panti asuhan terdekat, berapa persentase sisa kantong beras yang belum dibagikan?', 
    opsi: ['25%', '70%', '75%', '80%'], 
    jawaban: 2, 
    explanation: 'Sisa = 32 - 8 = 24 kantong. Persentase = (24/32) x 100% = 3/4 x 100% = 75%.',
    insight: 'Siswa sering keliru menghitung 8/32 = 25% sebagai sisa, padahal itu adalah persentase yang SUDAH dibagikan.'
  },
  { 
    id: 18, mapel: 'Matematika', type: 'pg', difficulty: 'easy', skill: 'analisis',
    teks: 'Dari data sumbangan beras di atas (6A=25,5kg; 6B=30kg; 6C=24,5kg), berapakah rata-rata (mean) sumbangan beras dari setiap kelas?', 
    opsi: ['24 kg', '25 kg', '26,6 kg', '28 kg'], 
    jawaban: 2, 
    explanation: 'Rata-rata = 80 / 3 = 26,666... kg (dibulatkan 26,6 kg).',
    insight: 'Konsep dasar statistika (mean). Kesalahan umum ada di akurasi pembagian.'
  },
  { 
    id: 19, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Keluarga Budi naik kereta api dari Jakarta menuju Cirebon. Kereta berangkat tepat pada pukul 08.15. Waktu tempuh perjalanan adalah 2 jam 45 menit. Jika kereta sempat berhenti untuk transit (menunggu jalur) selama 20 menit, pada pukul berapakah keluarga Budi tiba di Cirebon?', 
    opsi: ['10.40', '11.00', '11.20', '11.30'], 
    jawaban: 2, 
    explanation: 'Waktu tempuh + transit = 3 jam 5 menit. 08.15 + 3 jam 5 menit = Pukul 11.20.',
    insight: 'Siswa tidak memasukkan waktu transit (20 menit) ke dalam total durasi perjalanan.'
  },
  { 
    id: 20, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Sebuah peta pulau Jawa memiliki skala 1 : 1.500.000. Jarak antara kota X dan kota Y pada peta tersebut adalah 4 cm. Jika Ayah mengendarai mobil dari kota X ke Y dengan kecepatan rata-rata 60 km/jam, berapa lama waktu yang dibutuhkan Ayah untuk sampai?', 
    opsi: ['1 jam', '2 jam', '3 jam', '4 jam'], 
    jawaban: 0, 
    explanation: 'Jarak = 4 x 1.500.000 = 6.000.000 cm = 60 km. Waktu = 60 / 60 = 1 jam.',
    insight: 'Soal berlapis: konversi skala dulu, baru gunakan rumus JKW (Jarak-Kecepatan-Waktu).'
  },
  { 
    id: 21, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'pecahan',
    teks: 'Sebuah bak penampungan air berbentuk balok (panjang 2m, lebar 1m, tinggi 1m). Jika setelah hujan lebat bak tersebut terisi air 3/4 bagian dari kapasitas penuhnya, berapa liter volume air hujan di dalamnya? (1 m³ = 1.000 liter)', 
    opsi: ['1.000 liter', '1.500 liter', '2.000 liter', '2.500 liter'], 
    jawaban: 1, 
    explanation: 'Volume total = 2 x 1 x 1 = 2 m³ = 2.000 liter. Air = 3/4 x 2.000 = 1.500 liter.',
    insight: 'Siswa lupa mengonversi m³ ke liter atau lupa mengalikan dengan 3/4.'
  },
  { 
    id: 22, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'logika',
    teks: 'Sebuah taman desa berbentuk persegi panjang (20m x 15m). Di sekeliling bagian dalam taman akan dibuat jalan setapak berbatu selebar 1 meter. Berapakah luas jalan setapak tersebut?', 
    opsi: ['66 m²', '74 m²', '134 m²', '300 m²'], 
    jawaban: 0, 
    explanation: 'Luas total = 300 m². Ukuran area dalam = (20-2) x (15-2) = 18 x 13 = 234 m². Luas jalan = 300 - 234 = 66 m².',
    insight: 'Kesalahan fatal: Siswa hanya mengurangi 1 meter, padahal lebar jalan ada di kiri-kanan/atas-bawah (harus dikurangi 2).'
  },
  { 
    id: 23, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Koperasi memberikan diskon 10% untuk buku tulis. Harga normal 1 buku adalah Rp4.000, 1 pulpen Rp2.000. Jika Ani membeli 4 buku tulis dan 3 pulpen dengan uang Rp25.000, berapakah uang kembaliannya?', 
    opsi: ['Rp4.600', 'Rp5.400', 'Rp6.000', 'Rp20.400'], 
    jawaban: 0, 
    explanation: 'Buku setelah diskon = Rp3.600. Belanja = (4 x 3.600) + (3 x 2.000) = 14.400 + 6.000 = 20.400. Kembalian = 25.000 - 20.400 = 4.600.',
    insight: 'Siswa menghitung diskon di akhir untuk seluruh barang, padahal diskon HANYA untuk buku.'
  },
  { 
    id: 24, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Suhu daging sapi beku adalah -4°C. Setiap 5 menit, suhunya naik 3°C. Berapakah suhu daging setelah dibiarkan selama 20 menit?', 
    opsi: ['8°C', '12°C', '16°C', '20°C'], 
    jawaban: 0, 
    explanation: 'Kenaikan 4 kali (20/5). Total kenaikan = 12°C. Suhu akhir = -4 + 12 = 8°C.',
    insight: 'Kesalahan operasi bilangan bulat negatif ditambah positif (-4 + 12 sering dijawab -16 atau 16).'
  },
  { 
    id: 25, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Perbandingan ayam dan bebek adalah 3 : 5. Jika selisih jumlah bebek dan ayam adalah 14 ekor, berapakah total keseluruhan unggas yang dimiliki?', 
    opsi: ['42 ekor', '48 ekor', '56 ekor', '70 ekor'], 
    jawaban: 2, 
    explanation: 'Selisih rasio = 2 (setara 14 ekor). Pengali = 14/2 = 7. Total rasio = 8. Total ekor = 8 x 7 = 56.',
    insight: 'Penggunaan prinsip perbandingan tidak langsung (harus membagi nilai selisih dengan rasio selisih).'
  },
  { 
    id: 26, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'analisis',
    teks: 'Pabrik tahu tempe "Makmur" mencatat hasil produksinya. Pada bulan Januari menghasilkan 40 kuintal. Pada bulan Februari, produksi menurun 25% akibat cuaca buruk. Di bulan Maret, produksi kembali naik sebanyak 10 kuintal dari bulan Februari. \n\nJelaskan langkah logismu untuk mencari TOTAL produksi tahu tempe selama tiga bulan tersebut!', 
    keywords: [
      { kata: ['110', 'seratus sepuluh'], wajib: true, bobot: 40 },
      { kata: ['30', 'tiga puluh'], wajib: true, bobot: 30 },
      { kata: ['40', 'empat puluh'], wajib: false, bobot: 15 },
      { kata: ['tambah', 'kurang', 'total'], wajib: false, bobot: 15 }
    ], 
    explanation: 'Feb: 40 - (25%x40) = 30. Mar: 30 + 10 = 40. Total = 40 + 30 + 40 = 110 kuintal.',
    insight: 'Banyak siswa langsung mengalikan persentase lalu menjumlahkan tanpa mengurangi produksi awal Februari terlebih dahulu.'
  },
  { 
    id: 27, mapel: 'Matematika', type: 'esai', difficulty: 'hard', skill: 'logika',
    teks: 'Sebuah kardus paket memiliki panjang 50 cm, lebar 40 cm, dan tinggi 30 cm. Kardus ini akan diisi kotak teh berbentuk kubus bersisi 15 cm. \n\nJika dihitung menggunakan volume total (60.000 / 3.375), seolah bisa menampung 17 kotak. Namun nyatanya di dunia nyata maksimal hanya muat 12 kotak. Jelaskan secara logika dimensi (panjang, lebar, tinggi), mengapa hanya muat 12 kotak?', 
    keywords: [
      { kata: ['dimensi', 'ukuran', 'panjang', 'lebar', 'tinggi'], wajib: true, bobot: 30 },
      { kata: ['tidak muat', 'terpotong', 'dibelah'], wajib: true, bobot: 40 },
      { kata: ['utuh', 'sisa', 'ruang'], wajib: false, bobot: 30 }
    ], 
    explanation: 'Kotak teh benda padat (tidak bisa dipotong). Panjang 50cm sisa 5cm (muat 3). Lebar 40cm sisa 10cm (muat 2). Tinggi 30cm pas (muat 2). 3x2x2 = 12 kotak utuh.',
    insight: 'Soal jebakan (HOTS tertinggi). Kebanyakan siswa terjebak rumus matematis buta tanpa membayangkan implementasi fisik benda 3D yang tidak bisa "dicairkan".'
  },
  { 
    id: 28, mapel: 'Matematika', type: 'esai', difficulty: 'hard', skill: 'pecahan',
    teks: 'Ibu memberikan 1/3 bagian martabak untuk kakak, dan 1/4 bagian untuk tetangga. Setelah dihitung, sisa martabak milik Ibu yang belum dipotong adalah 10 potong. \n\nJelaskan cara mencari tahu berapa jumlah total potongan martabak Ibu mula-mula!', 
    keywords: [
      { kata: ['24', 'dua puluh empat'], wajib: true, bobot: 40 },
      { kata: ['5/12', 'sisa', '7/12'], wajib: true, bobot: 30 },
      { kata: ['disamakan', 'samakan', 'penyebut'], wajib: false, bobot: 30 }
    ], 
    explanation: 'Diberikan: 1/3 + 1/4 = 7/12. Sisa: 1 - 7/12 = 5/12. Jika 5/12 = 10 potong, maka total keseluruhan (12/12) adalah (12/5) x 10 = 24 potong.',
    insight: 'Kesulitan terbesar siswa adalah membalikkan logika dari pecahan sisa menjadi nilai bilangan asli awal.'
  },
  { 
    id: 29, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'logika',
    teks: 'Di mal, Toko A promosi "Diskon 50%", sedangkan Toko B promosi "Diskon 30% + 20%". \n\nJika sepatu harganya sama (misal Rp100.000), toko manakah yang memberikan harga bayar LEBIH MURAH? Buktikan perhitunganmu!', 
    keywords: [
      { kata: ['toko a'], wajib: true, bobot: 40 },
      { kata: ['50.000', '50 ribu'], wajib: true, bobot: 20 },
      { kata: ['bertingkat', 'dua kali', '56.000'], wajib: true, bobot: 40 }
    ], 
    explanation: 'Toko A: diskon 50rb = bayar 50rb. Toko B (bertingkat): Diskon 30% dari 100rb = bayar 70rb. Diskon lagi 20% dari 70rb (14rb) = bayar 56rb. Toko A lebih murah.',
    insight: 'Ilusi angka promosi mal. Siswa awam akan langsung menjumlah 30+20=50, menganggap nilainya sama, padahal diskon bertingkat dikenakan pada sisa harga.'
  },
  { 
    id: 30, mapel: 'Matematika', type: 'esai', difficulty: 'easy', skill: 'analisis',
    teks: 'Pak Rahmat memiliki simpanan emas sebanyak 100 gram (mencapai haul). Harga emas saat ini adalah Rp1.000.000 per gram. Zakat maal untuk emas yang wajib dikeluarkan adalah 2,5%.\n\nJelaskan langkah menghitung besaran uang (nominal) zakat yang wajib dikeluarkan oleh Pak Rahmat!', 
    keywords: [
      { kata: ['2.500.000', '2,5 juta', '2.5 juta'], wajib: true, bobot: 50 },
      { kata: ['100.000.000', '100 juta'], wajib: true, bobot: 30 },
      { kata: ['kali', 'dikali', 'persen'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Total harta = 100 x 1.000.000 = Rp100.000.000. Zakat = 2,5% x 100.000.000 = Rp2.500.000.',
    insight: 'Hanya operasi matematika dasar, kesalahan umumnya murni di kelebihan/kekurangan angka nol.'
  },
  { 
    id: 31, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'ide pokok',
    teks: 'Bacalah paragraf berikut!\n\nHutan mangrove memiliki peran yang sangat krusial bagi lingkungan pesisir pantai. Akar-akarnya yang kuat mampu menahan hempasan ombak sehingga mencegah terjadinya abrasi. Selain itu, kawasan mangrove juga menjadi habitat alami bagi berbagai jenis ikan, udang, dan kepiting untuk berkembang biak. Oleh karena itu, kelestarian hutan mangrove harus terus dijaga oleh semua pihak.\n\nIde pokok dari paragraf tersebut adalah...', 
    opsi: ['Akar mangrove sangat kuat menahan ombak.', 'Mangrove adalah tempat hidup ikan dan kepiting.', 'Peran penting hutan mangrove bagi lingkungan pesisir.', 'Semua pihak wajib menanam mangrove di pantai.'], 
    jawaban: 2, 
    explanation: 'Ide pokok adalah gagasan utama yang mendasari seluruh paragraf. Kalimat pertama merupakan kalimat utama yang menyatakan peran krusial mangrove, sedangkan kalimat lainnya adalah penjelas.',
    insight: 'Siswa sering terjebak memilih kalimat penjelas (opsi A atau B) karena terdengar spesifik, padahal ide pokok harus mencakup keseluruhan isi.'
  },
  { 
    id: 32, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'makna kata',
    teks: 'Berdasarkan teks tentang "Hutan Mangrove" di atas, makna kata "abrasi" adalah...', 
    opsi: ['Penanaman pohon kembali di wilayah yang gersang.', 'Pengikisan tanah di pesisir pantai oleh gelombang air laut.', 'Proses perkembangbiakan ikan di sela-sela akar pohon.', 'Pencemaran air laut akibat tumpahan minyak.'], 
    jawaban: 1, 
    explanation: 'Dalam konteks lingkungan pesisir, abrasi adalah proses pengikisan pantai oleh tenaga gelombang laut dan arus laut yang bersifat merusak.',
    insight: 'Siswa yang kurang kosakata sering menebak makna kata hanya dari kata-kata di sekitarnya tanpa pemahaman konsep geografi dasar.'
  },
  { 
    id: 33, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'hard', skill: 'inferensi',
    teks: 'Berdasarkan teks "Hutan Mangrove" tersebut, apa yang kemungkinan besar akan terjadi pada para nelayan tradisional jika hutan mangrove di daerah mereka ditebang habis untuk dijadikan pabrik?', 
    opsi: ['Penghasilan nelayan akan meningkat karena bisa bekerja di pabrik.', 'Hasil tangkapan ikan dan udang nelayan akan menurun drastis.', 'Nelayan tidak akan terpengaruh karena mereka mencari ikan di tengah laut.', 'Desa nelayan akan menjadi lebih modern dan aman dari ombak.'], 
    jawaban: 1, 
    explanation: 'Inferensi logis: Jika mangrove adalah habitat berkembang biak ikan/udang (teks), maka hilangnya mangrove akan menghilangkan habitat tersebut, berakibat pada turunnya populasi ikan dan turunnya hasil tangkapan nelayan.',
    insight: 'Siswa gagal menghubungkan informasi "habitat ikan" dengan "kehidupan nelayan", dan sering terkecoh opsi logika ekonomi semu (opsi A).'
  },
  { 
    id: 34, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'sebab-akibat',
    teks: '"Koperasi sekolah kita mengadopsi prinsip dari anggota, oleh anggota, dan untuk anggota. Akhir tahun lalu, koperasi mendapatkan keuntungan bersih sebesar Rp5.000.000. Sesuai kesepakatan, 40% dari keuntungan tersebut dikembalikan kepada para siswa yang terdaftar sebagai anggota dalam bentuk Sisa Hasil Usaha (SHU)."\n\nMengapa para siswa berhak mendapatkan sebagian dari keuntungan koperasi tersebut?', 
    opsi: ['Karena siswa adalah pemilik modal sekaligus pelanggan utama koperasi.', 'Karena koperasi sekolah selalu memberikan uang saku tambahan.', 'Karena sekolah ingin membagikan uang kepada siswa yang kurang mampu.', 'Karena uang tersebut adalah dana bantuan dari pemerintah daerah.'], 
    jawaban: 0, 
    explanation: 'Koperasi menganut prinsip kepemilikan bersama. Siswa yang menjadi anggota adalah pemilik (membayar simpanan) dan juga konsumen (belanja di sana), sehingga berhak atas SHU.',
    insight: 'Siswa kurang memahami konsep dasar ekonomi koperasi dan menganggapnya sebagai bentuk bantuan/sedekah sekolah.'
  },
  { 
    id: 35, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'analisis teks',
    teks: 'Berdasarkan teks tentang "Koperasi" di atas, jika Budi bukan anggota koperasi namun sering berbelanja di sana, apakah Budi akan mendapatkan pembagian SHU di akhir tahun?', 
    opsi: ['Ya, karena Budi sering berbelanja di sana.', 'Ya, karena Budi adalah siswa di sekolah tersebut.', 'Tidak, karena SHU hanya dibagikan kepada siswa yang terdaftar sebagai anggota.', 'Tidak, karena Budi tidak pernah membayar belanjaannya.'], 
    jawaban: 2, 
    explanation: 'Teks menyatakan dengan jelas bahwa SHU dikembalikan kepada "siswa yang terdaftar sebagai anggota".',
    insight: 'Siswa tidak membaca detail syarat penerima SHU pada teks dan hanya menggunakan asumsi "karena dia belanja, dia dapat bagian".'
  },
  { 
    id: 36, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'inferensi',
    teks: 'Bacalah teks berikut!\n\nAkhir-akhir ini, banyak anak sekolah dasar yang mengalami masalah obesitas (kegemukan ekstrim). Dokter spesialis anak menyebutkan bahwa salah satu pemicu utamanya adalah kebiasaan mengonsumsi makanan instan dan minuman kemasan yang tinggi gula, ditambah lagi dengan kurangnya aktivitas fisik karena terlalu lama bermain gawai.\n\nKesimpulan utama dari paragraf di atas adalah...', 
    opsi: ['Bermain gawai membuat anak menjadi lebih pintar.', 'Makanan instan sangat disukai oleh anak-anak sekolah dasar.', 'Obesitas pada anak disebabkan oleh pola makan buruk dan kurang gerak.', 'Dokter spesialis melarang anak-anak makan di sekolah.'], 
    jawaban: 2, 
    explanation: 'Paragraf tersebut membahas masalah (obesitas) beserta pemicu utamanya (makanan tinggi gula & kurang gerak). Kesimpulan terbaik merangkum hubungan sebab-akibat ini.',
    insight: 'Sebagian siswa memilih jawaban yang benar secara fakta di dunia nyata (opsi B) tetapi bukan merupakan kesimpulan dari teks.'
  },
  { 
    id: 37, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'makna kata',
    teks: 'Pada teks tentang obesitas di atas, terdapat kata "pemicu". Sinonim (persamaan makna) yang paling tepat untuk kata tersebut adalah...', 
    opsi: ['Penyebab', 'Penghalang', 'Akibat', 'Penyembuh'], 
    jawaban: 0, 
    explanation: 'Pemicu berarti sesuatu yang mengakibatkan atau menyebabkan suatu kejadian.',
    insight: 'Siswa kadang tertukar antara "penyebab" dan "akibat".'
  },
  { 
    id: 38, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'hard', skill: 'sebab-akibat',
    teks: 'Andi adalah anak yang sangat suka minum es boba manis setiap pulang sekolah dan menghabiskan sore harinya dengan bermain *game* di sofa. Berdasarkan informasi pada teks medis sebelumnya, risiko apa yang mengintai kesehatan Andi di masa depan?', 
    opsi: ['Andi akan memiliki banyak teman di dunia maya.', 'Andi berisiko tinggi mengalami obesitas karena gula berlebih dan kurang gerak.', 'Andi akan menjadi atlet *e-sports* profesional.', 'Andi akan kekurangan gizi karena es boba tidak mengenyangkan.'], 
    jawaban: 1, 
    explanation: 'Menghubungkan perilaku tokoh dengan teori pada teks: Minum manis (gula tinggi) + main game di sofa (kurang fisik) = risiko obesitas.',
    insight: 'Soal aplikasi teori ke studi kasus. Siswa yang tidak fokus pada konteks "kesehatan" bisa terkecoh dengan opsi C.'
  },
  { 
    id: 39, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Cut Nyak Dien adalah salah satu pahlawan nasional dari Aceh. Walaupun suaminya telah gugur di medan perang, ia menolak untuk menyerah kepada penjajah Belanda. Ia memimpin pasukan bergerilya di hutan-hutan dengan kondisi mata yang mulai rabun dan penyakit encok, demi mempertahankan tanah kelahirannya.\n\nSifat keteladanan utama yang ditunjukkan oleh Cut Nyak Dien pada cerita di atas adalah...', 
    opsi: ['Cerdas dan pandai bersembunyi', 'Pantang menyerah dan rela berkorban', 'Keras kepala dan pemarah', 'Penyayang dan lembut hati'], 
    jawaban: 1, 
    explanation: 'Keteladanan difokuskan pada sikapnya menolak menyerah meski suami gugur dan fisiknya sakit (pantang menyerah & rela berkorban).',
    insight: 'Siswa sering tidak bisa menyimpulkan sifat dari deskripsi tindakan, hanya melihat fakta fisik (bersembunyi di hutan).'
  },
  { 
    id: 40, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'makna kata',
    teks: 'Belanda pada akhirnya memimpin Aceh dengan "tangan besi" setelah berhasil memadamkan beberapa pemberontakan besar.\n\nMakna ungkapan "tangan besi" pada kalimat tersebut adalah...', 
    opsi: ['Menggunakan sarung tangan dari besi', 'Memimpin dengan sangat kaya dan makmur', 'Memimpin dengan keras, kejam, dan otoriter', 'Memimpin dengan jujur dan adil'], 
    jawaban: 2, 
    explanation: 'Ungkapan tangan besi merujuk pada gaya kepemimpinan yang keras, tidak kenal ampun, atau diktator.',
    insight: 'Kosakata ungkapan kiasan. Siswa yang membaca secara harfiah akan memilih opsi A.'
  },
  { 
    id: 41, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'hard', skill: 'logika',
    teks: 'Dari kisah Cut Nyak Dien, kita belajar bahwa perjuangan tidak selalu dilakukan dengan kondisi fisik yang sempurna. Bagaimana kamu menerapkan nilai perjuangan ini dalam kehidupanmu sebagai seorang pelajar?', 
    opsi: ['Berhenti sekolah jika merasa sakit ringan.', 'Tetap rajin belajar dan mengerjakan tugas meskipun tidak memiliki fasilitas semewah teman-teman lain.', 'Minta dibelikan kacamata mahal jika mata mulai rabun.', 'Melawan guru yang memberikan tugas terlalu banyak.'], 
    jawaban: 1, 
    explanation: 'Penerapan nilai (kontekstualisasi). Pantang menyerah walau kondisi tidak ideal dianalogikan dengan tetap belajar walau fasilitas terbatas.',
    insight: 'Siswa gagal melakukan transfer nilai historis ke konteks kehidupan pelajar masa kini (HOTS).'
  },
  { 
    id: 42, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'ide pokok',
    teks: 'Proses terjadinya hujan diawali dengan pemanasan air laut, sungai, dan danau oleh sinar matahari. Pemanasan ini menyebabkan air menguap ke udara, yang disebut proses evaporasi. Uap air tersebut kemudian berkumpul di langit membentuk awan. Ketika awan sudah jenuh dan suhu mendingin, turunlah rintik-rintik air ke bumi sebagai hujan.\n\nTopik utama yang dibahas pada paragraf tersebut adalah...', 
    opsi: ['Pemanasan air laut', 'Proses terbentuknya hujan (siklus air)', 'Suhu udara yang mendingin', 'Macam-macam sumber air di bumi'], 
    jawaban: 1, 
    explanation: 'Keseluruhan paragraf menjelaskan urutan/kronologi bagaimana hujan terjadi (siklus air).',
    insight: 'Topik utama merangkum semua kalimat, bukan hanya mengambil kalimat pertama (opsi A).'
  },
  { 
    id: 43, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Berdasarkan teks tentang hujan di atas, apa yang menyebabkan uap air di udara akhirnya jatuh kembali ke bumi sebagai rintik hujan?', 
    opsi: ['Karena awan tertiup angin ke daratan.', 'Karena sinar matahari terlalu panas.', 'Karena awan sudah jenuh (penuh) dan suhu udara mendingin.', 'Karena air laut sudah habis menguap.'], 
    jawaban: 2, 
    explanation: 'Berdasarkan kalimat terakhir: "Ketika awan sudah jenuh dan suhu mendingin, turunlah rintik-rintik air..."',
    insight: 'Pertanyaan ekstraksi informasi literal bersyarat. Kesalahan karena siswa tidak teliti mencari *keyword* penentu (jenuh & dingin).'
  },
  { 
    id: 44, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'hard', skill: 'sebab-akibat',
    teks: 'Jika pada musim kemarau panjang suhu bumi sangat panas namun tidak ada awan yang terbentuk di langit suatu daerah, kesimpulan logis dari fenomena tersebut adalah...', 
    opsi: ['Daerah tersebut memiliki banyak sungai dan danau besar.', 'Tingkat evaporasi (penguapan) air sangat rendah karena daerah tersebut kekurangan sumber air permukaan.', 'Matahari tidak bersinar cukup terang di daerah tersebut.', 'Awan berubah menjadi asap polusi pabrik.'], 
    jawaban: 1, 
    explanation: 'Berdasarkan teks, awan dibentuk dari evaporasi sumber air. Jika sangat panas tapi tidak ada awan, berarti tidak ada air yang bisa diuapkan (kekeringan ekstrem/kurang sumber air).',
    insight: 'Siswa harus membalik logika: jika A (air) + B (panas) = C (awan), maka jika ada B tapi C tidak terjadi, berarti A tidak ada.'
  },
  { 
    id: 45, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'inferensi',
    teks: 'Kancil melihat seekor induk burung puyuh menangis karena telur-telurnya terjatuh ke dekat sungai yang sedang meluap. Walaupun Kancil takut air, ia segera berlari mencari daun talas yang lebar, merangkai ranting, dan dengan sigap menyelamatkan telur-telur itu sesaat sebelum tersapu arus.\n\nWatak tokoh Kancil dalam kutipan fabel tersebut adalah...', 
    opsi: ['Pintar menipu dan egois', 'Penakut dan mudah menyerah', 'Cerdik, sigap, dan penolong', 'Sombong dan suka pamer'], 
    jawaban: 2, 
    explanation: 'Tindakan Kancil mencari solusi (daun talas, ranting) menunjukkan kecerdikan dan kesigapan, serta tujuannya menyelamatkan telur menunjukkan ia penolong.',
    insight: 'Beberapa siswa memiliki stigma "Kancil pasti penipu" dari cerita lain, sehingga bias dan tidak membaca teks dengan objektif.'
  },
  { 
    id: 46, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Apa konflik (masalah utama) yang terjadi pada kutipan fabel Kancil dan burung puyuh di atas?', 
    opsi: ['Kancil sangat takut dengan air sungai.', 'Burung puyuh bertengkar dengan kancil di pinggir sungai.', 'Telur burung puyuh terancam hanyut oleh luapan air sungai.', 'Sungai meluap dan menenggelamkan hutan.'], 
    jawaban: 2, 
    explanation: 'Masalah yang menggerakkan seluruh aksi cerita adalah kondisi telur yang jatuh dan terancam tersapu arus luapan sungai.',
    insight: 'Siswa sering keliru membedakan antara keadaan tokoh (takut air) dengan konflik utama cerita (telur terancam).'
  },
  { 
    id: 47, mapel: 'Bahasa Indonesia', type: 'pg', difficulty: 'easy', skill: 'makna kata',
    teks: 'Dalam fabel tersebut, Kancil digambarkan bertindak dengan "sigap". Arti kata sigap yang paling tepat adalah...', 
    opsi: ['Sangat lambat', 'Cepat dan tangkas bertindak', 'Ragu-ragu', 'Penuh perhitungan matematis'], 
    jawaban: 1, 
    explanation: 'Sigap berarti tangkas, cepat, dan kuat dalam merespons sesuatu.',
    insight: 'Siswa yang jarang membaca buku fiksi biasanya tidak familiar dengan kata sifat deskriptif seperti "sigap".'
  },
  { 
    id: 48, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'hard', skill: 'sebab-akibat',
    teks: 'Banyak sampah plastik di laut terpecah menjadi potongan sangat kecil yang disebut mikroplastik. Mikroplastik ini sering tidak sengaja dimakan oleh ikan. \n\nJelaskan secara logis bagaimana sampah plastik yang dibuang ke laut tersebut pada akhirnya dapat membahayakan kesehatan MANUSIA!', 
    keywords: [
      { kata: ['dimakan', 'konsumsi', 'makan'], wajib: true, bobot: 40 },
      { kata: ['ikan', 'seafood', 'laut'], wajib: true, bobot: 30 },
      { kata: ['masuk', 'tubuh', 'manusia', 'kita'], wajib: true, bobot: 30 }
    ], 
    explanation: 'Rantai makanan: Plastik jadi mikroplastik -> dimakan ikan -> ikan tersebut ditangkap nelayan -> ikan dimasak dan dimakan oleh manusia -> plastik masuk ke tubuh manusia dan memicu penyakit.',
    insight: 'Siswa sering berhenti pada "ikan mati" tanpa melanjutkan logika rantai makanan hingga dampaknya sampai kembali ke manusia.'
  },
  { 
    id: 49, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'analisis',
    teks: 'Penggunaan *smartphone* atau gawai yang berlebihan pada anak-anak sering kali membuat mereka menjadi "autis" terhadap lingkungan sekitarnya. \n\nJelaskan 2 (dua) dampak negatif kecanduan gawai terhadap kehidupan SOSIAL (hubungan dengan orang lain) seorang anak!', 
    keywords: [
      { kata: ['interaksi', 'komunikasi', 'ngobrol', 'bicara'], wajib: true, bobot: 40 },
      { kata: ['teman', 'keluarga', 'orang tua', 'bermain'], wajib: true, bobot: 30 },
      { kata: ['acuh', 'cuek', 'individualis', 'menyendiri'], wajib: false, bobot: 30 }
    ], 
    explanation: 'Dampak sosial: 1) Kurangnya komunikasi/interaksi langsung dengan keluarga dan teman. 2) Menjadi pribadi yang cuek, menyendiri, dan kurang empati terhadap kejadian di dunia nyata.',
    insight: 'Banyak siswa malah menjawab dampak kesehatan (mata rusak, sakit leher) padahal soal secara spesifik menanyakan dampak SOSIAL.'
  },
  { 
    id: 50, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'logika',
    teks: 'Setiap pagi sebelum berangkat sekolah, Ibu selalu menyuruh Dika sarapan. Namun Dika sering menolak dengan alasan terburu-buru. \n\nMengapa melewatkan sarapan pagi dapat menurunkan tingkat konsentrasi (fokus) Dika saat belajar di kelas? Jelaskan alasan logismu!', 
    keywords: [
      { kata: ['energi', 'tenaga', 'kalori'], wajib: true, bobot: 40 },
      { kata: ['otak', 'berpikir', 'pusing', 'lemas'], wajib: true, bobot: 40 },
      { kata: ['lapar', 'perut'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Sarapan memberikan asupan nutrisi dan energi setelah perut kosong semalaman. Tanpa energi, otak kekurangan glukosa untuk berpikir sehingga Dika menjadi lemas, merasa lapar, dan tidak bisa fokus belajar.',
    insight: 'Siswa hanya menjawab "karena lapar", tanpa mengaitkan bahwa rasa lapar itu berarti kurangnya energi yang dibutuhkan otak untuk bekerja.'
  },
  { 
    id: 51, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'hard', skill: 'sebab-akibat',
    teks: 'Pemanasan global (global warming) menyebabkan suhu bumi terus meningkat setiap tahunnya. Fenomena ini sangat ditakuti oleh negara-negara kepulauan kecil.\n\nJelaskan kaitan yang logis antara "meningkatnya suhu bumi" dengan "ancaman tenggelamnya pulau-pulau kecil"!', 
    keywords: [
      { kata: ['es', 'kutub', 'gletser'], wajib: true, bobot: 40 },
      { kata: ['mencair', 'leleh'], wajib: true, bobot: 30 },
      { kata: ['naik', 'permukaan', 'air laut', 'meninggi'], wajib: true, bobot: 30 }
    ], 
    explanation: 'Suhu bumi yang panas membuat bongkahan es abadi di kutub utara dan selatan mencair. Volume air laut akan bertambah dan permukaannya naik, sehingga menenggelamkan daratan/pulau yang rendah.',
    insight: 'Siswa kesulitan merangkai 3 langkah: Panas -> Es Kutub Mencair -> Volume Laut Naik -> Pulau Tenggelam.'
  },
  { 
    id: 52, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'easy', skill: 'logika',
    teks: 'Saat pulang sekolah, Siti menemukan sebuah dompet berisi banyak uang dan kartu identitas tergeletak di pinggir jalan. Tidak ada orang lain di sana.\n\nApa tindakan paling bijak yang harus dilakukan Siti, dan mengapa ia harus melakukan hal tersebut (dilihat dari nilai kejujuran)?', 
    keywords: [
      { kata: ['lapor', 'berikan', 'kembalikan', 'polisi', 'guru', 'orang tua'], wajib: true, bobot: 40 },
      { kata: ['bukan hak', 'milik orang', 'haram', 'dosa'], wajib: true, bobot: 40 },
      { kata: ['sedih', 'kehilangan', 'mencari'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Tindakan: Menyerahkan dompet itu ke kantor polisi, pos satpam, atau orang dewasa yang dipercaya agar dikembalikan. Alasan: Karena uang itu bukan hak milik Siti, dan mengambil hak orang lain adalah perbuatan tidak jujur.',
    insight: 'Sebagian siswa menjawab "dibiarkan saja agar tidak dituduh mencuri", yang mana menunjukkan sikap apatis, bukan solusi proaktif.'
  },
  { 
    id: 53, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'analisis',
    teks: 'Pemerintah terus mengkampanyekan gerakan "Hemat Energi", salah satunya dengan mematikan lampu pada siang hari. \n\nBerikan 2 (dua) alasan rasional mengapa kita harus mematikan lampu di siang hari, dari segi ekonomi keluarga dan pelestarian bumi!', 
    keywords: [
      { kata: ['tagihan', 'biaya', 'uang', 'bayar', 'listrik'], wajib: true, bobot: 50 },
      { kata: ['bahan bakar', 'batu bara', 'pemanasan', 'alam', 'cadangan'], wajib: true, bobot: 50 }
    ], 
    explanation: 'Segi ekonomi: Mengurangi biaya tagihan listrik bulanan keluarga. Segi bumi: Mengurangi pembakaran batu bara/fosil oleh pembangkit listrik sehingga mengurangi polusi dan menjaga cadangan energi.',
    insight: 'Siswa mudah menjawab alasan ekonomi (tagihan), tapi sering buntu saat harus menjelaskan alasan ekologisnya (pembangkit listrik berdampak ke bumi).'
  },
  { 
    id: 54, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'hard', skill: 'analisis',
    teks: 'Di beberapa negara maju, budaya antre saat naik kereta atau membeli makanan sangat dijunjung tinggi. Berbeda dengan tempat yang sering terjadi saling serobot. \n\nMengapa "budaya antre" sering disebut sebagai cermin dari karakter bangsa yang beradab dan menghargai orang lain? Jelaskan pendapatmu!', 
    keywords: [
      { kata: ['hak', 'orang lain', 'menghargai', 'menghormati'], wajib: true, bobot: 40 },
      { kata: ['adil', 'disiplin', 'tertib', 'aturan'], wajib: true, bobot: 40 },
      { kata: ['egois', 'sabar', 'menunggu'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Antre melatih kedisiplinan dan kesabaran menekan ego pribadi. Orang yang antre menyadari dan menghargai bahwa orang yang datang lebih dulu memiliki hak untuk dilayani lebih awal secara adil.',
    insight: 'Soal abstrak tingkat tinggi. Siswa sering gagal menjelaskan makna filosofis di balik tindakan sederhana (antre).'
  },
  { 
    id: 55, mapel: 'Bahasa Indonesia', type: 'esai', difficulty: 'medium', skill: 'sebab-akibat',
    teks: 'Budi sering makan siang langsung menggunakan tangan tanpa mencucinya dengan sabun terlebih dahulu setelah bermain tanah di lapangan. Besoknya, ia sakit diare.\n\nBerdasarkan prinsip kebersihan, jelaskan kronologi (urutan kejadian) masuknya kuman penyakit hingga Budi menjadi sakit diare!', 
    keywords: [
      { kata: ['kotor', 'tanah', 'menempel', 'tangan', 'jari'], wajib: true, bobot: 30 },
      { kata: ['kuman', 'bakteri', 'virus'], wajib: true, bobot: 30 },
      { kata: ['mulut', 'masuk', 'perut', 'pencernaan', 'usus'], wajib: true, bobot: 40 }
    ], 
    explanation: 'Saat main tanah, bakteri/kuman menempel di tangan. Karena tidak pakai sabun, kuman tidak mati. Saat makan, kuman ikut menempel di makanan, lalu masuk ke mulut dan menuju sistem pencernaan (usus), menyebabkan infeksi/diare.',
    insight: 'Siswa sering melompati fase transmisi (pemindahan kuman dari tangan -> makanan -> mulut), hanya menjawab "karena tangannya kotor langsung sakit".'
  },
  { 
    id: 56, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'pecahan',
    teks: 'Gaji Pak Ridwan bulan ini adalah Rp4.800.000. Dari gaji tersebut, 1/4 bagian ditabung, dan 1/3 bagian digunakan untuk kebutuhan makan sehari-hari. Sisa gaji Pak Ridwan akan digunakan untuk membayar biaya sekolah anak-anaknya. Berapakah uang yang dialokasikan untuk biaya sekolah?', 
    opsi: ['Rp1.200.000', 'Rp1.600.000', 'Rp2.000.000', 'Rp2.800.000'], 
    jawaban: 2, 
    explanation: 'Tabungan = 1/4 x 4.800.000 = 1.200.000. Makan = 1/3 x 4.800.000 = 1.600.000. Total pengeluaran = 2.800.000. Sisa (sekolah) = 4.800.000 - 2.800.000 = Rp2.000.000.',
    insight: 'Siswa salah hitung pecahan atau salah mengurangi dari total (langsung memilih total pengeluaran opsi D).'
  },
  { 
    id: 57, mapel: 'Matematika', type: 'pg', difficulty: 'easy', skill: 'perbandingan',
    teks: 'Ibu memiliki resep untuk membuat 20 buah kue lapis. Resep tersebut membutuhkan 300 gram tepung terigu dan 4 butir telur. Jika Ibu ingin membuat 50 buah kue lapis untuk acara arisan, berapa butir telur yang Ibu butuhkan?', 
    opsi: ['8 butir', '10 butir', '12 butir', '15 butir'], 
    jawaban: 1, 
    explanation: 'Perbandingan senilai: (20 kue / 4 telur) = (50 kue / X telur). Maka 1 butir telur untuk 5 kue. Untuk 50 kue butuh 50 / 5 = 10 butir telur.',
    insight: 'Siswa tidak membagi rasio ke bentuk paling sederhana (1 telur = 5 kue), sehingga kesulitan mencari faktor pengali.'
  },
  { 
    id: 58, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'logika',
    teks: 'Andi bersepeda dari rumah ke taman pada pukul 07.00 dengan kecepatan 15 km/jam. Tiga puluh menit kemudian, Kakak menyusul Andi menggunakan sepeda motor melalui rute yang sama dengan kecepatan 45 km/jam. Pada pukul berapa Kakak berhasil menyusul Andi?', 
    opsi: ['07.45', '07.50', '08.00', '08.15'], 
    jawaban: 0, 
    explanation: 'Dalam 30 menit (0,5 jam), Andi sudah menempuh jarak 15 x 0,5 = 7,5 km. Selisih kecepatan Kakak dan Andi = 45 - 15 = 30 km/jam. Waktu menyusul = Jarak awal / Selisih kecepatan = 7,5 / 30 = 0,25 jam (15 menit). Pukul menyusul = 07.30 + 15 menit = 07.45.',
    insight: 'Soal susul-menyusul adalah HOTS klasik. Kesalahan fatal: Menganggap waktu berangkat sama atau membagi kecepatan yang salah.'
  },
  { 
    id: 59, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Sebuah denah tanah berbentuk persegi memiliki panjang sisi 5 cm. Denah tersebut digambar dengan skala 1 : 400. Berapakah luas tanah sebenarnya dalam satuan meter persegi (m²)?', 
    opsi: ['20 m²', '40 m²', '200 m²', '400 m²'], 
    jawaban: 3, 
    explanation: 'Sisi sebenarnya = 5 cm x 400 = 2.000 cm = 20 meter. Luas sebenarnya = sisi x sisi = 20 m x 20 m = 400 m².',
    insight: 'Jebakan: Siswa mencari luas denah dulu (25 cm²) lalu dikali 400 (hasil 10.000 cm² = 1 m²), padahal skala luas harus dikuadratkan.'
  },
  { 
    id: 60, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'persentase',
    teks: 'Harga sebuah tas di toko adalah Rp300.000. Toko tersebut mengadakan promo diskon bertingkat 20% + 10%. Berapa total uang yang harus dibayarkan Rina untuk membeli tas tersebut?', 
    opsi: ['Rp210.000', 'Rp216.000', 'Rp240.000', 'Rp270.000'], 
    jawaban: 1, 
    explanation: 'Diskon pertama 20%: Potongan = 20% x 300rb = 60rb. Sisa harga = 240rb. Diskon kedua 10% (dari harga sisa): Potongan = 10% x 240rb = 24rb. Harga akhir = 240rb - 24rb = Rp216.000.',
    insight: 'Siswa langsung menjumlahkan diskon (20+10 = 30%), lalu memotong 30% dari 300rb (bayar 210rb). Ini adalah ilusi ritel umum.'
  },
  { 
    id: 61, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'data',
    teks: 'Rata-rata nilai ulangan matematika dari 5 orang anak adalah 80. Kemudian datang Banu mengikuti susulan. Setelah nilai Banu digabungkan, rata-rata nilai kelas berubah menjadi 82. Berapakah nilai ulangan Banu?', 
    opsi: ['82', '86', '90', '92'], 
    jawaban: 3, 
    explanation: 'Total nilai 5 anak = 5 x 80 = 400. Total nilai 6 anak (dengan Banu) = 6 x 82 = 492. Nilai Banu = Total 6 anak - Total 5 anak = 492 - 400 = 92.',
    insight: 'Siswa kesulitan melakukan *reverse engineering* pada rumus rata-rata untuk mencari nilai individu tambahan.'
  },
  { 
    id: 62, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Di sebuah simpang jalan, lampu merah menyala setiap 12 detik, lampu kuning setiap 15 detik, dan lampu hijau setiap 20 detik. Jika pada pukul 10.00 tepat ketiga lampu tersebut menyala bersamaan, pada pukul berapakah ketiganya akan menyala bersamaan lagi untuk yang pertama kalinya?', 
    opsi: ['10.01', '10.02', '10.05', '10.12'], 
    jawaban: 0, 
    explanation: 'Cari KPK dari 12, 15, dan 20. Kelipatan 20: 20, 40, 60 (60 bisa dibagi 12 dan 15). KPK = 60 detik = 1 menit. Pukul 10.00 + 1 menit = 10.01.',
    insight: 'Penerapan KPK pada siklus waktu. Siswa kadang terkecoh dan mencari FPB atau asal menjumlahkan angka-angka tersebut.'
  },
  { 
    id: 63, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Panitia panti asuhan memiliki 48 buku tulis, 36 pensil, dan 24 penghapus. Barang-barang tersebut akan dimasukkan ke dalam kantong bingkisan dengan jumlah dan jenis barang yang sama rata di setiap kantong. Berapa kantong bingkisan PALING BANYAK yang bisa dibuat panitia?', 
    opsi: ['6 kantong', '8 kantong', '12 kantong', '24 kantong'], 
    jawaban: 2, 
    explanation: 'Membagi barang sama rata dengan jumlah maksimal berarti mencari FPB. FPB dari 48, 36, dan 24 adalah 12.',
    insight: 'Aplikasi konsep FPB. Kata kunci "sama rata" dan "paling banyak" sering diabaikan sehingga siswa memilih faktor yang lebih kecil (misal 6).'
  },
  { 
    id: 64, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Sebuah taman berbentuk persegi panjang dengan panjang 14 meter dan lebar 10 meter. Di tengah taman tersebut terdapat sebuah kolam ikan berbentuk setengah lingkaran dengan diameter 14 meter. Sisa area taman ditanami rumput. Berapa luas area yang ditanami rumput? (π = 22/7)', 
    opsi: ['63 m²', '77 m²', '140 m²', '154 m²'], 
    jawaban: 0, 
    explanation: 'Luas taman (persegi panjang) = 14 x 10 = 140 m². Jari-jari kolam (setengah lingkaran) = 14 / 2 = 7 m. Luas lingkaran penuh = 22/7 x 7 x 7 = 154 m². Luas 1/2 lingkaran (kolam) = 77 m². Luas rumput = 140 - 77 = 63 m².',
    insight: 'Kesalahan *multi-step*: lupa membagi luas lingkaran menjadi setengah, atau menggunakan diameter sebagai jari-jari.'
  },
  { 
    id: 65, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'analisis',
    teks: 'Sebuah bak mandi memiliki volume 1,2 m³. Bak tersebut akan diisi air menggunakan selang dengan debit 20 liter per menit. Berapa lama waktu yang dibutuhkan hingga bak mandi tersebut penuh? (1 m³ = 1.000 liter)', 
    opsi: ['6 menit', '60 menit', '120 menit', '240 menit'], 
    jawaban: 1, 
    explanation: 'Volume bak = 1,2 x 1.000 = 1.200 liter. Waktu = Volume / Debit = 1.200 liter / 20 liter/menit = 60 menit.',
    insight: 'Siswa lupa melakukan konversi beda unit (m³ ke liter) sebelum membagi dengan debit.'
  },
  { 
    id: 66, mapel: 'Matematika', type: 'pg', difficulty: 'easy', skill: 'logika',
    teks: 'Dita membeli alat tulis seharga Rp32.000. Ia membayar dengan selembar uang Rp100.000. Kasir memberikan kembalian dengan lembaran uang Rp50.000, Rp10.000, dan Rp2.000. Berapa lembar uang Rp2.000 yang Dita terima?', 
    opsi: ['2 lembar', '3 lembar', '4 lembar', '5 lembar'], 
    jawaban: 2, 
    explanation: 'Kembalian = 100.000 - 32.000 = 68.000. Jika pecahan besarnya adalah 50.000 (1 lembar) dan 10.000 (1 lembar), sisa 8.000. Sisa 8.000 ini terdiri dari pecahan 2.000 = 8.000 / 2.000 = 4 lembar.',
    insight: 'Aritmatika keseharian. Kesalahan biasa terjadi di pengurangan uang ribuan (kurang ketelitian digit).'
  },
  { 
    id: 67, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'persentase',
    teks: 'Paman membeli sebuah sepeda bekas seharga Rp500.000. Ia kemudian menghabiskan Rp100.000 untuk mengecat ulang dan mengganti ban sepeda tersebut. Seminggu kemudian, Paman menjual sepeda itu dengan harga Rp750.000. Berapa persentase keuntungan yang Paman dapatkan dari MODAL KESELURUHAN?', 
    opsi: ['15%', '20%', '25%', '50%'], 
    jawaban: 2, 
    explanation: 'Modal total = Beli (500rb) + Perbaikan (100rb) = 600rb. Harga Jual = 750rb. Untung (nominal) = 750rb - 600rb = 150rb. Persentase Untung = (Untung / Modal Total) x 100% = (150/600) x 100% = 1/4 x 100% = 25%.',
    insight: 'Siswa tidak memasukkan biaya perbaikan ke dalam modal, sehingga menghitung persentase dari basis 500rb (menjawab 50%).'
  },
  { 
    id: 68, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'logika',
    teks: 'Suhu di puncak Gunung Jayawijaya pada siang hari adalah 2°C di atas titik beku. Saat tengah malam, suhunya turun drastis menjadi 9°C di bawah titik beku. Berapakah selisih suhu antara siang hari dan tengah malam di puncak gunung tersebut?', 
    opsi: ['-7°C', '7°C', '11°C', '18°C'], 
    jawaban: 2, 
    explanation: 'Siang = +2°C. Malam = -9°C. Selisih = (Nilai Terbesar) - (Nilai Terkecil) = 2 - (-9) = 2 + 9 = 11°C.',
    insight: 'Operasi pengurangan yang melibatkan bilangan negatif. Sering kali siswa mengurangkan 9 - 2 = 7.'
  },
  { 
    id: 69, mapel: 'Matematika', type: 'pg', difficulty: 'medium', skill: 'pola',
    teks: 'Susunan kursi di sebuah gedung pertunjukan diatur mengikuti pola tertentu. Baris pertama memiliki 10 kursi, baris kedua 14 kursi, baris ketiga 18 kursi, dan seterusnya bertambah secara tetap. Berapakah jumlah kursi pada baris ke-8?', 
    opsi: ['34 kursi', '38 kursi', '42 kursi', '46 kursi'], 
    jawaban: 1, 
    explanation: 'Pola aritmetika dengan beda (b) = +4. Rumus suku ke-n (Un) = a + (n-1)b. U8 = 10 + (8-1)4 = 10 + (7x4) = 10 + 28 = 38 kursi.',
    insight: 'Siswa kadang menghitung manual tapi salah hitung urutan, atau memakai rumus beda yang salah.'
  },
  { 
    id: 70, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'logika',
    teks: 'Jadwal penerbangan pesawat rute Jakarta (WIB) menuju Jayapura (WIT) memakan waktu 5 jam perjalanan udara. Jika pesawat lepas landas dari Jakarta pada pukul 08.00 WIB, pada pukul berapakah pesawat tersebut mendarat di Jayapura waktu setempat (WIT)?', 
    opsi: ['13.00 WIT', '14.00 WIT', '15.00 WIT', '16.00 WIT'], 
    jawaban: 2, 
    explanation: 'Perbedaan waktu WIB (UTC+7) ke WIT (UTC+9) adalah +2 jam. Pesawat berangkat 08.00 WIB + 5 jam terbang = tiba 13.00 WIB. Konversi 13.00 WIB ke WIT = 13.00 + 2 jam = 15.00 WIT.',
    insight: 'Siswa hanya menjumlahkan lama terbang (08.00 + 5) dan melupakan penambahan selisih zona waktu antar pulau di Indonesia.'
  },
  { 
    id: 71, mapel: 'Matematika', type: 'pg', difficulty: 'easy', skill: 'data',
    teks: 'Tabel hasil panen padi Desa Makmur selama 4 bulan:\nJanuari: 40 ton\nFebruari: 55 ton\nMaret: 30 ton\nApril: 45 ton\n\nPenurunan hasil panen paling tajam terjadi pada rentang waktu...', 
    opsi: ['Desember ke Januari', 'Januari ke Februari', 'Februari ke Maret', 'Maret ke April'], 
    jawaban: 2, 
    explanation: 'Jan ke Feb: Naik 15 ton. Feb ke Mar: Turun 25 ton (55 ke 30). Mar ke Apr: Naik 15 ton. Penurunan paling tajam (satu-satunya penurunan) adalah Februari ke Maret.',
    insight: 'Kemampuan literasi data dasar. Terkadang siswa tidak fokus pada kata "penurunan" dan malah mencari bulan dengan hasil terkecil.'
  },
  { 
    id: 72, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'pecahan',
    teks: 'Bu Guru memiliki gulungan pita sepanjang 4 1/2 meter. Pita tersebut dipotong-potong untuk mengikat kado. Jika setiap kado membutuhkan pita sepanjang 3/4 meter, berapa banyak kado maksimal yang bisa diikat oleh Bu Guru menggunakan gulungan pita tersebut?', 
    opsi: ['5 kado', '6 kado', '7 kado', '8 kado'], 
    jawaban: 1, 
    explanation: 'Ubah 4 1/2 menjadi pecahan biasa = 9/2 meter. Operasi pembagian: (9/2) dibagi (3/4) = (9/2) x (4/3) = 36 / 6 = 6 buah kado.',
    insight: 'Siswa kesulitan membagi pecahan dengan pecahan, atau bingung saat membalik operasi pembagian menjadi perkalian silang.'
  },
  { 
    id: 73, mapel: 'Matematika', type: 'pg', difficulty: 'hard', skill: 'analisis',
    teks: 'Jari-jari roda sepeda Rina adalah 35 cm. Jika Rina mengayuh sepedanya sehingga roda berputar penuh sebanyak 1.000 kali di lintasan lurus, berapakah jarak tempuh yang dilalui sepeda Rina? (π = 22/7, 1 m = 100 cm)', 
    opsi: ['2.200 meter', '220 meter', '1.100 meter', '110 meter'], 
    jawaban: 0, 
    explanation: 'Keliling roda (1 putaran) = 2 x π x r = 2 x (22/7) x 35 = 2 x 22 x 5 = 220 cm. Jarak tempuh = 1.000 putaran x 220 cm = 220.000 cm. Konversi ke meter = 220.000 / 100 = 2.200 meter.',
    insight: 'Kombinasi rumus keliling lingkaran, konsep putaran roda = jarak, dan konversi satuan panjang. Sangat kompleks untuk anak SD/MI.'
  },
  { 
    id: 74, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'logika',
    teks: 'Panitia perpisahan kelas 6 memiliki uang kas awal Rp1.500.000. Mereka mendapat dana sumbangan donatur Rp2.000.000. Uang tersebut digunakan untuk menyewa tenda Rp1.250.000, membeli konsumsi Rp1.750.000, dan suvenir Rp800.000.\n\nBerdasarkan data anggaran tersebut, apakah panitia mengalami "Sisa Uang" atau "Kekurangan Dana"? Jelaskan perhitungan logis matematika-mu!', 
    keywords: [
      { kata: ['kurang', 'kekurangan', 'defisit', 'tekor', 'minus'], wajib: true, bobot: 40 },
      { kata: ['3.500.000', '3,5 juta'], wajib: true, bobot: 20 },
      { kata: ['3.800.000', '3,8 juta'], wajib: true, bobot: 20 },
      { kata: ['300.000', '300 ribu'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Total Pemasukan = 1,5 jt + 2 jt = Rp3.500.000. Total Pengeluaran = 1,25 jt + 1,75 jt + 800 rb = Rp3.800.000. Karena pengeluaran (3,8 jt) lebih besar dari pemasukan (3,5 jt), panitia mengalami KEKURANGAN dana sebesar Rp300.000.',
    insight: 'Siswa gagal membedakan mana item pemasukan dan pengeluaran, sering menjumlahkan semuanya tanpa logika akuntansi sederhana.'
  },
  { 
    id: 75, mapel: 'Matematika', type: 'esai', difficulty: 'hard', skill: 'analisis',
    teks: 'Sebuah akuarium berbentuk balok berisi air setengahnya. Budi memasukkan sebuah batu besar ke dalam akuarium tersebut hingga tenggelam sepenuhnya ke dasar. Setelah batu dimasukkan, Budi mengamati permukaan air di akuarium naik (bertambah tinggi).\n\nSecara prinsip volume bangun ruang, mengapa permukaan air bisa naik? Berapa sebenarnya volume batu besar tersebut?', 
    keywords: [
      { kata: ['mendesak', 'mendorong', 'menggantikan', 'ruang', 'tempat'], wajib: true, bobot: 40 },
      { kata: ['sama dengan', 'setara', 'sebesar'], wajib: true, bobot: 30 },
      { kata: ['air yang naik', 'kenaikan air', 'volume air naik'], wajib: true, bobot: 30 }
    ], 
    explanation: 'Batu benda padat yang masuk ke air akan mendesak/mengambil ruang air. Permukaan air naik karena air terdorong ke atas. Volume batu tersebut tepat SAMA DENGAN volume kenaikan air dalam akuarium tersebut.',
    insight: 'HOTS tingkat tinggi (Hukum Archimedes dasar). Siswa sering menjawab "karena batunya berat" (bias massa vs volume).'
  },
  { 
    id: 76, mapel: 'Matematika', type: 'esai', difficulty: 'hard', skill: 'data',
    teks: 'Sari menghitung nilai rata-rata ujian matematika kelompoknya (berisi 5 anak) dan mendapati hasilnya adalah 85. Namun anehnya, ada 4 anak di kelompok tersebut yang nilainya hanya 70. \n\nMengapa nilai rata-rata bisa mencapai 85 padahal sebagian besar anggota nilainya 70? Jelaskan logikanya!', 
    keywords: [
      { kata: ['satu anak', 'anak kelima', 'nilai yang lain', 'sisa anak'], wajib: true, bobot: 40 },
      { kata: ['sangat besar', 'sangat tinggi', 'sempurna', '145'], wajib: true, bobot: 40 },
      { kata: ['menarik', 'menutupi', 'mengangkat'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Nilai rata-rata didapat dari total nilai dibagi jumlah anak. Jika total rata-rata 85 (5 anak) maka total nilai = 425. Jika 4 anak nilainya 70 (total 280), maka 1 anak terakhir memiliki nilai yang SANGAT TINGGI (425-280 = 145), sehingga menarik rata-rata ke atas (outlier ekstrim).',
    insight: 'Siswa diajarkan mengkritisi kelemahan metrik rata-rata dalam statistika ketika ada nilai pencilan (outlier).'
  },
  { 
    id: 77, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'perbandingan',
    teks: 'Sebuah proyek perbaikan jalan desa ditargetkan selesai dalam waktu 30 hari oleh 10 orang pekerja. Karena sebentar lagi musim hujan, Pak Kades ingin proyek tersebut selesai lebih cepat dalam waktu 15 hari saja.\n\nBerdasarkan logika matematika perbandingan, apakah Pak Kades harus MENAMBAH atau MENGURANGI jumlah pekerja? Jelaskan alasan dan hitungan kasarnya!', 
    keywords: [
      { kata: ['menambah', 'ditambah'], wajib: true, bobot: 40 },
      { kata: ['berbalik nilai', 'kebalikan', 'makin cepat', 'waktu singkat'], wajib: true, bobot: 30 },
      { kata: ['20 orang', 'tambah 10'], wajib: false, bobot: 30 }
    ], 
    explanation: 'Pak Kades harus MENAMBAH pekerja (Konsep perbandingan berbalik nilai: waktu makin singkat, butuh tenaga makin banyak). Jika waktu dipangkas setengahnya (30 ke 15), jumlah pekerja harus dikali dua (menjadi 20 orang pekerja).',
    insight: 'Siswa SD/MI sering menerapkan perbandingan senilai secara buta di semua kasus tanpa melihat konteks relasi berbalik nilai (kecepatan vs tenaga kerja).'
  },
  { 
    id: 78, mapel: 'Matematika', type: 'esai', difficulty: 'hard', skill: 'logika',
    teks: 'Kota P dan Kota Q berjarak 100 km. Mobil A berangkat dari Kota P menuju Q dengan kecepatan 40 km/jam. Di waktu yang bersamaan, Mobil B berangkat dari Kota Q menuju P dengan kecepatan 60 km/jam di jalur yang sama.\n\nMengapa mereka akan saling berpapasan (bertemu) DALAM WAKTU KURANG DARI 2 JAM? Jelaskan analisismu!', 
    keywords: [
      { kata: ['bertemu', 'gabungan', 'total kecepatan', 'saling mendekat'], wajib: true, bobot: 40 },
      { kata: ['100 km/jam', '40 + 60'], wajib: true, bobot: 40 },
      { kata: ['satu jam', '1 jam', 'tepat 1 jam'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Karena mereka bergerak saling mendekat, kecepatan mereka digabungkan. Total kecepatan gabungan = 40 + 60 = 100 km/jam. Untuk menempuh jarak 100 km, mereka hanya butuh waktu 1 jam (100/100). 1 jam tentu kurang dari 2 jam.',
    insight: 'Siswa gagal membayangkan fisika relativitas sederhana (dua objek saling mendekat mempercepat waktu temu), dan mencoba menghitung satu per satu lalu bingung.'
  },
  { 
    id: 79, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'pecahan',
    teks: 'Seorang kakek mewariskan sebidang tanah kebun. Sebanyak 1/2 bagian tanah diberikan untuk istrinya, 1/4 bagian diwakafkan untuk bangun masjid desa, dan sisanya dibagikan SAMA RATA kepada 2 orang cucunya.\n\nBerapa bagian (dalam pecahan) yang akan diterima oleh MASING-MASING cucu kakek tersebut? Jelaskan langkah perhitungannya!', 
    keywords: [
      { kata: ['1/4', 'sisa 1/4', '2/4', 'disamakan penyebut'], wajib: true, bobot: 40 },
      { kata: ['dibagi 2', 'dibagi dua', 'sisa dibagi'], wajib: true, bobot: 30 },
      { kata: ['1/8', 'seperdelapan'], wajib: true, bobot: 30 }
    ], 
    explanation: 'Total tanah = 1. Digunakan = 1/2 + 1/4 = 2/4 + 1/4 = 3/4 bagian. Sisa tanah = 1 - 3/4 = 1/4 bagian. Sisa 1/4 ini dibagikan merata ke 2 cucu. Maka: (1/4) dibagi 2 = 1/4 x 1/2 = 1/8 bagian untuk masing-masing cucu.',
    insight: 'Kesalahan paling fatal di akhir: siswa tahu sisa tanahnya 1/4, lalu menjawab 1/4, lupa perintah akhir soal bahwa 1/4 itu masih harus DIBAGI 2 CUCU.'
  },
  { 
    id: 80, mapel: 'Matematika', type: 'esai', difficulty: 'medium', skill: 'logika',
    teks: 'Ibu memiliki dua pilihan toko untuk membeli 10 kg tepung beras:\n- Toko A: Harga tepung Rp15.000/kg. Promo gratis ongkos kirim.\n- Toko B: Harga tepung diskon menjadi Rp12.000/kg. Ongkos kirim Rp35.000 ke rumah Ibu.\n\nBerdasarkan total biaya pengeluaran, toko manakah yang paling murah dan menguntungkan untuk Ibu pilih? Buktikan dengan angkanya!', 
    keywords: [
      { kata: ['toko a', '150.000', '150 ribu'], wajib: true, bobot: 40 },
      { kata: ['toko b', 'paling murah', 'pilih b', 'untung b'], wajib: true, bobot: 40 },
      { kata: ['155.000', '155 ribu'], wajib: false, bobot: 20 }
    ], 
    explanation: 'Biaya Toko A: (10 kg x 15.000) + 0 ongkir = Rp150.000. Biaya Toko B: (10 kg x 12.000) + 35.000 ongkir = 120.000 + 35.000 = Rp155.000. Pilihan termurah adalah TOKO A (150rb) dibanding B (155rb).',
    insight: 'Siswa tertipu *marketing gimmick* "harga diskon murah di Toko B", tanpa mempertimbangkan biaya ekstra/ongkos kirim yang membuat total bayar membengkak.'
  }
];

let SOAL = []; 

/* ============================================================
   🔥 SISTEM HYBRID ASINKRON (MEMUAT SOAL TKA DARI JSON)
   ============================================================ */

// 1. Function Shuffle Group
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 2. Function Generate Soal (Flattening Grup ke Flat Array)
function generateSoalDariGroup(groupData) {
  let hasil = [];
  groupData.forEach(group => {
    group.questions.forEach(q => {
      hasil.push({
        ...q,
        mapel: group.mapel || q.mapel, // Ambil mapel dari grup jika ada
        stimulus: group.stimulus || null
      });
    });
  });
  return hasil;
}

// 3. Function Load JSON Hybrid
async function loadSoal() {
  try {
    const res = await fetch('data/soal.json');
    if (!res.ok) throw new Error('Fetch gagal');
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error('Format salah');

    // Acak urutan grup stimulus
    const shuffledGroup = shuffleArray(data);
    
    // Ekstrak jadi soal satuan yang nyambung dengan stimulus
    const finalSoal = generateSoalDariGroup(shuffledGroup);

    BANK_SOAL = finalSoal;

    console.log("✅ Soal TKA dari JSON digunakan");
  } catch (err) {
    console.warn("⚠️ Fallback ke soal lama");
    console.error(err);
  }
}

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

    // 🔥 ALUR BARU: Memanggil loadSoal() lalu startExam()
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
  generateExamQuestions(state.materi);
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

  // 🌟 RENDER STIMULUS JIKA ADA
  const stimulusBox = document.getElementById("stimulus");
  if (stimulusBox) {
    if (s.stimulus) {
      stimulusBox.innerHTML = escHtml(s.stimulus).replace(/\n/g, '<br/>');
      stimulusBox.style.display = "block";
    } else {
      stimulusBox.innerHTML = "";
      stimulusBox.style.display = "none";
    }
  }

  $('q-text').innerHTML = escHtml(s.teks).replace(/\n/g, '<br/>');

  const opts = $('q-options');
  opts.innerHTML = '';

  if (s.type === 'pg') {
    const list = document.createElement('div');
    list.className = 'options-list';
    const letters = ['A','B','C','D'];
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

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
   GENERATOR BANK SOAL & RANDOMISASI
   ============================================================ */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomizeOptions() {
  SOAL.forEach(s => {
    if (s.type === 'pg') {
      let mapped = s.opsi.map((opt, i) => ({ text: opt, isCorrect: i === s.jawaban }));
      shuffleArray(mapped);
      s.opsi = mapped.map(m => m.text);
      s.jawaban = mapped.findIndex(m => m.isCorrect);
    }
  });
}

function generateExamQuestions(materiPilihan) {
  let pgBank = BANK_SOAL.filter(s => s.type === 'pg');
  let esaiBank = BANK_SOAL.filter(s => s.type === 'esai');
  
  // SISTEM CBT PROFESIONAL: Ambil 30 soal acak dari total bank soal
  // Proporsi standar TKA: 21 Pilihan Ganda, 9 Esai
  let targetPG = 21;
  let targetEsai = 9;
  let activePG = [];
  let activeEsai = [];

  shuffleArray(pgBank);
  shuffleArray(esaiBank);

  if (materiPilihan !== 'Acak') {
    let pgPrioritas = pgBank.filter(s => s.mapel === materiPilihan);
    let pgLain = pgBank.filter(s => s.mapel !== materiPilihan);
    let takePG = Math.min(Math.round(targetPG * 0.65), pgPrioritas.length); // ~65% mapel favorit
    activePG.push(...pgPrioritas.slice(0, takePG)); 
    activePG.push(...pgLain.slice(0, targetPG - activePG.length));
    
    let esaiPrioritas = esaiBank.filter(s => s.mapel === materiPilihan);
    let esaiLain = esaiBank.filter(s => s.mapel !== materiPilihan);
    let takeEsai = Math.min(Math.round(targetEsai * 0.65), esaiPrioritas.length); // ~65% mapel favorit
    activeEsai.push(...esaiPrioritas.slice(0, takeEsai)); 
    activeEsai.push(...esaiLain.slice(0, targetEsai - activeEsai.length));
  } else {
    activePG = pgBank.slice(0, targetPG);
    activeEsai = esaiBank.slice(0, targetEsai);
  }

  const order = ['Bahasa Indonesia', 'Matematika'];
  activePG.sort((a, b) => order.indexOf(a.mapel) - order.indexOf(b.mapel));
  activeEsai.sort((a, b) => order.indexOf(a.mapel) - order.indexOf(b.mapel));

  SOAL = [...activePG, ...activeEsai].map(s => JSON.parse(JSON.stringify(s)));
  randomizeOptions();
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
  const letters = ['A', 'B', 'C', 'D'];
  
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
  $('result-kelas').textContent = 'Fokus Materi: ' + state.materi; 
  
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
    const letters = ['A','B','C','D'];

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
   RESTART EXAM / MULAI LAGI (DENGAN CUSTOM MODAL)
   ============================================================ */
$('btn-restart').addEventListener('click', () => {
  showCustomModal({
    type: 'danger',
    title: 'Mulai Ujian Baru?',
    message: 'Apakah kamu yakin ingin meninggalkan hasil ini dan memulai ujian baru yang diacak ulang?',
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

/* ============================================================
   🔥 SISTEM TKA (STIMULUS + GROUP) - APPENDED ONLY
   ============================================================ */

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateSoalDariGroup(groupData) {
  let hasil = [];
  groupData.forEach(group => {
    group.questions.forEach(q => {
      hasil.push({
        ...q,
        stimulus: group.stimulus || null
      });
    });
  });
  return hasil;
}

async function loadSoal() {
  try {
    const res = await fetch('data/soal.json');
    if (!res.ok) throw new Error("Fetch gagal");
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Format salah");

    const shuffled = shuffleArray(data);
    const finalSoal = generateSoalDariGroup(shuffled);

    BANK_SOAL = finalSoal;

    console.log("✅ Mode TKA aktif, soal dimuat:", BANK_SOAL.length);
  } catch (err) {
    console.warn("⚠️ Fallback ke BANK_SOAL lama");
  }
}

// 🔥 Pre-load data saat aplikasi dibuka (startExam dipanggil oleh tombol Login)
document.addEventListener("DOMContentLoaded", () => {
  loadSoal(); 
});

function renderStimulus(soal) {
  let el = document.getElementById("stimulus");
  
  // Jika div stimulus belum ada, otomatis buat dan sisipkan di atas q-text
  if (!el) {
    const style = document.createElement('style');
    style.innerHTML = `
      .stimulus-box {
        background: #f5f7fa;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.6;
        white-space: pre-line; /* 🔥 Bikin enter beneran rapi sesuai instruksi */
        border-left: 4px solid var(--blue-500);
        color: var(--blue-900);
      }
    `;
    document.head.appendChild(style);

    el = document.createElement("div");
    el.id = "stimulus";
    el.className = "stimulus-box";
    const qText = document.getElementById("q-text");
    if (qText) qText.parentNode.insertBefore(el, qText);
  }

  // Tampilkan stimulus jika soal memilikinya
  if (soal && soal.stimulus) {
    el.innerText = soal.stimulus;
    el.style.display = "block";
  } else if (el) {
    el.innerText = "";
    el.style.display = "none";
  }
}
