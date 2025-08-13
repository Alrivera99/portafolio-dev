// Fuerza Node.js y evita caching del App Router
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { EmailTemplate } from "@/components/EmailTemplate";
import { renderAsync } from "@react-email/render";

const Schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre (mín. 2)"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje muy corto (mín. 10)"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    if (!json) return NextResponse.json({ ok: false, msg: "JSON inválido" }, { status: 400 });

    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, msg: "Validación falló", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO = process.env.CONTACT_TO;
    const CONTACT_FROM = process.env.CONTACT_FROM;
    if (!RESEND_API_KEY) return NextResponse.json({ ok: false, msg: "Falta RESEND_API_KEY" }, { status: 500 });
    if (!CONTACT_TO) return NextResponse.json({ ok: false, msg: "Falta CONTACT_TO" }, { status: 500 });
    if (!CONTACT_FROM) return NextResponse.json({ ok: false, msg: "Falta CONTACT_FROM" }, { status: 500 });

    // 🔑 Renderiza tú mismo la plantilla a HTML (evita el bug de renderAsync interno)
    const html = await renderAsync(EmailTemplate({ name, email, message }));

    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: `Nuevo mensaje — ${name}`,
      html, // 👈 usamos HTML ya renderizado
    });
console.log("das");

    if (error) {
      return NextResponse.json({ ok: false, msg: `Resend error: ${JSON.stringify(error) || "desconocido"}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, msg: `Error interno: ${e?.message ?? String(e)}` }, { status: 500 });
  }
}
