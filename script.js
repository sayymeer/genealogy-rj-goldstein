const data = await d3.csv("data.csv");
const position = await d3.json("position.json");

const width = window.innerWidth;
const height = window.innerHeight;
const dx = 0.28
const dy = 0.24
const shiftx = width*0.5
const shifty = height*0.5
const rectwidth = 300
const rectheight = 75
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
  div.html(`<h4 style="margin-bottom:0px">Carl Von Linde</h4><p style="margin-top:0px;font-style: italic;">(1902) Prof. Applied Thermodynamics </p> <hr><h4 style="margin-bottom:0px">Oscar Knoblauch</h4><p style="margin-top:0px;font-style: italic;">Inst. Tech. Physics (1902) <br> - W Nusselt (1907)<br> - Ernst Schmidt (1925)</p>`);
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
    .attr("height", rectheight);

  // Add a div inside foreignObject for wrapped text
  const div = foreignObject.append("xhtml:div")
    .style("width", rectwidth)
    .style("height", rectheight)
    .style("overflow", "hidden")
    .style("text-align", "center")
    .style("font-size", "14px")
    .style("padding","2px")


  // Add the wrapped text
  div.html(`<h4 style="margin-bottom:0px">${text}</h4><p style="margin-top:0px;font-style: italic;">${body}</p>`);
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

const links = svg.selectAll("line")
  .data(data)
  .enter().append("line")
  .attr("x1", d => getCoordinate(d.source).x * width * dx + shiftx + rectwidth/2 )
  .attr("y1", d => getCoordinate(d.source).y * height * dy + shifty + rectheight)
  .attr("x2", d => getCoordinate(d.target).x * width * dx + shiftx + rectwidth/2)
  .attr("y2", d => getCoordinate(d.target).y * height * dy + shifty)
  .attr("stroke", linecolor).attr("stroke-width",linewidth)
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
