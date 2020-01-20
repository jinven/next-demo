import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ball = new Ball(20, "orange"),
    spring = 0.03,
    springLength = 100,
    f = 0.9,
    gravity = 0.2,
    dx = 0, dy = 0,
    vx = 0, vy = 0,
    targetX, targetY,
    angle;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    dx = ball.x - mouse.x;
    dy = ball.y - mouse.y;
    angle = Math.atan2(dy, dx);
    targetX = mouse.x + Math.cos(angle) * springLength;
    targetY = mouse.y + Math.sin(angle) * springLength;
    targetX = mouse.x
    targetY = mouse.y
    vx += (targetX - ball.x) * spring;
    vy += (targetY - ball.y) * spring;
    vx *= f;
    vy *= f;
    vy += gravity;
    ball.x += vx;
    ball.y += vy;
    context.save();
    context.beginPath();
    context.strokeStyle = "#fff";
    context.moveTo(ball.x, ball.y);
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    context.restore();
    ball.draw(context);
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
