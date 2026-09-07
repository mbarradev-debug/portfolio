// Toggle de idioma — puramente visual: ES es la única versión disponible, EN
// queda deshabilitado. Sin estado, así que sirve tanto en el header (Client)
// como en el footer (Server).

const EN_TITLE = "Versión en inglés próximamente";

export function LangToggle({ variant }: { variant: "header" | "footer" }) {
  const className = variant === "header" ? "lang-toggle" : "footer-lang";
  return (
    <div className={className} role="group" aria-label="Idioma">
      <button
        type="button"
        data-lang="en"
        disabled
        aria-pressed={false}
        title={EN_TITLE}
      >
        EN
      </button>
      <button
        type="button"
        data-lang="es"
        className="active"
        aria-pressed={true}
      >
        ES
      </button>
    </div>
  );
}
