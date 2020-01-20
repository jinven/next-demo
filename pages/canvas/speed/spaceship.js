import { useRef, useEffect } from 'react'
import utils from '../../../utils/canvas/utils'
import { SpaceShip } from '../../../utils/canvas/spaceship'
function run(canvas, oData) {
  let isRuning = true
  var context = canvas.getContext('2d');
  var spaceShip = new SpaceShip();
  spaceShip.x = canvas.width / 2;
  spaceShip.y = canvas.height / 2;
  var vr = 0,
    vx = 0,
    vy = 0,
    ax = 0,
    ay = 0,
    angle = 0,
    thrust = 0;
  const onKeydown = function (event) {
    switch (event.keyCode) {
      case 37:    //left
        vr = -3;
        vx = 0;
        vy = 0;
        break;
      case 39:
        vr = 3;
        vx = 0;
        vy = 0;
        break;
      case 38:
        spaceShip.showFlame = true;
        thrust = 0.05;
        break;
      case 40:
        ax = 0;
        ay = 0;
        vx = 0;
        vy = 0;
        break;
    }
  }
  const onKeyup = function (event) {
    vr = 0;
    thrust = 0;
    spaceShip.showFlame = false;
  }
  window.addEventListener('keydown', onKeydown, false);
  window.addEventListener('keyup', onKeyup, false);
  (function drawFrame() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    spaceShip.rotation += vr * Math.PI / 180;
    angle = spaceShip.rotation;
    ax = Math.cos(angle) * thrust;
    ay = Math.sin(angle) * thrust;
    vx += ax;
    vy += ay;
    if (spaceShip.x > canvas.width - spaceShip.width) {
      spaceShip.x = canvas.width - spaceShip.width;
    }
    if (spaceShip.x < spaceShip.width) {
      spaceShip.x = spaceShip.width;
    }
    if (spaceShip.y > canvas.height - spaceShip.height) {
      spaceShip.y = canvas.height - spaceShip.height;
    }
    if (spaceShip.y < spaceShip.height) {
      spaceShip.y = spaceShip.height;
    }
    spaceShip.x += vx;
    spaceShip.y += vy;
    spaceShip.draw(context);
    oData.style.left = spaceShip.x + 'px';
    oData.style.top = spaceShip.y + 'px';
    /*var str = null;
    str = "<li>vx:"+vx.toFixed(2)+"</li>" + "<li>vy:"+vy.toFixed(2)+"</li>" + "<li>方向:"+spaceShip.rotation*180+"</li>"+
          "<li>位置:"+(spaceShip.x).toFixed(2)+" "+ (spaceShip.y).toFixed(2)+"</li>";
    oData.innerHTML = str;*/
  }());
  return function () {
    isRuning = false
    window.removeEventListener('keydown', onKeydown, false);
    window.removeEventListener('keyup', onKeyup, false);
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  const ulEl = useRef(null)
  useEffect(() => run(canvasEl.current, ulEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="1000" height="500" style={{ background: '#000' }}></canvas>
      <ul className="data" ref={ulEl}></ul>
      <style jsx>{`
      .data{
        position: absolute;
        left: 0;
        top:0;
        list-style: none;
        color: aqua;
        font-size: 12px;
        width: 200px;
        height: 100px;
      }
      `}</style>
    </div>
  )
}
