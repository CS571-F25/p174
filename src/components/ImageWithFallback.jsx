import { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  style = {},
  variant,
  fallbackText,
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const variantClass = variant ? `card-img-${variant}` : '';
  const combinedClassName = [variantClass, className].filter(Boolean).join(' ').trim();
  const fallbackMessage = fallbackText || alt || 'Image unavailable';

  if (hasError || !src) {
    return (
      <div
        className={`${combinedClassName} image-fallback d-flex align-items-center justify-content-center`}
        style={{
          backgroundColor: '#e9ecef',
          color: '#495057',
          textAlign: 'center',
          fontWeight: 500,
          minHeight: style?.height || 150,
          ...style
        }}
      >
        <span>{fallbackMessage}</span>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={combinedClassName || undefined}
      style={style}
      onError={() => setHasError(true)}
    />
  );
}
