#Udacity FEND Project 7
##Neighborhood React Map

###Motivation
I built this project for the final project of the Udacity frontend nano-degree.
It is a map of Tombstone, AZ with five marker locations to visit. To view details
of the marked locations, click on the markers and an information window will show
with a link to the location's website. There is a burger menu in the top left hand
corner, with a list of all the locations and a function to filter through them.

###Instructions
In order to use the application you need to :
  1. Clone the github repository on to your local machine
  2. Using the command line, install the necessary dependancies with `npm install`
  3. Using the command line, launch a development server using `npm start`
  4. There is a Service Worker set to register inside index.js, This is the Service
    Worker that is pre-built into React, however in order to take advantage of those
    benefits, the application must be put into a production build. It is not functional
    with the test build.

###API's, and Libraries Used
  For map data, I used Google Map's API.
    Which can be found here: https://cloud.google.com/maps-platform/
  To make working with the Google Map's API easier, I used a library called google-maps-react.
    The README for which can be found at: https://github.com/fullstackreact/google-maps-react/blob/master/README.md
  The third-party API I used was Foursquare, and their photos to be displayed in marker info windows
    Their website is: https://developer.foursquare.com/docs/api
  To create the burger menu that contains the locations list, I used a library called react-burger-menu
    The README from the developer's github is: https://github.com/negomi/react-burger-menu/blob/master/README.md#styling


###Resources Used

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I used the @DougBrown(MWS) walkthrough. found here: https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
This walkthrough primarily helped with marker creation, and getting the markers to display the info window when clicked inside of the list view, and using the Foursquare data. To create the map object, and info window I followed the README of google-maps-react, as mention in the above section. To create the burger menu I followed the README associated with the library I used. To help me with the filter function, and passing the filtered props back to the map display I used the @DougBrown(MWS) walkthrough, but to understand how componentWillReceiveProps() works I found an article found at: https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d
which also explained error handling with componentDidCatch.
