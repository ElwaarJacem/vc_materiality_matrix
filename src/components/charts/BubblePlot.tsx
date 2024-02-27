import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 80, left: 100 };
const BUBBLE_MIN_SIZE = 4;
const BUBBLE_MAX_SIZE = 40;

type BubblePlotProps = {
  width: number;
  height: number;
  data: {
    lifeExp: number;
    gdpPercap: number;
    continent: string;
    pop: number;
  }[];
};

export const BubblePlot = ({ width, height, data }: BubblePlotProps) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const yScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.lifeExp)) as [
      number,
      number
    ];
    return d3.scaleLinear().domain([min, max]).range([boundsHeight, 0]).nice();
  }, [data, height]);

  const xScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.gdpPercap)) as [
      number,
      number
    ];
    return d3.scaleLinear().domain([0, max]).range([0, boundsWidth]).nice();
  }, [data, width]);

  const groups = data
    .map((d) => d.continent)
    .filter((x, i, a) => a.indexOf(x) === i);

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(groups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  const sizeScale = useMemo(() => {
    const [min, max] = d3.extent(data.map((d) => d.pop)) as [number, number];
    return d3
      .scaleSqrt()
      .domain([min, max])
      .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);
  }, [data, width]);

  const [hoveredBubble, setHoveredBubble] = useState(null);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const handleMouseOver = (event, d) => {
      setHoveredBubble(d);
    };

    const handleMouseOut = () => {
      setHoveredBubble(null);
    };

    // Render the X axis
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${boundsHeight})`)
      .call(xAxisGenerator);

    // Render the Y axis
    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement
      .append("g")
      .attr("class", "y-axis")
      .call(yAxisGenerator);

    // Add X-axis label
    svgElement
      .append("text")
      .attr("x", boundsWidth / 2)
      .attr("y", boundsHeight + MARGIN.top + 50) // Adjust the y position
      .attr("dx", "1em")
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .text("Importance de l'enjeu pour votre parties prenantes internes");

    // Add Y-axis label
    svgElement
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - boundsHeight / 2)
      .attr("y", -MARGIN.left)
      .attr("dy", "0.5em")
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .text("Importance de l'enjeu pour votre parties prenantes externes");

    // Add graph title
    svgElement
      .append("text")
      .attr("x", boundsWidth / 2)
      .attr("y", -MARGIN.top + 30) // Adjust the y position
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .text("Matrice de matérialité de votre entreprise");

    // Render bubbles and labels
    const bubbles = svgElement
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");

    // Add circles
    bubbles
      .append("circle")
      .attr("r", (d) => sizeScale(d.pop))
      .attr("cx", (d) => xScale(d.gdpPercap))
      .attr("cy", (d) => yScale(d.lifeExp))
      .attr("opacity", 1)
      .attr("stroke", (d) => colorScale(d.continent))
      .attr("fill", (d) => colorScale(d.continent))
      .attr("fill-opacity", 0.4)
      .attr("stroke-width", 1)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    // Add labels
    bubbles
      .append("text")
      .attr("x", (d) => xScale(d.gdpPercap))
      .attr("y", (d) => yScale(d.lifeExp) - sizeScale(d.pop) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "black")
      .attr("visibility", "hidden") // Initially hidden
      .text((d) => d.continent);

    // Update text visibility on hover
    bubbles.on("mouseover", (event, d) => {
      d3.select(event.currentTarget)
        .select("text")
        .attr("visibility", "visible");
    });

    bubbles.on("mouseout", (event, d) => {
        d3.select(event.currentTarget)
          .select("text")
          .attr("visibility", "hidden");
      });
  
      // Cleanup on component unmount
      return () => {
        svgElement.selectAll("*").remove();
      };
    }, [xScale, yScale, boundsHeight, boundsWidth, data, sizeScale, colorScale]);
  
    return (
      <div>
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          />
          <g
            width={boundsWidth}
            height={boundsHeight}
            ref={axesRef}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          />
        </svg>
      </div>
    );
  };
  
