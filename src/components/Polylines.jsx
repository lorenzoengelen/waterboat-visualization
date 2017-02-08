import React, { Component, PropTypes as T } from 'react';

class Polylines extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderLine();
    }
  }

  renderLine() {
    console.log(this.props);
    let {map, google} = this.props;

    let coordinates = [
      {lat: 51.90401, lng: 4.43735},
      {lat: 51.904, lng: 4.43733},
      {lat: 51.90399, lng: 4.43734},
      {lat: 51.90399, lng: 4.43737},
      {lat: 51.90401, lng: 4.43726},
      {lat: 51.90369, lng: 4.43662},
      {lat: 51.90354, lng: 4.43421},
      {lat: 51.90295, lng: 4.43},
      {lat: 51.90216, lng: 4.42613},
      {lat: 51.90127, lng: 4.42158},
      {lat: 51.90059, lng: 4.41771},
      {lat: 51.8997, lng: 4.41321},
      {lat: 51.89887, lng: 4.40944},
      {lat: 51.89797, lng: 4.40506},
      {lat: 51.89716, lng: 4.40134},
      {lat: 51.8965, lng: 4.39681},
      {lat: 51.89608, lng: 4.39299},
    ];

    this.line = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1,
      strokeWeight: 2,
    });

    this.line.setMap(map);
  }

  render() {
    return null;
  }
};

Polylines.propTypes = {
  map: T.object
};

export default Polylines;