import * as d3 from "d3";
import { HEIGHT, SVG, SVG_HEIGHT, SVG_WIDTH, WIDTH } from "./constants";

//create svg
export const svg = d3
  .select(".container")
  .append(SVG)
  .attr(WIDTH, SVG_WIDTH)
  .attr(HEIGHT, SVG_HEIGHT);
