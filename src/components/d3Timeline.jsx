import * as d3 from 'd3';

class TL {
  constructor() {
  }
};

TL.prototype.create = (el, props, state) => {
  let svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'd3-points');

  this.update(el, state);
};

TL.prototype.update = (el, state) => {
  // re-compute scales, and render new data
  let scales = this._scales(el, state.domain);
  this._drawpoints(el, scales, state.data);
};

TL.prototype._scales = (el, domain) => {

};

TL.prototype._drawpoints = (el, scales, data) => {

};

TL.prototype.destroy = (el) => {
  // necessary cleaning
};

export default TL;