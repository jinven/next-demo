import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball(20, "red");
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2 - 200;
  var vy = 0.1, ay = 0.01, gravity = 0.2;
  (function drawFramw() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFramw, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //vy += ay;
    vy += gravity;
    ball.y += vy;
    // checkGround(ball);
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
