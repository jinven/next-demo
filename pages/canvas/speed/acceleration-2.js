import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ball = new Ball();
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  var vx = 0, vy = 0, ax = 0, ay = 0;
  const onKeydown = function (event) {
    switch (event.keyCode) {
      case 37:
        ax = -0.1;
        break;
      case 39:
        ax = 0.1;
        break;
      case 38:
        ay = -0.1;
        break;
      case 40:
        ay = 0.1;
        break;
    }
  };
  const onKeyup = function (event) {
    ax = 0;
    ay = 0;
    vy = 0;
    vx = 0;
    console.log(vy, vx);
  }
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    vx += ax;
    vy += ay;
    ball.x += vx;
    ball.y += vy;
    if (ball.x > canvas.width - ball.radius) {
      ball.x = canvas.width - ball.radius;
    } else if (ball.x < ball.radius) {
      ball.x = ball.radius;
    }
    if (ball.y > canvas.height - ball.radius) {
      ball.y = canvas.height - ball.radius;
    } else if (ball.y < ball.radius) {
      ball.y = ball.radius;
    }
    ball.draw(context);
  }());
  return function () {
    isRuning = false
    window.removeEventListener("keydown", onKeydown, false);
    window.removeEventListener("keyup", onKeyup, false);
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
