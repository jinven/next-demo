import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    particles = [],
    numParticles = 30;
  for (var particle, i = 0; i < numParticles; i++) {
    var color = Math.random() * (0xffffff);
    var size = Math.random() * 10 + 5;
    particle = new Ball(size, "#49f");
    particle.x = Math.random() * canvas.width;
    particle.y = Math.random() * canvas.height;
    particle.mass = 1;
    particles.push(particle);
  }
  function rotate(x, y, sin, cos, reverse) {
    return {
      x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
      y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
  }
  function checkCollision(ball0, ball1) {
    var dx = ball1.x - ball0.x,
      dy = ball1.y - ball0.y,
      dist = Math.sqrt(dx * dx + dy * dy);
    //collision handling code here
    if (dist < ball0.radius + ball1.radius) {
      //calculate angle, sine, and cosine
      var angle = Math.atan2(dy, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle),
        //rotate ball0's position
        pos0 = { x: 0, y: 0 }, //point
        //rotate ball1's position
        pos1 = rotate(dx, dy, sin, cos, true),
        //rotate ball0's velocity
        vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
        //rotate ball1's velocity
        vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
        //collision reaction
        vxTotal = vel0.x - vel1.x;
      vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
        (ball0.mass + ball1.mass);
      vel1.x = vxTotal + vel0.x;
      //update position - to avoid objects becoming stuck together
      var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
        overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
      pos0.x += vel0.x / absV * overlap;
      pos1.x += vel1.x / absV * overlap;
      //rotate positions back
      var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
        pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
      //adjust positions to actual screen positions
      ball1.x = ball0.x + pos1F.x;
      ball1.y = ball0.y + pos1F.y;
      ball0.x = ball0.x + pos0F.x;
      ball0.y = ball0.y + pos0F.y;
      //rotate velocities back
      var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
        vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
      ball0.vx = vel0F.x;
      ball0.vy = vel0F.y;
      ball1.vx = vel1F.x;
      ball1.vy = vel1F.y;
    }
  }
  function draw(particle) {
    particle.draw(context);
  }
  function gravitate(partA, partB) {
    var dx = partB.x - partA.x;
    var dy = partB.y - partA.y;
    var distQ = dx * dx + dy * dy;
    var dist = Math.sqrt(distQ);
    var F = (partA.mass * partB.mass) / distQ;
    var ax = F * dx / dist;
    var ay = F * dy / dist;
    partA.vx += ax / partA.mass;
    partA.vy += ay / partA.mass;
    partB.vx -= ax / partB.mass;
    partB.vy -= ay / partB.mass;
  }
  //引力
  function move(partA, i) {
    partA.x += partA.vx;
    partA.y += partA.vy;
    for (var partB, j = i + 1; j < numParticles; j++) {
      partB = particles[j];
      checkCollision(partA, partB);
      gravitate(partA, partB);
    }
  }
  (function drawFrme() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrme, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(move);
    particles.forEach(draw);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
    </div>
  )
}
