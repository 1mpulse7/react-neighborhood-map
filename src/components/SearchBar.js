import React, { Component } from 'react';
import '../App.css';

class Search extends Component {

  render() {
    return (
      <form>
        <input
          placeholder="search bar"
          ref={input => this.search = input}
          onChange={this.props.handleInputChange}
          />
      </form>
    )
  }
}

export default Search;
