import React, { Component } from 'react';
import {slide as Menu} from 'react-burger-menu';
import Search from './SearchBar.js';

class BurgerMenu extends Component {
  showSettings = (event) => {
    event.preventDefault();
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
      <Menu styles={styles}>
        <Search/>
        {this.props.locationsList.locations.map((location) => (
          <div key={location.name}>{location.name}</div>
        ))}
      </Menu>
    );
  }
}

export default BurgerMenu;
