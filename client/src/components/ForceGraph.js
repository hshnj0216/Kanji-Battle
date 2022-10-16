import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import { useD3 } from "../hooks/useD3";

export default function ForceGraph(props) {

  const ref = useD3(
    () => {
      //manages the drag interaction of nodes
      const drag = simulation => {
        const dragStarted = d => {
          if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
          }

          d.fx = d.x;
          d.fy = d.y;

        }

        const dragged = d => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        const dragEnded = d => {
          if (!d3.event.active) {
            simulation.alphaTarget(0);

          }

          d.fx = null;
          d.fy = null;
        }

        return d3.drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded);
      }

      const linkWidthScale = d3
        .scaleLinear()
        .domain([1, 2])
        .range([5, 10]);

      const nodeScale = d3
        .scaleLinear()
        .domain([0, d3.max(props.data.nodes.map(node => node.order))])
        .range([25, 50]);

      const fontSizeScale = d3.scaleLinear()
        .domain([0, d3.max(props.data.nodes.map(node => node.order))])
        .range([7, 12]);

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const simulation = d3.forceSimulation(props.data.nodes)
        .force("charge", d3.forceManyBody().strength(-400))
        .force("link", d3.forceLink(props.data.links)
          .id(d => d.id)
          .distance(100)
          .strength(0.25)
        )
        .force("center", d3.forceCenter(412.5, 250))
        .force("gravity", d3.forceManyBody().strength(0.5));

      const svg = d3.select("#target");

      const link = svg
        .selectAll("path.link")
        .data(props.data.links)
        .enter()
        .append("path")
          .attr("stroke", "black")
          .attr("stroke-width", (d) => linkWidthScale())
          .attr("fill", "none")
          .attr("marker-mid", "url(#markerArrow)");

      const node = svg
        .selectAll("circle")
        .data(props.data.nodes)
        .enter()
        .append("circle")
          .attr("r", (d) => nodeScale(d.order))
          .attr("stroke", "#C0C0C0")
          .attr("stroke-width", 2)
          .style("fill", (d) => colorScale(d.order));

      node.call(drag(simulation));

      const textContainer = svg
        .selectAll("g.label")
        .data(props.data.nodes)
        .enter()
        .append("g");

      textContainer
        .append("text")
        .text((d) => d.id)
        .attr("font-size", (d) => fontSizeScale(10))
        .attr("transform", (d) => {
          const scale = nodeScale(d.order);
          const x = -15;
          const y = 10;
          return `translate(${x}, ${y})`
        });

      const card = svg
        .append("g")
        .attr("pointer-events", "none")
        .attr("display", "none");

      const cardBackground = card
        .append("rect")
        .attr("width", 100)
        .attr("height", 45)
        .attr("fill", "#eee")
        .attr("stroke", "#333")
        .attr("rx", 4);

      const cardTextPart = card
        .append("text")
        .attr("transform", "translate(8, 20)")
        .text("default")

      const cardTextMeaning = card
        .append("text")
        .attr("font-size", 10)
        .attr("transform", "translate(8, 35)")
        .text("default");

      let currentTarget;

      node.on("mouseover", d => {

        card.attr("display", "block");

        currentTarget = d3.event.target;

        cardTextPart.text(d.id);
        cardTextMeaning.text(props.partsData.find(part => part == d.id));

        const nameWidth = cardTextPart.node().getBBox().width;
        const positionWidth = cardTextMeaning.node().getBBox().width;
        const cardWidth = Math.max(nameWidth, positionWidth);

        cardBackground.attr("width", cardWidth + 16);

        simulation.alphaTarget(0).restart();
      });

      node.on("mouseout", () => {
        currentTarget = null;
        card.attr("display", "none");
      })

      const lineGenerator = d3.line();

      simulation.on("tick", () => {

        textContainer
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

        link.attr("d", (d) => {

          const mid = [
            (d.source.x + d.target.x) / 2,
            (d.source.y + d.target.y) / 2
          ];

          return lineGenerator([
            [d.source.x, d.source.y],
            mid,
            [d.target.x, d.target.y]
          ]);
        })

        node
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);

        if (currentTarget) {
          const radius = currentTarget.r.baseVal.value;
          const xPos = currentTarget.cx.baseVal.value + radius + 3;
          const yPos = currentTarget.cy.baseVal.value + radius + 3;

          card.attr("transform", `translate(${xPos}, ${yPos})`);
        }
      });
    }
  )

  return (
    <svg id="target" width="825" height="500" className='border mt-5'>
      <defs>
        <marker id="markerArrow"
          markerWidth="20"
          markerHeight="20"
          refX="2"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path fill="black" d="M0,0 L0,4 L4,2 z" />
        </marker>
      </defs>
    </svg>
  )

}