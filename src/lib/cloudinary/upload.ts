import cloudinary from './config';

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

/**
 * Upload an image file to Cloudinary
 * @param file - File object or base64 string
 * @param folder - Optional folder path in Cloudinary
 * @param preset - Upload preset name (optional, for unsigned uploads)
 * @returns Promise with upload result
 */
export async function uploadImage(
  file: File | string,
  folder?: string,
  preset?: string
): Promise<UploadResult> {
  try {
    let uploadOptions: any = {
      folder: folder || 'digital assets',
      resource_type: 'image',
    };

    // If we have API secret (server-side), use signed upload
    // Otherwise use unsigned upload with preset
    if (process.env.CLOUDINARY_API_SECRET) {
      // Signed upload - no preset needed
      uploadOptions.overwrite = false;
      uploadOptions.invalidate = true;
    } else {
      // Unsigned upload - use preset
      const uploadPreset = preset || process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || 'equalizeraussierv';
      uploadOptions.upload_preset = uploadPreset;
    }

    let result: any;

    if (typeof file === 'string') {
      // Base64 string or data URI
      if (file.startsWith('data:')) {
        // Data URI - upload directly
        result = await cloudinary.uploader.upload(file, uploadOptions);
      } else {
        // Base64 string - convert to data URI
        result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${file}`, uploadOptions);
      }
    } else {
      // File object - convert to data URI for reliable upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      
      // Determine MIME type from file
      const mimeType = file.type || 'image/jpeg';
      const dataUri = `data:${mimeType};base64,${base64}`;
      
      // Upload using data URI
      result = await cloudinary.uploader.upload(dataUri, uploadOptions);
    }

    if (!result) {
      throw new Error('Upload failed - no result returned');
    }

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload image to Cloudinary');
  }
}

/**
 * Upload multiple images
 */
export async function uploadImages(
  files: (File | string)[],
  folder?: string,
  preset?: string
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder, preset));
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}


