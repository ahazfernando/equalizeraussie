const fs = require('fs');

async function test() {
  const fileContent = fs.readFileSync('test_upload.ts');
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const formData = new FormData();

  const imgBlob = new Blob([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64")], { type: 'image/png' });
  formData.append('file', imgBlob, 'test.png');
  formData.append('folder', 'digital assets/test');

  const res = await fetch('http://localhost:3000/api/cloudinary/upload', {
    method: 'POST',
    body: formData
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}

test();
