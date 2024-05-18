import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

const DummyImageUpload= () => {
  const [imageSrc, setImageSrc] = useState(null); // State for image source
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Initial crop aspect ratio (square)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleOnCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleOnCropComplete = async (croppedArea, croppedPixelData) => {
    if (!croppedArea || !imageSrc) {
      return;
    }

    const croppedImage = document.createElement('img');
    croppedImage.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    ctx.drawImage(
      croppedImage,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height
    );

    const croppedImageBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.8); // Adjust quality as needed
    });

    const formData = new FormData();
    formData.append('image', croppedImageBlob);

    try {
      const response = await fetch('http://localhost:5000/products/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Parse the JSON response
      console.log('API response:', data); // Handle the API response here (e.g., display results)
    } catch (error) {
      console.error('API error:', error); // Handle errors gracefully
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <ReactCrop
          src={imageSrc}
          onImageLoaded={(image) => {
            const imageAspectRatio = image.naturalWidth / image.naturalHeight;
            setCrop({ aspect: imageAspectRatio });
          }}
          crop={crop}
          onChange={handleOnCropChange}
          onComplete={handleOnCropComplete}
        />
      )}
    </div>
  );
};

export default DummyImageUpload;
