import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball(20, "red");
  var targetX = canvas.width / 2 + 200;
  var easing = 0.05, stopAni;
  ball.y = canvas.height / 2;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    var stopAni = window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dx = targetX - ball.x;
    if (Math.abs(dx) < 1) {
      ball.x = canvas.width / 2 + 200;
      //停止动画
      window.cancelAnimationFrame(stopAni);
      log.value = '动画完成';
    } else {
      var vx = dx * easing;
      ball.x += vx;
    }
    ball.draw(context);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const inputEl = useRef(null)
  useEffect(() => run(canvasEl.current, inputEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <input type="text" ref={inputEl} />
    </div>
  )
}
