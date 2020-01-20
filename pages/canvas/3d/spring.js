import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball3d } from '../../../utils/canvas/ball3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d"),
    ball = new Ball3d(),
    tx = Math.random() * 500 - 250,
    ty = Math.random() * 500 - 250,
    tz = Math.random() * 500,
    spring = 0.1,
    friction = 0.94,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2;
  const onMouseDown = function (e) {
    tx = Math.random() * 500 - 250;
    ty = Math.random() * 500 - 250;
    tz = Math.random() * 500;
  }
  window.addEventListener('mousedown', onMouseDown, false);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    var dx = tx - ball.xpos,
      dy = ty - ball.ypos,
      dz = tz - ball.zpos,
      dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    ball.vx += dx * spring;
    ball.vy += dy * spring;
    ball.vz += dz * spring;
    ball.vx *= friction;
    ball.vy *= friction;
    ball.vz *= friction;
    ball.xpos += ball.vx;
    ball.ypos += ball.vy;
    ball.zpos += ball.vz;
    if (ball.zpos > -fl) {
      var scale = fl / (fl + ball.zpos);
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + ball.xpos * scale;
      ball.y = vpY + ball.ypos * scale;
      ball.visible = true;
    } else {
      ball.visible = false;
    }
    if (ball.visible) {
      ball.draw(context);
    }
  }())
  return function () {
    isRuning = false
    window.removeEventListener('mousedown', onMouseDown, false)
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
