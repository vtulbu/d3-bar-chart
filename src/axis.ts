import * as d3 from "d3";
import { PADDING, SVG_HEIGHT, SVG_WIDTH } from "./constants";

export const xScale = (
  dataset: Iterable<d3.NumberValue>,
  accessor: (
    datum: d3.NumberValue,
    index: number,
    array: Iterable<d3.NumberValue>
  ) => any
) =>
  d3
    .scaleTime()
    .domain([d3.min(dataset, accessor), d3.max(dataset, accessor)])
    .range([PADDING, SVG_WIDTH - PADDING / 2]);

export const yScale = (
  dataset: Iterable<d3.NumberValue>,
  accessor: (
    datum: d3.NumberValue,
    index: number,
    array: Iterable<d3.NumberValue>
  ) => any
) =>
  d3
    .scaleLinear()
    .domain([0, d3.max(dataset, accessor)])
    .range([SVG_HEIGHT - PADDING, PADDING]);

export const xAxis = (
  dataset: Iterable<d3.NumberValue>,
  accessor: (
    datum: d3.NumberValue,
    index: number,
    array: Iterable<d3.NumberValue>
  ) => any
) => d3.axisBottom(xScale(dataset, accessor));

export const yAxis = (
  dataset: Iterable<d3.NumberValue>,
  accessor: (
    datum: d3.NumberValue,
    index: number,
    array: Iterable<d3.NumberValue>
  ) => any
) => d3.axisLeft(yScale(dataset, accessor));
