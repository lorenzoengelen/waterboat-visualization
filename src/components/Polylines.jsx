import React, { Component, PropTypes as T } from 'react';

import data1 from '../../json/waterboat1/history.json';
import data10 from '../../json/waterboat10/history.json';
import data12 from '../../json/waterboat12/history.json';
import data15 from '../../json/waterboat15/history.json';
import data2 from '../../json/waterboat2/history.json';
import data5 from '../../json/waterboat5/history.json';

class Polylines extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderLine();
    }
  }

  renderLine() {
    let {map, google} = this.props;
    
    // 1
    let coordinates1 = [];
    data1.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates1.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line1 = new google.maps.Polyline({
      path: coordinates1,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line1.setMap(map);
    // 1

    // 2
    let coordinates2 = [];
    data10.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates2.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line2 = new google.maps.Polyline({
      path: coordinates2,
      geodesic: true,
      strokeColor: '#FF00FF',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line2.setMap(map);
    // 2

    // 3
    let coordinates3 = [];
    data12.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates3.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line3 = new google.maps.Polyline({
      path: coordinates3,
      geodesic: true,
      strokeColor: '#00FF00',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line3.setMap(map);
    // 3

    // 4
    let coordinates4 = [];
    data15.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates4.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line4 = new google.maps.Polyline({
      path: coordinates4,
      geodesic: true,
      strokeColor: '#FFFF00',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line4.setMap(map);
    // 4

    // 5
    let coordinates5 = [];
    data2.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates5.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line5 = new google.maps.Polyline({
      path: coordinates5,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line5.setMap(map);
    // 5

    // 6
    let coordinates6 = [];
    data5.forEach(log => {
      if (log.timeLastUpdate > 1483398000000) {
        return;
      }
      coordinates6.push({
        lat: log.location.latitude,
        lng: log.location.longitude
      });
    });

    this.line6 = new google.maps.Polyline({
      path: coordinates6,
      geodesic: true,
      strokeColor: '#00FFFF',
      strokeOpacity: 1,
      strokeWeight: 1,
      zIndex: 1,
      icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
      }]
    });

    this.line6.setMap(map);
    // 6
  }

  render() {
    return null;
  }
};

Polylines.propTypes = {
  map: T.object
};

export default Polylines;