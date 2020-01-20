import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    particles = [],
    numParticles = 30,
    minDist = 100,
    springAmount = 0.001;
  var width = canvas.width;
  var height = canvas.height;
  for (var i = 0; i < numParticles; i++) {
    var color = Math.random() * (0xffffff);
    var size = Math.random() * 5 + 5;
    var ball = new Ball(size, color);
    ball.x = Math.random() * width;
    ball.y = Math.random() * height;
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * 6 - 3;

    particles.push(ball);
  }
  function gravaite(ballA, ballB) {
    var dx = ballB.x - ballA.x;
    var dy = ballB.y - ballA.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minDist) {
      var ax = dx * springAmount,
        ay = dy * springAmount;
      ballA.vx += ax;
      ballA.vy += ay;
      ballB.vx -= ax;
      ballB.vy -= ay;
    }
  }
  function move(ballA, i) {
    ballA.x += ballA.vx;
    ballA.y += ballA.vy;
    if (ballA.x > canvas.width) {
      ballA.x = 0;
    } else if (ballA.x < 0) {
      ballA.x = canvas.width;
    }
    if (ballA.y > canvas.height) {
      ballA.y = 0;
    } else if (ballA.y < 0) {
      ballA.y = canvas.height;
    }
    for (var ballB, j = i + 1; j < numParticles; j++) {
      ballB = particles[j];
      gravaite(ballA, ballB);
    }
  }
  //console.log(particles);
  function draw(ball) {
    ball.draw(context);
  }
  (function drawFrmae() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrmae, canvas);
    context.clearRect(0, 0, width, height);

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
