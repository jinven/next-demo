import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball0 = new Ball(),
    ball1 = new Ball(20, "red");
  ball0.mass = 1;
  ball0.x = 50;
  ball0.y = canvas.height / 2;
  ball0.vx = 1;
  ball1.mass = 1;
  ball1.x = 400;
  ball1.y = canvas.height / 2;
  ball1.vx = -3;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball0.x += ball0.vx;
    ball1.x += ball1.vx;
    var dist = ball1.x - ball0.x;
    if (Math.abs(dist) < ball0.radius + ball1.radius) {
      var vx0Final = ((ball0.mass - ball1.mass) * ball0.vx + 2 * ball1.mass * ball1.vx) / (ball0.mass + ball1.mass);
      var vx1Final = ((ball1.mass - ball0.mass) * ball1.vx + 2 * ball0.mass * ball0.vx) / (ball0.mass + ball1.mass);
      console.log(vx0Final, vx1Final);
      ball0.vx = vx0Final;
      ball1.vx = vx1Final;
      ball0.x += ball0.vx;
      ball1.x += ball1.vx;
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
