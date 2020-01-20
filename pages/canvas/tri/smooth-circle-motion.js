import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ball = new Ball();
  var angle = 0, range = 50, speed = 0.05;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  (function drawFram() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFram, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.y = canvas.height / 2 + Math.sin(angle) * range; //[75,175]
    ball.x = canvas.height / 2 + Math.cos(angle) * range;
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
