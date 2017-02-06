import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Gapi from './Gapi.jsx';

class Cmap extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    if (!this.props.loaded) {
      return <div>The map is loading...</div>;
    }
    console.log(this.props);
    return (
      <div>The map wil go here...</div>
    );
  }
};

export default Gapi({
  apiKey: 'AIzaSyCOTzp6I9tTE-HsKYWOObQ0dpYvzfqrT3g'
})(Cmap);