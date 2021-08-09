let x = 0.01;
let y = 0;
let z = 0;

let sigma = 10;
let rho = 28;
let beta = 8.0 / 3.0;

let points = [];
let color = 0;
let forward = true;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  colorMode(HSB);
}

function draw() {
  background(0);


  let dt = 0.01;
  let dx = (sigma * (y - x)) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = (x * y - beta * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  if (points.length > 5000)
    points.splice(0, 1);
  points.push(new p5.Vector(x, y, z));
  if (forward == true) {
    color++;
    if (color == 255) {
      forward = false;
    }
  }
  else {
    color--;
    if (color == 0) {
      forward = true;
    }
  }

  rotateY(frameCount * 0.005);

  noFill();
  scale(5);
  strokeWeight(2);
  stroke(frameCount % 255, 255, 100);

  beginShape();
  for (let v of points) {
    vertex(v.x, v.y, v.z);
  }
  endShape();

}
