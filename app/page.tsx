import { SiteBody } from "@/components/SiteBody";

// El home usa el `title.default` y la `description` del layout raíz. El idioma
// de la interfaz lo decide LocaleProvider en cliente; el HTML servido es español.
export default function Home() {
  return <SiteBody />;
}
