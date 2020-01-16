import { useRef, useEffect } from 'react'

const fnFloat = function (value) {
  if ('number' != typeof value) {
    value = parseFloat(value.toString().trim().replace('px', ''));
  }
  if (isNaN(value) || value === Infinity || value === -Infinity) {
    return 0;
  }
  let floMin = Math.floor(value);
  if (floMin == value) {
    return floMin;
  }
  return value;
}

function About() {
  const containerEl = useRef(null)
  const sliderEl = useRef(null)
  let fnMove
  let fnUp
  let foResize
  useEffect(() => {
    console.log('useEffect')
    let elContainer = containerEl.current
    let elSlider = sliderEl.current
    Element.prototype.getStyle = function (name, pseudoElt = false) {
      if (1 == this.nodeType) {
        return window.getComputedStyle(this, pseudoElt).getPropertyValue(name);
      }
      return null;
    };
    Element.prototype.setStyle = function (name, value) {
      if (1 == this.nodeType) {
        return this.style[name] = value;
      }
      return null;
    };
    let arStyle = ['width', 'height', 'left', 'top'];
    arStyle.forEach((value) => {
      let name = value[0].toUpperCase() + value.slice(1);
      Element.prototype['get' + name] = function () {
        return fnFloat(this.getStyle(value));
      };
      Element.prototype['set' + name] = function (d) {
        return this.setStyle(value, fnFloat(d) + 'px');
      };
    });
    const fnBase = function () {
      let _self = this;
      this.down = 0;
      this.el = null;
      this.oo = null;
      this.ev = null;
      this.x = 0;
      this.y = 0;
      this.x2 = 0;
      this.y2 = 0;
      this.x3 = 0;
      this.y3 = 0;
      this.xlen = 0;
      this.ylen = 0;
      this.width = 0;
      this.height = 0;
      this.parent = {
        width: 0,
        height: 0
      }
      this.left = 0;
      this.top = 0;
      this.speed = 0;
      this.fl = 0.95;
      this.draw = function () {
        if (_self.down == 1 || _self.speed != 0) {
          if (_self.xlen < 0) {
            _self.xlen = 0;
          }
          if (_self.xlen > _self.parent.width - _self.width) {
            _self.xlen = _self.parent.width - _self.width;
          }
          _self.oo.setLeft(_self.xlen);
        }
      };
      this.moving = function () {
        if (_self.speed >= 1 || _self.speed <= -1) {
          // console.log(_self.speed);
          _self.xlen += _self.speed;
          _self.speed *= _self.fl;
          if (_self.xlen <= 0) {
            _self.xlen = 0;
          }
        } else {
          _self.speed = 0;
        }
      };
      this.onDown = function () {
        _self.down = 1;
        _self.speed = 0;
        _self.oo = _self.el;
        _self.x = _self.ev.pageX;
        _self.y = _self.ev.pageY;
        _self.x2 = _self.x;
        _self.y2 = _self.y;
        _self.x3 = _self.x;
        _self.y3 = _self.y;
        _self.left = _self.el.getLeft();
        _self.top = _self.el.getTop();
        _self.width = _self.el.getWidth();
        _self.height = _self.el.getHeight();
        _self.parent.width = _self.el.parentElement.getWidth();
        _self.parent.height = _self.el.parentElement.getHeight();
      };
      this.onMove = function (boUp) {
        _self.x3 = _self.x2;
        _self.y3 = _self.y2;
        _self.x2 = _self.ev.pageX;
        _self.y2 = _self.ev.pageY;
        _self.xlen = _self.x2 - _self.x + _self.left;
        _self.ylen = _self.y2 - _self.y;
        if (!boUp) {
          _self.speed = _self.x2 - _self.x3;
        }
      };
      this.onUp = function () {
        _self.onMove(true);
        _self.down = 0;
      };
      this.new = function (newFn) {
        return function (obEv) {
          _self.ev = obEv;
          _self.el = obEv.target;
          newFn.call(_self, obEv);
        };
      };
    };
    var obBase = new fnBase();
    const fnBlur = function () {
      console.log('blur')
      document.removeEventListener('pointermove', fnMove, false);
      document.removeEventListener('pointerup', fnUp, false);
      window.removeEventListener('blur', fnBlur, false);
    };
    const fnDown = obBase.new(function (obEv) {
      let el = obEv.target;
      console.log('down')
      if (el === elSlider) {
        this.onDown();
        document.addEventListener('pointermove', fnMove, false);
        document.addEventListener('pointerup', fnUp, false);
        window.addEventListener('blur', fnBlur, false);
      }
    });
    fnMove = obBase.new(function () {
      this.onMove();
    });
    fnUp = obBase.new(function () {
      console.log('up')
      this.onUp();
      document.removeEventListener('pointermove', fnMove, false);
      document.removeEventListener('pointerup', fnUp, false);
      console.log(obBase);
    });
    foResize = obBase.new(function () {
      console.log('resize')
      let parentWidth = elContainer.getWidth();
      let left = elSlider.getLeft();
      let width = elSlider.getWidth();
      if (left + width > parentWidth) {
        left = parentWidth - width;
      }
      elSlider.setLeft(left);
    });
    document.addEventListener('pointerdown', fnDown, false);
    window.addEventListener('resize', foResize, false);
    let activing = true;
    (function fnFrame() {
      if(!activing){
        return
      }
      window.requestAnimationFrame(fnFrame);
      obBase.moving();
      obBase.draw();
    })();
    return function(){
      console.log('exit')
      activing = false
      document.removeEventListener('pointerdown', fnDown, false)
      window.removeEventListener('resize', foResize, false)
    }
  }, [])
  return (
    <div>
      <h3>滑动小球</h3>
      <div ref={containerEl}>
        <p ref={sliderEl}></p>
        <style jsx>{`
          div{
            position: relative;
            height: 50px;
            background: #789da2;
            border: 5px solid #492d9e;
            border-radius: 5px;
            user-select:none;
          }
          div p{
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            width: 50px;
            height: 50px;
            background: yellow;
            cursor: move;
            border-radius: 50%;
            background-image: radial-gradient(circle at 65% 65%,#ff2ff9a1 0, #1c271f 100%);
            box-shadow: rgba(0,0,0,.7) 0 0 3px 0;
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