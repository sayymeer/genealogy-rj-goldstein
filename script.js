const data = await d3.csv("data.csv");
const position = await d3.json("position.json");

const width = window.innerWidth;
const height = window.innerHeight;
const dx = 0.28
const dy = 0.24
const shiftx = width*0.5
const shifty = height*0.5
const rectwidth = 350
const rectheight = 100
const linecolor = "maroon"
const linewidth = 1.5
const rectradius = 8

function createRectWithWrappedText(svg, x, y, text,body,flag) {
  if(flag == 1){
    svg.append("rect")
    .attr("x", x).attr("rx",rectradius)
    .attr("y", y).attr("ry",rectradius)
    .attr("width", rectwidth)
    .attr("height", rectheight*2.5)
    .attr("fill", "none")
    .attr("stroke", "maroon")
    .attr("stroke-width", 3);

  // Create a foreignObject to embed HTML content (for wrapped text)
  const foreignObject = svg.append("foreignObject")
    .attr("x", x)
    .attr("y", y)
    .attr("width", rectwidth)
    .attr("height", rectheight*2.5);

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:div")
    .style("width", rectwidth)
    .style("height", rectheight*2.5)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "14px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<h4 style="margin-bottom:0px; color: #800000;font-weight: bolder; font-size: 16px">Carl Von Linde</h4><p style="margin-top:0px;font-style: italic;color: #800000; font-size: 14px">(1902) Prof. Applied Thermodynamics </p> <hr><h4 style="margin-bottom:0px; color: #800000;font-weight: bolder; font-size: 16px">Oscar Knoblauch</h4><p style="margin-top:0px;font-style: italic;color: #800000; font-size: 14px">Inst. Tech. Physics (1902) <br> - W Nusselt (1907)<br> - Ernst Schmidt (1925)</p>`);
  return
  }
  
  svg.append("rect")
    .attr("x", x).attr("rx",rectradius)
    .attr("y", y).attr("ry",rectradius)
    .attr("width", rectwidth)
    .attr("height", rectheight)
    .attr("fill", "none")
    .attr("stroke", "maroon")
    .attr("stroke-width", 3);

  // Create a foreignObject to embed HTML content (for wrapped text)
  const foreignObject = svg.append("foreignObject")
    .attr("x", x)
    .attr("y", y)
    .attr("width", rectwidth)
    .attr("height", rectheight)

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:section")
    .style("width", rectwidth)
    .style("height", rectheight)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "14px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<h4 style="margin-bottom:0px; color: #800000;font-weight: bolder">${text}</h4><p style="margin-top:0px;font-style: italic;color: #800000;">${body}</p>`);
  return
}

function getCoordinate(name) {
  const index = position.findIndex(d => d.name === name);
  return index !== -1 ? { x: position[index].x, y: position[index].y } : null;
}

const svg = d3.select("#container").append("svg").attr("width", width*6).attr("height", height*6);

position.forEach(element => {
  createRectWithWrappedText(svg,element.x*width*dx + shiftx,element.y*height*dy + shifty,element.name,element.body,element.flag)
});


// First set of lines (links1)
// First set of curved lines (links1)
const links1 = svg.selectAll(".links1")
  .data(data)
  .enter().append("path")
  .attr("class", "links1")
  .attr("d", d => {
    const sourceCoords = getCoordinate(d.source);
    const targetCoords = getCoordinate(d.source); // Assuming the target is the same as the source for links1

    const startX = sourceCoords.x * width * dx + shiftx + rectwidth / 2;
    const startY = sourceCoords.y * height * dy + shifty + rectheight;
    const endX = startX;
    const endY = startY + 20;
    const controlX = (startX + endX) / 2;
    const controlY = startY + 10;

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  })
  .attr("stroke", linecolor)
  .attr("stroke-width", linewidth);


// Second set of lines (links2)
const links2 = svg.selectAll(".links2")
  .data(data)
  .enter().append("line")
  .attr("class", "links2")
  .attr("x1", d => getCoordinate(d.source).x * width * dx + shiftx + rectwidth / 2)
  .attr("y1", d => getCoordinate(d.source).y * height * dy + shifty + rectheight + 20)
  .attr("x2", d => getCoordinate(d.target).x * width * dx + shiftx + rectwidth / 2)
  .attr("y2", d => getCoordinate(d.source).y * height * dy + shifty + rectheight + 20)
  .attr("stroke", linecolor)
  .attr("stroke-width", linewidth);

// Third set of lines (links)
const links = svg.selectAll(".links")
  .data(data)
  .enter().append("line")
  .attr("class", "links")
  .attr("x1", d => getCoordinate(d.target).x * width * dx + shiftx + rectwidth / 2)
  .attr("y1", d => getCoordinate(d.source).y * height * dy + shifty + rectheight + 20)
  .attr("x2", d => getCoordinate(d.target).x * width * dx + shiftx + rectwidth / 2)
  .attr("y2", d => getCoordinate(d.target).y * height * dy + shifty)
  .attr("stroke", linecolor)
  .attr("stroke-width", linewidth)
  .attr("marker-end", "url(#arrow)");


svg.append("defs").append("marker")
  .attr("id", "arrow")
  .attr("viewBox", "0 0 10 10")
  .attr("refX", 8)
  .attr("refY", 5)
  .attr("markerWidth", 6)
  .attr("markerHeight", 6)
  .attr("orient", "auto-start-reverse")
  .append("path").attr("fill",linecolor)
  .attr("d", "M 0 0 L 10 5 L 0 10 z");


// function zoomed(event) {
//     svg.attr("transform", event.transform);
//   }
// const zoom = d3.zoom().scaleExtent([0.1,100]).on("zoom",zoomed)
// svg.call(zoom)
