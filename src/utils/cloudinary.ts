/**
 * Cloudinary image optimization utility
 * Base URL: https://res.cloudinary.com/dbkjpn2db/image/upload/
 */

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dbkjpn2db/image/upload';

export type ImageTransformOptions = {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif';
  crop?: 'fill' | 'scale' | 'thumb' | 'fit';
  gravity?: 'center' | 'face' | 'auto';
};

/**
 * Generates an optimized Cloudinary URL with transformations
 */
export const getOptimizedImage = (publicId: string, options: ImageTransformOptions = {}) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
    width || height ? `c_${crop}` : '',
    (width || height) && crop === 'fill' ? `g_${gravity}` : '',
  ].filter(Boolean).join(',');

  // Check if publicId is already a full URL or just the ID
  const path = publicId.startsWith('http') 
    ? publicId.split('/upload/')[1].split('/').slice(1).join('/') // extract path after version
    : publicId;

  return `${CLOUDINARY_BASE}/${transforms}/${path}`;
};

export const IMAGES = {
  profile: 'v1778522425/profile_t0csqu.webp',
  cinemate: 'v1778522425/cinemate_bd7zxl.webp',
  codebook: 'v1778522425/codebook_vssmyu.webp',
  quoter: 'v1778522425/quoter_owfiro.webp',
  face: 'v1778522426/face_cdelhk.webp',
  xfiles: 'v1778522428/xfiles_gadwrk.webp',
  og: 'v1778522428/og-image_b72pfd.png'
};
