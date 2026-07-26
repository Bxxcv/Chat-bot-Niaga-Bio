import { useState } from "react";
import { motion } from "framer-motion";
import type { Audience, Profile } from "../lib/intents";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Gate({ onEnter }: { onEnter: (p: Profile) => void }) {
  const [audience, setAudience] = useState<Audience | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [store, setStore] = useState("");
  const [touched, setTouched] = useState(false);

  const nameOk = name.trim().length >= 2;
  const emailOk = EMAIL_RE.test(email.trim());
  const valid = nameOk && emailOk && !!audience;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onEnter({ name: name.trim(), email: email.trim(), store: store.trim() || undefined, audience: audience! });
  };

  return (
    <div className="nb-atmosphere flex min-h-dvh items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-[28px] border border-mint-line bg-white shadow-soft">
          {/* header */}
          <div className="relative bg-gradient-to-br from-mint via-white to-cream px-6 pb-6 pt-8 text-center">
            <div className="nb-float mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-mint-line bg-white shadow-soft">
              <img src="/assets/img/bot-avatar.png" alt="Nia" className="h-16 w-16 object-contain" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
              Ngobrol sama <span className="text-brand-deep">Nia</span>
            </h1>
            <p className="mx-auto mt-1.5 max-w-xs text-[13.5px] leading-relaxed text-ink-soft">
              Kenalan sebentar dulu ya — biar jawabanku lebih personal buatmu.
            </p>
            <img src="/assets/illustrator/niagabio-logo.svg" alt="NiagaBio" className="absolute right-4 top-4 h-6 opacity-80" />
          </div>

          {/* form */}
          <form onSubmit={submit} noValidate className="space-y-3.5 px-6 pb-7 pt-5">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-forest-soft">
                <i className="bi bi-signpost-split" /> Kamu yang mana?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAudience("guest")}
                  className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                    audience === "guest"
                      ? "border-brand bg-mint shadow-brand/10"
                      : "border-mint-line bg-cream hover:border-brand/60"
                  }`}
                >
                  <i className={`bi bi-compass mb-1 block text-[18px] ${audience === "guest" ? "text-brand-deep" : "text-ink-soft"}`} />
                  <span className="block text-[13px] font-bold text-ink">Belum daftar</span>
                  <span className="block text-[11px] text-ink-soft">Masih lihat-lihat dulu</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAudience("member")}
                  className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                    audience === "member"
                      ? "border-brand bg-mint shadow-brand/10"
                      : "border-mint-line bg-cream hover:border-brand/60"
                  }`}
                >
                  <i className={`bi bi-shop mb-1 block text-[18px] ${audience === "member" ? "text-brand-deep" : "text-ink-soft"}`} />
                  <span className="block text-[13px] font-bold text-ink">Sudah punya toko</span>
                  <span className="block text-[11px] text-ink-soft">Sudah daftar & login</span>
                </button>
              </div>
              {touched && !audience && (
                <p className="mt-1.5 flex items-center gap-1 text-[12px] text-red-500"><i className="bi bi-exclamation-circle" /> Pilih salah satu dulu ya.</p>
              )}
            </div>

            <div>
              <label htmlFor="g-name" className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-forest-soft">
                <i className="bi bi-person" /> Nama kamu
              </label>
              <input
                id="g-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Rina"
                autoComplete="name"
                className={`h-12 w-full rounded-2xl border bg-cream px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand focus:bg-white ${touched && !nameOk ? "border-red-300" : "border-mint-line"}`}
              />
              {touched && !nameOk && (
                <p className="mt-1 flex items-center gap-1 text-[12px] text-red-500"><i className="bi bi-exclamation-circle" /> Isi nama minimal 2 huruf ya.</p>
              )}
            </div>

            <div>
              <label htmlFor="g-email" className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-forest-soft">
                <i className="bi bi-envelope" /> Email
              </label>
              <input
                id="g-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cth: rina@gmail.com"
                autoComplete="email"
                className={`h-12 w-full rounded-2xl border bg-cream px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand focus:bg-white ${touched && !emailOk ? "border-red-300" : "border-mint-line"}`}
              />
              {touched && !emailOk && (
                <p className="mt-1 flex items-center gap-1 text-[12px] text-red-500"><i className="bi bi-exclamation-circle" /> Format emailnya belum pas nih.</p>
              )}
            </div>

            {audience === "member" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.22 }}>
                <label htmlFor="g-store" className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-forest-soft">
                  <i className="bi bi-shop" /> Nama toko
                  <span className="rounded-full bg-cream-deep px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-ink-soft">opsional</span>
                </label>
                <input
                  id="g-store"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="cth: Berkah Alami"
                  className="h-12 w-full rounded-2xl border border-mint-line bg-cream px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand focus:bg-white"
                />
              </motion.div>
            )}

            <button
              type="submit"
              className="group mt-1 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 font-display text-[15px] font-bold text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0"
            >
              Mulai Ngobrol
              <i className="bi bi-arrow-right transition-transform group-hover:translate-x-0.5" />
            </button>

            <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-ink-soft/70">
              <i className="bi bi-shield-lock" /> Data hanya dipakai untuk personalisasi chat. Tidak dibagikan.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
