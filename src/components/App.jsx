import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { getSearchImg } from '../api/pixabayAPI';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    collection: [],
    error: '',
    loading: false,
  };

  onSubmit = data => {
    console.log('query', data);
    this.setState({ query: data });
  };

  getCollection = async () => {
    try {
      const data = await getSearchImg(this.state.query, this.state.page);
      const allCollection = data.data.hits;
      
      console.log('dataFin2', allCollection);
      this.setState({ collection: allCollection });
      
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getCollection();
    }
  }

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
      </>
    );
  }
}
