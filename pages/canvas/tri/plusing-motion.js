import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var angle = 0,
    range = 0.5,
    speed = 0.05,
    centerScale = 1;
  var ball = new Ball();
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.scaleX = ball.scaleY = centerScale + Math.sin(angle) * range;
    angle += speed;
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
