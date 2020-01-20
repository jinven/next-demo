import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    particles = [],
    numParticles = 50;
  for (var particle, i = 0; i < numParticles; i++) {
    particle = new Ball(5, "orange");
    particle.x = Math.random() * canvas.width;
    particle.y = Math.random() * canvas.height;
    particle.mass = 1;
    particles.push(particle);
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
      //引力
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
