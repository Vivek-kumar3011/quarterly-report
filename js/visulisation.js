// Load JSON data and create a simple bar chart using D3.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("data/analysis.json")
    .then(response => response.json())
    .then(data => {
      const chartSlide = document.getElementById("chart-slide");
      if (!chartSlide) return;

      const svgWidth = 600, svgHeight = 400;
      const svg = d3.select(chartSlide)
                    .append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);

      const xScale = d3.scaleBand()
                       .domain(data.quarters)
                       .range([50, svgWidth - 50])
                       .padding(0.2);

      const yScale = d3.scaleLinear()
                       .domain([0, d3.max(data.revenue)])
                       .range([svgHeight - 50, 50]);

      // Draw bars for revenue
      svg.selectAll(".bar")
        .data(data.revenue)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(data.quarters[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => svgHeight - 50 - yScale(d))
        .attr("fill", "#4CAF50");

      // X Axis
      svg.append("g")
        .attr("transform", `translate(0, ${svgHeight - 50})`)
        .call(d3.axisBottom(xScale));

      // Y Axis
      svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(yScale));
    })
    .catch(error => console.error("Error loading data:", error));
});
