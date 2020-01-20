import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    bounce = -0.9,
    gravity = 0.5,
    balls = [],
    ballNum = 10;
  var mouse = utils.captureMouse(canvas),
    w = 0, h = 0;
  var ball = new Ball(40, "red");
  ball.x = Math.random() * (canvas.width);
  ball.y = Math.random() * (canvas.height);
  canvas.addEventListener("mousedown", function (event) {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      w = mouse.x - ball.x;
      h = mouse.y - ball.y;
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false)
    }
  }, false);
  function onMouseUp() {
    ball.isMousedown = false;
    ball.vx = 0;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  function onMouseMove() {
    ball.x = mouse.x - w;
    ball.y = mouse.y - h;
  }
  function checkBoundries(ball) {
    var left = canvas.width,
      right = 0,
      top = 0,
      bottom = canvas.height;
    ball.x += ball.vx;
    ball.vy += gravity;
    ball.y += ball.vy;
    if (ball.x + ball.radius > left) {
      ball.vx *= bounce;
      ball.x = left - ball.radius;
    } else if (ball.x - ball.radius < right) {
      ball.vx *= bounce;
      ball.x = ball.radius;
    }
    if (ball.y + ball.radius > bottom) {
      ball.vy *= bounce;
      ball.y = bottom - ball.radius;
    } else if (ball.y - ball.radius < top) {
      ball.vy *= bounce;
      ball.y = ball.radius;
    }
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    checkBoundries(ball);
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
