import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Ball } from '../../../utils/canvas/ball'
import { Line } from '../../../utils/canvas/line'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(),
    line = new Line(0, 0, 300, 0),
    mouse = utils.captureMouse(canvas),
    gravity = 0.2,
    bounce = -0.6;
  ball.x = 100;
  ball.y = 100;
  line.x = 50;
  line.y = 300;
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    line.rotation = (mouse.x - canvas.width / 2) * 0.1 * Math.PI / 180;
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    //ball与line碰撞检测
    if (utils.intersects(ball.getBounds(), line.getBounds())) {
      var cos = Math.cos(line.rotation),
        sin = Math.sin(line.rotation);
      var x1 = ball.x - line.x,
        y1 = ball.y - line.y;
      var y2 = y1 * cos - x1 * sin;
      if (y2 > -ball.radius) {
        var x2 = x1 * cos + y1 * sin;
        //旋转速度
        var vx1 = ball.vx * cos + ball.vy * sin,
          vy1 = ball.vy * cos - ball.vx * sin;
        y2 = -ball.radius;
        vy1 *= bounce;
        //旋转回去
        x1 = x2 * cos - y2 * sin;
        y1 = y2 * cos + x2 * sin;
        ball.vx = vx1 * cos - vy1 * sin;
        ball.vy = vy1 * cos - vx1 * sin;
        ball.x = x1 + line.x;
        ball.y = y1 + line.y
      }
    }
    ball.draw(context);
    line.draw(context);
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#fff' }}></canvas>
    </div>
  )
}
