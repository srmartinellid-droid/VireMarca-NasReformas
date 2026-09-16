"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function CtaFinal() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-navy-900 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance max-w-3xl mx-auto">
            Sua próxima reforma começa com uma conversa
          </h2>
          <p className="mt-6 text-stone-300 text-lg max-w-xl mx-auto">
            Conte o que precisa. Respondemos pelo WhatsApp com objetividade.
          </p>
          <div className="mt-10">
            <a
              href={buildWhatsAppUrl(
                SITE.whatsapp,
                "Olá, gostaria de solicitar um orçamento para uma reforma."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track({
                  name: "whatsapp_click",
                  props: { location: "cta-final" },
                })
              }
            >
              <Button variant="accent" size="lg">
                Falar no WhatsApp — {SITE.whatsappDisplay}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
