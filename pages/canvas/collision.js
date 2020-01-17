import { useRef, useEffect } from 'react'
import { Ball3d } from '../../utils/canvas/ball3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    balls = [],
    numBalls = 20,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    top = -200,
    bottom = 200,
    left = -200,
    right = 200,
    back = 200,
    front = -200;
  for (var ball, i = 0; i < numBalls; i++) {
    ball = new Ball3d(15, "red");
    ball.xpos = Math.random() * 400 - 200;
    ball.ypos = Math.random() * 400 - 200;
    ball.zpos = Math.random() * 400 - 200;
    ball.vx = Math.random() * 5 - 1;
    ball.vy = Math.random() * 5 - 1;
    ball.vz = Math.random() * 5 - 1;
    balls.push(ball);
  }
  function move(ball) {
    ball.xpos += ball.vx;
    ball.ypos += ball.vy;
    ball.zpos += ball.vz;
    if (ball.xpos + ball.radius > right) {
      ball.xpos = right - ball.radius;
      ball.vx *= -1;
    } else if (ball.xpos - ball.radius < left) {
      ball.xpos = left + ball.radius;
      ball.vx *= -1;
    }
    if (ball.ypos + ball.radius > bottom) {
      ball.ypos = bottom - ball.radius;
      ball.vy *= -1;
    } else if (ball.ypos - ball.radius < top) {
      ball.ypos = top + ball.radius;
      ball.vy *= -1;
    }
    if (ball.zpos + ball.radius > back) {
      ball.zpos = back - ball.radius;
      ball.vz *= -1;
    } else if (ball.zpos - ball.radius < front) {
      ball.zpos = front + ball.radius;
      ball.vz *= -1;
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
  function checkCollision(ballA, i) {
    for (var ballB, dx, dy, dz, dist, j = i + 1; j < numBalls; j++) {
      ballB = balls[j];
      dx = ballA.xpos - ballB.xpos;
      dy = ballA.ypos - ballB.ypos;
      dz = ballA.zpos - ballB.zpos;
      dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < ballA.radius + ballB.radius) {
        ballA.color = "#0000ff";
        ballB.color = "#0000ff";
      }
    }
  }
  function zSort(a, b) {
    return (b.zpos - a.zpos);
  }
  function draw(ball) {
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
    balls.forEach(checkCollision);
    balls.sort(zSort);
    balls.forEach(draw);
  }());
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="500" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
Collision.getInitialProps = async () => {
  return {}
}
export default Collision
