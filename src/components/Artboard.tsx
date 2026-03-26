import { type CSSProperties, type PropsWithChildren, useEffect, useState } from "react";

type ArtboardProps = PropsWithChildren<{
  className?: string;
  height: number;
  width?: number;
}>;

function getScale(width: number) {
  if (typeof window === "undefined") {
    return 1;
  }

  return Math.min(1, Math.max(0.24, (window.innerWidth - 16) / width));
}

export function Artboard({ children, className, height, width = 1200 }: ArtboardProps) {
  const [scale, setScale] = useState(() => getScale(width));

  useEffect(() => {
    const handleResize = () => setScale(getScale(width));

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const viewportStyle = {
    height: `${height * scale}px`,
  } satisfies CSSProperties;

  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
    transform: `translateX(-50%) scale(${scale})`,
  } satisfies CSSProperties;

  return (
    <main className="artboard-page" style={viewportStyle}>
      <div className={`artboard-canvas ${className ?? ""}`.trim()} style={canvasStyle}>
        {children}
      </div>
    </main>
  );
}
