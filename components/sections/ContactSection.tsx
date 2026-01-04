import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function ContactSection() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <h2
            id="contacto"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Contacto
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg">
            Si buscas construir una solución sólida desde el inicio, con
            decisiones técnicas conscientes y una visión de largo plazo,
            conversemos.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Contacto directo
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <span className="text-sm text-gray-500">Email</span>
                <a
                  href="mailto:contacto@miguelbarra.dev"
                  className="mt-1 block text-gray-300 transition-colors hover:text-white"
                >
                  contacto@miguelbarra.dev
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-500">LinkedIn</span>
                <a
                  href="https://linkedin.com/in/miguelbarra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-gray-300 transition-colors hover:text-white"
                >
                  linkedin.com/in/miguelbarra
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-500">GitHub</span>
                <a
                  href="https://github.com/miguelbarra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-gray-300 transition-colors hover:text-white"
                >
                  github.com/miguelbarra
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Envíame un mensaje
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Cuéntame brevemente sobre tu proyecto o idea y te responderé a la
              brevedad.
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm text-gray-400">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm text-gray-400"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Enviar mensaje
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-500">
              También puedes escribirme directamente a mi correo.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
