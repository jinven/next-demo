import { useRef, useEffect } from 'react'
function Atom(opt) {
  this.x = opt.x || 0;
  this.y = opt.y || 0;
  this.text = opt.text || '测试文本测试文本测试';
  this.textColor = opt.textColor || '#ffffff';
  this.bgColor = opt.bgColor || 'rgba(255,255,255, 0.4)'
  this.speed = opt.speed || 1;
  this.ratio = opt.ratio || 1;
  this.fontSize = opt.fontSize || 35;
  this.scaleX = this.scaleY = this.ratio * 1;
  this.padding = opt.padding || this.fontSize;
  this.isNeedBg = opt.isNeedBg;
  this.width = 0;
}
Atom.prototype.draw = function (ctx) {
  ctx.font = this.fontSize + 'px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  var height = this.fontSize + this.padding;
  var width = ctx.measureText(this.text).width + this.padding;
  var radius = height / 2;
  this.width = width + radius * 2;
  if (this.isNeedBg) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.bgColor;
    ctx.moveTo(this.x, this.y + this.radius);
    ctx.arc(this.x, this.y + radius, radius, 0, Math.PI * 2);
    ctx.moveTo(this.x + width, this.y + this.radius);
    ctx.arc(this.x + width, this.y + radius, radius, 0, Math.PI * 2);
    ctx.moveTo(this.x, this.y);
    ctx.rect(this.x, this.y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.fillStyle = this.textColor;
  ctx.beginPath();
  ctx.fillText(this.text, this.x + this.padding / 2, this.y + this.fontSize + this.padding / 2)
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
function run(canvas) {
  let isRuning = true
  var ctx = canvas.getContext('2d')
  var words = ['测试文本1', '测试文本2', '测试文本3', '测试文本4', '测试文本5', '测试文本6', '测试文本7', '测试文本8', '测试文本9', '测试文本10']
  var CW = canvas.width;
  var CH = canvas.height;
  var centerX = CW / 2;
  var centerY = CH / 2;
  var atoms = createAtom().reverse()
  function createAtom() {
    var atoms = []
    words.forEach(function (word) {
      var atom = new Atom({
        x: rand(600, 1000),
        y: rand(50, 250),
        text: word,
        textColor: '#fff',
        // bgColor: randColor(),
        fontSize: Math.round(Math.random() * 40 + 10),
        speed: rand(1, 3),
        isNeedBg: true
      })
      atoms.push(atom)
    })
    return atoms
  }
  function rand(n, m) {
    return Math.random() * (m - n) + n
  }
  function randColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  function draw(atoms) {
    atoms.forEach(function (atom) {
      atom.x -= atom.speed
      if (atom.x < -atom.width) {
        atom.x = rand(600, 1000)
        atom.y = rand(50, 250)
      }
      atom.draw(ctx)
    })
  }
  (function drawFrames() {
    if (!isRuning) {
      return
    }
    window.requestAnimationFrame(drawFrames)
    ctx.clearRect(0, 0, CW, CH)
    draw(atoms)
  })()
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div className="container">
      <canvas ref={canvasEl} width="1200" height="600" style={{ background: '#000', width: 600, height: 300 }}></canvas>
      <style jsx>{`
        .container {
          width: 600px;
          margin: 20px auto;
        }
      `}</style>
    </div>
  )
}
