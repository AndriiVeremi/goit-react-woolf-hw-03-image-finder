import { Component } from 'react';
import { getCollection } from '../api/pixabayAPI';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 0,
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
    this.setState({ query: data, collection: [], page: 1, totalPages: 0 });
  };

  onLoadCollection = async () => {
    try {
      this.setState({ loading: true });
      const data = await getCollection(this.state.query, this.state.page);

      const totalPages = Math.floor(data.data.total / 12);
      const newCollection = data.data.hits;

      this.setState(prev => ({
        collection: prev.collection
          ? [...prev.collection, ...newCollection]
          : newCollection,

        totalPages: totalPages,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
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
    const {
      collection,
      error,
      showModal,
      largeImageURL,
      totalPages,
      page,
      loading,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />

        {collection.length !== 0 && (
          <ImageGallery
            collection={collection}
            showModal={this.toggleModal}
          />
        )}

        {collection.length > 0 && page <= totalPages && (
          <Button loadMore={this.onLoadMore}>Load More</Button>
        )}

        {loading && <Loader />}

        {error && <h2>error: {error}</h2>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
