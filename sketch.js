let sun = null;
let planets = [];

function setup() {
  createCanvas(500, 500);
  solarSystem();
}

function draw() {
  background(25);
  translate(width / 2, height / 2);
  if (sun != null) sun.show();
  // All simulations except Sun-Earth-Moon
  let i = 0;
  for (const planet of planets) {
    if (sun != null) planet.gravity(sun);
    if (sun == null) planet.gravity(planets[(i+1) % planets.length]);
    planet.move();
    planet.show();
    if (sun != null) planet.showText(30 - width / 2, 1/3 * height + 25 * i, sun);
    i++;
  }
  // Sun-Earth-Moon simulation
  /*planets[0].gravity(sun); // Sun Earth
  planets[0].move();
  planets[0].show();  
  planets[1].gravity(planets[0]); // Moon Earth
  planets[1].move();
  planets[1].gravity(sun); // Sun Moon
  planets[1].move();
  planets[1].show();*/
}

function solarSystem() {
  sun = new Body(50, createVector(0, 0), createVector(0, 0), '#FEC57B'); // Sun
  planets.push(new Body(10, createVector(0, -100), createVector(6, 0), '#CDDC39')); // Planet
  planets.push(new Body(17, createVector(0, -150), createVector(7, 0), '#97D1FF')); // Planet
  planets.push(new Body(25, createVector(0, -220), createVector(7, 0), '#FF5722')); // Planet
  planets.push(new Body(5, createVector(0, -240), createVector(2, 0), '#EC7FFF')); // Comet
}

function elipticalPrecesionOrbit() {
  sun = new Body(50, createVector(0, 0), createVector(0, 0), '#FEC57B'); // Sun  
  planets.push(new Body(10, createVector(0, -100), createVector(4, 0), '#97D1FF')); // Planet  
}

function twoBodies() {
  planets.push(new Body(10, createVector(0, -100), createVector(1.5, 0), '#97D1FF')); // Planet
  planets.push(new Body(10, createVector(0, 100), createVector(-1.5, 0), '#FF5722')); // Planet
}

function threeBodies() {
  planets.push(new Body(10, createVector(0, -100), createVector(1.7, 0), '#97D1FF')); // Planet
  planets.push(new Body(10, createVector(-100, 100), createVector(-1.7, -1.7), '#FF5722')); // Planet
  planets.push(new Body(10, createVector(100, 100), createVector(-1.7, 1.7), '#CDDC39')); // Planet
}

function sunEarthMoon() {
  sun = new Body(10, createVector(0, 0), createVector(0, 0), '#FEC57B'); // Sun
  planets.push(new Body(1 / 330, createVector(0, -150), createVector(1.5, 0), '#97D1FF')); // Planet
  planets.push(new Body(1 / 330, createVector(0, -160), createVector(0.5, 0), '#E2E2E2')); // Planet
}