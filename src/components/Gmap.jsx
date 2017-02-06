import React, { Component } from 'react';
import ReactDom from 'react-dom';

const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '500px'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    // width: '100px',
    // height: '100px'
  }
};

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

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);
      // this.forceUpdate();
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