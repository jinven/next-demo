import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball();
  var centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    angle = 0,
    radius = 50,
    speed = 0.05;
  ball.x = centerX;
  ball.y = centerY;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //当radius的值相等时为圆周运动
    //当radius的值不想等是为椭圆运动 
    ball.x = centerX + Math.sin(angle) * radius;
    ball.y = centerY + Math.cos(angle) * radius * 2;
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
