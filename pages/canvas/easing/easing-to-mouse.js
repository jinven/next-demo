import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var mouse = utils.captureMouse(canvas);
  var ball1 = new Ball(20, "red");
  var ball2 = new Ball(10, "orange");
  var vx1, vy1, vx2, vy2, easing1 = 0.05, easing2 = 0.07;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    vx1 = (mouse.x - ball1.x) * easing1;
    vy1 = (mouse.y - ball1.y) * easing1;
    vx2 = (ball1.x - ball2.x) * easing2;
    vy2 = (ball1.y - ball2.y) * easing2;
    ball1.x += vx1;
    ball1.y += vy1;
    ball2.x += vx2;
    ball2.y += vy2;
    ball1.draw(context);
    ball2.draw(context);
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
