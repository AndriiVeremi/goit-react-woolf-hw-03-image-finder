import { Component } from 'react';
import { Header, Forma, SierchBtn, Span, Input } from './SearchBar.styled';

export class SearchBar extends Component {
  
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  handleSearch = e => {
    const query = e.target.value.trim();
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Header>
        <Forma onSubmit={this.handleSubmit}>
          <SierchBtn type="submit">
            <Span className="button-label">Search</Span>
          </SierchBtn>

          <Input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            //   autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </Forma>
      </Header>
    );
  }
}
