export type Audience = "guest" | "member";

export type Visual =
  | { kind: "image"; src: string; caption?: string }
  | { kind: "qris" }
  | { kind: "storefront" }
  | { kind: "plans" };

export interface Intent {
  id: string;
  audience: Audience | "all";
  priority: "high" | "medium" | "low";
  icon: string; // bootstrap icon name, e.g. "bi-shop"
  keywords: string[];
  title: string;
  /** 1 kalimat inti — selalu tampil */
  shortAnswer: string;
  /** penjelasan tambahan — tampil saat "Lihat detail" dibuka */
  longAnswer?: string;
  steps?: string[];
  note?: string;
  quickReplies?: string[];
  visual?: Visual;
}

/*
 * Konten jawaban resmi chatbot NiagaBio.
 * NiagaBio = link bio + katalog produk + checkout manual + dashboard seller.
 * Placeholder {name} dan {store} diganti profil user saat runtime.
 *
 * Guest = belum daftar/login -> jawaban fokus kenalan, manfaat, cara mulai.
 * Member = sudah daftar -> jawaban fokus aksi langsung di dashboard.
 * matchIntent() memfilter berdasarkan audience supaya jawabannya tidak tercampur.
 */
export const INTENTS: Intent[] = [
  /* ============================= GUEST ============================= */
  {
    id: "salam-guest",
    audience: "guest",
    priority: "high",
    icon: "bi-emoji-smile",
    keywords: ["halo", "hai", "hei", "hi", "pagi", "siang", "sore", "malam", "assalamualaikum", "tes", "test", "woi", "bro", "kak", "siapa kamu", "ini siapa", "kamu siapa", "kenalan"],
    title: "Halo, {name}! Kenalan dulu yuk",
    shortAnswer: "Aku Nia, asisten NiagaBio — siap bantu kenalin kamu sama NiagaBio sebelum daftar.",
    longAnswer:
      "Kamu bisa tanya apa aja: NiagaBio itu apa, gunanya buat apa, sampai gimana cara mulai bikin toko sendiri. Santai aja, belum daftar juga nggak masalah, tanya-tanya dulu boleh banget.",
    quickReplies: ["Ini website apa?", "Cara mulai bikin toko", "Paket gratis vs premium"],
  },
  {
    id: "apa-itu",
    audience: "guest",
    priority: "high",
    icon: "bi-shop-window",
    keywords: ["website apa", "apa itu", "niagabio", "apa ini", "tentang", "platform", "situs apa", "web ini", "ini apa", "linkbio", "link bio"],
    title: "NiagaBio itu apa sih?",
    shortAnswer: "NiagaBio itu link bio yang sekaligus jadi toko online mini.",
    longAnswer:
      "Satu link aja di bio Instagram atau status WhatsApp-mu bisa memuat katalog produk lengkap, dan pembeli bisa langsung checkout dari situ — tanpa kamu perlu bikin website sendiri atau ngerti coding sama sekali.",
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
    audience: "guest",
    priority: "high",
    icon: "bi-stars",
    keywords: ["kegunaan", "fungsi", "buat apa", "manfaat", "bisa apa", "fitur", "keunggulan", "kelebihan", "untungnya"],
    title: "Buat apa aja NiagaBio?",
    shortAnswer: "Intinya biar jualanmu kelihatan rapi dan pembeli gampang belanja tanpa tanya-tanya dulu.",
    longAnswer:
      "Daripada pembeli DM nanya harga satu-satu, mereka tinggal buka link bio-mu dan semua udah jelas di sana — foto produk, harga, sampai cara bayarnya.",
    steps: [
      "Link bio profesional — satu link untuk semua produkmu",
      "Katalog produk dengan foto, harga, dan deskripsi",
      "Checkout manual — pesanan masuk rapi, bukan chat berantakan",
      "Dashboard seller untuk pantau pesanan dan produk",
    ],
    note: "Cocok untuk yang jualan lewat Instagram, WhatsApp, TikTok, atau marketplace tapi ingin punya \"etalase\" sendiri.",
    quickReplies: ["Cara mulai bikin toko", "Cara daftar akun", "Gratis atau berbayar?"],
    visual: { kind: "storefront" },
  },
  {
    id: "daftar",
    audience: "guest",
    priority: "high",
    icon: "bi-person-plus",
    keywords: ["daftar", "registrasi", "buat akun", "bikin akun", "sign up", "register", "cara mulai", "akun baru", "mendaftar", "gabung"],
    title: "Cara daftar akun",
    shortAnswer: "Daftarnya gratis, cuma butuh email aktif — dari daftar sampai punya toko sendiri nggak sampai 5 menit.",
    longAnswer: "Nggak ada diminta kartu kredit atau data aneh-aneh. Setelah verifikasi email, kamu langsung diarahkan ke dashboard buat bikin toko pertamamu.",
    steps: [
      "Buka halaman Daftar dari beranda NiagaBio",
      "Isi nama, email, dan password",
      "Cek email untuk verifikasi (kadang nyasar ke folder spam)",
      "Login — kamu langsung diarahkan bikin toko pertamamu",
    ],
    note: "Satu akun langsung dapat satu toko di paket gratis. Bisa upgrade kapan saja kalau butuh lebih.",
    quickReplies: ["Cara mulai bikin toko", "Lupa password", "Paket gratis vs premium"],
  },
  {
    id: "demo",
    audience: "guest",
    priority: "medium",
    icon: "bi-play-circle",
    keywords: ["demo", "contoh toko", "preview", "lihat contoh", "coba dulu", "trial", "uji coba", "contohnya"],
    title: "Mau lihat contohnya dulu?",
    shortAnswer: "Boleh banget — malah bagus lihat-lihat dulu sebelum daftar.",
    longAnswer:
      "Kamu bisa intip contoh dashboard seller dan halaman toko dari sisi pembeli, semuanya tanpa perlu bikin akun dulu. Semua yang ada di demo persis sama kok dengan yang kamu dapat setelah daftar gratis.",
    steps: [
      "Demo dashboard: rasakan cara kelola produk dan pesanan",
      "Demo halaman toko: lihat pengalaman belanja dari sisi pembeli",
    ],
    quickReplies: ["Cara daftar akun", "Paket gratis vs premium", "Kegunaannya apa?"],
    visual: { kind: "image", src: "/assets/illustrator/mockup-dashboard.jpg", caption: "Pratinjau dashboard seller NiagaBio" },
  },
  {
    id: "bikin-toko-guest",
    audience: "guest",
    priority: "high",
    icon: "bi-shop",
    keywords: ["cara mulai bikin toko", "mulai jualan", "mau bikin toko", "gimana mulai", "cara mulai jualan online", "bikin toko", "buat toko", "toko baru"],
    title: "Cara mulai bikin toko",
    shortAnswer: "Tinggal daftar akun gratis, terus toko pertamamu langsung bisa dibikin dari dashboard.",
    longAnswer:
      "Nggak perlu mikirin desain dari nol. Setelah daftar, kamu tinggal isi nama toko, pilih tema, dan upload produk pertamamu. Semuanya dipandu langkah demi langkah, jadi nggak akan nyasar.",
    steps: [
      "Daftar akun gratis (cuma butuh email)",
      "Login, lalu klik Buat Toko di dashboard",
      "Isi nama toko dan pilih tema",
      "Upload produk pertamamu — toko langsung aktif",
    ],
    note: "Semua langkah ini bisa kamu coba dulu lewat demo sebelum daftar beneran.",
    quickReplies: ["Cara daftar akun", "Lihat demo", "Paket gratis vs premium"],
    visual: { kind: "storefront" },
  },
  {
    id: "halaman-publik",
    audience: "guest",
    priority: "medium",
    icon: "bi-globe2",
    keywords: ["halaman publik", "link toko", "halaman toko", "url toko", "share toko", "bagikan toko", "etalase", "alamat toko", "link jualan", "apa itu halaman toko"],
    title: "Apa itu halaman publik toko?",
    shortAnswer: "Ini \"wajah\" tokomu yang dilihat pembeli — isinya profil toko, katalog produk, dan tombol checkout.",
    longAnswer:
      "Pembeli bisa langsung belanja dari halaman ini tanpa perlu daftar atau install apa pun. Halaman ini otomatis rapi baik dibuka dari HP, tablet, maupun laptop, dan setiap kamu update produk, halamannya ikut ter-update.",
    steps: [
      "Setelah daftar, kamu dapat link toko sendiri",
      "Pasang di bio Instagram, TikTok, atau status WhatsApp",
      "Pembeli buka link, lihat katalog, langsung checkout",
    ],
    note: "Link ini yang nanti kamu sebar ke mana-mana — jadi etalase digital tokomu 24 jam.",
    quickReplies: ["Cara mulai bikin toko", "Lihat demo", "Cara daftar akun"],
    visual: { kind: "storefront" },
  },
  {
    id: "login-guest",
    audience: "guest",
    priority: "medium",
    icon: "bi-key",
    keywords: ["login", "masuk akun", "lupa password", "reset password", "tidak bisa masuk", "gagal login", "kata sandi", "lupa sandi", "password salah"],
    title: "Login atau lupa password?",
    shortAnswer: "Kalau lupa password, tinggal reset lewat email — nggak sampai 5 menit kok.",
    longAnswer: "Klik Lupa Password di halaman Login, masukkan email yang kamu pakai saat daftar, lalu cek inbox (atau folder spam) buat link reset-nya.",
    steps: [
      "Buka halaman Login, klik Lupa Password",
      "Masukkan email yang kamu pakai saat daftar",
      "Cek email, klik link reset",
      "Buat password baru, lalu login ulang",
    ],
    note: "Belum punya akun sama sekali? Daftar dulu aja, gratis kok.",
    quickReplies: ["Cara daftar akun", "Chat admin", "Ini website apa?"],
  },

  /* ============================= MEMBER ============================= */
  {
    id: "salam-member",
    audience: "member",
    priority: "high",
    icon: "bi-emoji-heart-eyes",
    keywords: ["halo", "hai", "hei", "hi", "pagi", "siang", "sore", "malam", "assalamualaikum", "tes", "test", "woi", "bro", "kak"],
    title: "Halo lagi, {name}!",
    shortAnswer: "Senang kamu balik lagi — mau dibantu apa hari ini soal {store}?",
    longAnswer:
      "Aku bisa bantu soal upload produk, cek pesanan masuk, checkout QRIS, ganti tema, sampai troubleshoot kalau ada yang error. Tanya aja langsung, nggak perlu formal-formal.",
    quickReplies: ["Cara upload produk", "Cara lihat pesanan", "Cara kerja checkout"],
  },
  {
    id: "bikin-toko-member",
    audience: "member",
    priority: "high",
    icon: "bi-shop",
    keywords: ["bikin toko", "buat toko", "membuat toko", "toko baru", "buka toko", "setting toko", "toko online", "punya toko", "atur toko", "lengkapi toko"],
    title: "Bikin atau lengkapi tokomu",
    shortAnswer: "Kalau tokomu belum lengkap, tinggal masuk dashboard dan ikuti langkah singkat ini.",
    longAnswer:
      "Nggak perlu mikirin desain dari nol — pilih tema, isi info toko, selesai. Link tokomu bentuknya seperti niagabio.id/{store}, tinggal taruh di bio Instagram atau status WhatsApp.",
    steps: [
      "Masuk dashboard, klik Buat Toko (atau Profil kalau sudah ada)",
      "Isi nama toko dan deskripsi singkat",
      "Upload logo dan pilih tema yang cocok",
      "Simpan — link bio tokomu langsung aktif",
    ],
    note: "Link tokomu nggak berubah walau kamu ganti nama atau tema, jadi aman terus dibagikan.",
    quickReplies: ["Cara upload produk", "Cara edit profil toko", "Ganti template"],
    visual: { kind: "storefront" },
  },
  {
    id: "upload-produk",
    audience: "member",
    priority: "high",
    icon: "bi-box-seam",
    keywords: ["upload produk", "tambah produk", "unggah produk", "jual produk", "masukin produk", "input produk", "foto produk", "upload barang", "tambah barang", "isi katalog", "katalog"],
    title: "Cara upload produk ke katalog",
    shortAnswer: "Gampang banget — satu produk cuma butuh nama, harga, dan satu foto.",
    longAnswer: "Deskripsi dan stok sifatnya opsional, tapi diisi bikin katalogmu makin meyakinkan di mata pembeli.",
    steps: [
      "Buka dashboard, masuk menu Produk",
      "Klik Tambah Produk",
      "Isi nama, harga, dan upload foto (disarankan rasio 1:1)",
      "Klik Simpan — produk langsung tampil di katalog",
    ],
    note: "Tips: foto terang dengan latar polos paling menarik dilirik. Kamu bisa sembunyikan produk yang stoknya habis tanpa menghapusnya.",
    quickReplies: ["Cara kerja checkout", "Cara lihat pesanan", "Ganti template"],
    visual: { kind: "image", src: "/assets/img/preview/2.jpg", caption: "Katalog produkmu tampil rapi di layar HP pembeli" },
  },
  {
    id: "checkout-qris",
    audience: "member",
    priority: "high",
    icon: "bi-qr-code-scan",
    keywords: ["checkout", "qris", "pembayaran", "bayar", "cara beli", "transfer", "payment", "pembeli bayar", "metode bayar", "scan", "cara pesan", "konfirmasi"],
    title: "Cara kerja checkout & QRIS manual",
    shortAnswer: "Checkout di NiagaBio sifatnya manual — kamu yang konfirmasi sendiri tiap pembayaran, tanpa potongan biaya.",
    longAnswer: "Uangnya masuk langsung ke rekeningmu, bukan ditahan pihak ketiga. Kamu juga bisa terima transfer bank biasa kalau itu lebih nyaman buat pembelimu.",
    steps: [
      "Pembeli pilih produk di katalogmu, lalu klik Checkout",
      "Pembeli isi nama dan kontak, muncul total belanja",
      "QRIS tokomu tampil — pembeli scan dan bayar",
      "Pesanan masuk ke dashboard, pembeli kirim bukti bayar",
      "Kamu cek pembayaran, tandai Lunas, lalu proses pesanan",
    ],
    note: "Pastikan gambar QRIS yang kamu upload jelas dan benar milik usahamu.",
    quickReplies: ["Cara lihat pesanan", "Cara upload produk", "Chat admin"],
    visual: { kind: "qris" },
  },
  {
    id: "pesanan",
    audience: "member",
    priority: "high",
    icon: "bi-receipt",
    keywords: ["pesanan", "order", "lihat order", "cek pesanan", "orderan", "notifikasi", "transaksi masuk", "pesanan masuk", "kelola pesanan"],
    title: "Cara melihat pesanan yang masuk",
    shortAnswer: "Semua pesanan terkumpul rapi di dashboard — nggak perlu lagi scroll chat panjang.",
    longAnswer: "Setiap pesanan lengkap dengan detail produk, jumlah, dan kontak pembelinya, jadi kamu tinggal proses satu-satu tanpa bingung.",
    steps: [
      "Buka dashboard, masuk menu Pesanan",
      "Pesanan baru ditandai label Menunggu Pembayaran",
      "Klik pesanan untuk lihat detail dan kontak pembeli",
      "Ubah status: Lunas → Diproses → Dikirim → Selesai",
    ],
    note: "Rajin update status ya — pembeli bisa lihat statusnya juga, jadi mereka nggak perlu tanya \"pesananku gimana kak?\" terus.",
    quickReplies: ["Cara kerja checkout", "Troubleshooting akun", "Kembali ke awal"],
    visual: { kind: "image", src: "/assets/illustrator/mockup-dashboard.jpg", caption: "Daftar pesanan di dashboard seller" },
  },
  {
    id: "template",
    audience: "member",
    priority: "medium",
    icon: "bi-palette",
    keywords: ["template", "tema", "theme", "desain toko", "tampilan toko", "ganti tampilan", "warna toko", "layout", "gaya toko"],
    title: "Ganti template & tema toko",
    shortAnswer: "Tinggal pilih tema yang udah jadi — semuanya dirancang buat layar HP.",
    longAnswer: "Kamu bisa ganti tema kapan aja tanpa takut produk atau pesananmu hilang. Data tokomu aman, cuma tampilannya yang berubah.",
    steps: [
      "Buka dashboard, masuk menu Tampilan lalu Tema",
      "Lihat pratinjau dulu sebelum diterapkan",
      "Sesuaikan warna dan font dengan brand-mu",
      "Simpan — perubahan langsung tayang di link bio-mu",
    ],
    note: "Ganti tema itu aman untuk dicoba-coba, kapan saja.",
    quickReplies: ["Cara edit profil toko", "Lihat halaman toko saya", "Cara upload produk"],
  },
  {
    id: "edit-profil",
    audience: "member",
    priority: "medium",
    icon: "bi-person-vcard",
    keywords: ["edit profil", "ganti bio", "ganti foto profil", "ubah nama toko", "edit toko", "ganti nomor wa", "atur profil", "ubah profil", "ganti nama toko"],
    title: "Cara edit profil & halaman toko",
    shortAnswer: "Semua bisa diubah dari menu Profil di dashboard — nama toko, bio, foto, sampai nomor WhatsApp.",
    longAnswer: "Kalau mau ganti tampilan visual (warna, layout), itu diatur di menu Tema, bukan Profil. Dua-duanya bisa diubah kapan aja tanpa memengaruhi produk atau pesanan yang sudah ada.",
    steps: [
      "Masuk dashboard, klik menu Profil",
      "Ubah nama toko, bio, atau nomor WhatsApp",
      "Klik Simpan — halaman toko langsung ter-update",
      "Mau ganti tampilan juga? Buka menu Tema",
    ],
    note: "Link toko (niagabio.id/{store}) nggak berubah walau kamu ganti nama toko, jadi aman terus dibagikan ke mana-mana.",
    quickReplies: ["Ganti template", "Lihat halaman toko saya", "Cara upload produk"],
  },
  {
    id: "troubleshoot-member",
    audience: "member",
    priority: "medium",
    icon: "bi-tools",
    keywords: ["404", "blank", "error", "tidak muncul", "gagal", "rusak", "tidak bisa dibuka", "halaman kosong", "loading terus", "troubleshoot", "masalah", "bug", "lemot", "putih", "hilang", "akun bermasalah", "produk tidak muncul", "dashboard error"],
    title: "Troubleshooting akun & error umum",
    shortAnswer: "Kebanyakan masalah tampilan atau akun bisa selesai sendiri lewat langkah sederhana ini.",
    longAnswer: "Coba urut dari atas ya — biasanya udah kelar di 2–3 langkah pertama, belum perlu sampai hubungi admin.",
    steps: [
      "Refresh halaman: Ctrl+Shift+R (atau tarik layar ke bawah di HP)",
      "Logout lalu login ulang kalau dashboard terasa tidak update",
      "Cek status tokomu di dashboard — pastikan Aktif",
      "Coba buka lewat browser lain atau mode incognito",
      "Masih bermasalah? Screenshot dan kirim ke admin",
    ],
    note: "Kalau yang error itu link toko publikmu, cek dulu apakah statusnya masih Aktif di dashboard.",
    quickReplies: ["Chat admin", "Cara lihat pesanan", "Kembali ke awal"],
  },

  /* ============================= ALL (guest & member) ============================= */
  {
    id: "paket",
    audience: "all",
    priority: "high",
    icon: "bi-gem",
    keywords: ["paket", "harga", "gratis", "premium", "berbayar", "biaya", "langganan", "upgrade", "pricing", "tarif", "bayar berapa", "mahal", "murah"],
    title: "Paket Gratis vs Premium",
    shortAnswer: "Kamu bisa mulai 100% gratis dan jualan beneran — bukan sekadar trial.",
    longAnswer:
      "Paket gratis udah cukup buat mulai jualan. Premium cocok kalau tokomu mulai ramai dan butuh ruang lebih: produk tanpa batas, tema premium, checkout QRIS, dan statistik penjualan.",
    note: "Nggak ada paksaan upgrade. Banyak seller yang nyaman di paket gratis sampai orderannya konsisten dulu.",
    quickReplies: ["Cara daftar akun", "Template apa saja?", "Chat admin"],
    visual: { kind: "plans" },
  },
  {
    id: "admin",
    audience: "all",
    priority: "high",
    icon: "bi-headset",
    keywords: ["admin", "kontak", "hubungi", "bantuan manusia", "cs", "customer service", "tanya orang", "chat admin", "bicara", "komplain", "lapor"],
    title: "Butuh bantuan langsung dari tim?",
    shortAnswer: "Tim NiagaBio siap bantu kalau kamu lebih nyaman ngobrol sama orang langsung.",
    longAnswer: "Kami online Senin–Sabtu jam 09.00–17.00 WIB. Di luar jam itu tetap boleh chat kok, nanti dibalas begitu tim online lagi.",
    steps: [
      "WhatsApp: 085191245042",
      "Email: niagabiosupport@gmail.com — dibalas kurang dari 24 jam",
      "Sertakan nama toko dan screenshot masalahnya biar cepat ditangani",
    ],
    note: "Chat di luar jam kerja tetap kami terima, dan dibalas begitu tim online lagi.",
    quickReplies: ["Ini website apa?", "Paket gratis vs premium", "Kembali ke awal"],
  },
  {
    id: "terima-kasih",
    audience: "all",
    priority: "low",
    icon: "bi-heart",
    keywords: ["terima kasih", "makasih", "thanks", "thank you", "oke sip", "mantap", "ok", "sip", "keren", "membantu"],
    title: "Sama-sama, {name}!",
    shortAnswer: "Senang bisa bantu.",
    longAnswer: "Kalau nanti ada yang bingung lagi — sekecil apa pun — langsung tanya aja di sini ya. Semoga jualannya makin laris!",
    quickReplies: ["Chat admin", "Kembali ke awal"],
  },
];

export const FALLBACK_GUEST: Intent = {
  id: "fallback-guest",
  audience: "guest",
  priority: "low",
  icon: "bi-compass",
  keywords: [],
  title: "Hmm, aku belum nangkep maksudnya",
  shortAnswer: "Pertanyaan itu belum ada di catatanku, {name} — tapi coba topik populer ini dulu:",
  longAnswer: "Kalau masih belum ketemu jawabannya, langsung aja chat admin — dijawab manusia asli, bukan bot.",
  steps: [
    "NiagaBio itu apa dan buat siapa",
    "Cara daftar akun dan mulai bikin toko",
    "Paket gratis vs premium",
    "Cara lihat demo sebelum daftar",
  ],
  note: "Nggak perlu ragu nanya ulang pakai kata-kata lain — aku coba tebak lagi maksudmu.",
  quickReplies: ["Ini website apa?", "Cara daftar akun", "Chat admin"],
};

export const FALLBACK_MEMBER: Intent = {
  id: "fallback-member",
  audience: "member",
  priority: "low",
  icon: "bi-compass",
  keywords: [],
  title: "Hmm, aku belum nangkep maksudnya",
  shortAnswer: "Pertanyaan itu belum ada di catatanku, {name} — tapi coba topik yang sering ditanya seller lain:",
  longAnswer: "Kalau masalahmu lebih spesifik atau mendesak, langsung chat admin aja ya — dijawab manusia asli.",
  steps: [
    "Cara upload produk dan atur katalog",
    "Cara lihat pesanan yang masuk",
    "Cara kerja checkout QRIS",
    "Troubleshooting akun & error umum",
  ],
  note: "Nggak perlu ragu nanya ulang pakai kata-kata lain — aku coba tebak lagi maksudmu.",
  quickReplies: ["Cara upload produk", "Troubleshooting akun", "Chat admin"],
};

export function getFallback(audience: Audience): Intent {
  return audience === "member" ? FALLBACK_MEMBER : FALLBACK_GUEST;
}

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

/** Filter intent berdasarkan audience supaya jawaban guest & member tidak tercampur */
function poolFor(audience: Audience): Intent[] {
  return INTENTS.filter((i) => i.audience === "all" || i.audience === audience);
}

export function matchIntent(input: string, audience: Audience): Intent {
  const userTokens = normalize(input);
  if (userTokens.length === 0) return getFallback(audience);

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of poolFor(audience)) {
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

  return bestScore >= 1.2 && best ? best : getFallback(audience);
}

/* chip label -> intent id (beberapa label sengaja beda kata antara
   guest & member supaya lookup-nya tidak perlu tahu audience) */
export const CHIP_MAP: Record<string, string> = {
  "Ini website apa?": "apa-itu",
  "Kegunaannya apa?": "kegunaan",
  "Cara daftar akun": "daftar",
  "Cara mulai bikin toko": "bikin-toko-guest",
  "Cara bikin toko": "bikin-toko-member",
  "Cara upload produk": "upload-produk",
  "Cara kerja checkout": "checkout-qris",
  "Cara lihat pesanan": "pesanan",
  "Paket gratis vs premium": "paket",
  "Gratis atau berbayar?": "paket",
  "Lihat paket harga": "paket",
  "Template apa saja?": "template",
  "Ganti template": "template",
  "Cara edit profil toko": "edit-profil",
  "Lihat halaman toko saya": "halaman-publik",
  "Lupa password": "login-guest",
  "Apa itu halaman publik toko?": "halaman-publik",
  "Chat admin": "admin",
  "Troubleshooting akun": "troubleshoot-member",
  "Lihat demo": "demo",
};

/** "Kembali ke awal" harus tahu audience supaya balik ke salam yang benar */
export function backToStart(audience: Audience): Intent {
  return intentById(audience === "member" ? "salam-member" : "salam-guest");
}

export function intentById(id: string): Intent {
  return INTENTS.find((i) => i.id === id) ?? getFallback("guest");
}

/* ================= PERSONALIZATION ================= */

export interface Profile {
  name: string;
  email: string;
  store?: string;
  audience: Audience;
}

export function personalize(intent: Intent, profile: Profile): Intent {
  const firstName = profile.name.trim().split(/\s+/)[0] || "Kak";
  const store = profile.store?.trim()
    ? profile.store.trim().toLowerCase().replace(/\s+/g, "-")
    : "tokomu";
  const rep = (s: string) => s.replaceAll("{name}", firstName).replaceAll("{store}", store);
  return {
    ...intent,
    title: rep(intent.title),
    shortAnswer: rep(intent.shortAnswer),
    longAnswer: intent.longAnswer ? rep(intent.longAnswer) : undefined,
    note: intent.note ? rep(intent.note) : undefined,
    steps: intent.steps?.map(rep),
  };
}
