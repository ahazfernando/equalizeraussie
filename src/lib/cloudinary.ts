export interface CloudinaryOptions {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
}

export function getCloudinaryUrl(publicIdOrUrl: string, options: CloudinaryOptions = {}): string {
    if (!publicIdOrUrl || publicIdOrUrl.trim() === '') {
        return '/blogs/blog1.png';
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dozxn6j6f';
    let publicId = publicIdOrUrl;

    if (publicIdOrUrl.includes('res.cloudinary.com')) {
        const decoded = decodeURIComponent(publicIdOrUrl);
        const parts = decoded.split('/upload/');
        if (parts.length > 1) {
            let afterUpload = parts[1];
            afterUpload = afterUpload.replace(/^v\d+\//, '');
            afterUpload = afterUpload.replace(/\.[^/.]+$/, "");
            publicId = afterUpload;
        } else {
            return publicIdOrUrl;
        }
    } else if (publicIdOrUrl.startsWith('http')) {
        return publicIdOrUrl;
    } else if (publicIdOrUrl.startsWith('/')) {
        return publicIdOrUrl;
    }

    const {
        width,
        height,
        crop = 'fill',
        quality = 'auto',
        format = 'webp'
    } = options;

    const transforms = [];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (crop) transforms.push(`c_${crop}`);
    if (quality) transforms.push(`q_${quality}`);
    if (format) transforms.push(`f_${format}`);

    const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
    const encodedPublicId = publicId.split('/').map(encodeURIComponent).join('/');

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${encodedPublicId}`;
}
