export interface CloudinaryOptions {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
}

export function getCloudinaryImageUrl(publicIdOrUrl: string, options: CloudinaryOptions = {}): string {
    if (!publicIdOrUrl || publicIdOrUrl.trim() === '') {
        return '/blogs/blog1.png';
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dozxn6j6f';
    let publicId = publicIdOrUrl;

    // If it's a full Cloudinary URL, extract the public ID
    if (publicIdOrUrl.includes('res.cloudinary.com')) {
        try {
            const urlMatches = publicIdOrUrl.match(/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
            if (urlMatches && urlMatches[1]) {
                // Exclude transformations attached to the public ID if any
                let extractedId = urlMatches[1];
                // However, extracting correctly can be tricky if the original URL had transformations.
                // Assuming original URL had no transformations or basic ones.
                if (extractedId.includes('/')) {
                    const parts = extractedId.split('/');
                    // If the first part looks like a transformation (e.g. w_200, c_fill), ignore it
                    if (parts[0].includes('_')) {
                        // Not a robust check, but typically transformation blocks don't contain slashes inside themselves. 
                        // Let's just use a regex for standard cloudinary url extraction.
                    }
                }
            }

            const parts = publicIdOrUrl.split('/upload/');
            if (parts.length > 1) {
                let path = parts[1];
                // Remove version e.g. v123456789/
                path = path.replace(/^v\d+\//, '');
                // Remove transformations e.g. w_500,q_auto/ 
                // We know a transformation string if it matches formatting options.
                // Safest is to just regex match after the version or transformations.
            }
        } catch (e) {
            // ignore
        }

        // Better way to extract public ID from a Cloudinary URL:
        const regex = new RegExp(`res\\.cloudinary\\.com/${cloudName}/image/upload/(?:(?:.*?/)+)?(?:v\\d+/)?([^.]+)`);
        const match = publicIdOrUrl.match(regex);
        if (match && match[1]) {
            // match[1] is everything after v1234/ and before the extension
            // WAIT. what if publicId has slashes? e.g. digital assets/blogs/123 -> digital%20assets/blogs/123
            const decoded = decodeURIComponent(publicIdOrUrl);
            const parts = decoded.split('/upload/');
            if (parts.length > 1) {
                let afterUpload = parts[1];
                // eliminate version
                afterUpload = afterUpload.replace(/^v\d+\//, '');
                // eliminate basic transformations if any (we don't prepend them in base URLs usually)
                // remove extension
                afterUpload = afterUpload.replace(/\.[^/.]+$/, "");
                publicId = afterUpload;
            }
        } else {
            return publicIdOrUrl; // Return as is if we can't parse it
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
    // Cloudinary transformations
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (crop) transforms.push(`c_${crop}`);
    if (quality) transforms.push(`q_${quality}`);
    if (format) transforms.push(`f_${format}`);

    const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';

    // Encode the public ID to handle spaces properly
    const encodedPublicId = publicId.split('/').map(encodeURIComponent).join('/');

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${encodedPublicId}`;
}

export function openCloudinaryUploadWidget(
    options: any,
    callback: (error: any, result: any) => void
) {
    if (typeof window !== 'undefined' && (window as any).cloudinary) {
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'equalizeraussierv';
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dozxn6j6f';

        const widget = (window as any).cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                folder: 'supermart-hq',
                ...options,
            },
            callback
        );
        widget.open();
    } else {
        console.error('Cloudinary widget script not loaded.');
        callback(new Error('Cloudinary widget not loaded'), null);
    }
}
