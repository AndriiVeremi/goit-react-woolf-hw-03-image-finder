import { GalleryItem, GalleryImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ tags, webformatURL, largeImageURL, showModal }) => {
  return (
    <GalleryItem >
      <GalleryImg src={webformatURL} onClick={() => showModal(largeImageURL)} alt={tags} />
    </GalleryItem>
  );
};
