import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dozxn6j6f',
    api_key: '445967614451151',
    api_secret: 'eN13q9ZmamnSFpygKsM1Wkw3h9A',
    secure: true,
});

async function run() {
    const result = await cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', {
        folder: 'digital assets/test'
    });
    console.log(result);
}
run();
