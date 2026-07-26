import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Intent } from "../lib/intents";
import VisualBlock from "./Visuals";

export interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text?: string;
  intent?: Intent;
}

function BotAvatar() {
  return (
    <div className="relative h-9 w-9 shrink-0 self-end">
      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-mint-line bg-mint">
        <img src="/assets/img/bot-avatar.png" alt="Nia" className="h-7 w-7 object-contain" />
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-cream bg-brand" />
    </div>
  );
}

export function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex justify-end px-4"
    >
      <div className="max-w-[82%] rounded-3xl rounded-br-md bg-forest px-4 py-2.5 text-[15px] leading-relaxed text-white shadow-bubble sm:max-w-[65%]">
        {text}
      </div>
    </motion.div>
  );
}

export function BotCard({ intent, onQuickReply }: { intent: Intent; onQuickReply: (label: string) => void }) {
  const hasDetail = Boolean(intent.longAnswer || (intent.steps && intent.steps.length) || intent.note || intent.visual);
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-end gap-2.5 px-4"
    >
      <BotAvatar />
      <div className="max-w-[88%] sm:max-w-[75%]">
        <div className="rounded-3xl rounded-bl-md border border-mint-line bg-white px-4 py-3.5 shadow-bubble sm:px-5 sm:py-4">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-bold leading-snug text-ink sm:text-base">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mint text-[14px] text-brand-deep">
              <i className={`bi ${intent.icon}`} />
            </span>
            {intent.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">{intent.shortAnswer}</p>

          {hasDetail && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mt-2 flex items-center gap-1 text-[12.5px] font-bold text-brand-deep transition-colors hover:text-forest"
            >
              {open ? "Tutup detail" : "Lihat detail"}
              <i className={`bi bi-chevron-down text-[10px] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          )}

          <AnimatePresence initial={false}>
            {open && hasDetail && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pt-2.5">
                  {intent.longAnswer && (
                    <p className="text-[13.5px] leading-relaxed text-ink-soft">{intent.longAnswer}</p>
                  )}

                  {intent.steps && intent.steps.length > 0 && (
                    <div className="mt-3 rounded-2xl bg-cream px-3.5 py-3">
                      <ol className="space-y-2">
                        {intent.steps.map((s, i) => (
                          <li key={i} className="flex gap-2.5 text-[13.5px] leading-snug text-ink">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 font-display text-[11px] font-bold text-brand-deep">
                              {i + 1}
                            </span>
                            <span className="pt-0.5">{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {intent.visual && <VisualBlock visual={intent.visual} />}

                  {intent.note && (
                    <div className="mt-3 flex gap-2 rounded-2xl border border-amber-200/70 bg-amber-50 px-3.5 py-2.5">
                      <i className="bi bi-lightbulb mt-0.5 shrink-0 text-[14px] text-amber-500" />
                      <p className="text-[12.5px] leading-relaxed text-amber-900">{intent.note}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {intent.quickReplies && intent.quickReplies.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {intent.quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => onQuickReply(q)}
                className="rounded-full border border-mint-line bg-white px-3.5 py-2 text-[13px] font-semibold text-forest-soft shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-mint hover:text-forest active:translate-y-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end gap-2.5 px-4"
    >
      <BotAvatar />
      <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-md border border-mint-line bg-white px-4 py-3.5 shadow-bubble">
        <span className="nb-dot" />
        <span className="nb-dot" />
        <span className="nb-dot" />
      </div>
    </motion.div>
  );
}
