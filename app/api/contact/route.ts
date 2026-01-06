import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const { nombre, email, mensaje } = await request.json();

    // Validación de campos requeridos
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validación de email
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido" },
        { status: 400 }
      );
    }

    // Validación de longitud
    if (nombre.length > 100 || email.length > 254 || mensaje.length > 5000) {
      return NextResponse.json(
        { error: "Uno o más campos exceden la longitud máxima" },
        { status: 400 }
      );
    }

    // Sanitizar inputs para HTML
    const nombreSafe = sanitizeHtml(nombre);
    const mensajeSafe = sanitizeHtml(mensaje);

    // Enviar email
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mbarra.3690@gmail.com",
      subject: `Nuevo mensaje de contacto de ${nombreSafe}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${nombreSafe}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensajeSafe.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Error al enviar el mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
