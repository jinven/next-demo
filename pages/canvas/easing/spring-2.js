import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, btn) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(20, "orange"),
    vx = 0,
    ax = 0,
    dx,
    isClick = false;
  var targetX = canvas.width / 2,
    spring = 0.05,
    f = 0.95; //在运动中加入摩擦力
  ball.y = canvas.height / 2;
  btn.onclick = function () {
    isClick = true;
    if (isClick) {
      (function drawFrame() {
        if(!isRuning){
          return
        }
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        dx = targetX - ball.x;
        ax = dx * spring;
        vx += ax;
        vx *= f;
        ball.x += vx;
        ball.draw(context);
      }());
    }
  }
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const buttonEl = useRef(null)
  useEffect(() => run(canvasEl.current, buttonEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <button ref={buttonEl}>click</button>
    </div>
  )
}
