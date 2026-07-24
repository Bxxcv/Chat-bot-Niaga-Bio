import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { matchIntent, intentById, personalize, CHIP_MAP, type Intent, type Profile } from "./lib/intents";
import { UserBubble, BotCard, TypingBubble, type ChatMsg } from "./components/ChatMessage";
import Gate from "./components/Gate";

const QUICK_ACTIONS = [
  { label: "Daftar Gratis", icon: "bi-person-plus-fill", primary: true, chip: "Cara daftar akun" },
  { label: "Lihat Demo", icon: "bi-play-circle", primary: false, chip: "Lihat demo" },
  { label: "Chat Admin", icon: "bi-headset", primary: false, chip: "Chat admin" },
  { label: "Beranda", icon: "bi-house", primary: false, chip: "Ini website apa?" },
];

const STARTER_CHIPS = [
  "Ini website apa?",
  "Cara daftar akun",
  "Cara bikin toko",
  "Cara upload produk",
  "Cara kerja checkout",
  "Paket gratis vs premium",
  "Lupa password",
  "Troubleshooting error",
];

const PROFILE_KEY = "nb-chat-profile";

function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p?.name === "string" && typeof p?.email === "string") return p;
  } catch {
    /* ignore */
  }
  return null;
}

let idCounter = 1;

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(loadProfile);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollDown = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  };

  useEffect(scrollDown, [messages, typing]);

  const respond = (intent: Intent) => {
    if (!profile) return;
    setTyping(true);
    const delay = 600 + Math.random() * 450;
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: idCounter++, role: "bot", intent: personalize(intent, profile) }]);
    }, delay);
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: idCounter++, role: "user", text }]);
    setInput("");
    const mapped = CHIP_MAP[text];
    respond(mapped ? intentById(mapped) : matchIntent(text));
  };

  const enter = (p: Profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfile(p);
  };

  const resetProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    setMessages([]);
    setProfile(null);
  };

  if (!profile) return <Gate onEnter={enter} />;

  const firstName = profile.name.split(/\s+/)[0];
  const empty = messages.length === 0;

  return (
    <div className="nb-atmosphere flex h-dvh flex-col overflow-hidden">
      {/* ======== HEADER HERO ======== */}
      <header className="relative z-10 shrink-0 border-b border-mint-line/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-3xl px-4 pb-3 pt-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-mint-line bg-mint shadow-sm sm:h-14 sm:w-14">
                <img src="/assets/img/bot-avatar.png" alt="Nia, asisten NiagaBio" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
              </div>
              <span className="nb-online absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="font-display text-lg font-extrabold leading-tight text-ink sm:text-xl">
                Nia <span className="font-semibold text-ink-soft">·</span>{" "}
                <span className="text-brand-deep">Asisten NiagaBio</span>
              </h1>
              <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-soft sm:text-[13px]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Online · ngobrol dengan {firstName}
                {profile.store ? ` · ${profile.store}` : ""}
              </p>
            </div>

            <button
              onClick={resetProfile}
              title="Ganti profil"
              aria-label="Ganti profil"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mint-line bg-white text-[14px] text-forest-soft transition-colors hover:border-brand hover:bg-mint"
            >
              <i className="bi bi-person-gear" />
            </button>
            <img src="/assets/illustrator/niagabio-logo.svg" alt="NiagaBio" className="hidden h-8 sm:block" />
          </div>

          {/* quick actions */}
          <div className="nb-chip-row -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {QUICK_ACTIONS.map(({ label, icon, primary, chip }) => (
              <button
                key={label}
                onClick={() => send(chip)}
                className={
                  primary
                    ? "flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-bold text-white shadow-brand transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    : "flex shrink-0 items-center gap-1.5 rounded-full border border-mint-line bg-white px-4 py-2 text-[13px] font-semibold text-forest-soft transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-mint active:translate-y-0"
                }
              >
                <i className={`bi ${icon} text-[14px]`} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ======== CHAT AREA ======== */}
      <div ref={scrollRef} className="nb-scroll relative flex-1 overflow-y-auto">
        <div className="nb-dots pointer-events-none absolute inset-x-0 top-0 h-56" />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-5 py-5 sm:py-7">
          {/* ---- empty / intro state ---- */}
          {empty && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="px-4 sm:px-6"
            >
              <div className="overflow-hidden rounded-3xl border border-mint-line bg-white shadow-soft">
                <div className="relative bg-gradient-to-br from-mint via-white to-cream px-5 pb-6 pt-7 text-center sm:px-8">
                  <div className="nb-float mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-mint-line bg-white shadow-soft">
                    <img src="/assets/img/bot-avatar.png" alt="Nia" className="h-20 w-20 object-contain" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">
                    Hai <span className="text-brand-deep">{firstName}</span>, aku Nia
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
                    Tanya apa saja soal link bio toko, katalog produk, checkout QRIS,
                    sampai paket harga. Aku jawab dengan bahasa yang gampang dipahami.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11.5px] font-semibold text-forest-soft">
                    <span className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5"><i className="bi bi-lightning-charge" /> Jawaban instan</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5"><i className="bi bi-patch-check" /> Resmi NiagaBio</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5"><i className="bi bi-headset" /> Bisa lanjut ke admin</span>
                  </div>
                </div>

                {/* feature preview strip */}
                <div className="grid gap-2.5 border-t border-cream-deep p-4 sm:grid-cols-3 sm:p-5">
                  {[
                    { chip: "Lihat demo", img: "/assets/illustrator/mockup-dashboard.jpg", t: "Dashboard seller", d: "Pantau produk & pesanan" },
                    { chip: "Cara upload produk", img: "/assets/img/preview/2.jpg", t: "Katalog produk", d: "Rapi di layar HP pembeli" },
                    { chip: "Cara kerja checkout", img: null, t: "Checkout QRIS", d: "Manual, tanpa potongan" },
                  ].map((c) => (
                    <button
                      key={c.t}
                      onClick={() => send(c.chip)}
                      className="group overflow-hidden rounded-2xl border border-cream-deep bg-cream text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-soft"
                    >
                      {c.img ? (
                        <img src={c.img} alt={c.t} className="h-20 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-24" />
                      ) : (
                        <div className="flex h-20 items-center justify-center bg-forest sm:h-24">
                          <i className="bi bi-qr-code-scan text-4xl text-brand" />
                        </div>
                      )}
                      <div className="px-3 py-2.5">
                        <p className="text-[12.5px] font-bold text-ink">{c.t}</p>
                        <p className="text-[11px] text-ink-soft">{c.d}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] font-semibold uppercase tracking-widest text-ink-soft/70">
                Mulai dari pertanyaan populer <i className="bi bi-arrow-down-short text-[15px]" />
              </p>
            </motion.section>
          )}

          {/* ---- messages ---- */}
          {messages.map((m) =>
            m.role === "user" ? (
              <UserBubble key={m.id} text={m.text!} />
            ) : (
              <BotCard key={m.id} intent={m.intent!} onQuickReply={send} />
            ),
          )}

          <AnimatePresence>{typing && <TypingBubble />}</AnimatePresence>
        </div>
      </div>

      {/* ======== COMPOSER ======== */}
      <footer className="relative z-10 shrink-0 border-t border-mint-line/70 bg-white/85 pb-[max(env(safe-area-inset-bottom),12px)] backdrop-blur-xl">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="nb-chip-row -mx-4 flex gap-2 overflow-x-auto px-4 pt-3 sm:mx-0 sm:px-0">
            {STARTER_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="shrink-0 rounded-full border border-mint-line bg-cream px-3.5 py-1.5 text-[12.5px] font-semibold text-forest-soft transition-all hover:border-brand hover:bg-mint hover:text-forest"
              >
                {c}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              inputRef.current?.focus();
            }}
            className="mt-2.5 flex items-center gap-2"
          >
            <div className="flex flex-1 items-center gap-2 rounded-full border border-mint-line bg-white px-4 py-1 shadow-bubble transition-shadow focus-within:border-brand focus-within:shadow-brand/20">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Tanya apa saja, ${firstName}…`}
                aria-label="Tulis pertanyaan"
                className="h-11 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Kirim pesan"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              <i className="bi bi-send-fill text-[17px]" />
            </button>
          </form>

          <p className="pt-2 text-center text-[10.5px] text-ink-soft/60">
            Nia menjawab otomatis berdasarkan panduan NiagaBio · butuh manusia?{" "}
            <button onClick={() => send("Chat admin")} className="font-semibold text-brand-deep underline-offset-2 hover:underline">
              Chat Admin
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}
