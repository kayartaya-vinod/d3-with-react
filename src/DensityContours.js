import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class DensityContours extends Component {

    componentDidUpdate() {
        var svg = d3.select("svg#contour"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            margin = { top: 20, right: 30, bottom: 30, left: 40 };

        var x = d3.scaleLog()
            .domain([2e-1, 5e0])
            .rangeRound([margin.left, width - margin.right]);
        var y = d3.scaleLog()
            .domain([3e2, 2e4])
            .rangeRound([height - margin.bottom, margin.top]);

        var color = d3.scaleSequential(d3.interpolateYlGnBu)
            .domain([0, 1.8]); // Points per square pixel.

        svg.append("g")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).ticks(null, ".1f"))
            .select(".tick:last-of-type text")
            .select(function () { return this.parentNode.appendChild(this.cloneNode()); })
            .attr("y", -3)
            .attr("dy", null)
            .attr("font-weight", "bold")
            .text("Carats");

        svg.append("g")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(y).ticks(null, ".1s"))
            .select(".tick:last-of-type text")
            .select(function () { return this.parentNode.appendChild(this.cloneNode()); })
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Price (USD)");

        svg.insert("g", "g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .attr("stroke-linejoin", "round")
            .selectAll("path")
            .data(d3.contourDensity()
                .x(function (d) { return x(d.carat); })
                .y(function (d) { return y(d.price); })
                .size([width, height])
                .bandwidth(10)
                (this.props.diamonds))
            .enter().append("path")
            .attr("fill", function (d) { return color(d.value); })
            .attr("d", d3.geoPath());

    }

    render() {
        return (
            <svg id="contour" width="960" height="500"></svg>
        );
    }
}

DensityContours.propTypes = {
    diamonds: PropTypes.array.isRequired
}
export default DensityContours;