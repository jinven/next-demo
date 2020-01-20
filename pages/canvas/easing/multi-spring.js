import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    ball = new Ball(20), //半径20的球
    handles = [],
    numHandles = 3,
    spring = 0.03,
    f = 0.9,
    movingHandle = null;
  //创建3个小球体
  for (var i = 0; i < numHandles; i++) {
    var handle = new Ball(10, "#0000ff");
    handle.x = Math.random() * canvas.width;
    handle.y = Math.random() * canvas.height;
    handles.push(handle);
  }
  canvas.addEventListener('mousedown', function (event) {
    handles.forEach(function (handle) {
      if (utils.containsPoint(handle.getBounds(), mouse.x, mouse.y)) {
        movingHandle = handle;
      }
    })
  }, false);
  canvas.addEventListener('mouseup', function (event) {
    if (movingHandle) {
      movingHandle = null;
    }
  }, false);
  canvas.addEventListener('mousemove', function (event) {
    if (movingHandle) {
      movingHandle.x = mouse.x;
      movingHandle.y = mouse.y;
    }
  }, false);
  //
  function applyHandle(handle) {
    var dx = handle.x - ball.x;
    var dy = handle.y - ball.y;

    ball.vx += dx * spring;
    ball.vy += dy * spring;
  }
  //画操作点到小球的线
  function drawHandle(handle) {
    context.strokeStyle = "white";
    context.moveTo(ball.x, ball.y);
    context.lineTo(handle.x, handle.y);
    context.stroke();
    handle.draw(context);
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    handles.forEach(applyHandle);
    ball.vx *= f;
    ball.vy *= f;
    ball.x += ball.vx;
    ball.y += ball.vy;
    context.beginPath();
    handles.forEach(drawHandle);
    context.closePath();
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
