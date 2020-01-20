import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(40, "red"),
    mouse = utils.captureMouse(canvas);
  var xpos = 0,
    ypos = 0,
    zpos = 0,
    fl = 250, //距离屏幕的距离
    vpX = canvas.width / 2,
    vpY = canvas.height / 2;
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) { //up
      zpos += 5;
    } else if (e.keyCode === 40) {
      zpos -= 5;
    }
  }, false);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (zpos > -fl) {
      var scale = fl / (fl + zpos);
      xpos = mouse.x - vpX;
      ypos = mouse.y - vpY;
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + xpos * scale;
      ball.y = vpY + ypos * scale;
      ball.visible = true;
    } else {
      ball.visible = false
    }
    if (ball.visible) {
      ball.draw(context);
    }
  }())
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Perspective() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
