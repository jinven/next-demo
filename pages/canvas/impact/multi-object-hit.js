import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 10,
    bounce = -1;
  for (var ball, i = 0; i < numBalls; i++) {
    ball = new Ball(Math.random() * 20 + 10, Math.random() * 0xffffff);
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * 6 - 3;
    balls.push(ball);
  }
  //collision
  function checkCollision(ballA, i) {
    for (var ballB, j = i + 1; j < numBalls; j++) {
      ballB = balls[j];
      var dx = ballB.x - ballA.x;
      var dy = ballB.y - ballA.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var min_dist = ballA.radius + ballB.radius;
      if (dist < min_dist) {
        ballA.vx *= bounce;
        ballA.vy *= bounce;
        ballB.vx *= bounce;
        ballB.vy *= bounce;
      }
    }
  }
  //边界检测
  function move(ball) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.vx *= bounce;
    } else if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx *= bounce;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= bounce;
    } else if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy *= bounce;
    }
  }
  //draw
  function draw(ball) {
    ball.draw(context);
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(checkCollision);
    balls.forEach(move);
    balls.forEach(draw);
  }());
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
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
