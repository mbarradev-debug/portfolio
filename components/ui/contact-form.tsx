'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { sendContactEmail } from '@/app/actions/contact'

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, {})

  if (state.success) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--bg-border)',
        }}
      >
        <p
          className="font-body text-primary"
          style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65 }}
        >
          Mensaje enviado. Te responderé pronto.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="font-mono text-muted"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre"
          className="contact-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="font-mono text-muted"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="contact-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-muted"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          placeholder="¿En qué puedo ayudarte?"
          className="contact-input"
        />
      </div>

      {state.error && (
        <p
          className="font-body"
          style={{ fontSize: 'var(--text-sm)', color: '#e05a5a' }}
          role="alert"
        >
          {state.error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? 'Enviando…' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
