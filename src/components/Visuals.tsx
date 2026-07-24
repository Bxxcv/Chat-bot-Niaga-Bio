import type { Visual } from "../lib/intents";

/* ---------- QRIS mock card ---------- */
function QrisMock() {
  // deterministic pseudo-QR pattern
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 121; i++) {
    seed = (seed * 137 + 31) % 97;
    cells.push(seed % 3 !== 0);
  }
  return (
    <div className="mt-3 rounded-2xl border border-mint-line bg-white p-4 shadow-bubble">
      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-xl border-2 border-forest/10 bg-white p-2">
          <svg width="88" height="88" viewBox="0 0 110 110" aria-label="Contoh kode QRIS">
            {cells.map((on, i) =>
              on ? (
                <rect key={i} x={(i % 11) * 10} y={Math.floor(i / 11) * 10} width="9" height="9" rx="1.5" fill="#1C2321" />
              ) : null,
            )}
            <rect x="0" y="0" width="28" height="28" rx="4" fill="#10B981" />
            <rect x="82" y="0" width="28" height="28" rx="4" fill="#10B981" />
            <rect x="0" y="82" width="28" height="28" rx="4" fill="#10B981" />
            <rect x="7" y="7" width="14" height="14" rx="2" fill="#fff" />
            <rect x="89" y="7" width="14" height="14" rx="2" fill="#fff" />
            <rect x="7" y="89" width="14" height="14" rx="2" fill="#fff" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-ink">QRIS · Toko Kamu</p>
          <p className="mt-0.5 text-xs text-ink-soft">Total Pembayaran</p>
          <p className="font-display text-lg font-extrabold text-brand-deep">Rp 128.000</p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-forest">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Menunggu konfirmasi manual
          </span>
        </div>
      </div>
      <p className="mt-3 border-t border-cream-deep pt-2.5 text-[11px] text-ink-soft">
        Ilustrasi tampilan pembayaran QRIS di halaman checkout tokomu.
      </p>
    </div>
  );
}

/* ---------- storefront mock card ---------- */
function StorefrontMock() {
  const products = [
    { name: "Madu Hutan 250ml", price: "Rp 65.000", tone: "bg-amber-100", dot: "bg-amber-400" },
    { name: "Kopi Robusta 200g", price: "Rp 48.000", tone: "bg-orange-100", dot: "bg-orange-500" },
    { name: "Teh Herbal Serai", price: "Rp 32.000", tone: "bg-lime-100", dot: "bg-lime-500" },
  ];
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-mint-line bg-white shadow-bubble">
      <div className="flex items-center gap-2.5 bg-forest px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-display text-sm font-extrabold text-white">T</div>
        <div>
          <p className="text-sm font-bold text-white">Toko Berkah Alami</p>
          <p className="text-[11px] text-emerald-200">niagabio.id/berkah-alami</p>
        </div>
        <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">Link Bio</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-xl border border-cream-deep p-2">
            <div className={`flex h-14 items-center justify-center rounded-lg ${p.tone}`}>
              <span className={`h-5 w-5 rounded-full ${p.dot}`} />
            </div>
            <p className="mt-1.5 truncate text-[10px] font-semibold text-ink">{p.name}</p>
            <p className="text-[10px] font-bold text-brand-deep">{p.price}</p>
          </div>
        ))}
      </div>
      <p className="px-4 pb-3 text-[11px] text-ink-soft">Ilustrasi link bio + katalog yang dilihat pembeli.</p>
    </div>
  );
}

/* ---------- plans comparison card ---------- */
function PlansMock() {
  return (
    <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
      <div className="rounded-2xl border border-mint-line bg-white p-4 shadow-bubble">
        <p className="font-display text-sm font-extrabold text-ink">Gratis</p>
        <p className="font-display text-xl font-extrabold text-ink">Rp 0<span className="text-xs font-semibold text-ink-soft">/bulan</span></p>
        <ul className="mt-2.5 space-y-1.5 text-xs text-ink-soft">
          {["1 link bio toko aktif", "Hingga 20 produk di katalog", "Checkout + QRIS manual", "Tema dasar"].map((f) => (
            <li key={f} className="flex items-start gap-1.5">
              <i className="bi bi-check-circle-fill mt-0.5 text-[11px] text-brand" />{f}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative rounded-2xl bg-forest p-4 text-white shadow-soft">
        <span className="absolute -top-2 right-3 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-white shadow-brand">Populer</span>
        <p className="font-display text-sm font-extrabold">Premium</p>
        <p className="font-display text-xl font-extrabold">Rp 49rb<span className="text-xs font-semibold text-emerald-200">/bulan</span></p>
        <ul className="mt-2.5 space-y-1.5 text-xs text-emerald-100">
          {["Produk katalog tanpa batas", "Semua tema premium", "Statistik penjualan lengkap", "Prioritas bantuan admin"].map((f) => (
            <li key={f} className="flex items-start gap-1.5">
              <i className="bi bi-check-circle-fill mt-0.5 text-[11px] text-brand" />{f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- image visual ---------- */
function ImageVisual({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="mt-3 overflow-hidden rounded-2xl border border-mint-line bg-white shadow-bubble">
      <img src={src} alt={caption ?? "Pratinjau NiagaBio"} loading="lazy" className="h-40 w-full object-cover sm:h-48" />
      {caption && <figcaption className="px-4 py-2.5 text-[11px] text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}

export default function VisualBlock({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "qris":
      return <QrisMock />;
    case "storefront":
      return <StorefrontMock />;
    case "plans":
      return <PlansMock />;
    case "image":
      return <ImageVisual src={visual.src} caption={visual.caption} />;
  }
}
