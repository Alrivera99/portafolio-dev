"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, MailCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

type ApiResponse = { ok: boolean; msg?: string; errors?: Record<string, string[]> };

export default function ContactForm() {
  const { theme } = useTheme();

  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; msg: string }>(null);
  const [sent, setSent] = useState(false);

  const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    const fd = new FormData(e.currentTarget);
    const company = String(fd.get("company") || ""); // honeypot
    if (company.trim()) {
      setSending(false);
      setResult({ ok: false, msg: "Detección de spam." });
      return;
    }

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = String(fd.get("message") || "");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (!res.ok || !data?.ok) {
        setResult({
          ok: false,
          msg:
            data?.msg ||
            (data?.errors ? "Revisa los campos." : "No se pudo enviar tu mensaje."),
        });
        setSending(false);
        return;
      }

      // Éxito
      setSent(true); // ocultamos el formulario y mostramos la animación
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setResult({ ok: false, msg: "Fallo el envío. Intenta más tarde." });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    // Vista de éxito con animación
    return (
      <SuccessPanel theme={theme} />
    );
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Honeypot anti‑spam */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div>
          <Input
            name="name"
            placeholder="Tu nombre"
            required
            className={`focus:border-blue-500 ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500"
            }`}
          />
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="Tu email"
            required
            className={`focus:border-blue-500 ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500"
            }`}
          />
        </div>

        <div>
          <Textarea
            name="message"
            placeholder="Tu mensaje"
            rows={4}
            required
            className={`resize-none focus:border-blue-500 ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                : "bg-white/50 border-slate-300 text-slate-900 placeholder-slate-500"
            }`}
          />
        </div>

        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60"
        >
          <Send className="mr-2 h-4 w-4" />
          {sending ? "Enviando..." : "Enviar Mensaje"}
        </Button>

        {result && (
          <p
            className={`text-sm pt-2 ${
              result.ok ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {result.msg}
          </p>
        )}
      </form>
    </div>
  );
}

/** Panel de éxito con animación */
function SuccessPanel({ theme }: { theme?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center text-center rounded-xl p-8 ${
        theme === "dark"
          ? "bg-slate-800/50 border border-slate-700"
          : "bg-white/50 border border-slate-200"
      }`}
    >
      {/* Burbuja animada con ícono */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${
          theme === "dark" ? "bg-emerald-600/20" : "bg-emerald-500/10"
        }`}
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
        >
          <MailCheck className="h-10 w-10 text-emerald-500" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`text-xl font-semibold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        ¡Correo enviado con éxito!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className={theme === "dark" ? "text-slate-300 mt-2" : "text-slate-600 mt-2"}
      >
        Gracias por escribirme, te responderé lo antes posible.
      </motion.p>
    </motion.div>
  );
}
