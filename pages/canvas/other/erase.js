import { useRef, useEffect } from 'react'
function run(canvas) {
  let isRuning = true
  var url = '/welcome.jpg';
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var pixels = null;
  var percent = 70;   //用于判断涂抹区域
  var touch = {
    x: null,
    y: null,
    isPressed: false
  };
  drawLayer(url).then((res) => {
    setCanvas(res)
  })
  // draw layer picture
  function drawLayer(url) {
    return new Promise((reslove, reject) => {
      var img = new Image();
      img.src = url;
      img.onload = function () {
        console.log('img', img)
        var width = Math.min(window.innerWidth, img.width);
        var height = img.height * (width / img.width);
        var obj = {
          w: width,
          h: height,
          img: img
        }
        reslove(obj)
      }
    })
  }
  // set canvas width && height
  function setCanvas(obj) {
    if (obj) {
      canvas.width = obj.w * dpr;
      canvas.height = obj.h * dpr;
      canvas.style.width = obj.w + 'px';
      canvas.style.height = obj.h + 'px';
      ctx.scale(dpr, dpr);
      // 由于getImageData的跨域问题，计算绘制区域效果使用黑色方块代替
      ctx.fillRect(0, 0, obj.w, obj.h);
      // ctx.drawImage(obj.img, 0, 0, obj.w, obj.h)
      pixels = canvas.width * canvas.height;
    }
  }
  function drawEraser(oldV, newV, ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 35;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(oldV.x, oldV.y);
    ctx.lineTo(newV.x, newV.y);
    ctx.stroke();
    ctx.closePath()
    ctx.restore();
  }
  // calculate the area of scratch
  function scratchArea() {
    var points = 0;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (var i = 0, len = imageData.length; i < len; i += 4) {
      if (imageData[i] === 0 && imageData[i + 1] === 0 && imageData[i + 2] === 0 && imageData[i + 3] === 0) {
        points++
      }
    }
    return (points / pixels) * 100;
  }
  canvas.addEventListener('pointerdown', function (e) {
    // var e = e.changedTouches[0] || e.touches[0];
    touch = {
      x: e.pageX,
      y: e.pageY,
      isPressed: true
    }
    // fade()
  });
  canvas.addEventListener('pointermove', function (e) {
    // var e = e.changedTouches[0] || e.touches[0];
    if (touch.isPressed) {
      var newV = {
        x: e.pageX,
        y: e.pageY
      }
      drawEraser(touch, newV, ctx);
      touch.x = newV.x;
      touch.y = newV.y;
    }
  });
  canvas.addEventListener('pointerup', function (e) {
    touch.isPressed = false;
    if (scratchArea() > 70) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  });
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div className="box">
      <canvas ref={canvasEl}></canvas>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        .box {
          font-size: 0;
          display: inline-block;
          background-image:radial-gradient(circle,rgb(255, 255, 255), rgb(0, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(0, 0, 0));
          background-image: url(/welcome.jpg);
          background-size: cover;
        }
        canvas {
          padding: 0;
          margin: 0;
          background: transparent;
        }
      `}</style>
    </div>
  )
}
