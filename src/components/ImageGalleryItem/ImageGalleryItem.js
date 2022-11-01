import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ weburl, tag, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <GalleryItem onClick={toggleModal}>
        <GalleryImage src={weburl} alt={tag} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tag} />
          </Modal>
        )}
      </GalleryItem>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  weburl: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
