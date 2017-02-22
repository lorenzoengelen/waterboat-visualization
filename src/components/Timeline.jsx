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
    // this.tl = new TL();
    // this.tl.create(this.el, {
    //   width: '100%',
    //   height: '40vh'
    // }, this.getChartState());

    this.data = [{
      label: 'Name',
      data: [{
        type: TL.TYPE.POINT,
        at: new Date([2015, 1, 11])
      }, 
      {
        type: TL.TYPE.POINT,
        at: new Date([2015, 1, 15])
      },
      {
        type: TL.TYPE.POINT,
        at: new Date([2015, 3, 10])
      },
      {
        label: 'I\'m a label',
        type: TL.TYPE.INTERVAL,
        from: new Date([2015, 2, 1]),
        to: new Date([2015, 3, 1])
      },
      {
        type: TL.TYPE.POINT,
        at: new Date([2015, 6, 1])
      },
      {
        type: TL.TYPE.POINT,
        at: new Date([2015, 7, 1]),
        customClass: 'custom-class'
      }]
    }];



    this.timeline = new TL(this.el, this.data, {
      // tip: function(d) {
      //   return d.at || `${d.from}<br>${d.to}`;
      // }
    });

    console.log(this.timeline);
  }

  componentDidUpdate() {
    this.timeline = new TL(this.el, this.data, {
          // tip: function(d) {
          //   return d.at || `${d.from}<br>${d.to}`;
          // }
    });
    // console.log(this.timeline);
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