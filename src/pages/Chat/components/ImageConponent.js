import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const ImageComponent = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    };

    fetchImageUrl();
  }, [imagePath]);

  return <img src={imageUrl} alt="" />;
};

export default ImageComponent;
