import { useRef, useEffect } from 'react'
import { Ball3d } from '../../utils/canvas/ball3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 50,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    top = -100,
    bottom = 100,
    left = -100,
    right = 100,
    front = -100,
    back = 100,
    bounce = -1;
  for (var i = 0; i < numBalls; i++) {
    var size = Math.random() * 20;
    var color = Math.random() * (0xffffff);
    var ball = new Ball3d(size, color);
    ball.vx = Math.random() * 10 - 5;
    ball.vy = Math.random() * 10 - 5;
    ball.vz = Math.random() * 10 - 5;
    balls.push(ball);
  }
  function move(ball) {
    ball.xpos += ball.vx;
    ball.ypos += ball.vy;
    ball.zpos += ball.vz;
    if (ball.xpos + ball.radius > right) {
      ball.xpos = right - ball.radius;
      ball.vx *= bounce;
    } else if (ball.xpos - ball.radius < left) {
      ball.xpos = left + ball.radius;
      ball.vx *= bounce;
    }
    if (ball.ypos + ball.radius > bottom) {
      ball.ypos = bottom - ball.radius;
      ball.vy *= bounce;
    } else if (ball.ypos - ball.radius < top) {
      ball.ypos = top + ball.radius;
      ball.vy *= bounce;
    }
    if (ball.zpos + ball.radius > back) {
      ball.zpos = back - ball.radius;
      ball.vz *= bounce;
    } else if (ball.zpos - ball.radius < front) {
      ball.zpos = front + ball.radius;
      ball.vz *= bounce;
    }
    if (ball.zpos > -fl) {
      var scale = fl / (fl + ball.zpos);
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + ball.xpos * scale;
      ball.y = vpY + ball.ypos * scale;
      ball.visible = true;
    } else {
      ball.visible = false;
    }
    if (ball.visible) {
      ball.draw(context);
    }
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(move);
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
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
