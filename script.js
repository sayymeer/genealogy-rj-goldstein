const data = await d3.csv("data.csv");
const position = await d3.json("position.json");

const width = 1600;
const height =695;
const dx = 0.4
const dy = 0.4
const shiftx = width*0.6
const shifty = height*1.4
const rectwidth = 400
const rectheight = 100
const linecolor = "maroon"
const linewidth = 1.5
const rectradius = 8

function createRectWithWrappedText(svg, x, y, text,body,flag) {
  if(flag && flag!=1){
    const foreignObject = svg.append("foreignObject")
    .attr("x", x)
    .attr("y", y)
    .attr("width", rectwidth)
    .attr("height", rectheight)
  
  svg.append("rect")
    .attr("x", x).attr("rx",rectradius)
    .attr("y", y).attr("ry",rectradius).classed(text,true)
    .attr("width", rectwidth)
    .attr("height", rectheight)
    .attr("fill", "none")
    .attr("stroke", "maroon")
    .attr("stroke-width", 3.5);

  // Create a foreignObject to embed HTML content (for wrapped text)

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:section")
    .style("width", rectwidth)
    .style("height", rectheight)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "13px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<img src="./assets/${flag}.jpg" width="80" height:"${rectheight}" style="float:left;margin:3px;"><h4 style="margin-bottom:0px; color: #800000;font-weight: bolder; font-size: 16px">${text}</h4><p style="margin-top:0px;font-style: italic;color: #800000; font-size: 13px">${body}</p>`);
  return
  }
  if(flag == 1){
    const foreignObject = svg.append("foreignObject")
    .attr("x", x)
    .attr("y", y-rectheight)
    .attr("width", rectwidth)
    .attr("height", rectheight*2)
  
  svg.append("rect")
    .attr("x", x).attr("rx",rectradius)
    .attr("y", y-rectheight).attr("ry",rectradius).classed(text,true)
    .attr("width", rectwidth)
    .attr("height", rectheight*2)
    .attr("fill", "none")
    .attr("stroke", "maroon")
    .attr("stroke-width", 3.5);

  // Create a foreignObject to embed HTML content (for wrapped text)

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:section")
    .style("width", rectwidth)
    .style("height", rectheight*2)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "13px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<img style="margin-top:3px;margin-bottom:-3px" width="100" src="./assets/1.jpg"><h4 style="margin-bottom:0px; color: #800000;font-weight: bolder; font-size: 16px">${text}</h4><p style="margin-top:0px;font-style: italic;color: #800000; font-size: 13px">${body}</p>`);
  return
  }
  const foreignObject = svg.append("foreignObject")
    .attr("x", x)
    .attr("y", y)
    .attr("width", rectwidth)
    .attr("height", rectheight)
  
  svg.append("rect")
    .attr("x", x).attr("rx",rectradius)
    .attr("y", y).attr("ry",rectradius).classed(text,true)
    .attr("width", rectwidth)
    .attr("height", rectheight)
    .attr("fill", "none")
    .attr("stroke", "maroon")
    .attr("stroke-width", 3.5);

  // Create a foreignObject to embed HTML content (for wrapped text)

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:section")
    .style("width", rectwidth)
    .style("height", rectheight)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "13px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<h4 style="margin-bottom:0px; color: #800000;font-weight: bolder; font-size: 16px">${text}</h4><p style="margin-top:0px;font-style: italic;color: #800000; font-size: 13px">${body}</p>`);
  return
}

function getCoordinate(name) {
  const index = position.findIndex(d => d.name === name);
  return index !== -1 ? { x: position[index].x, y: position[index].y } : null;
}

const svg = d3.select("#container").append("svg").attr("width", 3200).attr("height", 4000);

position.forEach(element => {
  createRectWithWrappedText(svg,element.x*width*dx + shiftx,element.y*height*dy + shifty,element.name,element.body,element.flag)
});


// First set of lines (links1)
// First set of curved lines (links1)

const lineGenerator = d3.line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(d3.curveBasis); 

const links1 = svg.selectAll(".links1")
  .data(data)
  .enter().append("path")
  .attr("class", "links1")
  .attr("d", d => {
    const sourceCoords = getCoordinate(d.source);
    const targetX = getCoordinate(d.target).x * width * dx + shiftx + rectwidth / 2
    const startX = sourceCoords.x * width * dx + shiftx + rectwidth / 2;
    const startY = sourceCoords.y * height * dy + shifty + rectheight;
    let endX = startX
    let controlX  = startX
    const endY = startY + 20;
    
    const controlY = startY + 10;
    return lineGenerator([[startX,startY],[controlX,controlY],[endX,endY]])
  })
  .attr("stroke", linecolor)
  .attr("stroke-width", linewidth).attr("fill","none");


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


svg.append("line")
.attr("x1",getCoordinate("Peter Werenfels").x * width * dx + shiftx + rectwidth / 2 - 10)
.attr("y1",getCoordinate("Peter Werenfels").y * height * dy + shifty + rectheight)
.attr("x2",getCoordinate("Jacob Bernoulli").x * width * dx + shiftx + rectwidth / 2 - 10)
.attr("y2",getCoordinate("Jacob Bernoulli").y * height * dy + shifty)
.attr("stroke", linecolor)
  .attr("stroke-width", linewidth)
  .attr("marker-end", "url(#arrow)");


  const zoom = d3.zoom()
  .scaleExtent([0.6, 1]) // Set the zoom scale limits (adjust as needed)
  .on("zoom",zoomed );

svg.call(zoom);

function zoomed(event) {
  const transform = event.transform;

  // Apply the transformation to all elements
  svg.attr("transform", transform);
  document.querySelector("svg").scrollIntoView()
}


// zoom.scaleTo(svg,0.2)