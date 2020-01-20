import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, oP) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(30, "orange"),
    vx = Math.random() * 10 + 5,
    vy = -10,
    bounce = -0.8,
    gravity = 1.8,
    speed,
    oldX, oldY;
  var isMouseDown = false,
    mouse = utils.captureMouse(canvas),
    w = 0, h = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  canvas.addEventListener("mousedown", function (event) {
    if (utils.containsPoint(ball.getBounds(), mouse.x, mouse.y)) {
      w = mouse.x - ball.x;
      h = mouse.y - ball.y;
      isMouseDown = true;
      oldX = ball.x;
      oldY = ball.y;
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
    }
  }, false);
  function onMouseUp(event) {
    isMouseDown = false;
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }
  function onMouseMove(event) {
    ball.x = mouse.x - w;
    ball.y = mouse.y - h;
  }
  function checkBoundries() {
    var left = canvas.width,
      right = 0,
      top = 0,
      bottom = canvas.height;
    ball.x += vx;
    vy += gravity;
    ball.y += vy;
    if (ball.x + ball.radius > left) {
      vx *= bounce;
      ball.x = left - ball.radius;
    } else if (ball.x - ball.radius < right) {
      vx *= bounce;
      ball.x = ball.radius;
    }
    if (ball.y + ball.radius > bottom) {
      vy *= bounce;
      ball.y = bottom - ball.radius;
    } else if (ball.y - ball.radius < top) {
      vy *= bounce;
      ball.y = ball.radius;
    }
  }
  function trackVelocity() {
    vx = ball.x - oldX;
    vy = ball.y - oldY;
    oldX = ball.x;
    oldY = ball.y;
    speed = Math.sqrt(vx * vx + vy * vy);
    oP.innerHTML = "当前的速度为：" + speed.toFixed();
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!isMouseDown) {
      checkBoundries();
    } else {
      trackVelocity();
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
  const pEl = useRef(null)
  useEffect(() => run(canvasEl.current, pEl.current), [])
  return (
    <div>
      <p ref={pEl}>当前的速度为：</p>
      <canvas ref={canvasEl} width="1000" height="600" style={{ background: '#000', cursor: 'pointer' }}></canvas>
      <style jsx>{`
        p{
          position: absolute;
          left:420px; top: 50px;
          padding: 10px 30px;
          color: white;
          font-size: 20px;
          font-family: "Microsoft Yahei";
        }
      `}</style>
    </div>
  )
}
