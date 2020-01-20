import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ball = new Ball();
  ball.x = canvas.width / 4;
  ball.y = canvas.height / 4;
  var angles = 30;
  var speed = 1;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var vx = Math.cos(angles * Math.PI / 180) * speed;
    var vy = Math.sin(angles * Math.PI / 180) * speed;
    ball.x += vx;
    ball.y += vy;
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
