import { useRef, useEffect } from 'react'
import { Ball3d } from '../../../utils/canvas/ball3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 200,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    gravity = 0.2,
    floor = 200,
    bounce = -0.5;
  for (var i = 0; i < numBalls; i++) {
    var color = Math.random() * (0xffffff);
    var ball = new Ball3d(5, color);
    ball.ypos = -100;
    ball.vx = Math.random() * 10 - 5;
    ball.vy = Math.random() * 10 - 5;
    ball.vz = Math.random() * 10 - 5;
    balls.push(ball);
  }
  function move(ball) {
    ball.vy += gravity;
    ball.xpos += ball.vx;
    ball.ypos += ball.vy;
    ball.zpos += ball.vz;
    if (ball.ypos > floor) {
      ball.ypos = floor;
      ball.vy *= bounce;
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
  }
  function draw(ball) {
    if (ball.visible) {
      ball.draw(context);
    }
  }
  //z-sort
  function sort(a, b) {
    return (b.zpos - a.zpos);
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(move);
    balls.forEach(sort);
    balls.forEach(draw);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Gravity() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
