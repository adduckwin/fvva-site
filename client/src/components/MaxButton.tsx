export default function MaxButton() {
  return (
    <a
      href="https://max.ru/u/f9LHodD0cOKoOcVdY7nuS0tflUZbFozx6cdcx1vdjY4DPD1D1_7ad0ciLo0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        background:
          "linear-gradient(135deg, rgba(71,26,255,0.55), rgba(149,0,255,0.45))",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.06), 0 14px 30px -14px rgba(71, 26, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      }}
      aria-label="Написать в Макс"
    >
      {/* Specular sheen */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0) 45%)",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="relative z-10 h-8 w-8 drop-shadow-sm"
      >
        {/* Speech bubble shape — single color */}
        <path
          d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26Z"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </a>
  );
}
