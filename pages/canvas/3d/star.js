import { useRef, useEffect } from 'react'
import { Ball3d } from '../../../utils/canvas/ball3d-s'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 300,
    fl = 200,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    floor = 250,
    ax = 0,
    ay = 0,
    az = 0,
    vx = 0,
    vy = 0,
    vz = 0.5,
    gravity = 0.3,
    friction = 0.98;
  for (var ball, i = 0; i < numBalls; i++) {
    var size = Math.random() * 80,
      color = Math.random() * (0xffffff);
    ball = new Ball3d(size, "#444");
    ball.xpos = Math.random() * 3000 - 1500;
    ball.ypos = Math.random() * 1000 - 500;
    ball.zpos = Math.random() * 10000;
    balls.push(ball);
  }
  window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 38:        //up
        az = -1;
        break;
      case 40:        //down
        az = 1;
        break;
      case 37:        //left
        ax = 1;
        break;
      case 39:        //right
        ax = -1;
        break;
      case 32:        //space
        ay = 1;
        break;
    }
  }, false);
  window.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
      case 38:        //up
      case 40:        //down
        az = 0;
        break;
      case 37:        //left
      case 39:        //right
        ax = 0;
        break;
      case 32:        //space
        ay = 0;
        break;
    }
  }, false);
  function move(ball) {
    ball.xpos += vx;
    ball.ypos += vy;
    ball.zpos += vz;
    if (ball.ypos < -500) {
      ball.ypos = 500;
    }
    if (ball.zpos < -fl) {
      ball.zpos += 10000;
    }
    if (ball.zpos > 10000 - fl) {
      ball.zpos -= 10000;
    }
    var scale = fl / (fl + ball.zpos);
    ball.scaleX = ball.scaleY = scale;
    ball.x = vpX + ball.xpos * scale;
    ball.y = vpY + ball.ypos * scale;
    ball.alpha = scale;
  }
  function zSort(a, b) {
    return (b.zpos - a.zpos);
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
    vx += ax;
    vy += ay;
    vz += az;
    vy -= gravity;
    balls.forEach(move);
    vx *= friction;
    vy *= friction;
    vz *= friction;
    balls.sort(zSort);
    balls.forEach(draw);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Star() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="800" height="500" style={{ background: '#000' }}></canvas>
    </div>
  )
}
