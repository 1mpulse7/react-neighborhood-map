import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

const FS_CLIENT = "BH14CY1MDSAQSKPWCRDK1V2VXMWA5ZJZMRMOVC035EVUCCQG";
const FS_SECRET = "2L0IS0ZADOB5DYQSE5RDVKCQONKXUACI2XGNFAJN3WVO1CC5";
const FS_VERSION = "20180323";

class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => {
    this.setState({map});
    this.updateMarkers(this.props.markerLocations)
  }

  getFSData = (props, data) => {
    return data
      .response
      .venues
      .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
    }

  onMarkerClick = (props, marker, event) => {
    this.onMarkerClose();

    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}`
    let headers = new Headers();
    let request = new Request(url, {
      method: "GET",
      headers
    });

    let activeMarkerProps;
    fetch(request)
    .then(response => response.json())
    .then(result => {
      let business = this.getFSData(props, result);
      activeMarkerProps = {
        ...props,
        foursquare: business[0]
      };
      console.log(business);

      if (activeMarkerProps.foursquare) {
        let url = `https://api.foursquare.com/v2/venues/${business[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
        fetch(url)
          .then(response => response.json())
          .then(result => {
            activeMarkerProps = {
              ...activeMarkerProps,
              images: result.response.photos
            };
            console.log(activeMarkerProps);
            //set animation to null here
          this.setState({selectedPlace: activeMarkerProps, activeMarker: marker, showingInfoWindow: true})
          })
      } else {
        this.setState({selectedPlace: activeMarkerProps, activeMarker: marker, showingInfoWindow: true})
      }
    })
  }

  onMarkerClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }

  updateMarkers = (markerLocations) => {
    if (!markerLocations) {
      return;
    }

    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = markerLocations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: {lat:location.lat, lng:location.long},
        url: location.url
      };
      markerProps.push(mProps);

      let marker = new this.props.google.maps.Marker({
        position: {lat:location.lat, lng:location.long},
        map: this.state.map
      });
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null)
      });
      return marker;
    })
    this.setState({markers, markerProps});
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
        onReady = {this.mapReady}
        google = {this.props.google}
        zoom = {this.props.zoom}
        style = {style}
        initialCenter = {center}>
        <InfoWindow
          marker = {this.state.activeMarker}
          visible = {this.state.showingInfoWindow}
          onClose = {this.onMarkerClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            {this.state.selectedPlace && this.state.selectedPlace.url
              ?(
                <a href = {this.state.url}>See Website</a>
              ) : ""}
            {this.state.selectedPlace && this.state.selectedPlace.images
              ? (
                <div><img
                  alt = {"business"}
                  src = {this.state.selectedPlace.images.items[0].prefix + "100x100" + this.state.selectedPlace.images.items[0].suffix}></img>
                  <p>Image provided by Foursquare</p>
                </div>
            ) : ""}
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
