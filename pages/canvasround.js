import { useRef, useEffect } from 'react'

const arrSrcs = ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBGRXhpZgAATU0AKgAAAAgABAESAAMAAAABAAEAAFEQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHooor++D/ACjP/9k=']
let intLoadedCount = 0
let arrImages = []
let intImageCount = arrSrcs.length

function coverImage(context, img, x, y, width, height, radius) {
  if (radius == null) {
    radius = 0;
  }
  var strGco = context.globalCompositeOperation;
  context.save();
  context.roundRect(0, 0, width, height, radius);
  context.globalCompositeOperation = 'source-in';
  var realWidth = img.width;
  var realHeight = img.height;
  var floCutTop = 0;
  var floCutLeft = 0;
  if (realWidth > 0 && realHeight > 0 && width > 0 && height > 0) {
    var floCalcHeight = realHeight;
    var floCalcWidth = realWidth;
    if (width / height > realWidth / realHeight) {
      // 宽
      floCalcHeight = realWidth * height / width;
      floCutTop = (realHeight - floCalcHeight) / 2;
    } else {
      // 高
      floCalcWidth = realHeight * width / height;
      floCutLeft = (realWidth - floCalcWidth) / 2;
    }
    context.drawImage(img, floCutLeft, floCutTop, floCalcWidth, floCalcHeight, x, y, width, height);
  } else {
    context.drawImage(img, x, y, width, height);
  }
  context.globalCompositeOperation = strGco;
  context.restore();
}
function fooLoadImage(strImage, context) {
  let objImage = new Image()
  objImage.onload = function () {
    intLoadedCount += 1
    arrImages.push({
      src: strImage,
      img: objImage
    });
    if (intLoadedCount >= intImageCount) {
      coverImage(context, arrImages[0].img, 0, 0, 200, 450, 50)
    }
  };
  objImage.onerror = function () {
    alert('图片加载失败！')
  };
  objImage.src = strImage
}

function initCanvasRoundRect() {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    var booIsWidthArc = false;
    var booIsHeightArc = false;
    if (radius >= width / 2 && width <= height) {
      booIsWidthArc = true;
      radius = width / 2;
    }
    if (radius >= height / 2 && height <= width) {
      booIsHeightArc = true;
      radius = height / 2;
    }
    if (radius == null) {
      radius = 0;
    }
    this.beginPath();
    this.moveTo(x + radius, y);
    if (!booIsWidthArc) {
      this.lineTo(x + width - radius, y);
    }
    if (radius > 0) {
      this.arcTo(x + width, y, x + width, y + radius, radius);
    }
    if (!booIsHeightArc) {
      this.lineTo(x + width, y + height - radius);
    }
    if (radius > 0) {
      this.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    }
    if (!booIsWidthArc) {
      this.lineTo(x + radius, y + height);
    }
    if (radius > 0) {
      this.arcTo(x, y + height, x, y + height - radius, radius);
    }
    if (!booIsHeightArc) {
      this.lineTo(x, y + radius);
    }
    if (radius > 0) {
      this.arcTo(x, y, x + radius, y, radius);
    }
    this.closePath();
    this.fill();
  }
}
function About() {
  const canvasEl = useRef(null)
  const pEl = useRef(null)
  useEffect(() => {
    let context = canvasEl.current.getContext('2d')
    initCanvasRoundRect()
    pEl.current.style.backgroundImage = 'url("' + arrSrcs[0] + '")'
    for (var i = 0; i < arrSrcs.length; i++) {
      fooLoadImage(arrSrcs[i], context)
    }
  }, [])
  return (
    <div>
      <h2>Canvas 圆角实现</h2>
      <div style={{margin: 10, position: 'relative'}}>
        <canvas ref={canvasEl} width="200" height="450"></canvas>
        <p ref={pEl}></p>
        <style jsx>{`
          canvas {
            outline: 1px dashed #fdd;
          }
          p {
            position: absolute;
            top: 0;
            left: 220px;
            width: 200px;
            height: 450px;
            margin: 0;
            border-radius: 50px;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
        `}</style>
      </div>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About
