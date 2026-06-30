export default function MaxButton() {
  return (
    <a
      href="https://max.ru/u/f9LHodD0cOKoOcVdY7nuS0tflUZbFozx6cdcx1vdjY4DPD1D1_7ad0ciLo0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        background: "linear-gradient(135deg, rgba(255,107,53,0.75), rgba(255,143,53,0.65))",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.06), 0 14px 30px -14px rgba(255, 107, 53, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
      }}
      aria-label="Написать в Макс"
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
      <svg viewBox="0 0 32 32" fill="none" className="relative z-10 h-7 w-7 drop-shadow-sm">
        <path d="M8 10L16 18L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16L16 24L24 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    </a>
  );
}
