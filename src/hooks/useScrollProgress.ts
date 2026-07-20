import { useEffect, useRef, useState, useCallback } from "react";

export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ScrollState {
  /** Raw scroll progress 0–1 across the entire cinematic section */
  progress: number;
  /** Current active scene 1–8 */
  scene: SceneId;
  /** Progress within the current scene 0–1 */
  sceneProgress: number;
}

const TOTAL_SCENES = 8;

export function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scene: 1,
    sceneProgress: 0,
  });

  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollable = el.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const scrolled = -rect.top;
    const raw = Math.max(0, Math.min(1, scrolled / scrollable));

    const sceneFloat = raw * TOTAL_SCENES;
    const scene = (Math.min(Math.floor(sceneFloat) + 1, TOTAL_SCENES)) as SceneId;
    const sceneProgress = sceneFloat - Math.floor(sceneFloat);

    setState({ progress: raw, scene, sceneProgress });
  }, [containerRef]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return state;
}
