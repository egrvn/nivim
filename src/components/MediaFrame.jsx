export function MediaFrame({ alt, className = "", src }) {
  return (
    <div className={`media-frame ${className}`.trim()}>
      <img alt={alt} className="media-frame__image" loading="lazy" src={src} />
      <div className="media-frame__glow" />
    </div>
  );
}
