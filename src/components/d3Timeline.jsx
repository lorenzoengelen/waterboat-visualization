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
      .data(d => d.data.filter(_ => _.type === TL.TYPE.INTERVAL))
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
        return d.data.filter(_ => _.type === TL.TYPE.POINT);
      })
      .enter();

    let dots = groupDotItems.append('circle')
      .attr('class', withCustom('dot'))
      .attr('cx', d => x(d.at))
      .attr('cy', groupHeight / 2)
      .attr('r', 5);

    if (options.tip) {
      if (d3.tip) {
        let tip = d3.tip()
          .attr('class', 'd3-tip')
          .html(options.tip);

        svg.call(tip);
        dots.on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      } else {
        // include d3.tip
        console.error('d3.tip not included as dependency (https://github.com/Caged/d3-tip)');
      }
    }

    if (options.enableLiveTimer) {
      setInterval(updateNowMarker, options.timerTickInterval);
    }

    let updateNowMarker = () => {
      let nowX = x(new Date());
      self.now.attr('x1', nowX)
        .attr('x2', nowX);
    };

    let withCustom = (defaultClass) => {
      return d => d.customClass ? [d.customClass, defaultClass].join(' ') : defaultClass;
    };

    let zoomed = () => {
      if (self.onVizChangeFn && d3.event) {
        self.onVizChangeFn.call(self, {
          scale: d3.event.scale,
          translate: d3.event.translate,
          domain: x.domain()
        });
      }

      if (options.enableLiveTimer) {
        updateNowMarker();
      }

      svg.select('.x.axis').call(xAxis);

      svg.selectAll('circle.dot')
        .attr('cx', d => x(d.at));
      svg.selectAll('rect.interval')
        .attr('cx', d => x(d.from))
        .attr('width', d => Math.max(options.intervalMinWidth, x(d.to) - x(d.from)));

      svg.selectAll('.interval-text')
        .attr('x', d => {
          let positionData = getTextPositionData.call(this, d);
          if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
            return positionData.upToPosition;
          } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
            return groupWidth;
          }
          return positionData.xPosition;
        })
        .attr('text-anchor', d => {
          let positionData = getTextPositionData.call(this, d);
          if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
            return 'end';
          }
          return 'start';
        })
        .attr('dx', d => {
          let positionData = getTextPositionData.call(this, d);
          if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
            return '-0.5em';
          }
          return '0.5em';
        })
        .text(d => {
          let positionData = getTextPositionData.call(this, d);
          let percent = (positionData.width - options.textTruncateThreshold) / positionData.textWidth;
          if (percent < 1) {
            if (positionData.width > options.textTruncateThreshold) {
              return d.label.substr(0, Math.floor(d.label.length * percent)) + '...';
            } else {
              return '';
            }
          }
          return d.label;
        });

      let getTextPositionData = (d) => {
        this.textSizeInPx = this.textSizeInPx || this.getComputedTextLength();
        let from = x(d.from);
        let to = x(d.to);
        return {
          xPosition: from,
          upToPosition: to,
          width: to - from,
          textWidth: this.textSizeInPx
        };
      };

    };

  }

  extendOptions(ext = {}) {
    let defaultOptions = {
      intervalMinWidth: 8,
      tip: undefined,
      textTruncateThreshold: 30,
      enableLiveTimer: false,
      timerTickInterval: 1000
    };
    Object.keys(ext).map(k => defaultOptions[k] = ext[k]);
    return defaultOptions;
  }

  getPointMinDt(p) {
    return p.type === TL.TYPE.POINT ? p.at : p.from;
  }

  getPointMaxDt(p) {
    return p.type === TL.TYPE.POINT ? p.at : p.to;
  }
  
  onVizChange(fn) {
    this.onVizChangeFn = fn;
    return this;
  }
};

TL.TYPE = {
  POINT: Symbol(),
  INTERVAL: Symbol()
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