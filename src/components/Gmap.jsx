import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Gmap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    // const maps = window.google;

    // const mapRef = this.refs.map;
    // const node = ReactDOM.findDOMNode('#map');

    // let zoom = 14;
    // let lat = 37.774929;
    // let lng = -122.419416;
    // const center = new maps.LatLng(lat, lng);
    // const mapConfig = Object.assign({}, {
    //   center: center,
    //   zoom: zoom
    // });
    // const map = new maps.Map(node, mapConfig);

    const google = window.google;
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
  }

  render () {
    return (
      <div className='Gmap'>
        <div id='map'>
          <h1>Check this out</h1>
        </div>
      </div>
    );
  }
};

export default Gmap;