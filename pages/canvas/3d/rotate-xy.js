import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball3d } from '../../../utils/canvas/ball3d-s'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    balls = [],
    numBalls = 250,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    angleX,
    angleY; //绕Y轴旋转的角度
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (var i = 0; i < numBalls; i++) {
    var size = Math.random() * 10 + 5,
      ball = new Ball3d(size);
    ball.xpos = Math.random() * 500 - 250;
    ball.ypos = Math.random() * 500 - 250;
    ball.zpos = Math.random() * 500 - 250;
    balls.push(ball);
  }
  function rotateY(ball, angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle),
      x1 = ball.xpos * cos - ball.zpos * sin,
      z1 = ball.zpos * cos + ball.xpos * sin;
    ball.xpos = x1;
    ball.zpos = z1;
  }
  function rotateX(ball, angle) {
    var cos = Math.cos(angle),
      sin = Math.sin(angle),
      y1 = ball.ypos * cos - ball.zpos * sin,
      z1 = ball.zpos * cos + ball.ypos * sin;
    ball.ypos = y1;
    ball.zpos = z1;
  }
  function setPerspective(ball) {
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
  function move(ball) {
    rotateY(ball, angleY);
    rotateX(ball, angleX);
    setPerspective(ball)
  }
  function zSort(a, b) {
    return (b.zpos - a.zpos);
  }
  function draw(ball) {
    if (ball.visible) {
      ball.draw(context);
    }
  }
  (function deawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(deawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    angleX = (mouse.y - vpY) * 0.0001;
    angleY = (mouse.x - vpX) * 0.0001;
    balls.forEach(move);
    balls.sort(zSort);
    balls.forEach(draw);
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
      <canvas ref={canvasEl} width="1300" height="600" style={{ background: '#000' }}></canvas>
    </div>
  )
}
