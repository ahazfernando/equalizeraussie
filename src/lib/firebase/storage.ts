import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult,
} from "firebase/storage";
import { storage } from "./config";

export const uploadFile = async (
  file: File,
  path: string
): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot: UploadResult = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { url, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

export const uploadImage = async (
  file: File,
  folder: string = "images"
): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const path = `${folder}/${fileName}`;
  return uploadFile(file, path);
};

export const deleteFile = async (
  path: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getFileUrl = async (
  path: string
): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return { url, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};


