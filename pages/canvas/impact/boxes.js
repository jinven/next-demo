import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { Box } from '../../../utils/canvas/box'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    boxes = [],
    activeBox = createBox(),
    gravity = 0.02;
  function createBox() {
    var color = Math.random() * (0xffffff);
    var box = new Box(Math.random() * 40 + 10, Math.random() * 40 + 10, color);
    box.x = Math.random() * canvas.width;
    boxes.push(box);
    return box;
  }
  function drawBox(box) {
    if (activeBox !== box && utils.intersects(activeBox, box)) {
      activeBox.y = box.y - activeBox.height;
      activeBox = createBox();
    }
    box.draw(context);
  }
  window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
      case 37:
        activeBox.x -= 5;
        break;
      case 39:
        activeBox.x += 5;
        break;
      case 40:
        gravity = 2;
        break;
    }
  }, false);
  window.addEventListener("keyup", function (event) {
    gravity = 0.02;
  }, false);
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    activeBox.vy += gravity;
    activeBox.y += activeBox.vy;
    if (activeBox.y + activeBox.height > canvas.height) {
      activeBox.y = canvas.height - activeBox.height;
      activeBox = createBox();
    }
    if (activeBox.x < 0) {
      activeBox.x = 0;
    }
    if (activeBox.x + activeBox.width > canvas.width) {
      activeBox.x = canvas.width - activeBox.width;
    }
    boxes.forEach(drawBox);
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
      <canvas ref={canvasEl} width="500" height="400" style={{ background: '#000' }}></canvas>
    </div>
  )
}
