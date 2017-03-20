import React, { Component, PropTypes as T } from 'react';
import ReactDom from 'react-dom';
import * as d3 from 'd3';
import * as vis from 'vis';
import moment from 'moment';

// import TL from './d3Timeline.jsx';
// import TimelineChart from 'd3-timeline-chart';

class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.el = ReactDom.findDOMNode(this);
    
    var now = moment().minutes(0).seconds(0).milliseconds(0);
    console.log('now', now);
    var itemCount = 60;

    // create a data set with groups
    var groups = new vis.DataSet();

    groups.add([
      {
        id: 1,
        content: 'Waterboot 1',
        nestedGroups: [11,12],
        showNested: false,
        className: 'waterboot-1'
      },
      {
        id: 2,
        content: 'Waterboot 2',
        nestedGroups: [21, 22],
        showNested: false,
        className: 'waterboot-2'
        // visible: false
      },
      {
        id: 3,
        content: 'Waterboot 5',
        nestedGroups: [31, 32],
        showNested: false,
        className: 'waterboot-5'
      },
      {
        id: 4,
        content: 'Waterboot 10',
        nestedGroups: [41, 42],
        showNested: false,
        className: 'waterboot-10'
      },
      {
        id: 5,
        content: 'Waterboot 12',
        nestedGroups: [51, 52],
        showNested: false,
        className: 'waterboot-12'
      },
      {
        id: 6,
        content: 'Waterboot 15',
        nestedGroups: [61, 62],
        showNested: false,
        className: 'waterboot-15'
      }
    ]);

    groups.add([
      {
        id: 11,
        content: 'bootje 11',
      },
      {
        id: 12,
        content: 'bootje 12',
      },
      {
        id: 21,
        content: 'bootje 21'
      },
      {
        id: 22,
        content: 'bootje 22'
      },
      {
        id: 31,
        content: 'bootje 21'
      },
      {
        id: 32,
        content: 'bootje 22'
      },
      {
        id: 41,
        content: 'bootje 21'
      },
      {
        id: 42,
        content: 'bootje 22'
      },
      {
        id: 51,
        content: 'bootje 21'
      },
      {
        id: 52,
        content: 'bootje 22'
      },
      {
        id: 61,
        content: 'bootje 21'
      },
      {
        id: 62,
        content: 'bootje 22'
      }
    ]);

    // create a dataset with items
    var items = new vis.DataSet();
    var groupIds = groups.getIds();
    console.log(groupIds);
    var types = [ 'box', 'point', 'range', 'background']
    for (var i = 0; i < itemCount; i++) {
      var start = now.clone().add(Math.random() * 200, 'hours');
      var end = start.clone().add(2, 'hours');
      var randomGroupId = groupIds[Math.floor(Math.random() * groupIds.length)];
      var type = types[Math.floor(4 * Math.random())]

      items.add({
        id: i,
        group: randomGroupId,
        content: 'item ' + i,
        start: start,
        end: end,
        type: 'range'
      });
    }

    // create visualization
    var container = this.el; // document.getElementById('visualization');
    var options = {
      groupOrder: 'content'  // groupOrder can be a property name or a sorting function
    };

    var timeline = new vis.Timeline(container, items, groups, options); 

    // var day = moment.unix(1318781876);
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    
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