import { useRef, useEffect } from 'react'
function run(canvas) {
  let isRuning = true
  var ctx = canvas.getContext('2d');
  var magazine = [];
  var planeOpt = {
    x: 190,
    y: 560,
    width: 20,
    height: 20,
    speed: 10
  };
  document.addEventListener('keydown', move, true);
  function createPlane(options) {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(options.x, options.y, options.width, options.height);
    ctx.restore();
  }
  (function update() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(update);
    clearScreen();
    createPlane(planeOpt);
    drawBullet(magazine);
  })()
  function clearScreen() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  function createBullet() {
    var bullet = {
      x: planeOpt.x + 9,
      y: planeOpt.y,
      width: 2,
      height: 10,
      speed: 2
    }
    magazine.push(bullet);
  }
  function drawBullet(magazine) {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    magazine.forEach((bullet, index, magazine) => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      bullet.y -= bullet.speed;
      if (bullet.y < 0) {
        magazine.splice(index, 1);
      }
    });
    ctx.restore();
  }
  function move(e) {
    var code = e.keyCode;
    switch (code) {
      case 37:
        planeOpt.x -= planeOpt.speed;
        if (planeOpt.x <= 0) {
          planeOpt.x = 0;
        }
        break;
      case 38:
        planeOpt.y -= planeOpt.speed;
        if (planeOpt.y <= 0) {
          planeOpt.y = 0;
        }
        break;
      case 39:
        planeOpt.x += planeOpt.speed;
        if (planeOpt.x + planeOpt.width >= canvas.width) {
          planeOpt.x = canvas.width - planeOpt.width;
        }
        break;
      case 40:
        planeOpt.y += planeOpt.speed;
        if (planeOpt.y + planeOpt.height >= canvas.height) {
          planeOpt.y = canvas.height - planeOpt.height;
        }
        break;
      case 32:
        createBullet();
        break;
    }
  }
  return function () {
    isRuning = false
    document.removeEventListener('keydown', move, true);
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="400" height="600" style={{ background: '#000' }}></canvas>
    </div>
  )
}
