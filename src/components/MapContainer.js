import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

//foursquare API keys
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
    selectedPlace: {},
    error: null,
  };

  //componentDidCatch function is for catching any errors, if there are, it setState
  //the error to display the error screen

  componentDidCatch = (errorString, errorInfo) => {
    this.setState({error: errorString});
    console.log(errorInfo)
  }

  /*componentWillReceiveProps allows the filter function to update as the props.markerLocations updates.
  it also checks to see if there is an activeMarker or selectedIndex.
  the activeMarker will get closed, and if there is a selectedIndex from the locations list
  it will open the correct info window. if not, the info window stays closed*/

  componentWillReceiveProps = (props) => {
    if (this.state.markers.length !== props.markerLocations.length) {
      this.onMarkerClose();
      this.updateMarkers(props.markerLocations);
      this.setState({activeMarker: null});

      return;
    }

    if (!props.selectedIndex || (this.state.activeMarker &&
      (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
        this.onMarkerClose();
      }

    if (props.selectedIndex === null || typeof(props.selectedIndex) === 'undefined') {
      return;
    }

    this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

  //mapReady checks for errors, sets the map object and then places the markers

  mapReady = (props, map) => {
    this.setState({error: null});
    this.setState({map});
    this.updateMarkers(this.props.markerLocations);
  }

  //getFSData just checks to make sure the names in my locations.json match the foursquare response

  getFSData = (props, data) => {
    return data
      .response
      .venues
      .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  /* this function retrieves the foursquare data, filters it using getFSData,
  and then begins to set the state for the marker props to be displayed in the info window onClick,
  finally setting the info window to show. the if statement functions to open the InfoWindow
  in the event foursquare has to data to provide*/

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

      if (activeMarkerProps.foursquare) {
        let url = `https://api.foursquare.com/v2/venues/${business[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
        fetch(url)
          .then(response => response.json())
          .then(result => {
            activeMarkerProps = {
              ...activeMarkerProps,
              images: result.response.photos
            };
            //set animation to null here
          this.setState({selectedPlace: activeMarkerProps, activeMarker: marker, showingInfoWindow: true});
          })
      } else {
        this.setState({selectedPlace: activeMarkerProps, activeMarker: marker, showingInfoWindow: true});
      }
    })
  }

  //clears out the activeMarker, and closes InfoWindow

  onMarkerClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  /*this function creates the markers based on a state property called markers.
  it maps through them, taking the data needed to create the markers and then
  indexing the markers as they are created. this indexing allows them to 'clicked' from
  the burger menu so the info window is shown */

  updateMarkers = (markerLocations) => {
    if (!markerLocations) {
      return;
    }

    this
      .state.markers
      .forEach(marker => marker.setMap(null));

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
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    })
    this.setState({markers, markerProps});
  }

  render() {

    //variables for the map style, and starting position
    const style = {
      width: '100%',
      height: '100%'
    }

    const center = {
      lat: this.props.lat,
      lng: this.props.long
    }

    if(!this.props.loaded && !this.state.error) {
      return <div>Loading Map...</div>
    } else if (this.state.error) {
      return  <p>There seems to have been an error with your connection. Try refreshing the page!</p>
    } else {
      return (
        <div>
        <Map
          role = 'application'
          aria-label = 'map'
          onReady = {this.mapReady}
          google = {this.props.google}
          zoom = {this.props.zoom}
          style = {style}
          initialCenter = {center}
          onClick = {this.onMarkerClose}>
          <InfoWindow
            marker = {this.state.activeMarker}
            visible = {this.state.showingInfoWindow}
            onClose = {this.onMarkerClose}>
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              {this.state.selectedPlace && this.state.selectedPlace.url
                ? (
                  <a href = {this.state.selectedPlace.url}>See Website</a>
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
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBn56lTVNTAtCcjMY3M4bcuB7FZKrZ4aDo'
})(MapContainer);
