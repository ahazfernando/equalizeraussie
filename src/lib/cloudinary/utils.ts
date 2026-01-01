/**
 * Get Cloudinary image URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'jpg' | 'png' | 'webp';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit';
    gravity?: 'auto' | 'face' | 'center';
    radius?: number;
    effect?: string;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp5dkchm3';
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  if (!options || Object.keys(options).length === 0) {
    return `${baseUrl}/${publicId}`;
  }

  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.gravity) transformations.push(`g_${options.gravity}`);
  if (options.radius) transformations.push(`r_${options.radius}`);
  if (options.effect) transformations.push(`e_${options.effect}`);

  const transformString = transformations.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Extract public_id from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp5dkchm3';
  const pattern = new RegExp(
    `https?://res\\.cloudinary\\.com/${cloudName}/image/upload/(?:[^/]+/)*(.+)`
  );
  const match = url.match(pattern);
  return match ? match[1].split('.')[0] : null;
}

/**
 * Check if URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp5dkchm3';
  return url.includes(`res.cloudinary.com/${cloudName}`);
}

/**
 * Generate responsive image srcset from Cloudinary
 */
export function generateSrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2000]
): string {
  return widths
    .map((width) => {
      const url = getCloudinaryUrl(publicId, { width, quality: 'auto', format: 'auto' });
      return `${url} ${width}w`;
    })
    .join(', ');
}

