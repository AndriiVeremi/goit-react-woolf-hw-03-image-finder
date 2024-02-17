import { Component } from 'react';
import { getCollection } from '../api/pixabayAPI';
import { SearchBar } from './SearchBar/SearchBar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    collection: [],
    error: '',
    loading: false,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.onLoadCollection();
    }
  }

  onSubmit = data => {
    this.setState({ query: data });
  };

  onLoadCollection = async () => {
    try {
      const data = await getCollection(this.state.query, this.state.page);
      const allCollection = data.data.hits;
      this.setState({ collection: allCollection });
    } catch (error) {
      this.setState({ error });
    }
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    const { collection, showModal, largeImageURL } = this.state;
    
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        {collection.length !== 0 && (
          <ImageGallery
            collection={this.state.collection}
            showModal={this.toggleModal}
          />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
