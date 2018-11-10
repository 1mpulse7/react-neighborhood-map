import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount = () => {
  }

  onMarkerClick = (props, marker, event) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMarkerClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }

  render() {
    if(!this.props.loaded) {
      return <div>Loading...</div>
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
        {this.props.markerLocations.map((marker) => (
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
          visible = {this.state.showingInfoWindow}
          onClose = {this.onMarkerClose}>
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
