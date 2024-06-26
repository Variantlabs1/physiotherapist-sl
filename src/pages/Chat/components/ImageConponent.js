import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useQuery } from "@tanstack/react-query";
const storage = getStorage();

const ImageComponent = ({ imagePath }) => {
  const fetchImageUrl = async () => {
    try {
      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error getting image URL:", error);
    }
  };

  const { data: imageUrl } = useQuery({
    queryKey: ["image"],
    queryFn: fetchImageUrl,
  });

  return <img src={imageUrl} alt="" />;
};

export default ImageComponent;
