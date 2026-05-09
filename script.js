// ══════════════════════════════════════════════
// script.js — Bangga Budayaku, Identitasku!
// Website Interaktif Kebudayaan Indonesia
// ══════════════════════════════════════════════

// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.getElementById('nav-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'kenali' && !quizState.kenali.initialized) initQuiz('kenali');
  if (id === 'jatidiri' && !quizState.jatidiri.initialized) initQuiz('jatidiri');
}

// ── ACCORDION ──
function toggleAccordion(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── QUIZ DATA ──
const quizData = {
  kenali: [
    {
      q: "Tari Saman berasal dari provinsi mana?",
      opts: ["Aceh", "Sumatera Utara", "Riau", "Jambi"],
      ans: 0,
      info: "Tari Saman berasal dari Aceh, diciptakan masyarakat Gayo dan kini diakui UNESCO sebagai Warisan Budaya Takbenda!"
    },
    {
      q: "Apa nama rumah adat tradisional Minangkabau yang memiliki atap berbentuk tanduk kerbau?",
      opts: ["Rumah Betang", "Rumah Gadang", "Joglo", "Tongkonan"],
      ans: 1,
      info: "Rumah Gadang adalah rumah adat Minangkabau dengan atap gonjong menyerupai tanduk kerbau — simbol kekuatan dan kebanggaan."
    },
    {
      q: "Wayang Kulit dari Jawa telah diakui UNESCO sebagai warisan budaya dunia sejak tahun?",
      opts: ["1998", "2000", "2003", "2008"],
      ans: 2,
      info: "UNESCO mengakui Wayang Kulit sebagai Masterpiece of Oral and Intangible Heritage of Humanity pada tahun 2003."
    },
    {
      q: "Batik Indonesia mendapat pengakuan UNESCO pada tahun?",
      opts: ["2007", "2008", "2009", "2010"],
      ans: 2,
      info: "Batik Indonesia resmi diakui UNESCO sebagai Warisan Budaya Takbenda pada 2 Oktober 2009 — kini diperingati sebagai Hari Batik Nasional!"
    },
    {
      q: "Provinsi manakah yang terkenal dengan tari Tor-Tor?",
      opts: ["Aceh", "Kalimantan", "Sumatera Utara", "Sulawesi"],
      ans: 2,
      info: "Tari Tor-Tor adalah tarian sakral asal Sumatra Utara yang digunakan dalam upacara adat masyarakat Batak."
    }
  ],
  jatidiri: [
    {
      q: "Apa semboyan negara Indonesia yang mencerminkan persatuan dalam keberagaman?",
      opts: ["Bhineka Tunggal Ika", "Satu Nusa Satu Bangsa", "Garuda Pancasila", "Indonesia Raya"],
      ans: 0,
      info: "Bhinneka Tunggal Ika artinya 'Berbeda-beda tetapi tetap satu' — semboyan yang menjadi fondasi persatuan Indonesia."
    },
    {
      q: "Berapa perkiraan jumlah bahasa daerah yang ada di Indonesia?",
      opts: ["Sekitar 200", "Sekitar 400", "Lebih dari 700", "Lebih dari 1000"],
      ans: 2,
      info: "Indonesia memiliki lebih dari 718 bahasa daerah — menjadikannya negara dengan keanekaragaman bahasa terbesar kedua di dunia!"
    },
    {
      q: "Nilai gotong royong dalam budaya Indonesia paling tepat mencerminkan?",
      opts: ["Kerja keras individu", "Kebersamaan dan kolaborasi", "Persaingan sehat", "Modernisasi"],
      ans: 1,
      info: "Gotong royong adalah nilai luhur Indonesia yang menekankan kebersamaan dan saling membantu — fondasi masyarakat harmonis."
    },
    {
      q: "Apa yang dimaksud dengan 'Jati Diri Bangsa' dalam konteks globalisasi?",
      opts: [
        "Menolak semua pengaruh asing",
        "Mempertahankan nilai budaya sambil menyaring pengaruh luar",
        "Mengikuti tren global sepenuhnya",
        "Tidak peduli budaya lain"
      ],
      ans: 1,
      info: "Jati diri bangsa bukan berarti menutup diri, tapi mampu menyaring pengaruh global dan tetap berpegang pada nilai budaya sendiri."
    },
    {
      q: "Sebagai mahasiswa, cara paling efektif melestarikan budaya adalah?",
      opts: [
        "Hanya mempelajari di kelas",
        "Aktif berpartisipasi, mendokumentasikan, dan mempromosikan budaya",
        "Menonton festival dari rumah",
        "Mengkoleksi benda bersejarah"
      ],
      ans: 1,
      info: "Pelestarian budaya paling efektif melalui partisipasi aktif, dokumentasi, dan promosi — mahasiswa bisa menjadi agen perubahan nyata!"
    }
  ]
};

// ── QUIZ STATE ──
const quizState = {
  kenali:   { initialized: false, current: 0, score: 0, answered: false },
  jatidiri: { initialized: false, current: 0, score: 0, answered: false }
};

function initQuiz(key) {
  quizState[key] = { initialized: true, current: 0, score: 0, answered: false };
  renderQuestion(key);
}

function renderQuestion(key) {
  const state = quizState[key];
  const data  = quizData[key];
  const p     = key === 'kenali' ? 'qk' : 'qj';
  const total = data.length;
  const q     = data[state.current];

  document.getElementById(p + '-fill').style.width = (state.current / total * 100) + '%';
  document.getElementById(p + '-num').textContent  = 'Pertanyaan ' + (state.current + 1) + ' / ' + total;
  document.getElementById(p + '-q').textContent    = q.q;
  document.getElementById(p + '-fb').className     = 'quiz-feedback';
  document.getElementById(p + '-fb').textContent   = '';
  document.getElementById(p + '-next').className   = 'quiz-next';
  state.answered = false;

  const opts = document.getElementById(p + '-opts');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => answerQuestion(key, i);
    opts.appendChild(btn);
  });
}

function answerQuestion(key, chosen) {
  const state = quizState[key];
  if (state.answered) return;
  state.answered = true;

  const p    = key === 'kenali' ? 'qk' : 'qj';
  const q    = quizData[key][state.current];
  const opts = document.querySelectorAll('#' + p + '-opts .quiz-opt');
  const fb   = document.getElementById(p + '-fb');
  const next = document.getElementById(p + '-next');

  opts.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.ans)       btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });

  if (chosen === q.ans) {
    state.score++;
    fb.className   = 'quiz-feedback correct show';
    fb.textContent = '✅ Benar! ' + q.info;
  } else {
    fb.className   = 'quiz-feedback wrong show';
    fb.textContent = '❌ Kurang tepat. ' + q.info;
  }

  next.className = 'quiz-next show';
  next.textContent = state.current < quizData[key].length - 1
    ? 'Pertanyaan Berikutnya →'
    : 'Lihat Hasil 🎉';
}

function nextQuestion(key) {
  const state = quizState[key];
  const p     = key === 'kenali' ? 'qk' : 'qj';

  if (state.current < quizData[key].length - 1) {
    state.current++;
    renderQuestion(key);
  } else {
    const total = quizData[key].length;
    const pct   = Math.round(state.score / total * 100);
    document.getElementById(p + '-main').style.display = 'none';
    const result = document.getElementById(p + '-result');
    result.classList.add('show');
    document.getElementById(p + '-score').textContent = state.score + '/' + total;
    const msgs = [
      "Terus belajar ya, budaya kita kaya sekali! 📚",
      "Lumayan! Masih banyak yang bisa dipelajari. 🌱",
      "Bagus! Kamu cukup mengenal budaya Indonesia. 👍",
      "Luar biasa! Kamu benar-benar cinta budaya Indonesia! 🏆"
    ];
    document.getElementById(p + '-msg').textContent =
      pct < 40 ? msgs[0] : pct < 60 ? msgs[1] : pct < 80 ? msgs[2] : msgs[3];
  }
}

function restartQuiz(key) {
  const p = key === 'kenali' ? 'qk' : 'qj';
  document.getElementById(p + '-main').style.display = 'block';
  document.getElementById(p + '-result').classList.remove('show');
  initQuiz(key);
}

// ── PLEDGE MODAL ──
const pledgeContent = {
  produk: {
    emoji: '🛍️',
    title: 'Tantangan Diterima!',
    body:  'Keren! Kamu telah berkomitmen untuk mendukung produk lokal Indonesia selama 30 hari. Ingat: setiap pembelian produk lokal adalah vote untuk masa depan budaya dan ekonomi Indonesia. Dokumentasikan perjalananmu di Instagram dengan #BanggaProdukLokal!'
  },
  bahasa: {
    emoji: '🗣️',
    title: 'Semangat Pelestari Bahasa!',
    body:  'Terima kasih telah berkomitmen melestarikan bahasa daerah! Mulai besok, gunakan 3 kata bahasa daerahmu sehari. Ajak keluarga dan temanmu ikut serta. Bahasa adalah jiwa budaya — jaga agar tidak punah!'
  },
  jatidiri: {
    emoji: '🇮🇩',
    title: 'Ikrar Diterima, Pahlawan Budaya!',
    body:  'Dengan ikrar ini, kamu telah menjadi bagian dari gerakan pelestarian budaya Indonesia. Bangga menjadi orang Indonesia bukan hanya di mulut, tapi diwujudkan dalam tindakan nyata setiap harinya. Satu Nusa, Satu Bangsa!'
  }
};

function showPledge(type) {
  const c = pledgeContent[type];
  document.getElementById('modal-emoji').textContent = c.emoji;
  document.getElementById('modal-title').textContent = c.title;
  document.getElementById('modal-body').textContent  = c.body;
  document.getElementById('pledge-modal').classList.add('show');
}

function closePledge(e) {
  if (e.target === document.getElementById('pledge-modal'))
    document.getElementById('pledge-modal').classList.remove('show');
}