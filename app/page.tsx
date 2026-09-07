import { hero, site } from "@/content";

export default function Home() {
  return (
    <div className="wrap" style={{ paddingBlock: "120px" }}>
      <p className="mono" style={{ color: "var(--color-muted)" }}>
        {site.logo}
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
        {hero.title}
      </h1>
    </div>
  );
}
