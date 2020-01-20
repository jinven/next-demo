import { useRef, useEffect } from 'react'
import { SpaceShip } from '../../../utils/canvas/SpaceShip'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext("2d");
  var ship = new SpaceShip();
  context.lineWidth = 2;
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  var f = 0.97, vr = 0, vx = 0, vy = 0, ax = 0, ay = 0, speed = 0, angle = 0;
  window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        vr = -3;
        break;
      case 39:
        vr = 3;
        break;
      case 38:
        speed = 0.5;
        ship.showFlame = true;
        break;
    }
  }, false);
  window.addEventListener("keyup", function (event) {
    vr = 0;
    speed = 0;
    ship.showFlame = false;
  }, false);
  (function drawFramw() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFramw, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ship.rotation += vr * Math.PI / 180;
    angle = ship.rotation;
    ax = Math.cos(angle) * speed;
    ay = Math.sin(angle) * speed;
    vx += ax;
    vy += ay;
    vx *= f;
    vy *= f;
    ship.x += vx;
    ship.y += vy;
    if (ship.x + ship.width / 2 > canvas.width) {
      ship.x = canvas.width - ship.width;
      vx *= -1;
    } else if (ship.x < ship.width / 2) {
      ship.x = ship.width / 2;
      vx *= -1;
    }
    if (ship.y + ship.height / 2 > canvas.height) {
      ship.y = canvas.height - ship.height / 2;
      vy *= -1;
    } else if (ship.y < ship.height / 2) {
      ship.y = ship.height / 2;
      vy *= -1;
    }
    ship.draw(context);
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
      <canvas ref={canvasEl} width="500" height="500" style={{ background: '#000' }}></canvas>
    </div>
  )
}
