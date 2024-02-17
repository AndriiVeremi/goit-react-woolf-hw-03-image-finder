import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showModal,
}) => {
  return (
    <GalleryItem>
      <GalleryImg
        src={webformatURL}
        onClick={() => showModal(largeImageURL)}
        alt={tags}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propType = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
}