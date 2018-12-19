const { range } = require('underscore')
const d3 = require('d3')
const { animationSpeed } = require('constants/base.js')

function renderCircleShadows({ svg, innerRadius, circleWidth, circles, oneDegreeSpan }){
  const selection = svg.select('.circle-shadows')
      .selectAll('.circle-shadow')
      .data(circles)

  const created = selection.enter()
      .append('path')
      .attr('class', 'circle-shadow')
      .attr('d', d3.arc()
          .innerRadius((d, i) => innerRadius + circleWidth * i - (circleWidth / 2))
          .outerRadius((d, i) => innerRadius + circleWidth * i - (circleWidth / 2))
          .startAngle(0)
          .endAngle((d, i) => {
            const angleFactor = i % 4 === 0 ? 15.5 : 15.2
            return oneDegreeSpan * angleFactor
          })
      ).attr('stroke-width', circleWidth)
      .attr('stroke', (d, i) => i === 0 ? 'white' : (i % 4 === 0 ? "#d9d4ea" : (i % 2 === 0 ? '#dcdcdc' : "none")))

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr('d', d3.arc()
          .innerRadius((d, i) => innerRadius + circleWidth * i - (circleWidth / 2))
          .outerRadius((d, i) => innerRadius + circleWidth * i - (circleWidth / 2))
          .startAngle(0)
          .endAngle((d, i) => {
            const angleFactor = i % 4 === 0 ? 15.5 : 15.2
            return oneDegreeSpan * angleFactor
          })
      ).attr('stroke-width', circleWidth)

  selection.exit().remove()
}

function renderCircleLines({ svg, circles, innerRadius, circleWidth, oneDegreeSpan }){
  const selection = svg.select('.circle-lines')
      .selectAll('.circle-lines')
      .data(circles)

  const created = selection.enter()
      .append('path')
      .attr('class', 'circle-lines')
      .attr('d', d3.arc()
          .innerRadius((d, i) => innerRadius + circleWidth * i)
          .outerRadius((d, i) => innerRadius + circleWidth * i)
          .startAngle(0)
          .endAngle((d, i) => {
            const angleFactor = i % 4 === 0 ? 15.5 : 15.2
            return oneDegreeSpan * angleFactor
          })
      ).attr("stroke", "black")

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr('d', d3.arc()
          .innerRadius((d, i) => innerRadius + circleWidth * i)
          .outerRadius((d, i) => innerRadius + circleWidth * i)
          .startAngle(0)
          .endAngle((d, i) => {
            const angleFactor = i === 0 ? 15.2 : (i % 4 === 0 ? 15.5 : 15.2)
            return oneDegreeSpan * angleFactor
          })
      )

  selection.exit().remove()
}

function renderData({ svg, dataset, circleWidth, innerRadius, oneDegreeSpan, angleVariable }){
  const pie = d3.pie()
      .value(d => d.color)

  const selection = svg.select('.chart-data')
      .selectAll('.data-entry')
      .data(pie(dataset), d => d.index + "-" + d.data.angle)

  const created = selection.enter()
      .append('path')
      .attr('class', 'data-entry')
      .attr("fill", (d, i) => dataset[i].color)

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attrTween('d', d => {
        const arc = d3.arc()
            .outerRadius(innerRadius + circleWidth * d.index + 0.5)
            .innerRadius(innerRadius + circleWidth * (d.index + 0.95))

        const end = angle => oneDegreeSpan * angle
        const currAngle = d.data.angle + 1

        d.startAngle = oneDegreeSpan * d.data.angle
        d.endAngle = (currAngle === angleVariable) ? ((d.index + 1) % 4 === 0 ? end(15.5) : end(15.2)) : end(currAngle)

        const i = d3.interpolate(d.startAngle, d.endAngle)
        return function(t) {
          d.endAngle = i(t)
          return arc(d)
        }
      })
      .attr("fill", d => dataset[d.index].color)

  selection.exit().remove()
}

function renderAxises({ svg, angles, circleWidth, innerRadius, hours, angleVariable }){
  const selection = svg.select('.axises')
      .selectAll('.line')
      .data(angles)

  const created = selection.enter()
      .append('line')
      .attr('class', 'line')
      .attr("y2", (d, i) => (i % 4 === 0) ? (innerRadius + circleWidth * (hours + 4)) : (innerRadius + circleWidth * (hours + 2)))
      .attr("transform", (d, i) => "rotate(" + (i * (360 / angleVariable)) + ")")
      .style("stroke", "#343434")

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr("y2", (d, i) => (i % 4 === 0) ? (innerRadius + circleWidth * (hours + 4)) : (innerRadius + circleWidth * (hours + 2)))
      .attr("transform", (d, i) => "rotate(" + (i * (360 / angleVariable)) + ")")

  selection.exit().remove()
}

function renderDegreeLabels({ svg, angleVariable, angles, circleWidth, innerRadius, hours }){
  const selection = svg.select('.degree-labels')
      .selectAll('.text')
      .data(angles)

  const created = selection.enter()
      .append('text')
      .attr('class', 'text')
      .attr("x", -10)
      .attr("y", (d, i) => i % 4 === 0 ? -(innerRadius + circleWidth * (hours + 5)) : -(innerRadius + circleWidth * (hours + 3)))
      .attr("transform", (d, i) => "rotate(" + (i * 360 / angleVariable) + ")")
      .text((d, i) => i === 0 ? "" : (i * 360 / angleVariable))

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr("y", (d, i) => i % 4 === 0 ? -(innerRadius + circleWidth * (hours + 5)) : -(innerRadius + circleWidth * (hours + 3)))
      .attr("transform", (d, i) => "rotate(" + (i * 360 / angleVariable) + ")")
      .text((d, i) => i === 0 ? "" : (i * 360 / angleVariable))

  selection.exit().remove()
}

function renderWindAngles({ svg, innerRadius, circleWidth, hours, angleVariable, weatherDirections }){
  const angles = range(8)

  const selection = svg.select('.wind-angles-labels')
      .selectAll('.text')
      .data(angles)

  const created = selection.enter()
      .append('text')
      .attr('class', 'text')
      .attr("x", (d, i) => (i % 2 === 0 ? -10 : -19))
      .attr("y", (d, i) => i % 2 === 0 ? (i === 0 ? -(innerRadius + circleWidth * (hours + 6.5)) : -(innerRadius + circleWidth * (hours + 9))) : -(innerRadius + circleWidth * (hours + 7)))
      .attr("transform", (d, i) => "rotate(" + (i * 2 * (360 / angleVariable)) + ")")
      .text((d, i) => weatherDirections[i])

  selection.merge(created)
      .transition()
      .ease(d3.easeQuad)
      .duration(animationSpeed)
      .attr("y", (d, i) => i % 2 === 0 ? (i === 0 ? -(innerRadius + circleWidth * (hours + 6.5)) : -(innerRadius + circleWidth * (hours + 9))) : -(innerRadius + circleWidth * (hours + 7)))
      .attr("transform", (d, i) => "rotate(" + (i * 2 * (360 / angleVariable)) + ")")

  selection.exit().remove()
}

module.exports = {
  renderCircleShadows,
  renderCircleLines,
  renderData,
  renderAxises,
  renderDegreeLabels,
  renderWindAngles
}
