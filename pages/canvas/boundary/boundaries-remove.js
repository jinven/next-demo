import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var balls = [];
  var numBall = 10;
  var canWid = canvas.width;
  var canHei = canvas.height;
  for (var i = 0; i < numBall; i++) {
    var size = Math.random() * 20 + 5;
    var color = Math.random() * (0xffffff);
    var ball = new Ball(size, color);
    ball.id = "ball_" + i;
    ball.radius = Math.random() * 30 + 10;
    ball.x = Math.random() * canWid;
    ball.y = Math.random() * canHei;
    ball.vx = Math.random() * 2 - 1;
    ball.vy = Math.random() * 2 - 1;
    balls.push(ball);
  }
  function draw(ball, pos) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x - ball.radius > canvas.width || ball.radius + ball.x < 0
      || ball.y - ball.radius > canvas.height || ball.y + ball.radius < 0) {
      balls.splice(pos, 1); //
      if (balls.length > 0) {
        log.innerHTML += "移除" + ball.id + "<br/>";
      } else {
        log.innerHTML = "全部移除";
      }
    }
    ball.draw(context);
  }
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var i = balls.length;
    while (i--) {
      draw(balls[i], i);
    }
  }());
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const pEl = useRef(null)
  useEffect(() => run(canvasEl.current, pEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
      <p ref={pEl}></p>
      <style jsx>{`
        p{
          position: absolute;
          top: 0; left: 420px;
          padding: 5px;
          width: 100px;
          background: #eee;  
        }
      `}</style>
    </div>
  )
}
