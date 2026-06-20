export default function Header() {
  return (
    <div className="sticky top-4 z-50 px-6">
      <header className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-craftz-bg/50 shadow-lg shadow-black/30 backdrop-blur-xl">
        <nav className="flex items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-mono font-bold tracking-tight text-zinc-100">
            mb.
          </span>
          <ul className="flex gap-3 sm:gap-6">
            {[
              ['Experiencia', '#experiencia'],
              ['Proyectos', '#proyectos'],
              ['Habilidades', '#habilidades'],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-craftz-primary focus-visible:text-craftz-primary font-mono text-[10px] text-zinc-400 transition-colors focus-visible:outline-none sm:text-xs sm:tracking-wide"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}
