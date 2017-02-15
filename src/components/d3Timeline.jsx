import * as d3 from 'd3';

class TL {
  constuctor() {
    this.waterboats = [1, 2, 5, 10, 12, 15];
    this.m = [20, 15, 15, 120];
    this.w = 'calc(100%)';
    this.h = 'calc(40vh)';
  }
};

TL.prototype.create = (el, props, state) => {
  let svg = d3.select(el).append('svg')
    .attr('class', 'timeline');
    // .attr('width', props.width)
    // .attr('height', props.height);

  // svg.append('defs').append('clipPath')
  //   .attr('id', 'clip')
  //   .append('rect')
  //   .attr('width', this.w)
  //   .attr('height', )

  svg.append('g')
    .attr('class', 'd3-points');

  TL.prototype.update(el, state);
};

TL.prototype.update = (el, state) => {
  // re-compute scales, and render new data
  let scales = TL.prototype._scales(el, state.domain);
  TL.prototype._drawpoints(el, scales, state.data);
};

TL.prototype._scales = (el, domain) => {
  if (!domain) { return null; }

  let width = el.offsetWidth;
  let height = el.offsetHeight;

  // console.log('D3', d3);
  let x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x);

  let y = d3.scaleLinear()
    .range([0, height])
    .domain(domain.y);

  let z = d3.scaleLinear()
      .range([5, 20])
      .domain([1, 10]);

  return { x: x, y: y, z: z };
};

TL.prototype._drawpoints = (el, scales, data) => {
  let g = d3.select(el).selectAll('.d3-points');

  let point = g.selectAll('.d3-point')
    .data(data, (d) => {
      return d.id;
    });

  // enter & update
  point.enter().append('circle')
    .attr('class', 'd3-point')
    .attr('cx', (d) => {
      return scales.x(d.x);
    })
    .attr('cy', (d) => {
      return scales.y(d.y);
    })
    .attr('r', (d) => {
      return scales.z(d.z);
    });

  // exit
  point.exit()
    .remove();
};

TL.prototype.destroy = (el) => {
  // necessary cleaning
};

export default TL;