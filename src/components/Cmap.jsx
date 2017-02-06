import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Gapi from './Gapi.jsx';
import Gmap from './Gmap.jsx';

class Cmap extends Component {
  componentDidMount() {
    
  }

  render() {
    const style = {
      width: '100vw',
      height: '50vh'
    };

    if (!this.props.loaded) {
      return (
        <div>The map is loading</div>
      );
    }
    
    return (
      <div style={style}>
        <Gmap />
      </div>
    );
  }
};

export default Gapi({
  apiKey: 'AIzaSyCOTzp6I9tTE-HsKYWOObQ0dpYvzfqrT3g'
})(Cmap);