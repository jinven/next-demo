import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ballA = new Ball(20, "red");
  ballA.y = canvas.width / 2;
  ballA.vx = 1;
  var ballB = new Ball(20, "orange");
  ballB.x = canvas.width;
  ballB.y = canvas.height / 2;
  ballB.vx = -1;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ballA.x += ballA.vx;
    ballB.x += ballB.vx;
    var dx = ballB.x - ballA.x,
      dy = ballB.y - ballA.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < ballA.radius + ballB.radius) {
      ballA.vx *= -1;
      ballB.vx *= -1
    }
    ballA.draw(context);
    ballB.draw(context);
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
