// uploadImageToCloudinary.js
export const uploadImageToCloudinary = async (file) => {
    const uploadPreset = 'imageUpload';
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbqqg2yld/auto/upload`, {
        method: 'POST',
        body: formData
      });
  
      const data = await res.json();
  
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw error;
    }
  };
  