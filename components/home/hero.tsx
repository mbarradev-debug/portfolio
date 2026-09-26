import { LazyMonitorScene } from "@/components/voxel/lazy-monitor-scene";
import { getContent } from "@/content";

export async function Hero() {
  const { hero } = await getContent();
  return <LazyMonitorScene alt={hero.sceneAlt} loadingLabel={hero.sceneLoading} />;
}
