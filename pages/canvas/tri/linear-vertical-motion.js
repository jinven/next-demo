import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var angle = 0,
    range = 50,
    xspeed = 1,
    yspeed = 0.05;
  var ball = new Ball();
  //           ball.x = canvas.width/4;
  //           ball.y = canvas.height/4;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.x += xspeed;
    if (ball.x > canvas.width + ball.radius) {
      ball.x = -ball.radius;
    }
    ball.y = canvas.height / 2 + Math.sin(angle) * range;
    // angle += 0.05; //加上就变成wave运动
    ball.draw(context);
  })();
  // ball.draw(context);
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
