import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball();
  var mouse = utils.captureMouse(canvas);
  var easing = 0.05,
    targetX = canvas.width / 2,
    targetY = canvas.height / 2,
    isMouseDown = false;
  canvas.addEventListener('mousedown', function (event) {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      isMouseDown = true;
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
    }
  }, false);
  function onMouseMove() {
    ball.x = mouse.x;
    ball.y = mouse.y;
  }
  function onMouseUp() {
    isMouseDown = false;
    canvas.removeEventListener('mousemove', onMouseMove, false);
    canvas.removeEventListener('mouseup', onMouseUp, false);
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!isMouseDown) {
      var vx = (targetX - ball.x) * easing;
      var vy = (targetY - ball.y) * easing;
      ball.x += vx;
      ball.y += vy;
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
