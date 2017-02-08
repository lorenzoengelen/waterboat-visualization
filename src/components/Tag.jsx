import React, { Component, PropTypes as T } from 'react';

class Tag extends Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.renderTag();
    }
  }

  renderTag() {
    let {map, google, position, mapCenter} = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position
    };

    this.tag = new google.maps.Marker(pref);
  }

  render() {
    return null;
  }
};

Tag.propTypes = {
  position: T.object,
  map: T.object
};

export default Tag;