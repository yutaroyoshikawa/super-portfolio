import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import rd3 from "react-d3-library";

const RD3Component = rd3.Component;

interface Skills {
  name: string;
  val: number;
}

interface Props {
  skills: Skills[];
}

const Skill: React.FC<Props> = props => {
  const [d3data, setD3data] = useState(null);

  const buble = () => {
    const node = document.createElement("svg");
    const width = innerWidth * 0.7;
    const height = innerHeight * 0.7;
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;
    const bubble = d3
      .pack()
      .size([width, height])
      .padding(1);

    const nodes = d3
      .hierarchy({ children: props.skills })
      .sum((d: any) => d.val);

    const bubbleData = bubble(nodes).descendants();
    const noRootBubble = bubbleData.filter(d => d.parent !== null);

    const maxVal = d3.max(noRootBubble, d => d.r);
    const minVal = d3.min(noRootBubble, d => d.r);

    const colorScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range(d3.schemeCategory10 as any);
    const fontScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([9, 28]);

    const bubbles = d3
      .select(node)
      .selectAll(".bubble")
      .data(noRootBubble)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

    bubbles
      .append("circle")
      .attr("r", d => d.r)
      .style("fill", d => colorScale(d.r));

    bubbles
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text((d: any) => d.data.name)
      .style("font-size", d => fontScale(d.r));

    return node;
  };

  useEffect(() => {
    setD3data(buble);
  }, []);

  return <RD3Component data={d3data} />;
};

export default Skill;
