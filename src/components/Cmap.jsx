import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Gapi from './Gapi.jsx';
import Gmap from './Gmap.jsx';
import Tag from './Tag.jsx';

class Cmap extends Component {
  componentDidMount() {
  }

  render() {
    const style = {
      width: '100%',
      height: '60vh'
    };

    if (!this.props.loaded) {
      return (
        <div>
          Loading map...
        </div>
      );
    }
    
    const pos = {lat: 51.895559, lng: 4.306024};

    return (
      <div style={style}>
        <Gmap google={this.props.google}>
          <Tag position={pos} />
        </Gmap>
      </div>
    );
  }
};

export default Gapi({
  apiKey: 'AIzaSyCOTzp6I9tTE-HsKYWOObQ0dpYvzfqrT3g'
})(Cmap);