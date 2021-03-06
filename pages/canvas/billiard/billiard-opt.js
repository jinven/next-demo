import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball0 = new Ball(),
    ball1 = new Ball();
  ball0.x = 50;
  ball0.y = canvas.height / 2;
  ball0.mass = 2;
  ball0.vx = 10;
  ball1.x = 300;
  ball1.y = canvas.height / 2;
  ball1.mass = 10;
  ball1.vx = -1;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball0.x += ball0.vx;
    ball1.x += ball1.vx;
    var dist = ball1.x - ball0.x;
    if (dist < ball0.radius + ball1.radius) {
      //动量守恒
      var vxTotal = ball0.vx - ball1.vx;
      var vx0Final = ((ball0.mass - ball1.mass) * ball0.vx + 2 * ball1.mass * ball1.vx) / (ball0.mass + ball1.mass);
      var vx1Final = vxTotal + vx0Final;
      ball0.vx = vx0Final;
      ball1.vx = vx1Final;
      ball0.x += ball0.vx;
      ball1.x += ball0.vx;
    }
    ball0.draw(context);
    ball1.draw(context);
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
