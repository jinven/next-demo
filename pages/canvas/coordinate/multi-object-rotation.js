import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    balls = [],
    numBalls = 10,
    angle,
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    cos,
    sin;
  for (var ball, i = 0; i < numBalls; i++) {
    ball = new Ball(Math.random() * 30 + 10, Math.random() * 0xffffff);
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    balls.push(ball);
  }
  console.log(balls);
  function move(ball) {
    var x1 = ball.x - centerX,
      y1 = ball.y - centerY,
      x2 = cos * x1 - sin * y1,
      y2 = cos * y1 + sin * x1;
    ball.x = centerX + x2;
    ball.y = centerY + y2;
  }
  function draw(ball) {
    ball.draw(context);
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    angle = (mouse.x - centerX) * 0.0005;
    cos = Math.cos(angle);
    sin = Math.sin(angle);
    balls.forEach(move);
    balls.forEach(draw);
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
