var context = document.getElementById('content').getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;
var size = d3.min([width, height]);

d3.select('#content')
  .attr('width', width + 'px')
  .attr('height', height + 'px');

context.lineWidth = 1.2;
context.strokeStyle = 'rgb(241, 227, 22)';

var projection = d3.geoOrthographic()
  .scale(0.45 * size)
  .translate([0.5 * width, 0.5 * height]);

var geoGenerator = d3.geoPath()
  .projection(projection)
  .context(context);

var geojson = {type: 'Feature', geometry: {type: 'LineString', coordinates: []}};
function rndLon() {return -180 + Math.random() * 360;}
function rndLat() {return -90 + Math.random() * 180;}
function addPoint() {geojson.geometry.coordinates.push([rndLon(), rndLat()])}

function update(t) {
  if(geojson.geometry.coordinates.length < 400)
    addPoint();

/*  projection.rotate([t / 1000]); */

  context.clearRect(0, 0, width, height);
  context.beginPath();
  geoGenerator(geojson);
  context.stroke();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);