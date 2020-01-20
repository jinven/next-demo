import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
import { Line } from '../../../utils/canvas/line'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(20, "purple"),
    canWid = canvas.width,
    canHei = canvas.height,
    gravity = 0.2,
    bounce = -0.7,
    lineNum = 8,
    lines = [];
  ball.x = 200;
  ball.y = 50;
  //create 5 lines
  for (var i = 0; i < lineNum; i++) {
    var line = new Line(-50, 0, 50, 0);
    lines.push(line);
  }
  lines[0].x = 200;
  lines[0].y = 100;
  lines[0].rotation = 30 * Math.PI / 180;
  lines[1].x = 200;
  lines[1].y = 200;
  lines[1].rotation = 45 * Math.PI / 180;
  lines[2].x = 320;
  lines[2].y = 150;
  lines[2].rotation = -20 * Math.PI / 180;
  lines[3].x = 250;
  lines[3].y = 330;
  lines[3].rotation = 10 * Math.PI / 180;
  lines[4].x = 330;
  lines[4].y = 250;
  lines[4].rotation = -30 * Math.PI / 180;
  lines[5].x = 150;
  lines[5].y = 430;
  lines[5].rotation = 30 * Math.PI / 180;
  lines[6].x = 350;
  lines[6].y = 430;
  lines[6].rotation = -30 * Math.PI / 180;
  function checkLine(line) {
    var bounds = line.getBounds();
    if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width) {
      var cos = Math.cos(line.rotation),
        sin = Math.sin(line.rotation);
      var x1 = ball.x - line.x,
        y1 = ball.y - line.y;
      var y2 = y1 * cos - x1 * sin;
      var vy1 = ball.vy * cos - ball.vx * sin;
      if (y2 > -ball.radius && y2 < vy1) {
        var x2 = x1 * cos + y1 * sin;
        var vx1 = ball.vx * cos + ball.vy * sin;
        y2 = -ball.radius;
        vy1 *= bounce
        //旋转回去
        x1 = x2 * cos - y2 * sin;
        y1 = y2 * cos + x2 * sin;
        ball.vx = vx1 * cos - vy1 * sin;
        ball.vy = vy1 * cos + vx1 * sin;
        ball.x = line.x + x1;
        ball.y = line.y + y1;
      }
    }
  }
  function drawLines(line) {
    checkLine(line);
    line.draw(context);
  }
  //lines.forEach(drawLines)
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canWid, canHei);
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    //碰撞检测
    if (ball.x + ball.radius > canWid) {
      ball.x = canWid - ball.radius;
      ball.vx *= bounce;
    } else if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx *= bounce;
    }
    if (ball.y + ball.radius > canHei) {
      ball.y = canHei - ball.radius;
      ball.vy *= bounce;
    } else if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.vy *= bounce;
    }
    lines.forEach(drawLines);
    ball.draw(context);
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
