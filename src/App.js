import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js';
import locations from './locations.json';
import BurgerMenu from './components/BurgerMenu.js';

class App extends Component {

  state = {
    lat: 31.534332,
    long: -110.257361,
    zoom: 16,
    all: locations,
    filtered: null,
  }

  componentWillMount = () => {
    this.setState({
      ...this.state,
    filtered: this.filterLocations(this.state.all.locations, "")
    })
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all.locations, query)
    })
  }

  filterLocations  = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()))
  }

  clickListItem = (props, marker, event) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }



  render() {
    return (
      <div className="App">
        <BurgerMenu
          locationsList = {this.state.filtered}
          filterLocations = {this.updateQuery}
          clickListItem = {this.clickListItem}
          />
          <h1>Sierra Vista Food</h1>
        <MapContainer
          lat = {this.state.lat}
          long = {this.state.long}
          zoom = {this.state.zoom}
          markerLocations = {this.state.filtered}
          />
      </div>
    );
  }
}

export default App;
