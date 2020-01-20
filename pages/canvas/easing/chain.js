import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    balls = [],
    ballsNum = 1,
    ax = 0,
    ay = 0,
    vx = 0,
    vy = 0,
    f = 0.99,
    spring = 0.004, //弹性系数
    gravity = 0.002;
  var ball;
  for (var i = 0; i < ballsNum; i++) {
    ball = new Ball(20, Math.random() * (0xffffff));
    balls.push(ball);
  }
  function moveBall(ball, targetX, targetY) {
    var dx = targetX - ball.x;
    var dy = targetY - ball.y;
    ax = dx * spring;
    ay = dy * spring;
    ball.vx += ax;
    ball.vy += ay;
    ball.vy += gravity;
    ball.vx *= f;
    ball.vy *= f;
    ball.x += ball.vx;
    ball.y += ball.vy;
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveBall(balls[0], mouse.x, mouse.y);
    // moveBall(balls[1], balls[0].x, balls[0].y);
    //moveBall(balls[2], balls[1].x, balls[1].y);
    context.beginPath();
    context.strokeStyle = '#fff';
    context.moveTo(mouse.x, mouse.y);
    context.lineTo(balls[0].x, balls[0].y);
    //context.lineTo(balls[1].x, balls[1].y);
    //context.lineTo(balls[2].x, balls[2].y);
    context.stroke();
    for (var i = 0; i < ballsNum; i++) {
      balls[i].draw(context);
    }
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
