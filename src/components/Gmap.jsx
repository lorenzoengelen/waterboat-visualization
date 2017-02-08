import React, { Component, PropTypes as T } from 'react';
import ReactDom from 'react-dom';
import d3 from 'd3';
import { camelize } from '../utils/camelize.jsx';
import stations from './stations.json';

const events = [
  'ready',
  'click',
  'dragend'
];

class Gmap extends Component {
  constructor(props) {
    super(props);

    this.listeners = {};

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  componentDidMount() {
    console.log(this.props, this.state);

    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const {maps} = google;

      const mapRef = this.refs.map;
      const node = ReactDom.findDOMNode(mapRef);

      let {initialCenter, zoom, mapTypeId, mapTypeControl, streetViewControl, styles} = this.props;
      let {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        mapTypeId: mapTypeId,
        mapTypeControl: mapTypeControl,
        streetViewControl: streetViewControl,
        styles: styles
      });

      this.map = new maps.Map(node, mapConfig);

      events.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');

      console.log(this.map);
    }
  }

  handleEvent(event) {
    let timeout;
    const eventHandler = `on${camelize(event)}`;

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[eventHandler]) {
          this.props[eventHandler](this.props, this.map, e);
        }
      }, 0);
    };  
  }

  render() {
    return (
        <div style={{width: '100%', height: '100%'}} ref='map'>
          Loading map...
        </div>
    ); 
  }
};

Gmap.propTypes = {
  google: T.object,
  zoom: T.number,
  initialCenter: T.object,
  mapTypeId: T.string,
  mapTypeControl: T.bool,
  streetViewControl: T.bool,
  styles: T.array
};

events.forEach(e => Gmap.propTypes[camelize(e)] = T.func);

Gmap.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 51.935055,
    lng: 4.317697
  },
  mapTypeId: 'terrain',
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      'featureType': 'administrative',
      'stylers': [
        { 'visibility': 'on' }
      ]
    },
    {
      'featureType': 'landscape.man_made', // grey
      'elementType': 'geometry',
      'stylers': [
        { 'color': '#EBE6E2' },
        { 'lightness': 50 }
      ]
    },
    {
      'featureType': 'landscape.natural', // green
      'elementType': 'geometry',
      'stylers': [
        { 'color': '#EBE6E2' },
        { 'lightness': 90 }
      ]
    },
    {
      'featureType': 'poi',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        { 'visibility': 'on' },
        { 'color': '#FCA461' },
        { 'lightness': 60 }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        { 'visibility': 'on' },
        { 'color': '#FEFEFC' },
        { 'lightness': 50 }
      ]
    },
    {
      'featureType': 'transit',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels',
      'stylers': [
        { 'visibility': 'off' }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        { 'color': '#76CFF1' }
      ]
    }
  ]
};

export default Gmap;