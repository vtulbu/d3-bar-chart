import * as d3 from "d3";

export const tooltip = d3
  .select(".container")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute");

export const overlay = d3
  .select(".container")
  .append("div")
  .attr("class", "overlay")
  .style("opacity", 0);
