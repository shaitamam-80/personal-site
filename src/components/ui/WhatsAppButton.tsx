"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const WHATSAPP_NUMBER = SITE_CONFIG.phone.replace(/[^0-9]/g, "");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 start-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
