import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ collection }) => {
  return (
    <GalleryList>
      {collection.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </GalleryList>
  );
};
