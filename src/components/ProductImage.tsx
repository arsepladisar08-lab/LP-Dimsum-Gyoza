import React from 'react';

export interface ProductImageProps {
  src: string;
  alt: string;
  bgColor?: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  thumbnailOnly?: boolean;
  style?: React.CSSProperties;
}

/**
 * Komponen ProductImage teroptimasi untuk Dimsum Gyozen
 * Mendukung WebP responsive srcSet (480w & 960w), sizes dinamis,
 * width/height eksplisit untuk mencegah Layout Shift (CLS = 0),
 * dan placeholder warna latar dari product.bg selagi memuat gambar.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  bgColor,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  width = 480,
  height = 320,
  thumbnailOnly = false,
  style = {}
}) => {
  // Jika gambar berasal dari katalog /images/menu/, ekstrak base name untuk 480 dan 960
  const isMenuImage = src.includes('/images/menu/');
  const baseName = isMenuImage
    ? src.replace(/-(480|960)\.webp$/, '')
    : null;

  const src480 = baseName ? `${baseName}-480.webp` : src;
  const src960 = baseName ? `${baseName}-960.webp` : src;

  const computedSrc = thumbnailOnly ? src480 : src960;
  const srcSet = (!thumbnailOnly && baseName)
    ? `${src480} 480w, ${src960} 960w`
    : undefined;

  return (
    <img
      src={computedSrc}
      srcSet={srcSet}
      sizes={thumbnailOnly ? undefined : sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      style={{
        backgroundColor: bgColor || '#f5ebd7',
        ...style
      }}
      className={className}
    />
  );
};
