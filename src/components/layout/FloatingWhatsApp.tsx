"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function FloatingWhatsApp() {
  const handleClick = () => {
    track({ name: "whatsapp_click", props: { location: "floating" } });
  };

  return (
    <a
      href={buildWhatsAppUrl(
        SITE.whatsapp,
        "Olá, gostaria de solicitar um orçamento para uma reforma."
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
