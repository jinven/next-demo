import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball();
  var angleX = 0,
    angleY = 0,
    range = 80,
    xspeed = 0.05,
    yspeed = 0.2;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.x = canvas.width / 2 + Math.sin(angleX) * range; //
    ball.y = canvas.height / 2 + Math.cos(angleY) * range;
    angleX += xspeed;
    angleY += yspeed;
    ball.draw(context);
  })();
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
