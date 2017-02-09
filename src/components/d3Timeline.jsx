import * as d3 from 'd3';

const tl = {};

tl.create = (el, props, state) => {
  let svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'd3-points');

  this.update(el, state);
};

tl.update = (el, state) => {
  // re-compute scales, and render new data
  let scales = this._scales(el, state.domain);
  this._drawpoints(el, scales, state.data);
};

tl._scales = (el, domain) => {

};

tl._drawpoints = (el, scales, data) => {

};

tl.destroy = (el) => {

};

export default tl;