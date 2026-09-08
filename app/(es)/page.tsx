import { SitePage } from "../_page";

// El home usa el `title.default` y la `description` del layout raíz; el
// `canonical` y los `hreflang` también salen de ahí (buildMetadata).
export default function Home() {
  return <SitePage locale="es" />;
}
