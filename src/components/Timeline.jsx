import React, { Component, PropTypes as T } from 'react';
import * as d3 from 'd3';

import tl from './d3Timeline.jsx';

class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(tl.prototype);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className='timeline'></div>
    );
  }
};

Timeline.propTypes = {
  data: T.array,
  domain: T.object
};

Timeline.defaultProps = {
  data: [
    {id: '5fbmzmtc', x: 7, y: 41, z: 6},
    {id: 's4f8phwm', x: 11, y: 45, z: 9}
  ],
  domain: {x: [0, 30], y: [0, 100]}
};

export default Timeline;