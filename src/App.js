import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js';
import locations from './locations.json';

class App extends Component {
  state = {
    lat: 31.533811,
    long: -110.257324,
    zoom: 15,
    all: locations
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Sierra Vista Food</h1>
        <MapContainer
          lat = {this.state.lat}
          long = {this.state.long}
          zoom = {this.state.zoom}
          markerLocations = {this.state.all}
          />
        </header>
      </div>
    );
  }
}

export default App;
