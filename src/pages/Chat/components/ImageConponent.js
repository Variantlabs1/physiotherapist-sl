import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useQuery } from "@tanstack/react-query";
const storage = getStorage();

const ImageComponent = ({ imagePath }) => {
  const fetchImageUrl = async () => {
    try {
      if (!imagePath) {
        throw new Error("No image path provided");
      }
      const imageRef = ref(storage, imagePath);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error getting image URL:", error);
      throw error; // Re-throw to let React Query handle the error state
    }
  };

  const { data: imageUrl, isLoading, error } = useQuery({
    queryKey: ["image", imagePath], // Include imagePath in the query key
    queryFn: fetchImageUrl,
    enabled: !!imagePath, // Only run query if imagePath exists
    staleTime: 5 * 60 * 1000, // Cache images for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  // Placeholder image - profile placeholder
  const placeholderImage = "https://imgs.search.brave.com/Q1ZKwaWJjUTcBmXmtx35cQXh74LdnUuOF-TfPt1AYpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAx/Njc0NDAzNC92ZWN0/b3IvcHJvZmlsZS1w/bGFjZWhvbGRlci1p/bWFnZS1ncmF5LXNp/bGhvdWV0dGUtbm8t/cGhvdG8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVJxdGky/NlZRal9mcy1faEwx/NW1KajZiODRGRVpO/YTAwRkpnWlJhRzVQ/RDQ9";

  // If there's an error, loading, or no imageUrl, show placeholder
  const srcToUse = error || isLoading || !imageUrl ? placeholderImage : imageUrl;

  return (
    <img 
      src={srcToUse} 
      alt="" 
      style={{ 
        maxWidth: "100%", 
        height: "auto",
        borderRadius: "8px" 
      }}
      onError={(e) => {
        console.error("Image failed to load:", imagePath);
        // If the main image fails, try to load placeholder
        if (e.target.src !== placeholderImage) {
          e.target.src = placeholderImage;
        }
      }}
    />
  );
};

export default ImageComponent;