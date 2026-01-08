import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, name, className }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const fallbackUrl = `https://placehold.co/400x400?text=${encodeURIComponent(name)}`;

  return (
    <img
      src={error ? fallbackUrl : src}
      alt={alt}
      className={cn('object-contain', className)}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
