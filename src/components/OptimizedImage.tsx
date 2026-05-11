import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
}

// Cloudinary transformation helper
const getCloudinaryUrl = (baseUrl: string, width: number, format: 'webp' | 'avif' = 'webp') => {
  if (!baseUrl.includes('cloudinary.com')) return baseUrl;
  
  // Insert transformation parameters with balanced compression
  return baseUrl.replace('/upload/', `/upload/w_${width},q_auto:best,f_${format},dpr_auto/`);
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
  objectPosition,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [supportsAvif, setSupportsAvif] = useState(false);

  useEffect(() => {
    // Check AVIF support
    const img = new Image();
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    img.onload = () => setSupportsAvif(true);
  }, []);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!src.includes('cloudinary.com')) return undefined;
    
    const widths = [350, 638, 800, 1200];
    const format = supportsAvif ? 'avif' : 'webp';
    
    return widths
      .map(w => `${getCloudinaryUrl(src, w, format)} ${w}w`)
      .join(', ');
  };

  const srcSet = generateSrcSet();
  const fallbackSrc = src.includes('cloudinary.com') 
    ? getCloudinaryUrl(src, 638, 'webp') 
    : src;

  return (
    <picture>
      {supportsAvif && src.includes('cloudinary.com') && (
        <source
          type="image/avif"
          srcSet={srcSet}
          sizes={sizes}
        />
      )}
      <source
        type="image/webp"
        srcSet={srcSet}
        sizes={sizes}
      />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' } : {})}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ objectPosition }}
      />
    </picture>
  );
};
