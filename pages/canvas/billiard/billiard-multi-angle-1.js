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
  function ballCollsion(ball0, ball1) {
    var dx = ball1.x - ball0.x,
      dy = ball1.y - ball0.y,
      dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ball0.radius + ball1.radius) {
      //calculate angle, sine, and cosine
      var angle = Math.atan2(dy, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle),
        //rotate ball0's position
        x0 = 0,
        y0 = 0,
        //rotate ball1's position
        x1 = dx * cos + dy * sin,
        y1 = dy * cos - dx * sin,
        //rotate ball0's velocity
        vx0 = ball0.vx * cos + ball0.vy * sin,
        vy0 = ball0.vy * cos - ball0.vx * sin,
        //rotate ball1's velocity
        vx1 = ball1.vx * cos + ball1.vy * sin,
        vy1 = ball1.vy * cos - ball1.vx * sin,
        //collision reaction
        vxTotal = vx0 - vx1;
      vx0 = ((ball0.mass - ball1.mass) * vx0 + 2 * ball1.mass * vx1) /
        (ball0.mass + ball1.mass);
      vx1 = vxTotal + vx0;
      x0 += vx0;
      x1 += vx1;
      //rotate positions back
      var x0Final = x0 * cos - y0 * sin,
        y0Final = y0 * cos + x0 * sin,
        x1Final = x1 * cos - y1 * sin,
        y1Final = y1 * cos + x1 * sin;
      //adjust positions to actual screen positions
      ball1.x = ball0.x + x1Final;
      ball1.y = ball0.y + y1Final;
      ball0.x = ball0.x + x0Final;
      ball0.y = ball0.y + y0Final;
      //rotate velocities back
      ball0.vx = vx0 * cos - vy0 * sin;
      ball0.vy = vy0 * cos + vx0 * sin;
      ball1.vx = vx1 * cos - vy1 * sin;
      ball1.vy = vy1 * cos + vx1 * sin;
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
