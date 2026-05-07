export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full"
      style={{
        borderTop: '1px solid var(--line)',
        paddingBlock: 'var(--space-6)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-4 px-4 md:px-6 xl:px-8">
        {/* Left: name + year */}
        <p
          className="font-mono text-muted"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          Miguel Barra · {year}
        </p>

        {/* Right: links + built with */}
        <div
          className="flex flex-wrap items-center gap-5 font-mono text-muted"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          <a
            href="https://github.com/mbarradev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-secondary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/miguelbarrarios"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-secondary"
          >
            LinkedIn
          </a>
          <span>Construido con Next.js y Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
