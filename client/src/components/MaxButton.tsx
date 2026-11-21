import { MessageCircle } from "lucide-react";
import { CONTACT_LINKS } from "@/lib/practice";

export default function MaxButton({ inMenu = false }: { inMenu?: boolean }) {
  return (
    <a
      href={CONTACT_LINKS.max}
      target="_blank"
      rel="noopener noreferrer"
      className={inMenu ? "site-max-menu" : "site-max-shortcut"}
      aria-label="Написать в MAX"
    >
      <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
      <span>{inMenu ? "Написать в MAX" : "MAX"}</span>
    </a>
  );
}
