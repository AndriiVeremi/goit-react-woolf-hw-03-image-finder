import { Component } from 'react';
import { getCollection } from '../../api/pixabayAPI';
import { SearchBar } from '../SearchBar/SearchBar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Containers, Wrapper, Title, Images, Error } from './App.styled';
import Logo from '../../images/Pixabay.png';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 0,

    query: '',
    collection: [],
    error: null,

    loading: false,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
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

      const newCollection = data.data.hits;

      if (newCollection.length === 0) {
        return alert('Sorry image not found...');
      }

      const totalPages = Math.floor(data.data.total / 12);

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
      <Containers>
        <SearchBar onSubmit={this.onSubmit} />

        {collection.length !== 0 && (
          <ImageGallery collection={collection} showModal={this.toggleModal} />
        )}

        {collection.length > 0 && page <= totalPages && (
          <Button loadMore={this.onLoadMore}>Load More...</Button>
        )}

        {collection.length === 0 && (
          <Wrapper>
            <Title>Enter your search query!</Title>
            <Images  src={Logo} width="650" alt="search" />
          </Wrapper>
        )}

        {loading && <Loader />}

        {error && <Error>Oops.., error: {error}</Error>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
      </Containers>
    );
  }
}
