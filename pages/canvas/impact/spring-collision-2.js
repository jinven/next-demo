
import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 10,
    spring = 0.03,
    bounce = -0.5,
    gravity = 0.1;
  for (var i = 0; i < numBalls; i++) {
    var ball = new Ball(Math.random() * 50 + 5, Math.random() * 0xffffff);
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * 6 - 3;
    balls.push(ball);
  }
  //边界检测
  function move(ball) {
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.vx *= bounce;
    }
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx *= bounce;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= bounce;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy *= bounce;
    }
  }
  // 球体间的碰撞检测
  function checkCollision(ballA, i) {
    for (var j = i + 1; j < numBalls; j++) {
      var ballB = balls[j];
      var dx = ballB.x - ballA.x,
        dy = ballB.y - ballA.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var min_distance = ballA.radius + ballB.radius;
      if (distance < min_distance) {
        var angle = Math.atan(dy, dx);
        var targetX = ballA.x + Math.cos(angle) * min_distance;
        var targetY = ballA.y + Math.cos(angle) * min_distance;
        var ax = (targetX - ballA.x) * spring * 0.5;
        var ay = (targetY - ballA.y) * spring * 0.5;
        ballA.vx -= ax;
        ballB.vx += ax;
        ballA.vy -= ay;
        ballB.vy += ay;
      }
    }
  }
  function draw(ball) {
    ball.draw(context);
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(move);
    balls.forEach(checkCollision);
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
    </div>
  )
}
