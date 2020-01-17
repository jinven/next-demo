import { useRef, useEffect } from 'react'
import { NatureTree } from '../../utils/canvas/nature-tree'
function run(canvas) {
  let isRuning = true
  var context = canvas.getContext('2d'),
    trees = [],
    numTrees = 10,
    fl = 250,
    vpX = canvas.width / 2,
    vpY = canvas.height / 2,
    floor = 200,
    vz = 0,
    friction = 0.98;
  for (var tree, i = 0; i < numTrees; i++) {
    var color = Math.random() * (0xffffff);
    var tree = new NatureTree(context);
    tree.xpos = Math.random() * 1000 - 500;
    tree.ypos = floor;
    tree.zpos = Math.random() * 10000;
    trees.push(tree);
  }
  const onKeydown = function (event) {
    if (event.keyCode === 38) {         //up
      vz -= 1;
    } else if (event.keyCode === 40) {  //down
      vz += 1;
    }
  }
  window.addEventListener('keydown', onKeydown, false);
  function move(tree) {
    tree.zpos += vz;
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
    tree.draw(0.6, true, tree.medium_leaves);
  }
  (function drawFrame() {
    if(!isRuning){
      return
    }
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    trees.forEach(move);
    vz *= friction;
    trees.sort(zSort);
    trees.forEach(draw);
  }())
  return function () {
    isRuning = false
    console.log('disposing')
    window.removeEventListener('keydown', onKeydown, false)
  }
}
export default function MultipleBouncing() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div>
      <canvas ref={canvasEl} width="900" height="800" style={{ background: '#ccc' }}></canvas>
      <style jsx>{`
        canvas{
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
