import React, { Component } from 'react';
import './css/App.css';
import MapContainer from './components/MapContainer.js';
import locations from './data/locations.json';
import BurgerMenu from './components/BurgerMenu.js';

class App extends Component {

  state = {
    lat: 31.712819,
    long: -110.067292,
    zoom: 16,
    all: locations,
    filtered: null,
  }

  /*upon the component mounting, this function uses the spread operator to
  copy the original state into the new state while also setting filtered to run
  all: locations through a query with an empty string*/

  componentWillMount = () => {
    this.setState({
      ...this.state,
    filtered: this.filterLocations(this.state.all.locations, "")
  });
  }

  /*sets the state calling the filter function and changing the empty string
  to an actual query value to compare the all: locations to*/

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all.locations, query)
    });
  }

  filterLocations  = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  //function to check if the list item in locationsList was clicked, shows list item info window on map

  clickListItem = (index) => {
    this.setState({
      selectedIndex: index,
      showingInfoWindow: true
    });
  }



  render() {
    return (
      <div className="App">
      <header><h1 role="main">{'Tombstone\'s Sites'}</h1></header>
        <BurgerMenu
          locationsList = {this.state.filtered}
          filterLocations = {this.updateQuery}
          clickListItem = {this.clickListItem}
          />
        <MapContainer
          lat = {this.state.lat}
          long = {this.state.long}
          zoom = {this.state.zoom}
          markerLocations = {this.state.filtered}
          selectedIndex = {this.state.selectedIndex}
          />
      </div>
    );
  }
}

export default App;
