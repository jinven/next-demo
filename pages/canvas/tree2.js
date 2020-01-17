import { useRef, useEffect } from 'react'
import { Tree } from '../../utils/canvas/tree'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    trees = [],
    numTrees = 1000,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    floor = 50,
    ax = 0,
    ay = 0,
    az = 0,
    vx = 0,
    vy = 0,
    vz = 0,
    gravity = 0.3,
    friction = 0.98;
  for (var tree, i = 0; i < numTrees; i++) {
    var color = Math.random() * (0xffffff)
    tree = new Tree(color);
    tree.xpos = Math.random() * 2000 - 1000;
    tree.ypos = floor;
    tree.zpos = Math.random() * 10000;
    trees.push(tree);
  }
  const onKeydown = function (event) {
    switch (event.keyCode) {
      case 38:        //up
        az = -1;
        break;
      case 40:        //down
        az = 1;
        break;
      case 37:        //left
        ax = 1;
        break;
      case 39:        //right
        ax = -1;
        break;
      case 32:        //space
        ay = 1;
        break;
    }
  }
  const onKeyup = function (event) {
    switch (event.keyCode) {
      case 38:        //up
      case 40:        //down
        az = 0;
        break;
      case 37:        //left
      case 39:        //right
        ax = 0;
        break;
      case 32:        //space
        ay = 0;
        break;
    }
  }
  window.addEventListener('keydown', onKeydown, false);

  window.addEventListener('keyup', onKeyup, false);

  function move(tree) {
    tree.xpos += vx;
    tree.ypos += vy;
    tree.zpos += vz;
    if (tree.ypos < floor) {
      tree.ypos = floor;
    }
    if (tree.zpos < -fl) {
      tree.zpos += 10000;
    }
    if (tree.zpos > 10000 - fl) {
      tree.zpos -= 10000;
    }
    var scale = fl / (fl + tree.zpos);
    tree.scaleX = tree.scaleY = scale;
    tree.x = vpX + tree.xpos * scale;
    tree.y = vpY + tree.ypos * scale;
    tree.alpha = scale;
  }
  function zSort(a, b) {
    return (b.zpos - a.zpos);
  }
  function draw(tree) {
    tree.draw(context);
  }

  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    vx += ax;
    vy += ay;
    vz += az;
    vy -= gravity;
    trees.forEach(move);
    vx *= friction;
    vy *= friction;
    vz *= friction;
    trees.sort(zSort);
    trees.forEach(draw);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
    window.removeEventListener('keydown', onKeydown, false)
    window.removeEventListener('keyup', onKeyup, false)
  }
}
export default function MultipleBouncing() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="1000" height="500" style={{ background: '#000' }}></canvas>
      <style jsx>{`
        canvas{
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
