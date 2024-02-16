import { Component } from 'react';
import { getCollection, getImages } from '../api/pixabayAPI';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    collection: [],
    error: '',
    loading: false,
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

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery collection={this.state.collection}/>
      </>
    );
  }
}
