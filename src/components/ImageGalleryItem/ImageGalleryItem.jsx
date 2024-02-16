import { GalleryItem, GalleryImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  return (
    <GalleryItem >
      <GalleryImg src={webformatURL} alt="" />
    </GalleryItem>
  );
};
