import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
function run(canvas, log) {
  let isRuning = true
  var mouse = utils.captureMouse(canvas);
  var context = canvas.getContext('2d');
  var rect = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dx = mouse.x - rect.x;
    var dy = mouse.y - rect.y;
    var dis = Math.sqrt(dx * dx + dy * dy);
    //draw a square
    context.fillStyle = '#ffffff';
    context.fillRect(rect.x - 2, rect.y - 2, 4, 4);
    context.save();
    context.strokeStyle = '#ffffff';
    context.beginPath()
    context.moveTo(rect.x, rect.y);
    context.lineTo(mouse.x, mouse.y);
    context.closePath();
    context.stroke();
    context.restore();
    log.style.left = (mouse.x + rect.x) / 2 + 'px';
    log.style.top = (mouse.y + rect.y) / 2 + 'px';
    log.innerHTML = dis;
  })();
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
      <p ref={pEl} style={{ position: 'absolute', fontSize: 10, color: '#fff' }}></p>
    </div>
  )
}
