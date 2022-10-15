import React from 'react';
import * as d3 from 'd3';

export default function Data() {

    var width = 640;
    var height = 480;

    const links = [
        {source: '乃', target: '及'},
        {source: '乃', target: '携'},
        {source: '乃', target: '秀'},
        {source: '乃', target: '透'},
        {source: '乃', target: '乃'},
        {source: '乃', target: '誘'},
    ];

    const nodes = {};

    //parse links to nodes
    links.forEach(function(link){
        link.source = nodes[link.source] || 
            (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || 
            (nodes[link.target] = {name: link.target});
    });

    //add svg
    var svg = d3.select('#map').append('svg')
        .attr('width', width)
        .attr('height', height);

    var force = d3.layout.force()
        .size([width, height])
        .nodes(d3.values(nodes))
        .links(links)
        .on('tick', tick)
        .linkDistance(300)
        .start();

    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

    var node = svg.selectAll('.node')
        .data(force.nodes())
        .enter().append('circle')
        .attr('class', 'node')
        .attr('radius', width * 0.03);

    function tick(e){
        node.attr('cx', function(d){return d.x;})
            .attr('cy', function(d){return d.y;})
            .call(force.drag);

        link.attr('x1', function(d){return d.source.x; })
            .attr('y1', function(d){return d.source.y; })
            .attr('x2', function(d){return d.target.x; })
            .attr('y2', function(d){return d.target.y; })
    }

  return (
    <div id='map'>
      
    </div>
  )
}
