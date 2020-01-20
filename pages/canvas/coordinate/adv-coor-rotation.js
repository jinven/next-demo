import { useRef, useEffect } from 'react'
import { Ball } from '../../../utils/canvas/ball'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    ball = new Ball(20, "red"),
    vr = 0.05,
    cos = Math.cos(vr),
    sin = Math.sin(vr),
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    canvasWidth = canvas.width,
    canvasHeight = canvas.height;
  ball.x = Math.random() * canvasWidth;
  ball.y = Math.random() * canvasHeight;
  function circle(angle, radius) {
    context.save();
    context.strokeStyle = "white";
    context.beginPath();
    context.arc(centerX, centerX, 50, 0, angle, false);
    context.arc(centerX, centerX, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.restore();
  }
  function text(angle) {
    context.save();
    context.beginPath();
    context.strokeStyle = "#49f";
    context.font = "20px Arial";
    context.strokeText(-(angle * 360 / Math.PI).toFixed(0), centerX - 55, centerY + 50);
    context.closePath();
    context.stroke();
    context.restore();
  }
  function coordinate() {
    context.save();
    context.strokeStyle = "white";
    context.beginPath();
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);
    context.closePath();
    context.stroke();
    context.restore();
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    coordinate(context);
    var x1 = ball.x - centerX;
    var y1 = ball.y - centerY;
    var x2 = x1 * cos - y1 * sin;
    var y2 = y1 * cos + x1 * sin;
    ball.x = centerX + x2;
    ball.y = centerY + y2;
    var dx = ball.x - centerX;
    var dy = ball.y - centerY;
    var radius = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    circle(angle, radius);
    text(angle);
    context.save();
    context.strokeStyle = "white";
    context.moveTo(centerX, centerY);
    context.lineTo(ball.x, ball.y);
    context.stroke();
    context.restore();
    ball.draw(context);
  }());
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
      <canvas ref={canvasEl} width="400" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}