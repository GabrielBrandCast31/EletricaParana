"use client";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

const WHATSAPP_NUMBER = "55659XXXXXXXX"; // SUBSTITUIR
const wpp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, vim pelo site da Elétrica Paraná e quero solicitar um orçamento. Pode me ajudar?",
)}`;

export function WhatsappFlutuante() {
  return (
    <a
      href={wpp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0F315E] shadow-lg shadow-[#0F315E]/30 transition-transform duration-300 hover:scale-110"
    >
      <WhatsappIcon variant="claro" size={28} />
    </a>
  );
}
