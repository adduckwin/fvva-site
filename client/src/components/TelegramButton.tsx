export default function TelegramButton() {
  return (
    <a
      href="https://t.me/aleksa_fvva"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        background: "color-mix(in srgb, #2AABEE, transparent 25%)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.06), 0 14px 30px -14px rgba(26, 60, 52, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
      }}
      aria-label="Написать в Telegram"
    >
      {/* Specular sheen */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 45%)",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
      <svg viewBox="0 0 24 24" fill="white" className="relative z-10 h-7 w-7 drop-shadow-sm">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.95 7.47l-1.97 9.28c-.15.67-.54.83-1.09.52l-3.02-2.22-1.46 1.4c-.16.16-.3.3-.61.3l.22-3.05 5.55-5.01c.24-.22-.05-.33-.37-.14l-6.85 4.31-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.45c.53-.19 1 .13.83.94z"/>
      </svg>
    </a>
  );
}
