import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball0 = new Ball(80, "#ff0000"),
    ball1 = new Ball(40),
    bounce = -1;
  ball0.mass = 2;
  ball0.x = 100;
  ball0.y = 100;
  ball0.vx = Math.random() * 10 - 5;
  ball0.vy = Math.random() * 10 - 5;
  ball1.mass = 1;
  ball1.x = 300;
  ball1.y = 300;
  ball1.vx = Math.random() * 10 - 5;
  ball1.vy = Math.random() * 10 - 5;
  //墙体碰撞检测
  function wallCollsion(ball) {
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.vx *= bounce;
    } else if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx *= bounce;
    }
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= bounce;
    } else if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.vy *= bounce;
    }
  }
  //球体碰撞
  function ballCollsion(ballA, ballB) {
    var dx = ballA.x - ballB.x,
      dy = ballA.y - ballB.y,
      dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ballA.radius + ballB.radius) {
      var vxTotal = ballA.vx - ballB.vx;
      var vxAFinal = ((ballA.mass - ballB.mass) * ballA.vx + 2 * ballB.mass * ballB.vx) / (ballA.mass + ballB.mass);
      var vxBFinal = vxTotal + vxAFinal;
      ballA.vx = vxAFinal;
      ballB.vx = vxBFinal;
      ballA.x += ballA.vx;
      ballB.x += ballB.vx;
      var vyTotal = ballA.vy - ballB.vy;
      var vyAFinal = ((ballA.mass - ballB.mass) * ballA.vy + 2 * ballB.mass * ballB.vy) / (ballA.mass + ballB.mass);
      var vyBFinal = vyTotal + vyAFinal;
      ballA.vy = vyAFinal;
      ballB.vy = vyBFinal;
      ballA.y += ballA.vy;
      ballB.y += ballB.vy;
    }
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball0.x += ball0.vx;
    ball0.y += ball0.vy;
    ball1.x += ball1.vx;
    ball1.y += ball1.vy;
    //球体碰撞检测
    ballCollsion(ball0, ball1);
    //墙体碰撞检测
    wallCollsion(ball0);
    wallCollsion(ball1);
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
