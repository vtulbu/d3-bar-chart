import "./style.css";
// import { fetchData } from "./utils";
import {
  BAR_WIDTH,
  CLASS,
  DATA_DATE,
  FILL,
  G,
  HEIGHT,
  ID,
  PADDING,
  RATIO,
  RECT,
  SVG_HEIGHT,
  TEXT,
  TRANSFORM,
  WIDTH,
  X,
  Y,
} from "./constants";
import { CORNFLOWER_BLUE } from "./colors";
import { svg } from "./svg";
import { xAxis, xScale, yAxis } from "./axis";
import { overlay, tooltip } from "./tooltip";
import * as d3 from "d3";
import { ChartData } from "./types";

const loadingDiv = document.getElementById("loading") as HTMLDivElement;
loadingDiv.style.display = "flex";

d3.json<ChartData>(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((data) => {
  loadingDiv.style.display = "none";

  if (!data) throw new Error("No data found");

  const xPeriods = data.data.map((e) => new Date(e[0]));
  const yGPDValues = data.data.map((e) => e[1]);

  //create bars
  svg
    .selectAll(RECT)
    .data(data.data)
    .enter()
    .append(RECT)
    .attr(DATA_DATE, (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr(X, (_d, i) => xScale(xPeriods, (d) => d)(xPeriods[i]))
    .attr(Y, (d) => SVG_HEIGHT - PADDING - 10 - d[1] / RATIO)
    .attr(WIDTH, BAR_WIDTH)
    .attr(HEIGHT, (d) => d[1] / RATIO)
    .attr("index", (_d, i) => i)
    .attr(FILL, CORNFLOWER_BLUE)
    .attr(CLASS, "bar");

  //create x and y axis
  svg
    .append(G)
    .attr(TRANSFORM, "translate(0, 400)")
    .attr(ID, "x-axis")
    .call(xAxis(xPeriods, (d) => d));

  svg
    .append(G)
    .attr(TRANSFORM, `translate(${PADDING}, -10)`)
    .attr(ID, "y-axis")
    .call(yAxis(yGPDValues, (d) => d));

  //create info text
  svg
    .append(TEXT)
    .attr(X, 520)
    .attr(Y, 450)
    .attr(CLASS, "info")
    .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf");

  svg
    .append(TEXT)
    .attr(TRANSFORM, "rotate(-90)")
    .attr(X, -200)
    .attr(Y, 80)
    .text("Gross Domestic Product");

  //select all bars and add on mouseover event
  svg
    .selectAll(RECT)
    .on("mouseover", function (_event, d) {
      const data = d as [string, number];
      const i = (this as Element).getAttribute("index") as unknown as number;
      const x = (this as Element).getAttribute("x") as unknown as number;
      const y = (this as Element).getAttribute("y") as unknown as number;

      const height = SVG_HEIGHT - PADDING;

      overlay
        .transition()
        .duration(0)
        .style("height", data[1] / RATIO + "px")
        .style("width", 2.5 + "px")
        .style("opacity", 0.9)
        .style("left", x + "px")
        .style("top", y + "px");

      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          xPeriods[i].getFullYear() +
            " Q" +
            ((xPeriods[i].getMonth() + 2) / 3).toFixed(0) +
            "<br>" +
            "$" +
            yGPDValues[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") +
            " Billion"
        )
        .attr(DATA_DATE, xPeriods[i].toString())
        .style("left", x - RATIO + "px")
        .style("top", height - 100 + "px")
        .style("transform", "translateX(60px)");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
      overlay.transition().duration(200).style("opacity", 0);
    });
});
