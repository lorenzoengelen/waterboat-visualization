import React, { Component, PropTypes as T } from 'react';
import ReactDom from 'react-dom';
import * as d3 from 'd3';

import TL from './d3Timeline.jsx';

class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.el = ReactDom.findDOMNode(this);
    this.tl = new TL();
    // this.tl.create(this.el, {
    //   width: '100%',
    //   height: '40vh'
    // }, this.getChartState());
  }

  componentDidUpdate() {
    // this.tl.update(this.el, this.getChartState());
  }

  componentWillUnmount() {
    // this.tl.destroy(this.el);
  }

  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  }

  render() {
    return (
      <div className='timeline-container'></div>
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