class Body {
  constructor(mass, position, velocity, paint) {
    this.mass = mass;    
    this.position = position;
    this.velocity = velocity;
    this.acceleration =  createVector(0, 0);
    this.paint = paint;
    this.orbitMax = 70;
    this.orbit = [];
    this.orbits = 0;
  }
  
  move() {
    let previousX = this.position.x;
    // Change position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    // Orbit path
    this.orbit.push(this.position.copy());
    if (this.orbit.length > this.orbitMax) this.orbit.shift();
    // Count orbit when it passes X origin
    if ( previousX < 0 && this.position.x > 0) this.orbits++;
  }
  
  calculateForce(body) {
    let G = 10; // Universal gravitational constant (10000 for Sun-Earth-Moon simulation, 10 for the rest of simulations)
    let r = this.position.dist(body.position);
    // Newton's law of universal gravitation
    let F = G * (this.mass * body.mass) / (r * r);
    if (body.mass < 1) return 0.033;
    return F;
  }
  
  gravity(body) {
    let force = p5.Vector.sub(body.position, this.position); // Direction
    let magnitude = this.calculateForce(body); // Magnitude
    force.setMag(magnitude);
    this.acceleration.add(force);
  }
  
  show() {
    noStroke();
    fill(this.paint);
    this.showOrbit();
    this.showBody();
  }
  
  showBody() {    
    ellipse(this.position.x, this.position.y, this.mass);
  }
  
  showOrbit() {
    for (const location of this.orbit){      
      ellipse(location.x, location.y, 1.5);
    }
  }
  
  showText(x, y, sun) {
    noStroke();
    fill(this.paint);
    ellipse(x, y, this.mass);
    text('  is 1/' + round(sun.mass / this.mass) + ' the Sun. ' + this.orbits + ' orbits.', x + this.mass / 2, y + 3);
  }
}