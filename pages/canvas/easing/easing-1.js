import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball(20, "red");
  var easing = 0.05;
  var targetX = canvas.width / 2,
    targetY = 300;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //随着ball.x的增大， (targetX - ball.x)的值不断减小， 导致vx不打断减小
    var vx = (targetX - ball.x) * easing;
    var vy = (targetY - ball.y) * easing;
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
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
