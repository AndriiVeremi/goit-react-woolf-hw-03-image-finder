import { Component } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';
import HederLogo from '../../images/SLogo.png';
import { Header, Forma, SearchBtn, Span, Input } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.state.searchQuery.trim() === ''
      ? Report.failure('Sorry', 'Sorry, but I dont know what to search for. Please enter your query in the search field, and Ill see what I can find.', 'Ok')
      : this.props.onSubmit(this.state.searchQuery) || this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <img src={HederLogo} style={{ width: '60px', height: '40px', marginRight:'20px' }} alt="logo" />
        <Forma onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <Span className="button-label">Search</Span>
          </SearchBtn>
          <Input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </Forma>
      </Header>
    );
  }
}
