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
    var itemCount = 60;

    // create a data set with groups
    var groups = new vis.DataSet();

    groups.add([
      {
        id: 1,
        content: "Lee",
        nestedGroups: [11,12,13]
      },
      {
        id: 2,
        content: "invisible group",
        visible: false
      },
      {
        id: 3,
        content: "John",
        nestedGroups: [14],
        showNested: false
      },
      {
        id: 4,
        content: "Alson"
      },
    ]);

    groups.add([
      {
        id: 11,
        content: "cook",
      },
      {
        id: 12,
        content: "shop",
      },
      {
        id: 13,
        content: "clean house",
      },
      {
        id: 14,
        content: "wash dishes",
      }
    ]);

    // create a dataset with items
    var items = new vis.DataSet();
    var groupIds = groups.getIds();
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
        type: type
      });
    }

    // create visualization
    var container = this.el; // document.getElementById('visualization');
    var options = {
      groupOrder: 'content'  // groupOrder can be a property name or a sorting function
    };

    var timeline = new vis.Timeline(container, items, groups, options); 
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