export default function Home() {
  return (
    <main className="wrap" style={{ paddingBlock: "120px" }}>
      <p className="mono" style={{ color: "var(--color-muted)" }}>
        Miguel Barra — Full Stack Developer
      </p>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 400,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginTop: "16px",
        }}
      >
        Construyo productos full stack y los llevo a producción.
      </h1>
    </main>
  );
}
