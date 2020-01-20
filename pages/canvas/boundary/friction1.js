import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var ball = new Ball(20, "red");
  ball.x = canvas.width / 4;
  ball.y = canvas.height / 4;
  var f = 0.05, speed = 0, angle = 0;//设定摩擦力
  var vx = 4;
  var vy = 3;
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    speed = Math.sqrt(vx * vx + vy * vy);
    angle = Math.atan2(vy, vx);
    if (speed > f) {
      speed -= f; //通过摩擦力减小速度
    } else {
      speed = 0;
    }
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
    ball.x += vx;
    ball.y += vy;
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
