import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
import { Line } from '../../../utils/canvas/line'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(20, "purple"),
    line = new Line(0, 0, 300, 0),
    gravity = 0.2,
    bounce = -0.6,
    angleN = 10;
  ball.x = 100;
  ball.y = 100;
  line.x = 50;
  line.y = 300;
  line.rotation = angleN * Math.PI / 180; //角度旋转
  //得到角度的cos和sin值
  var cos = Math.cos(line.rotation),
    sin = Math.sin(line.rotation);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    //球体运动
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    //球体相对于线的相对位置
    var x1 = ball.x - line.x,
      y1 = ball.y - line.y,
      //旋转坐标
      x2 = x1 * cos + y1 * sin,
      y2 = y1 * cos - x1 * sin,
      //旋转速度
      vx1 = ball.vx * cos + ball.vy * sin,
      vy1 = ball.vy * cos - ball.vx * sin;
    if (y2 > -ball.radius) {
      y2 = -ball.radius;
      vy1 *= bounce;
    }
    x1 = x2 * cos - y2 * sin;
    y1 = y2 * cos + x2 * sin;
    ball.vx = vx1 * cos - vy1 * sin;
    ball.vy = vy1 * cos + vx1 * sin;
    ball.x = line.x + x1;
    ball.y = line.y + y1;
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
