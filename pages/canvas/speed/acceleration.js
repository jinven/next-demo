import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ball = new Ball(40);
  ball.x = 0;
  ball.y = 0;
  var vx = 0, vy = 0, //初始速度为0
    ax = 0, ay = 0, //分加速度为0
    angle = 30, //运动方向
    aTotal = 0.05; // 定义加速度的大小
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ax = Math.cos(30 * Math.PI / 180) * aTotal;
    ay = Math.sin(30 * Math.PI / 180) * aTotal;
    vx += ax;
    vy += ay;
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
