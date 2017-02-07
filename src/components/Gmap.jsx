import React, { Component, PropTypes as T } from 'react';
import ReactDom from 'react-dom';

class Gmap extends Component {
  constructor(props) {
    super(props);

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

      let {initialCenter, zoom} = this.props;
      let {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);
    }
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
  initialCenter: T.object
};

Gmap.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 51.935055,
    lng: 4.317697
  }
};

export default Gmap;