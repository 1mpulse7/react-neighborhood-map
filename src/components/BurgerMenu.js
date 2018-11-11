import React, { Component } from 'react';
import {slide as Menu} from 'react-burger-menu';

class BurgerMenu extends Component {
  state = {
    query: ""
  }

  showSettings = (event) => {
    event.preventDefault();
  }

  updateQuery = (newQuery) => {
    this.setState({query: newQuery});
    this.props.filterLocations(newQuery);
  }

  render () {

    const styles = {
      bmBurgerButton: {
        position: 'relative',
        width: '30px',
        height: '30px',
        left: '36px',
        top: '36px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }

    return (
      <Menu
        styles={styles}>
        <form>
          <input
            placeholder="search bar"
            type="text"
            onChange={event => this.updateQuery(event.target.value)}
            value={this.state.query}
            />
        </form>
        {this.props.locationsList.map((location) => (
          <button
            key = {location.name}
            onClick = {this.props.clickListItem}>
            {location.name}
          </button>
        ))}
      </Menu>
    );
  }
}

export default BurgerMenu;
