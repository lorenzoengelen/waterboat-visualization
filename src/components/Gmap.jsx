import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Gmap extends Component {
  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const google = this.props.google;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDom.findDOMNode(mapRef);

      let zoom = 11;
      let lat = 51.935055;
      let lng = 4.317697;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    const style = Object.assign({}, mapStyles.map, this.props.style, {
      display: this.props.visible ? 'inherit' : 'none'
    });

    const containerStyles = Object.assign({},
      mapStyles.container, this.props.containerStyle);

    return (
        <div style={{width: '100%', height: '100%'}} ref='map'>
          Loading map...
        </div>
    ); 
  }
};

export default Gmap;