import { useRef, useEffect } from 'react'
import { Arrow } from '../../../utils/canvas/arrow'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var arrow = new Arrow();
  arrow.x = canvas.width / 2;
  arrow.y = canvas.height / 2;
  var vr = 30, speed = 2;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    arrow.rotation = vr * Math.PI / 180;
    arrow.x += Math.cos(arrow.rotation) * speed;
    arrow.y += Math.sin(arrow.rotation) * speed;
    arrow.draw(context);
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
