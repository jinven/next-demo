import { useRef, useEffect } from 'react'
function run(canvas, log) {
  let isRuning = true
  var context = canvas.getContext('2d');
  //create a black square ,assign random position
  var Rect1 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  }
  //create a red square ,assgin random position
  var Rect2 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  }
  drawSquare(Rect1.x, Rect1.y);
  drawSquare(Rect2.x, Rect2.y);
  function drawSquare(a, b) {
    context.save();
    context.fillStyle = "#49f";
    context.fillRect(a - 2, b - 2, 4, 4);
    context.restore();
  }
  //calculate the distance between two points 
  var dx = Rect1.x - Rect2.x;
  var dy = Rect1.y - Rect2.y;
  var dis = Math.sqrt(dx * dx + dy * dy);
  drawLine();
  log.style.left = (Rect1.x + Rect2.x) / 2 + 'px';
  log.style.top = (Rect1.y + Rect2.y) / 2 + 'px';
  log.innerHTML = "distance:" + dis;
  function drawLine() {
    context.save();
    context.strokeStyle = '#ffffff';
    context.moveTo(Rect1.x, Rect1.y);
    context.lineTo(Rect2.x, Rect2.y);
    context.stroke();
    context.restore();
  }
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
      <p ref={pEl} style={{ position: 'absolute', fontSize: '10px', color: '#fff' }}></p>
    </div>
  )
}
