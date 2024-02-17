import { Component } from 'react';
import { getCollection } from '../api/pixabayAPI';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

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
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.onLoadCollection();
    }
  }

  onSubmit = data => {
    this.setState({ query: data, collection: [], page: 1 });
  };

  onLoadCollection = async () => {
    try {
      const data = await getCollection(this.state.query, this.state.page);

      console.log('total', data.data.total);
      console.log('store', data.data.total / 12);

      const newCollection = data.data.hits;
      this.setState(prev => ({
        collection: prev.collection
          ? [...prev.collection, ...newCollection]
          : newCollection,
      }));
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

  onLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { collection, error, showModal, largeImageURL } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />

        {collection.length !== 0 && (
            <ImageGallery
              collection={this.state.collection}
              showModal={this.toggleModal}
            />
        )}

        {collection.length !== 0 && <Button loadMore={this.onLoadMore}>Load More</Button>}

        {error && <h2>error: {error}</h2>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
