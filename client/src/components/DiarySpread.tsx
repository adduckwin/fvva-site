export default function DiarySpread() {
  return (
    <a
      className="diary-spread"
      href="/dnevnik-mysley-kpt.pdf"
      aria-label="Открыть две страницы дневника в PDF"
    >
      <img
        className="diary-table"
        src="/images/folio-worktable.webp"
        alt=""
        width="960"
        height="640"
        decoding="async"
        fetchPriority="high"
      />
      <img
        className="diary-filled"
        src="/images/dnevnik-primer.webp"
        alt=""
        width="610"
        height="862"
        decoding="async"
      />
      <img
        className="diary-blank"
        src="/images/dnevnik-list.webp"
        alt=""
        width="610"
        height="862"
        decoding="async"
      />
    </a>
  );
}
