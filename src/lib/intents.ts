export type Visual =
  | { kind: "image"; src: string; caption?: string }
  | { kind: "qris" }
  | { kind: "storefront" }
  | { kind: "plans" };

export interface Intent {
  id: string;
  icon: string; // bootstrap icon name, e.g. "bi-shop"
  keywords: string[];
  title: string;
  answer: string;
  steps?: string[];
  note?: string;
  quickReplies?: string[];
  visual?: Visual;
}

/*
 * Konten jawaban resmi chatbot NiagaBio.
 * NiagaBio = link bio + katalog produk + checkout manual + dashboard seller.
 * Placeholder {name} dan {store} diganti profil user saat runtime.
 */
export const INTENTS: Intent[] = [
  {
    id: "apa-itu",
    icon: "bi-shop-window",
    keywords: ["website apa", "apa itu", "niagabio", "apa ini", "tentang", "platform", "situs apa", "web ini", "ini apa", "linkbio", "link bio"],
    title: "NiagaBio itu apa sih?",
    answer:
      "NiagaBio adalah link bio yang sekaligus jadi toko online mini. Jadi satu link di bio Instagram atau WhatsApp-mu bisa memuat katalog produk lengkap, dan pembeli bisa langsung checkout dari situ — tanpa kamu perlu website sendiri atau ngerti coding.",
    steps: [
      "Daftar gratis, langsung dapat link bio sendiri",
      "Isi katalog dengan produk daganganmu",
      "Pembeli buka link, pilih produk, checkout",
      "Kamu terima pesanan lewat dashboard seller",
    ],
    note: "Dibuat khusus untuk UMKM dan seller online yang jualannya lewat HP. Semuanya bisa dikelola dari genggaman.",
    quickReplies: ["Kegunaannya apa?", "Cara daftar akun", "Lihat paket harga"],
    visual: { kind: "image", src: "/assets/illustrator/mockup-dashboard.jpg", caption: "Dashboard seller NiagaBio — semua bisa diatur dari HP" },
  },
  {
    id: "kegunaan",
    icon: "bi-stars",
    keywords: ["kegunaan", "fungsi", "buat apa", "manfaat", "bisa apa", "fitur", "keunggulan", "kelebihan", "untungnya"],
    title: "Buat apa aja NiagaBio?",
    answer:
      "Intinya: biar jualanmu kelihatan rapi dan pembeli gampang belanja. Daripada pembeli tanya-tanya harga satu-satu di DM, mereka tinggal buka link bio-mu dan semua sudah jelas di sana.",
    steps: [
      "Link bio profesional — satu link untuk semua produkmu",
      "Katalog produk dengan foto, harga, dan deskripsi",
      "Checkout manual — pesanan masuk rapi, bukan chat berantakan",
      "Dashboard seller untuk pantau pesanan dan produk",
    ],
    note: "Cocok untuk yang jualan lewat Instagram, WhatsApp, TikTok, atau marketplace tapi ingin punya \"etalase\" sendiri.",
    quickReplies: ["Cara bikin toko", "Cara upload produk", "Gratis atau berbayar?"],
    visual: { kind: "storefront" },
  },
  {
    id: "daftar",
    icon: "bi-person-plus",
    keywords: ["daftar", "registrasi", "buat akun", "bikin akun", "sign up", "register", "cara mulai", "akun baru", "mendaftar", "gabung"],
    title: "Cara daftar akun",
    answer:
      "Daftarnya gratis dan cuma butuh email aktif — nggak diminta kartu kredit atau data aneh-aneh. Dari daftar sampai punya link bio sendiri biasanya nggak sampai 5 menit.",
    steps: [
      "Buka halaman Daftar dari beranda NiagaBio",
      "Isi nama, email, dan password",
      "Cek email untuk verifikasi (kadang nyasar ke folder spam)",
      "Login — kamu langsung diarahkan bikin toko pertamamu",
    ],
    note: "Satu akun langsung dapat satu toko di paket gratis. Bisa upgrade kapan saja kalau butuh lebih.",
    quickReplies: ["Cara bikin toko", "Lupa password", "Paket gratis vs premium"],
  },
  {
    id: "bikin-toko",
    icon: "bi-shop",
    keywords: ["bikin toko", "buat toko", "membuat toko", "toko baru", "buka toko", "setting toko", "toko online", "punya toko", "atur toko"],
    title: "Bikin toko pertamamu",
    answer:
      "Setelah login, kamu tinggal ikuti langkah singkat di dashboard. Nggak perlu mikirin desain dari nol — pilih tema, isi info toko, selesai.",
    steps: [
      "Masuk dashboard, klik Buat Toko",
      "Isi nama toko dan deskripsi singkat",
      "Upload logo dan pilih tema yang cocok",
      "Simpan — link bio tokomu langsung aktif",
    ],
    note: "Link tokomu nanti bentuknya seperti niagabio.id/{store} — tinggal taruh di bio Instagram atau status WhatsApp.",
    quickReplies: ["Cara upload produk", "Lihat halaman publik toko", "Ganti template"],
    visual: { kind: "storefront" },
  },
  {
    id: "upload-produk",
    icon: "bi-box-seam",
    keywords: ["upload produk", "tambah produk", "unggah produk", "jual produk", "masukin produk", "input produk", "foto produk", "upload barang", "tambah barang", "isi katalog", "katalog"],
    title: "Cara upload produk ke katalog",
    answer:
      "Gampang banget — satu produk cuma butuh nama, harga, dan satu foto. Deskripsi dan stok opsional, tapi bikin katalogmu makin meyakinkan di mata pembeli.",
    steps: [
      "Buka dashboard, masuk menu Produk",
      "Klik Tambah Produk",
      "Isi nama, harga, dan upload foto (disarankan rasio 1:1)",
      "Klik Simpan — produk langsung tampil di katalog",
    ],
    note: "Tips: foto terang dengan latar polos paling menarik dilirik. Kamu bisa sembunyikan produk yang stoknya habis tanpa menghapusnya.",
    quickReplies: ["Cara kerja checkout", "Cara melihat pesanan", "Lihat demo"],
    visual: { kind: "image", src: "/assets/img/preview/2.jpg", caption: "Katalog produkmu tampil rapi di layar HP pembeli" },
  },
  {
    id: "checkout-qris",
    icon: "bi-qr-code-scan",
    keywords: ["checkout", "qris", "pembayaran", "bayar", "cara beli", "transfer", "payment", "pembeli bayar", "metode bayar", "scan", "cara pesan", "konfirmasi"],
    title: "Cara kerja checkout & QRIS manual",
    answer:
      "Checkout di NiagaBio sifatnya manual — artinya kamu yang konfirmasi sendiri setiap pembayaran. Nggak ada potongan biaya per transaksi, dan uangnya masuk langsung ke rekeningmu.",
    steps: [
      "Pembeli pilih produk di katalogmu, lalu klik Checkout",
      "Pembeli isi nama dan kontak, muncul total belanja",
      "QRIS tokomu tampil — pembeli scan dan bayar",
      "Pesanan masuk ke dashboard, pembeli kirim bukti bayar",
      "Kamu cek pembayaran, tandai Lunas, lalu proses pesanan",
    ],
    note: "Pastikan gambar QRIS yang kamu upload jelas dan benar milik usahamu. Kamu juga bisa terima pembayaran lewat transfer bank kalau lebih nyaman.",
    quickReplies: ["Cara melihat pesanan", "Cara upload produk", "Chat admin"],
    visual: { kind: "qris" },
  },
  {
    id: "pesanan",
    icon: "bi-receipt",
    keywords: ["pesanan", "order", "lihat order", "cek pesanan", "orderan", "notifikasi", "transaksi masuk", "pesanan masuk", "kelola pesanan"],
    title: "Cara melihat pesanan yang masuk",
    answer:
      "Semua pesanan terkumpul rapi di dashboard — nggak perlu lagi scroll chat panjang buat cari siapa pesan apa. Setiap pesanan lengkap dengan detail produk, jumlah, dan kontak pembelinya.",
    steps: [
      "Buka dashboard, masuk menu Pesanan",
      "Pesanan baru ditandai label Menunggu Pembayaran",
      "Klik pesanan untuk lihat detail dan kontak pembeli",
      "Ubah status: Lunas → Diproses → Dikirim → Selesai",
    ],
    note: "Rajin update status ya — pembeli bisa lihat statusnya juga, jadi mereka nggak perlu tanya \"pesananku gimana kak?\" terus.",
    quickReplies: ["Cara kerja checkout", "Troubleshooting error", "Kembali ke awal"],
    visual: { kind: "image", src: "/assets/illustrator/mockup-dashboard.jpg", caption: "Daftar pesanan di dashboard seller" },
  },
  {
    id: "paket",
    icon: "bi-gem",
    keywords: ["paket", "harga", "gratis", "premium", "berbayar", "biaya", "langganan", "upgrade", "pricing", "tarif", "bayar berapa", "mahal", "murah"],
    title: "Paket Gratis vs Premium",
    answer:
      "Kamu bisa mulai 100% gratis dan jualan beneran — bukan sekadar trial. Premium cocok kalau tokomu mulai ramai dan butuh ruang lebih: produk tanpa batas, tema premium, dan statistik penjualan.",
    note: "Nggak ada paksaan upgrade. Banyak seller yang nyaman di paket gratis sampai orderannya konsisten dulu.",
    quickReplies: ["Cara daftar akun", "Template apa saja?", "Chat admin"],
    visual: { kind: "plans" },
  },
  {
    id: "template",
    icon: "bi-palette",
    keywords: ["template", "tema", "theme", "desain toko", "tampilan toko", "ganti tampilan", "warna toko", "layout", "gaya toko"],
    title: "Template & tema toko",
    answer:
      "Ada beberapa tema siap pakai yang semuanya sudah dirancang untuk layar HP — karena mayoritas pembelimu memang buka dari HP. Ganti tema kapan saja tanpa takut produk atau pesananmu hilang.",
    steps: [
      "Buka dashboard, masuk menu Tampilan lalu Tema",
      "Lihat pratinjau dulu sebelum diterapkan",
      "Sesuaikan warna dan font dengan brand-mu",
      "Simpan — perubahan langsung tayang di link bio-mu",
    ],
    note: "Ganti tema itu aman untuk dicoba-coba. Data toko, produk, dan pesanan nggak akan berubah sama sekali.",
    quickReplies: ["Lihat halaman publik toko", "Cara bikin toko", "Lihat demo"],
  },
  {
    id: "login",
    icon: "bi-key",
    keywords: ["login", "masuk akun", "lupa password", "reset password", "tidak bisa masuk", "gagal login", "kata sandi", "lupa sandi", "password salah", "ganti password"],
    title: "Nggak bisa login atau lupa password?",
    answer:
      "Tenang, ini masalah paling umum dan bisa kamu selesaikan sendiri lewat email — nggak sampai 5 menit.",
    steps: [
      "Buka halaman Login, klik Lupa Password",
      "Masukkan email yang kamu pakai saat daftar",
      "Cek inbox dan folder spam untuk link reset",
      "Buat password baru, lalu login ulang",
    ],
    note: "Email reset belum masuk setelah 10 menit? Coba kirim ulang. Masih nggak muncul juga, hubungi admin — kami bantu cek manual.",
    quickReplies: ["Chat admin", "Cara daftar akun", "Troubleshooting error"],
  },
  {
    id: "halaman-publik",
    icon: "bi-globe2",
    keywords: ["halaman publik", "link toko", "halaman toko", "url toko", "share toko", "bagikan toko", "etalase", "alamat toko", "link jualan"],
    title: "Halaman publik tokomu",
    answer:
      "Ini \"wajah\" tokomu yang dilihat pembeli — berisi profil toko, katalog produk, dan tombol checkout. Pembeli bisa langsung belanja tanpa perlu daftar atau install apa pun.",
    steps: [
      "Salin link toko dari bagian atas dashboard",
      "Pasang di bio Instagram, TikTok, atau status WhatsApp",
      "Pembeli buka link, lihat katalog, langsung checkout",
    ],
    note: "Halaman ini otomatis rapi di HP, tablet, maupun laptop. Setiap kamu update produk, halamannya ikut ter-update.",
    quickReplies: ["Cara upload produk", "Ganti template", "Lihat demo"],
    visual: { kind: "storefront" },
  },
  {
    id: "admin",
    icon: "bi-headset",
    keywords: ["admin", "kontak", "hubungi", "bantuan manusia", "cs", "customer service", "tanya orang", "chat admin", "bicara", "komplain", "lapor"],
    title: "Butuh bantuan langsung dari tim?",
    answer:
      "Kadang memang lebih enak ngobrol sama orang langsung — nggak apa-apa, tim NiagaBio siap bantu. Kami online Senin–Sabtu, jam 09.00–17.00 WIB.",
    steps: [
      "WhatsApp: 085191245042",
      "Email: halo@niagabio.id — dibalas kurang dari 24 jam",
      "Sertakan nama toko dan screenshot masalahnya biar cepat ditangani",
    ],
    note: "Chat di luar jam kerja tetap kami terima kok, dan dibalas begitu tim online lagi.",
    quickReplies: ["Troubleshooting error", "Lupa password", "Kembali ke awal"],
  },
  {
    id: "troubleshoot",
    icon: "bi-tools",
    keywords: ["404", "blank", "error", "tidak muncul", "gagal", "rusak", "tidak bisa dibuka", "halaman kosong", "loading terus", "troubleshoot", "masalah", "bug", "lemot", "putih", "hilang"],
    title: "Halaman error, blank, atau 404?",
    answer:
      "Jangan panik dulu — kebanyakan masalah tampilan selesai dengan langkah sederhana ini. Coba urut dari atas ya.",
    steps: [
      "Refresh halaman: Ctrl + Shift + R (atau tarik layar ke bawah di HP)",
      "Cek koneksi internet, coba ganti WiFi atau data seluler",
      "Pastikan link yang dibuka nggak ada salah ketik",
      "Coba buka lewat mode incognito atau browser lain",
      "Masih bermasalah? Screenshot dan kirim ke admin",
    ],
    note: "Kalau yang error itu link toko publikmu, cek dulu di dashboard apakah status tokonya masih Aktif.",
    quickReplies: ["Chat admin", "Lupa password", "Kembali ke awal"],
  },
  {
    id: "demo",
    icon: "bi-play-circle",
    keywords: ["demo", "contoh toko", "preview", "lihat contoh", "coba dulu", "trial", "uji coba", "contohnya"],
    title: "Mau lihat contohnya dulu?",
    answer:
      "Boleh banget — malah bagus lihat dulu sebelum daftar. Kamu bisa intip contoh dashboard seller dan halaman toko dari sisi pembeli, semuanya tanpa perlu akun.",
    steps: [
      "Demo dashboard: rasakan cara kelola produk dan pesanan",
      "Demo halaman toko: lihat pengalaman belanja dari sisi pembeli",
    ],
    note: "Semua yang ada di demo persis sama dengan yang kamu dapat setelah daftar gratis.",
    quickReplies: ["Cara daftar akun", "Paket gratis vs premium", "Kegunaannya apa?"],
    visual: { kind: "image", src: "/assets/illustrator/mockup-dashboard.jpg", caption: "Pratinjau dashboard seller NiagaBio" },
  },
  {
    id: "salam",
    icon: "bi-emoji-smile",
    keywords: ["halo", "hai", "hei", "hi", "pagi", "siang", "sore", "malam", "assalamualaikum", "tes", "test", "woi", "bro", "kak"],
    title: "Halo, {name}! Senang kamu mampir",
    answer:
      "Aku Nia, asisten resmi NiagaBio. Aku bisa bantu jelasin cara bikin link bio toko, isi katalog produk, terima pesanan lewat QRIS, sampai bedanya paket gratis dan premium. Tanya aja bebas — atau pilih topik cepat di bawah.",
    quickReplies: ["Ini website apa?", "Cara bikin toko", "Paket gratis vs premium"],
  },
  {
    id: "terima-kasih",
    icon: "bi-heart",
    keywords: ["terima kasih", "makasih", "thanks", "thank you", "oke sip", "mantap", "ok", "sip", "keren", "membantu"],
    title: "Sama-sama, {name}!",
    answer:
      "Senang bisa bantu. Kalau nanti ada yang bingung lagi — sekecil apa pun — langsung tanya aja di sini ya. Semoga jualannya makin laris!",
    quickReplies: ["Lihat demo", "Cara daftar akun", "Chat admin"],
  },
];

export const FALLBACK: Intent = {
  id: "fallback",
  icon: "bi-compass",
  keywords: [],
  title: "Hmm, aku belum nangkep maksudnya",
  answer:
    "Maaf ya {name}, pertanyaan itu belum ada di catatanku. Tapi coba lihat dulu — biasanya yang dicari seller ada di salah satu topik ini:",
  steps: [
    "Daftar akun dan bikin toko / link bio",
    "Upload produk dan atur katalog",
    "Checkout, QRIS, dan cara lihat pesanan",
    "Paket gratis vs premium",
    "Login, error halaman, dan bantuan admin",
  ],
  note: "Pertanyaanmu lebih spesifik? Klik Chat Admin di atas — tim kami jawab langsung, bukan bot.",
  quickReplies: ["Ini website apa?", "Cara daftar akun", "Chat admin"],
};

/* ================= SMART MATCHER ================= */

const SYNONYMS: Record<string, string> = {
  gimana: "cara", bagaimana: "cara", caranya: "cara", gmn: "cara",
  bkin: "bikin", membuat: "bikin", buat: "bikin", create: "bikin",
  akun: "akun", account: "akun",
  gratisan: "gratis", free: "gratis", biayanya: "biaya",
  duit: "bayar", uang: "bayar", dana: "bayar", pay: "bayar",
  barang: "produk", item: "produk", dagangan: "produk", jualan: "produk",
  poto: "foto", gambar: "foto", image: "foto",
  pesenan: "pesanan", orderan: "order", transaksi: "pesanan",
  eror: "error", err: "error", ngebug: "error", crash: "error",
  pasword: "password", pw: "password", sandi: "password", passwd: "password",
  tokoku: "toko", warung: "toko", lapak: "toko", olshop: "toko",
  web: "website", situs: "website", aplikasi: "website", app: "website",
  hubungin: "hubungi", kontakin: "kontak", nanya: "tanya",
  registrasi: "daftar", signup: "daftar", mendaftar: "daftar",
  tema: "template", theme: "template", desain: "template", tampilan: "template",
  qr: "qris", kode: "qris",
  bio: "linkbio", biolink: "linkbio",
};

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => SYNONYMS[t] ?? t);
}

/** levenshtein distance capped at 2 — toleransi typo ringan */
function editDist(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return dp[a.length][b.length];
}

function tokenMatch(userTok: string, kwTok: string): number {
  if (userTok === kwTok) return 1;
  if (kwTok.length >= 4 && (userTok.startsWith(kwTok) || kwTok.startsWith(userTok)) && Math.abs(userTok.length - kwTok.length) <= 3) return 0.85;
  if (kwTok.length >= 5 && userTok.length >= 5 && editDist(userTok, kwTok) <= 1) return 0.8;
  return 0;
}

export function matchIntent(input: string): Intent {
  const userTokens = normalize(input);
  if (userTokens.length === 0) return FALLBACK;

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const kwTokens = normalize(kw);
      let matched = 0;
      for (const kt of kwTokens) {
        let bestTok = 0;
        for (const ut of userTokens) bestTok = Math.max(bestTok, tokenMatch(ut, kt));
        matched += bestTok;
      }
      const coverage = matched / kwTokens.length;
      if (coverage >= 0.99) score += 3 + kwTokens.length; // frasa lengkap
      else if (coverage >= 0.6 && kwTokens.length > 1) score += 1.5 * coverage;
      else if (kwTokens.length === 1 && coverage >= 0.8) score += 1.2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return bestScore >= 1.2 && best ? best : FALLBACK;
}

/* chip label -> intent id */
export const CHIP_MAP: Record<string, string> = {
  "Ini website apa?": "apa-itu",
  "Kegunaannya apa?": "kegunaan",
  "Cara daftar akun": "daftar",
  "Cara bikin toko": "bikin-toko",
  "Cara upload produk": "upload-produk",
  "Cara kerja checkout": "checkout-qris",
  "Cara melihat pesanan": "pesanan",
  "Paket gratis vs premium": "paket",
  "Gratis atau berbayar?": "paket",
  "Lihat paket harga": "paket",
  "Template apa saja?": "template",
  "Ganti template": "template",
  "Lupa password": "login",
  "Lihat halaman publik toko": "halaman-publik",
  "Chat admin": "admin",
  "Troubleshooting error": "troubleshoot",
  "Lihat demo": "demo",
  "Kembali ke awal": "salam",
};

export function intentById(id: string): Intent {
  return INTENTS.find((i) => i.id === id) ?? FALLBACK;
}

/* ================= PERSONALIZATION ================= */

export interface Profile {
  name: string;
  email: string;
  store?: string;
}

export function personalize(intent: Intent, profile: Profile): Intent {
  const firstName = profile.name.trim().split(/\s+/)[0] || "Kak";
  const store = profile.store?.trim()
    ? profile.store.trim().toLowerCase().replace(/\s+/g, "-")
    : "nama-tokomu";
  const rep = (s: string) => s.replaceAll("{name}", firstName).replaceAll("{store}", store);
  return {
    ...intent,
    title: rep(intent.title),
    answer: rep(intent.answer),
    note: intent.note ? rep(intent.note) : undefined,
    steps: intent.steps?.map(rep),
  };
}
