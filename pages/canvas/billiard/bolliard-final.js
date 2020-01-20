import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball0 = new Ball(80, "red"), ball1 = new Ball();
  var bounce = -1.0;
  ball0.mass = 2;
  ball0.x = canvas.width;
  ball0.y = canvas.height;
  ball0.vx = Math.random() * 10 - 5;
  ball0.vy = Math.random() * 10 - 5;
  ball1.mass = 1;
  ball1.x = 100;
  ball1.y = 100;
  ball1.vx = Math.random() * 10 - 5;
  ball1.vy = Math.random() * 10 - 5;
  function rotate(x, y, sin, cos, reverse) {
    return {
      x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
      y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    }
  }
  function checkCollision(ball0, ball1) {
    var dx = ball1.x - ball0.x,
      dy = ball1.y - ball0.y,
      dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ball0.radius + ball1.radius) {
      var angle = Math.atan2(dy, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle);
      //rotate ball0 position
      var pos0 = {
        x: 0,
        y: 0
      }
      //rotate ball1 position
      var pos1 = rotate(dx, dy, sin, cos, true);
      //rotate ball0 velocity
      var vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true);
      //rotate ball1 velcoity
      var vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true);
      //collision reaction
      var vxTotal = vel0.x - vel1.x;
      vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
      vel1.x = vxTotal + vel0.x;
      //update position
      pos0.x += vel0.x;
      pos1.x += vel1.x;
      //rotate everything back
      var pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
      var pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
      //adjust position to actual screen position
      ball1.x = ball0.x + pos1F.x;
      ball1.y = ball0.y + pos1F.y;
      ball0.x = ball0.x + pos0F.x;
      ball0.y = ball0.y + pos0F.y;
      //rotate velocity back
      var vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
      var vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
      ball0.vx = vel0F.x;
      ball0.vy = vel0F.y;
      ball1.vx = vel1F.x;
      ball1.vy = vel1F.y;
    }
  }
  function checkWalls(ball) {
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
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball0.x += ball0.vx;
    ball0.y += ball0.vy;
    ball1.x += ball1.vx;
    ball1.y += ball1.vy;
    checkCollision(ball0, ball1);
    checkWalls(ball0);
    checkWalls(ball1);
    ball0.draw(context);
    ball1.draw(context);
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
