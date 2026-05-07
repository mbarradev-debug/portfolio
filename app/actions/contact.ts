'use server'

import { Resend } from 'resend'

export type ContactState = {
  success?: boolean
  error?: string
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { error: 'Todos los campos son requeridos.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'El email no es válido.' }
  }

  if (message.length < 10) {
    return { error: 'El mensaje es demasiado corto.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { error: 'Servicio de email no configurado. Escríbeme directamente a mbarra.git@gmail.com' }
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      // Requires a verified sending domain in production — update RESEND_FROM env var
      from: process.env.RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>',
      to: 'mbarra.git@gmail.com',
      replyTo: email,
      subject: `Mensaje de ${name} — miguelbarra.dev`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    })
    return { success: true }
  } catch {
    return { error: 'No se pudo enviar el mensaje. Intenta más tarde o escríbeme directamente.' }
  }
}
