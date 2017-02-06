import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import Gapi from './Gapi.jsx';

class Gmap extends Component {
  componentDidMount() {
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>Map will go here</div>
    );
  }
};

export default Gapi({
  apiKey: 'AIzaSyCOTzp6I9tTE-HsKYWOObQ0dpYvzfqrT3g'
})(Gmap);