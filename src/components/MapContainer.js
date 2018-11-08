import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    map: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount = () => {
  }

  loadMap = (props, map) => {
    this.setState({map})
  }

  onMarkerClick = (props, marker, event) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }


  render() {
    if(!this.props.loaded) {
      return <div> Loading...</div>
    }
    const style = {
      width: '100%',
      height: '100%'
    }

    const center = {
      lat: this.props.lat,
      lng: this.props.long
    }

    return (
      <div>
      <Map
        role = 'application'
        aria-label = 'map'
        mapReady = {this.loadMap}
        google = {this.props.google}
        zoom = {this.props.zoom}
        style = {style}
        initialCenter = {center}>
        {this.props.markerLocations.locations.map((marker) => (
          <Marker
            name={marker.name}
            key={marker.name}
            title={marker.name}
            position={{lat:marker.lat, lng: marker.long}}
            onClick={this.onMarkerClick}
            />
        ))}
        <InfoWindow
          marker = {this.state.activeMarker}
          visible = {this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.title}</h1>
          </div>
        </InfoWindow>
      </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBn56lTVNTAtCcjMY3M4bcuB7FZKrZ4aDo'
})(MapContainer);
