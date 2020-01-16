import { useRef, useEffect } from 'react'
function run(eleRoom, eleIn, eleDeviceInfo) {
  console.log('eleDeviceInfo',eleDeviceInfo)
  var intRotateX = 0;
  var intRotateY = 0;
  var intRotateZ = 0;
  var intTranslateZ = -1500;
  var intLeft = 750;
  var intTop = 350;
  function fooBase() {
    var strTransform = 'translate3d(0,0,' + intTranslateZ + 'px) rotateX(' + intRotateX + 'deg) rotateY(' + intRotateY + 'deg) rotateZ(' + intRotateZ + 'deg)';
    eleIn.style.transform = strTransform;
  }
  function fooLeft() {
    intRotateY--;
    if ((intRotateY % 360) == 0) {
      intRotateY = 0;
    }
    fooBase();
  }
  function fooRight() {
    intRotateY++;
    if ((intRotateY % 360) == 0) {
      intRotateY = 0;
    }
    fooBase();
  }
  function fooBack() {
    intRotateX--;
    if ((intRotateX % 360) == 0) {
      intRotateX = 0;
    }
    fooBase();
  }
  function fooFront() {
    intRotateX++;
    if ((intRotateX % 360) == 0) {
      intRotateX = 0;
    }
    fooBase();
  }
  function onKeyDown(ex){
    if (ex.keyCode == 37 || ex.which == 37) {
      fooLeft();
    } else if (ex.keyCode == 39 || ex.which == 39) {
      fooRight();
    } else if (ex.keyCode == 38 || ex.which == 38) {
      if (ex.ctrlKey) {
        intTranslateZ++;
        fooBase();
        return;
      }
      fooFront();
    } else if (ex.keyCode == 40 || ex.which == 40) {
      if (ex.ctrlKey) {
        intTranslateZ--;
        fooBase();
        return;
      }
      fooBack();
    }
  }
  function onMouseWheel(ex){
    if (ex.wheelDelta > 0) {
      if (ex.altKey) {
        intTranslateZ += 500;
      } else {
        intTranslateZ += 10;
      }
    } else {
      if (ex.altKey) {
        intTranslateZ -= 500;
      } else {
        intTranslateZ -= 10;
      }
    }
    fooBase();
  }
  function onMouseDown(ex){
    if (ex.which <= 1) {
      booLeftIsDown = true;
      document.body.style.cursor = 'move';
      booCursor = true;
    } else if (ex.which == 3) {
      booRightIsDown = true;
    }
    intScreenX = ex.screenX;
    intScreenY = ex.screenY;
  }
  function onTouchStart(ex) {
    booLeftIsDown = true;
    document.body.style.cursor = 'move';
    booCursor = true;
    intScreenX = ex.touches[0].screenX;
    intScreenY = ex.touches[0].screenY;
  }
  function onMouseUp(ex) {
    if (ex.which <= 1) {
      booLeftIsDown = false;
      if (booCursor) {
        document.body.style.cursor = 'default';
        booCursor = false;
      }
    } else if (ex.which == 3) {
      booRightIsDown = false;
    }
  }
  function onTouchEnd(ex){
    booLeftIsDown = false;
    if (booCursor) {
      document.body.style.cursor = 'default';
      booCursor = false;
    }
  }
  function onMouseMove(ex){
    if (booLeftIsDown) {
      if (ex.screenX > intScreenX) {
        intRotateY -= 3;
        fooBase();
      } else if (ex.screenX < intScreenX) {
        intRotateY += 3;
        fooBase();
      }
      if (ex.screenY > intScreenY) {
        intRotateX += 3;
        fooBase();
      } else if (ex.screenY < intScreenY) {
        intRotateX -= 3;
        fooBase();
      }
    }
    if (booRightIsDown) {
      if (ex.screenX > intScreenX) {
        intLeft += 5;
      } else if (ex.screenX < intScreenX) {
        intLeft -= 5;
      }
      if (ex.screenY > intScreenY) {
        intTop += 5;
      } else if (ex.screenY < intScreenY) {
        intTop -= 5;
      }
      eleRoom.style.top = intTop;
      eleRoom.style.left = intLeft;
    }
    intScreenX = ex.screenX;
    intScreenY = ex.screenY;
  }
  function onTouchMove(ex){
    if (booLeftIsDown) {
      if (ex.touches[0].screenX > intScreenX) {
        intRotateY -= 2;
        fooBase();
      } else if (ex.touches[0].screenX < intScreenX) {
        intRotateY += 2;
        fooBase();
      }
      if (ex.touches[0].screenY > intScreenY) {
        if (intRotateX < 60) {
          intRotateX += 2;
          fooBase();
        }
      } else if (ex.touches[0].screenY < intScreenY) {
        if (intRotateX > -60) {
          intRotateX -= 2;
          fooBase();
        }
      }
      intScreenX = ex.touches[0].screenX;
      intScreenY = ex.touches[0].screenY;
    }
  }
  function onDeviceorientation(event){
    var rotateDegrees = Math.floor(event.alpha);
    var leftToRight = Math.floor(event.gamma);
    var frontToBack = Math.floor(event.beta);
    var intRotateStep = intLastRotate - rotateDegrees;
    var intFrontToBackStep = frontToBack - intLastFrontToBack;
    if (rotateDegrees > 300 && intLastRotate < 100) {
      intRotateStep = rotateDegrees - 360 - intLastRotate;
    } else if (intLastRotate > 300 && rotateDegrees < 100) {
      intRotateStep = rotateDegrees + 360 - intLastRotate;
    } else if (intLastRotate !== 0 && (rotateDegrees - intLastRotate) > 10) {
      intRotateStep = 1;
    } else if (intLastRotate !== 0 && (rotateDegrees - intLastRotate) < -10) {
      intRotateStep = -1;
    }
    if (intLastFrontToBack != 0) {
      if (frontToBack - intLastFrontToBack > 10) {
        intFrontToBackStep = 1;
      } else if (frontToBack - intLastFrontToBack < -10) {
        intFrontToBackStep = -1;
      }
    }
    if (booFirst) {
      booFirst = false;
      intRotateY = 0;
      intRotateX = 0;
    } else {
      intRotateY += intRotateStep;
      intRotateX += intFrontToBackStep;
    }
    if (intRotateX > 60) {
      intRotateX = 60;
    } else if (intRotateX < -60) {
      intRotateX = -60;
    }
    intLastRotate = rotateDegrees;
    intLastFrontToBack = frontToBack;
    fooBase();
    eleDeviceInfo.innerHTML = 'alpha:' + rotateDegrees + '<br>gamma:' + leftToRight + '<br>beta:' + frontToBack;
  }
  document.oncontextmenu = function () {
    return false;
  }
  var booLeftIsDown = false;
  var booRightIsDown = false;
  var booCursor = false;
  var intScreenX = 0;
  var intScreenY = 0;
  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('mousewheel', onMouseWheel, false)
  document.addEventListener('mousedown', onMouseDown, false)
  document.addEventListener('touchstart', onTouchStart, false)
  document.addEventListener('mouseup', onMouseUp, false)
  document.addEventListener('touchend', onTouchEnd, false)
  document.addEventListener('mousemove', onMouseMove, false)
  document.addEventListener('touchmove', onTouchMove, false)
  // 重力感应
  if (window.DeviceOrientationEvent) {
    var intLastRotate = 0;
    var intLastFrontToBack = 0;
    var booFirst = true;
    window.addEventListener("deviceorientation", onDeviceorientation, true);
  }
  return function(){
    document.removeEventListener('keydown', onKeyDown, false)
    document.removeEventListener('mousewheel', onMouseWheel, false)
    document.removeEventListener('mousedown', onMouseDown, false)
    document.removeEventListener('touchstart', onTouchStart, false)
    document.removeEventListener('mouseup', onMouseUp, false)
    document.removeEventListener('touchend', onTouchEnd, false)
    document.removeEventListener('mousemove', onMouseMove, false)
    document.removeEventListener('touchmove', onTouchMove, false)
    window.removeEventListener('mousewheel', onMouseWheel, false)
  }
}
function About() {
  const pEl = useRef(null)
  const c0El = useRef(null)
  const c2El = useRef(null)
  useEffect(() => {
    run(c0El.current, c2El.current, pEl.current)
  }, [])
  return (
    <div style={{userSelect:'none'}}>
      <div className="b5">
        <div className="c0" ref={c0El}>
          <div className="c1">
            <div className="c2" ref={c2El}>
              <div className="d1">1</div>
              <div className="d2">2</div>
              <div className="d3">3</div>
              <div className="d4">4</div>
              <div className="d5">5</div>
              <div className="d6">6</div>
            </div>
          </div>
        </div>
        <div className="a1">
          <p>左键（方向键）：旋转</p>
          <p>右键：移动</p>
          <p>滚轮键：距离</p>
          <p ref={pEl}></p>
        </div>
      </div>
      <style jsx>{`
        body{
          margin:0;
          padding:0;
          user-select: none;
          overflow:hidden;
        }
        .b5{
          position:absolute;
          top:0;
          left:50%;
          margin-left:-320px;
          width:640px;
          height:972px;
          overflow:hidden;
        }
        .c0{
          position:absolute;
          top:0;
          left:0;
          width:640px;
          height:972px;
          transform-style: preserve-3d;
          transform:translate3d(0,0,0);
          transform-origin:0 0;
          perspective:640px;
          clear: both;
          font-size:50px;
          pointer-events: none;
          background:rgba(0,0,0,.36);
          overflow:hidden;
        }
        .c1{
          position:absolute;
          transform:translate3d(300px,500px,800px);
          transform-style:preserve-3d;
        }
        .c2{
          position:absolute;
          transform:translate3d(0,0,-150px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          transform-style: preserve-3d;
          transition:transform 3s cubic-bezier(0,.93,0,1.04);
        }
        .c2 div{
          position:absolute;
          color:#fff;
          text-align:center;
          width:974px;
          height:973px;
          line-height:973px;
          opacity: .8;
          background-size:cover;
          transition:opacity 2s;
        }
        .d1{
          background-image:radial-gradient(#30c6f3,transparent);
          transform:translate3d(-50%,-50%,0) translateZ(-486px);
        }
        .d2{
          background-image:radial-gradient(#6cfb52,transparent);
          transform:translate3d(-50%,-50%,0) translateX(486px) rotateY(-90deg);
        }
        .d3{
          background-image:radial-gradient(#a767b3,transparent);
          transform:translate3d(-50%,-50%,0) translateX(-486px) rotateY(90deg);
        }
        .d4{
          background-image:radial-gradient(#f15013,transparent);
          transform:translate3d(-50%,-50%,0) translateZ(486px) rotateY(180deg);
        }
        .d5{
          background-image:radial-gradient(#2404a5,transparent);
          transform:translate3d(-50%,-50%,0) translateY(-486px) rotateX(-90deg);
        }
        .d6{
          background-image:radial-gradient(#e7ea15,transparent);
          transform:translate3d(-50%,-50%,0) translateY(486px) rotateX(90deg);
        }
        .a1{
          position: relative;
          margin:0 auto;
          width:100%;
          height:50px;
          line-height:25px;
          font-size:20px;
          z-index: 10;
        }
        .a1 p{
          margin:0;
        }
      `}</style>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About