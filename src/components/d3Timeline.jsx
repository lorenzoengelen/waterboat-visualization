import * as d3 from 'd3';

class TL {
  constuctor(element, data, opts) {
    let self = this;

    element.classList.add('timeline-chart');

    let options = this.extendOptions(opts);

    let allElements = data.reduce((acc, e) => {
      acc.concat(e.data); // each element has a data key
    }, []);

    let minDt = d3.min(allElements, this.getPointMinDt);
    let maxDt = d3.max(allElements, this.getPointMaxDt);

    let elementWidth = options.width || element.clientWidth;
    let elementHeight = options.height || element.clientHeight;

    let margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    let width = elementWidth - margin.left - margin.right;
    let height = elementHeight - margin.top - margin.bottom;

    let groupWidth = 200;

    let x = d3.time.scale()
      .domain([minDt, maxDt])
      .range([groupWidth, width]);

    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickSize(-height);

    let zoom = d3.behavior.zoom()
      .x(x)
      .on('zoom', zoomed);

    let svg = d3.select(element).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(zoom);

    svg.append('defs')
      .append('clipPath')
      .attr('id', 'chart-content')
      .append('rect')
      .attr('x', groupWidth)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', width - groupWidth);

    svg.append('rect')
      .attr('class', 'chart-bounds')
      .attr('x', groupWidth)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', width - groupWidth);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);


    if (options.enableLiveTimer) {
      self.now = svg.append('line')
        .attr('clip-path', 'url(#chart-content)')
        .attr('class', 'vertical-marker now')
        .attr('y1', 0)
        .attr('y2', height);
    }

    let groupHeight = height / data.length;
    let groupSection = svg.selectAll('.group-section')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'group-section')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d, i) => {
        return groupHeight * (i + 1);
      })
      .attr('y2', (d, i) => {
        return groupHeight * (i + 1);
      });

    let groupLabels = svg.selectAll('.group-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'group-label')
      .attr('x', 0)
      .attr('y', (d, i) => {
        return groupHeight * i + groupHeight / 2 + 5.5
      })
      .attr('dx', '0.5em')
      .text(d => d.label);

    let lineSection = svg.append('line')
      .attr('x1', groupWidth)
      .attr('x2', groupWidth)
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', 'black');

    let groupIntervalItems = svg.selectAll('.group-interval-item')
      .data(data)
      .enter()
      .append('g')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'item')
      .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
      .selectAll('.dot')
      .data(d => d.data.filter(_ => _.type === TimelineChart.TYPE.INTERVAL))
      .enter();

    let intervalBarHeight = 0.8 * groupHeight;
    let intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
    let interval = groupIntervalItems.append('rect')
      .attr('class', withCustom('interval'))
      .attr('width', d => Math.max(options.intervalMinWidth, x(d.to) - x(d.from)))
      .attr('height', intervalBarHeight)
      .attr('y', intervalBarMargin)
      .attr('x', d => x(d.from));

    let intervalTexts = groupIntervalItems.append('text')
      .text(d => d.label)
      .attr('fill', 'white')
      .attr('class', withCustom('interval-text'))
      .attr('y', groupHeight / 2 + 5)
      .attr('x', d => x(d.from));

    let groupDotItems = svg.selectAll('.group-dot-item')
      .data(data)
      .enter()
      .append('g')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'item')
      .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
      .selectAll('.dot')
      .data(d => {
        return d.data.filter(_ => _.type === TimelineChart.TYPE.POINT);
      })
      .enter();

    let dots = groupDotItems.append('circle')
      .attr('class', withCustom('dot'))
      .attr('cx', d => x(d.at))
      .// DOTS

  }
};

// TL.prototype.create = (el, props, state) => {
//   let svg = d3.select(el).append('svg')
//     .attr('class', 'timeline');
//     // .attr('width', props.width)
//     // .attr('height', props.height);

//   // svg.append('defs').append('clipPath')
//   //   .attr('id', 'clip')
//   //   .append('rect')
//   //   .attr('width', this.w)
//   //   .attr('height', )

//   svg.append('g')
//     .attr('class', 'd3-points');

//   TL.prototype.update(el, state);
// };

// TL.prototype.update = (el, state) => {
//   // re-compute scales, and render new data
//   let scales = TL.prototype._scales(el, state.domain);
//   TL.prototype._drawpoints(el, scales, state.data);
// };

// TL.prototype._scales = (el, domain) => {
//   if (!domain) { return null; }

//   let width = el.offsetWidth;
//   let height = el.offsetHeight;

//   // console.log('D3', d3);
//   let x = d3.scaleLinear()
//     .range([0, width])
//     .domain(domain.x);

//   let y = d3.scaleLinear()
//     .range([0, height])
//     .domain(domain.y);

//   let z = d3.scaleLinear()
//       .range([5, 20])
//       .domain([1, 10]);

//   return { x: x, y: y, z: z };
// };

// TL.prototype._drawpoints = (el, scales, data) => {
//   let g = d3.select(el).selectAll('.d3-points');

//   let point = g.selectAll('.d3-point')
//     .data(data, (d) => {
//       return d.id;
//     });

//   // enter & update
//   point.enter().append('circle')
//     .attr('class', 'd3-point')
//     .attr('cx', (d) => {
//       return scales.x(d.x);
//     })
//     .attr('cy', (d) => {
//       return scales.y(d.y);
//     })
//     .attr('r', (d) => {
//       return scales.z(d.z);
//     });

//   // exit
//   point.exit()
//     .remove();
// };

// TL.prototype.destroy = (el) => {
//   // necessary cleaning
// };

export default TL;