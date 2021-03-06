import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball3d } from '../../../utils/canvas/ball3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    balls = [],
    numBalls = 20,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    angleX, angleY;
  for (var i = 0; i < numBalls; i++) {
    var ball = new Ball3d(0, "#000000");
    ball.xpos = Math.random() * 200 - 100;
    ball.ypos = Math.random() * 200 - 100;
    ball.zpos = Math.random() * 200 - 100;
    balls.push(ball);
  }
  //            console.log(balls);
  function rotateX(ball, angleX) {
    var cos = Math.cos(angleX),
      sin = Math.sin(angleX);
    var y1 = ball.ypos * cos - ball.zpos * sin,
      z1 = ball.zpos * cos + ball.ypos * sin;
    ball.ypos = y1;
    ball.zpos = z1;
  }
  function rotateY(ball, angleY) {
    var cos = Math.cos(angleY),
      sin = Math.sin(angleY);
    var x1 = ball.xpos * cos - ball.zpos * sin,
      z1 = ball.zpos * cos + ball.xpos * sin;
    ball.xpos = x1;
    ball.zpos = z1;
  }
  /*设置视场*/
  function setPerspective(ball) {
    if (ball.zpos > -fl) {
      ball.visible = true;
      var scale = fl / (fl + ball.zpos);
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + ball.xpos * scale;
      ball.y = vpY + ball.ypos * scale;
    } else {
      ball.visible = false;
    }
  }
  function move(ball, i) {
    rotateX(ball, angleX);
    rotateY(ball, angleY);
    setPerspective(ball);
    //不从第一个点画
    if (i !== 0) {
      context.lineTo(balls[i].x, balls[i].y);
    }
  }
  function draw(ball) {
    if (ball.visible) {
      ball.draw(context);
    }
  }
  context.strokeStyle = "#444";
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    angleX = (mouse.y - vpY) * 0.001;
    angleY = (mouse.x - vpX) * 0.001;
    context.beginPath();
    //moveTo第一个点
    context.moveTo(balls[0].x, balls[0].y);
    balls.forEach(move);
    context.stroke();
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#ccc' }}></canvas>
    </div>
  )
}
