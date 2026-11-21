import { CONTACT_LINKS } from "@/lib/practice";

export default function MaxButton() {
  return (
    <a
      href={CONTACT_LINKS.max}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в MAX"
    >
      MAX
    </a>
  );
}
