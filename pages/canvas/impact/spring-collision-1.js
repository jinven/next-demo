import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    centerBall = new Ball(60, "#00d49e"),
    balls = [],
    numBalls = 10,
    spring = 0.03,
    bounce = -1;
  centerBall.x = canvas.width / 2;
  centerBall.y = canvas.height / 2;
  for (var i = 0; i < numBalls; i++) {
    var ball = new Ball(Math.random() * 30 + 5, Math.random() * 0xffffff);
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    ball.vx = Math.random() * 6 - 3;
    ball.vy = Math.random() * 6 - 3;
    balls.push(ball);
  }
  //边界碰撞检测
  function move(ball) {
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
  function draw(ball) {
    var dx = ball.x - centerBall.x;
    var dy = ball.y - centerBall.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var min_dist = centerBall.radius + ball.radius;
    if (dist < min_dist) {
      var angle = Math.atan2(dy, dx);
      var targetX = centerBall.x + Math.cos(angle) * min_dist,
        targetY = centerBall.y + Math.sin(angle) * min_dist;
      ball.vx += (targetX - ball.x) * spring;
      ball.vy += (targetY - ball.y) * spring;
    }
    ball.draw(context);
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(move);
    balls.forEach(draw);
    centerBall.draw(context);
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
