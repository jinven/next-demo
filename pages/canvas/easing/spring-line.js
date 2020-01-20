import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(),
    mouse = utils.captureMouse(canvas),
    spring = 0.03,
    f = 0.95,
    gravity = 2,
    vx = 0, vy = 0;
  function drawLine() {
    context.strokeStyle = "#fff";
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
    context.lineTo(ball.x, ball.y);
    context.closePath();
    context.stroke();
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dx = mouse.x - ball.x;
    var dy = mouse.y - ball.y;
    var ax = dx * spring;
    var ay = dy * spring;
    vx += ax;
    vy += ay;
    vy += gravity;
    vx *= f;
    vy *= f;
    ball.x += vx;
    ball.y += vy;
    drawLine();
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
