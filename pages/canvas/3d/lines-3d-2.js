import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Point3d } from '../../../utils/canvas/point3d'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    mouse = utils.captureMouse(canvas),
    points = [],
    numPoints = 50,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    angleX, angleY;
  for (var i = 0; i < numPoints; i++) {
    var xPos = Math.random() * 200 - 100;
    var yPos = Math.random() * 200 - 100;
    var zPos = Math.random() * 200 - 100;
    var point = new Point3d(xPos, yPos, zPos);
    point.setVanishingPoint(vpX, vpY);
    points.push(point);
  }
  console.log(points);
  function move(point) {
    point.rotateX(angleX);
    point.rotateY(angleY);
  }
  function draw(point, i) {
    if (i !== 0) {
      context.lineTo(point.getScreenX(), point.getScreenY());
    }
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    angleX = (mouse.y - vpY) * 0.001;
    angleY = (mouse.x - vpX) * 0.001;
    points.forEach(move);
    context.beginPath();
    points.forEach(draw);
    context.stroke();
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#ccc' }}></canvas>
    </div>
  )
}
