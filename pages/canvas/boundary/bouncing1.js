import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var vx = Math.random() * 10 - 5;
  var vy = Math.random() * 10 - 5;
  var ball = new Ball(20, "#ff0000");
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.x += vx;
    ball.y += vy;
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      vx *= -1;
    } else if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      vx *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      vy *= -1;
    } else if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      vy *= -1;
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
      <canvas ref={canvasEl} width="400" height="300" style={{ background: '#000' }}></canvas>
    </div>
  )
}
