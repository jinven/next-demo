import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(40, "red");
  var xpos = 0,
    ypos = 0,
    zpos = 0,
    vx = 0,
    vy = 0,
    vz = 0,
    friction = 0.98,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2;
  const onKeydown = function (e) {
    switch (e.keyCode) {
      case 38:      //up
        vy -= 1;
        break;
      case 40:      //down
        vy += 1;
        break;
      case 37:      //left
        vx -= 1;
        break;
      case 39:      //right
        vx += 1;
        break;
      case 16:     //shift
        vz += 1;
        break;
      case 17:     //control
        vz -= 1;
        break;
    }
  }
  window.addEventListener('keydown', onKeydown, false);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    xpos += vx;
    ypos += vy;
    zpos += vz;
    vx *= friction;
    vy *= friction;
    vz *= friction;
    if (zpos > -fl) {
      var scale = fl / (fl + zpos);
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + xpos * scale;
      ball.y = vpY + ypos * scale;
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
    window.removeEventListener('keydown', onKeydown, false)
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <p>方向键移动</p>
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
