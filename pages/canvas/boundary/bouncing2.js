import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ball = new Ball();
  var vx = Math.random() * 10 - 5;
  var vy = Math.random() * 10 - 5;
  var bounces = -0.7, gravity = 0.1;
  var centerX = canvas.width / 2, centerY = canvas.height / 2;
  ball.x = centerX;
  ball.y = centerY;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    vy += gravity;
    ball.x += vx;
    ball.y += vy;
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      vx *= bounces;
    } else if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      vx *= bounces;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      vy *= bounces;
    } else if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      vy *= bounces;
    }
    ball.draw(context);
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
