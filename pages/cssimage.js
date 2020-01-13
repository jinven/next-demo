function About(){
  return (
    <div>
      <h1>css 图形</h1>
      <div>
        <hr />
        <h2>气泡三角形</h2>
        <div className="css-live-wrap">
          <summary>利用 border 的 transparent 特性实现</summary>
          <hgroup className="bubbly">
            <h1>.bubbly</h1>
          </hgroup>
        </div>
        <style jsx>{
          `.bubbly {
            position: relative;
            top: 80%;
            left: 50%;
            transform:translate(-50%,-20%);
            background: #00aabb;
            border-radius: .4em;
            width: 260px;
            padding: 60px 20px;
            text-align: center;
            color: white;
            font-size: 12px;
          }
          .bubbly:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            border: 34px solid transparent;
            border-top-color: #00aabb;
            border-bottom: 0;
            border-left: 0;
            margin: 0 0 -34px -17px;
          }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>梯形</h2>
        <div className="css-live-wrap">
          <summary>利用伪类加旋转透视实现</summary>
          <hgroup className="trapezoid">
            <h1>.trapezoid</h1>
          </hgroup>
        </div>
        <style>{
        `.trapezoid{
            position: relative;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-20%);
            width: 160px;
            padding: 60px;
            text-align: center;
            color: white;
            font-size: 12px;
          }
          .trapezoid:before{
            content:"";
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            transform:perspective(40px) scaleY(1.3) rotateX(5deg);
            transform-origin: bottom;
            background:deeppink;
            z-index:-1;
          }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>爱心</h2>
        <div className="heart"></div>
        <style>{
        `.heart {
            position: relative;
            width: 100px;
            height: 90px;
          }
          .heart:before,
          .heart:after {
            position: absolute;
            content: "";
            left: 50px;
            top: 0;
            width: 50px;
            height: 80px;
            background: red;
            -moz-border-radius: 50px 50px 0 0;
            border-radius: 50px 50px 0 0;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transform-origin: 0 100%;
            -moz-transform-origin: 0 100%;
            -ms-transform-origin: 0 100%;
            -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
          }
          .heart:after {
            left: 0;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
            -webkit-transform-origin: 100% 100%;
            -moz-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
            -o-transform-origin: 100% 100%;
            transform-origin :100% 100%;
          }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>太极图</h2>
        <div className="yin-yang"></div>
        <style>{
        `.yin-yang {
            width: 96px;
            height: 48px;
            background: #eee;
            border-color: red;
            border-style: solid;
            border-width: 2px 2px 50px 2px;
            border-radius: 100%;
            position: relative;
          }
          .yin-yang:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            background: #eee;
            border: 18px solid red;
            border-radius: 100%;
            width: 12px;
            height: 12px;
          }
          .yin-yang:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            background: red;
            border: 18px solid #eee;
            border-radius:100%;
            width: 12px;
            height: 12px;
          }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>折角</h2>
        <div className="corner">
          <h1>.corner</h1>
        </div>
        <style>{
        `.corner{
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-20%);
          width: 200px;
          line-height: 120px;
          padding: 40px;
          text-align: center;
          color: white;
          font-size: 24px;
          background: linear-gradient(-150deg,transparent 1.5em, yellowgreen  0);
          border-radius: .5em;
        }
        .corner:before{
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          background:
          linear-gradient(to left bottom,transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat;
          width: 1.73em;
          height: 3em;
          transform: translateY(-1.3em) rotate(-30deg);
          transform-origin: bottom right;
          border-bottom-left-radius: inherit;
          box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15);
        }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>混合模式背景图</h2>
        <div className="colorful-stripe">
          <h1>.colorful-stripe</h1>
        </div>
        <style>{
        `.colorful-stripe {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -20%);
          width: 300px;
          line-height: 200px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          border-radius: 1em;
          background:
          linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent);
          background-blend-mode: screen;
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>多云</h2>
        <div className="cloudy">
          <h1>.cloudy</h1>
        </div>
        <style>{
        `.cloudy{
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 260px;
          transform: translate(-50%, -20%);
          text-align: center;
          font-size: 15px;
          color: #fff;
          background: #2EB5E5;
          border-radius: 5px;
        }
        .cloudy:before {
          content: "";
          text-indent: 23px;
          font-size: 22px;
          line-height: 40px;
          color: #333;
          position: absolute;
          height: 50px;
          width: 50px;
          background: #FFFFFF;
          left: 30%;
          top: 45%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow:
            #FFFFFF 65px -15px 0 -5px,
            #FFFFFF 25px -25px,
            #FFFFFF 30px 10px,
            #FFFFFF 60px 15px 0 -10px,
            #FFFFFF 85px 5px 0 -5px,
            #C8C8C8 35px -35px,
            #C8C8C8 66px -27px 0 -5px,
            #C8C8C8 91px -10px 0 -8px;
          animation: cloudy 5s ease-in-out infinite;
        }
        .cloudy:after{
          content: "";
          position: absolute;
          top: 80%;
          left: 50%;
          height: 15px;
          width: 120px;
          background: rgba(0,0,0,.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: cloudy_shadow 5s ease-in-out infinite;
        }
        @keyframes cloudy {
          50%{
            transform: translate(-50%, -70%);
          }
          100%{
            transform: translate(-50%, -50%);
          }
        }
        @keyframes cloudy_shadow {
          50%{
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0,0,0,.2);
          }
          100%{
            transform: translate(-50%, -50%) scale(1);
            background: rgba(0,0,0,.5);
          }
        }`
        }</style>
      </div>
      <div>
        <hr />
        <h2>阴影多云</h2>
        <div className="cloudy2">
          <h1>.cloudy2</h1>
        </div>
        <style>{
        `.cloudy2{
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 260px;
          transform: translate(-50%, -20%);
          text-align: center;
          font-size: 15px;
          color: #fff;
          background: #2EB5E5;
          border-radius: 5px;
        }
        .cloudy2:before {
          content: "";
          text-indent: 23px;
          font-size: 22px;
          line-height: 40px;
          color: #333;
          position: absolute;
          height: 50px;
          width: 50px;
          background: #FFFFFF;
          left: 30%;
          top: 55%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index:100;
          box-shadow:
            #FFFFFF 65px -15px 0 -5px,
            #FFFFFF 25px -25px,
            #FFFFFF 30px 10px,
            #FFFFFF 60px 15px 0 -10px,
            #FFFFFF 85px 5px 0 -5px;
          animation: cloudy2 5s ease-in-out infinite;
        }
        .cloudy2:after{
          content: "";
          position: absolute;
          top: 45%;
          left: 63%;
          height: 60px;
          width: 60px;
          z-index: 10;
          background: linear-gradient(180deg,#FE9F38 0%, #F46635 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px 4px #FFA563;
          animation: cloudy2 10s ease-in-out infinite;
        }
        @keyframes cloudy2 {
          50%{
            transform: translate(-50%, -70%);
          }
          100%{
            transform: translate(-50%, -50%);
          }
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>阴影雨天</h2>
        <div className="rainy-container">
          <h1>.rainy</h1>
          <div className="rainy"></div>
        </div>
        <style>{
        `.rainy-container {
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 260px;
          transform: translate(-50%, -20%);
          text-align: center;
          font-size: 15px;
          color: #fff;
          background: #E6E6E6;
          border-radius: 5px;
        }
        .rainy {
          position: absolute;
          width: 3px;
          height: 6px;
          top: 30%;
          left: 50%;
          background: #CCCCCC;
          border-radius: 50%;
          animation: rainy_rain .7s infinite linear;
        }
        .rainy:before {
          content: "";
          color: #333;
          position: absolute;
          height: 50px;
          width: 50px;
          top: 30px;
          left: -40px;
          background: #CCC;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow: #CCC 65px -15px 0 -5px, #CCC 25px -25px, #CCC 30px 10px, #CCC 60px 15px 0 -10px, #CCC 85px 5px 0 -5px;
          animation: cloudy 5s ease-in-out infinite;
        }
        .rainy:after {
          content: "";
          position: absolute;
          top: 120px;
          left: 50%;
          height: 15px;
          width: 120px;
          background: rgba(0, 0, 0, .5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: cloudy_shadow 5s ease-in-out infinite;
        }
        @keyframes cloudy {
          50% {
            transform: translate(-50%, -70%);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }
        @keyframes cloudy_shadow {
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0, 0, 0, .2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            background: rgba(0, 0, 0, .5);
          }
        }
        @keyframes rainy_rain {
          0% {
            box-shadow: rgba(0, 0, 0, 0) -10px 30px, rgba(0, 0, 0, 0) 40px 40px, rgba(0, 0, 0, .3) -50px 75px, rgba(0, 0, 0, .3) 55px 50px, rgba(0, 0, 0, .3) -18px 100px, rgba(0, 0, 0, .3) 12px 95px, rgba(0, 0, 0, .3) -31px 45px, rgba(0, 0, 0, .3) 30px 35px;
          }
          25% {
            box-shadow: rgba(0, 0, 0, .3) -10px 45px, rgba(0, 0, 0, .3) 40px 60px, rgba(0, 0, 0, .3) -50px 90px, rgba(0, 0, 0, .3) 55px 65px, rgba(0, 0, 0, 0) -18px 120px, rgba(0, 0, 0, 0) 12px 120px, rgba(0, 0, 0, .3) -31px 70px, rgba(0, 0, 0, .3) 30px 60px;
          }
          26% {
            box-shadow: rgba(0, 0, 0, .3) -10px 45px, rgba(0, 0, 0, .3) 40px 60px, rgba(0, 0, 0, .3) -50px 90px, rgba(0, 0, 0, .3) 55px 65px, rgba(0, 0, 0, 0) -18px 40px, rgba(0, 0, 0, 0) 12px 20px, rgba(0, 0, 0, .3) -31px 70px, rgba(0, 0, 0, .3) 30px 60px;
          }
          50% {
            box-shadow: rgba(0, 0, 0, .3) -10px 70px, rgba(0, 0, 0, .3) 40px 80px, rgba(0, 0, 0, 0) -50px 100px, rgba(0, 0, 0, .3) 55px 80px, rgba(0, 0, 0, .3) -18px 60px, rgba(0, 0, 0, .3) 12px 45px, rgba(0, 0, 0, .3) -31px 95px, rgba(0, 0, 0, .3) 30px 85px;
          }
          51% {
            box-shadow: rgba(0, 0, 0, .3) -10px 70px, rgba(0, 0, 0, .3) 40px 80px, rgba(0, 0, 0, 0) -50px 45px, rgba(0, 0, 0, .3) 55px 80px, rgba(0, 0, 0, .3) -18px 60px, rgba(0, 0, 0, .3) 12px 45px, rgba(0, 0, 0, .3) -31px 95px, rgba(0, 0, 0, .3) 30px 85px;
          }
          75% {
            box-shadow: rgba(0, 0, 0, .3) -10px 95px, rgba(0, 0, 0, .3) 40px 100px, rgba(0, 0, 0, .3) -50px 60px, rgba(0, 0, 0, 0) 55px 95px, rgba(0, 0, 0, .3) -18px 80px, rgba(0, 0, 0, .3) 12px 70px, rgba(0, 0, 0, 0) -31px 120px, rgba(0, 0, 0, 0) 30px 110px;
          }
          76% {
            box-shadow: rgba(0, 0, 0, .3) -10px 95px, rgba(0, 0, 0, .3) 40px 100px, rgba(0, 0, 0, .3) -50px 60px, rgba(0, 0, 0, 0) 55px 35px, rgba(0, 0, 0, .3) -18px 80px, rgba(0, 0, 0, .3) 12px 70px, rgba(0, 0, 0, 0) -31px 25px, rgba(0, 0, 0, 0) 30px 15px;
          }
          100% {
            box-shadow: rgba(0, 0, 0, 0) -10px 120px, rgba(0, 0, 0, 0) 40px 120px, rgba(0, 0, 0, .3) -50px 75px, rgba(0, 0, 0, .3) 55px 50px, rgba(0, 0, 0, .3) -18px 100px, rgba(0, 0, 0, .3) 12px 95px, rgba(0, 0, 0, .3) -31px 45px, rgba(0, 0, 0, .3) 30px 35px;
          }
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>彩虹</h2>
        <div className="rainbow-container">
          <h1>.rainbow</h1>
          <div className="rainbow"></div>
        </div>
        <style jsx>{
        `.rainbow-container{
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 260px;
          transform: translate(-50%, -20%);
          text-align: center;
          font-size: 15px;
          color: #fff;
          background: #F3D166;
          border-radius: 5px;
        }
        .rainbow{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 1px;
          width: 1px;
        }
        .rainbow:before{
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          height: 70px;
          width: 70px;
          border-radius: 100px 0 0 0;
          box-shadow:
            #F44336 -2px -2px 0 1px,
            #FF9800 -4px -4px 0 3px,
            #FFEB3B -6px -6px 0 5px,
            #8BC34A -8px -8px 0 7px,
            #00BCD4 -10px -10px 0 9px,
            #2196F3 -12px -12px 0 11px,
            #9C27B0 -14px -14px 0 13px;
          animation: rainbow 5s ease-in-out infinite;
        }
        .rainbow:after{
          content: "";
          position: absolute;
          top: 70px;
          left: 50%;
          height: 15px;
          width: 120px;
          background: rgba(0, 0, 0, .5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: cloudy_shadow 5s ease-in-out infinite;
        }
        @keyframes rainbow {
          50% {
            transform: translate(-50%, -55%) rotate(30deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(45deg);
          }
        }
        @keyframes cloudy_shadow {
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0, 0, 0, .2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            background: rgba(0, 0, 0, .5);
          }
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>雪天</h2>
        <div className="snowy-container">
          <h1>.snowy</h1>
          <div className="snowy"></div>
        </div>
        <style>{
        `.snowy-container {
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 260px;
          transform: translate(-50%, -20%);
          text-align: center;
          font-size: 15px;
          color: #fff;
          background: #607D8B;
          border-radius: 5px;
        }
        .snowy {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius:50%;
          top: 30%;
          left: 50%;
          background: #fff;
          border-radius: 50%;
          animation: snowy_rain 2s infinite linear;
        }
        .snowy:before {
          content: "";
          color: #333;
          position: absolute;
          height: 50px;
          width: 50px;
          top: 30px;
          left: -40px;
          background: #eee;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow:
            #eee 65px -15px 0 -5px,
            #eee 25px -25px,
            #eee 30px 10px,
            #eee 60px 15px 0 -10px,
            #eee 85px 5px 0 -5px;
          animation: cloudy 5s ease-in-out infinite;
        }
        .snowy:after {
          content: "";
          position: absolute;
          top: 120px;
          left: 50%;
          height: 15px;
          width: 120px;
          background: rgba(0, 0, 0, .5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: cloudy_shadow 5s ease-in-out infinite;
        }
        @keyframes cloudy {
          50% {
            transform: translate(-50%, -70%);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }
        @keyframes cloudy_shadow {
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0, 0, 0, .2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            background: rgba(0, 0, 0, .5);
          }
        }
        @keyframes snowy_rain {
          0% {
            box-shadow:
              rgba(255, 255, 255, 0) -10px 30px,
              rgba(255, 255, 255, 0) 40px 40px,
              rgba(255, 255, 255, .6) -50px 75px,
              rgba(255, 255, 255, .6) 55px 50px,
              rgba(255, 255, 255, .6) -18px 100px,
              rgba(255, 255, 255, .6) 12px 95px,
              rgba(255, 255, 255, .6) -31px 45px,
              rgba(255, 255, 255, .6) 30px 35px;
          }
          25% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 45px,
              rgba(255, 255, 255, .6) 40px 60px,
              rgba(255, 255, 255, .6) -50px 90px,
              rgba(255, 255, 255, .6) 55px 65px,
              rgba(255, 255, 255, 0) -18px 120px,
              rgba(255, 255, 255, 0) 12px 120px,
              rgba(255, 255, 255, .6) -31px 70px,
              rgba(255, 255, 255, .6) 30px 60px;
          }
          26% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 45px,
              rgba(255, 255, 255, .6) 40px 60px,
              rgba(255, 255, 255, .6) -50px 90px,
              rgba(255, 255, 255, .6) 55px 65px,
              rgba(255, 255, 255, 0) -18px 40px,
              rgba(255, 255, 255, 0) 12px 20px,
              rgba(255, 255, 255, .6) -31px 70px,
              rgba(255, 255, 255, .6) 30px 60px;
          }
          50% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 70px,
              rgba(255, 255, 255, .6) 40px 80px,
              rgba(255, 255, 255, 0) -50px 100px,
              rgba(255, 255, 255, .6) 55px 80px,
              rgba(255, 255, 255, .6) -18px 60px,
              rgba(255, 255, 255, .6) 12px 45px,
              rgba(255, 255, 255, .6) -31px 95px,
              rgba(255, 255, 255, .6) 30px 85px;
          }
          51% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 70px,
              rgba(255, 255, 255, .6) 40px 80px,
              rgba(255, 255, 255, 0) -50px 45px,
              rgba(255, 255, 255, .6) 55px 80px,
              rgba(255, 255, 255, .6) -18px 60px,
              rgba(255, 255, 255, .6) 12px 45px,
              rgba(255, 255, 255, .6) -31px 95px,
              rgba(255, 255, 255, .6) 30px 85px;
          }
          75% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 95px,
              rgba(255, 255, 255, .6) 40px 100px,
              rgba(255, 255, 255, .6) -50px 60px,
              rgba(255, 255, 255, 0) 55px 95px,
              rgba(255, 255, 255, .6) -18px 80px,
              rgba(255, 255, 255, .6) 12px 70px,
              rgba(255, 255, 255, 0) -31px 120px,
              rgba(255, 255, 255, 0) 30px 110px;
          }
          76% {
            box-shadow:
              rgba(255, 255, 255, .6) -10px 95px,
              rgba(255, 255, 255, .6) 40px 100px,
              rgba(255, 255, 255, .6) -50px 60px,
              rgba(255, 255, 255, 0) 55px 35px,
              rgba(255, 255, 255, .6) -18px 80px,
              rgba(255, 255, 255, .6) 12px 70px,
              rgba(255, 255, 255, 0) -31px 25px,
              rgba(255, 255, 255, 0) 30px 15px;
          }
          100% {
            box-shadow:
              rgba(255, 255, 255, 0) -10px 120px,
              rgba(255, 255, 255, 0) 40px 120px,
              rgba(255, 255, 255, .6) -50px 75px,
              rgba(255, 255, 255, .6) 55px 50px,
              rgba(255, 255, 255, .6) -18px 100px,
              rgba(255, 255, 255, .6) 12px 95px,
              rgba(255, 255, 255, .6) -31px 45px,
              rgba(255, 255, 255, .6) 30px 35px;
          }
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>chrome浏览器</h2>
        <div className="Chrome"></div>
        <style jsx>{
        `.Chrome{
          position: relative;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          transform: translate(-50%, -20%);
          box-shadow: 0 0px 4px #999,0 0 2px #ddd inset;
          border-radius: 50%;
          background-image:
            radial-gradient(#4FACF5 0%,#2196F3 28%, transparent 28%),
            radial-gradient(#fff 33%, transparent 33%),
            linear-gradient(-50deg,#FFEB3B 34%, transparent 34%),
            linear-gradient(60deg,#4CAF50 33%, transparent 33%),
            linear-gradient(180deg,#FF756B 0%, #F44336 30%, transparent 30%),
            linear-gradient(-120deg,#FFEB3B 40%, transparent 40%),
            linear-gradient(-60deg,#FFEB3B 30%, transparent 30%),
            linear-gradient(0deg,#4CAF50 45%, transparent 45%),
            linear-gradient(60deg,#4CAF50 30%, transparent 30%),
            linear-gradient(120deg,#F44336 50%, transparent 50%),
            linear-gradient(180deg,#F44336 30%, transparent 30%);
          background-position: 0 0;
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>IE浏览器</h2>
        <div className="IE"></div>
        <style jsx>{
        `.IE{
          position: relative;
          top: 50%;
          left: 50%;
          width:200px;
          height:200px;
          transform: translate(-50%, -20%);
          border-radius: 50%;
          background-image: radial-gradient(#fff 38%, transparent 38%), radial-gradient(#09C 0%, #09C 100%);
        }
        .IE:before{
          content: "";
          width: 285px;
          height: 122px;
          background: none;
          border-radius: 100%;
          position: absolute;
          top: 33px;
          left: -45px;
          margin: auto;
          box-shadow:inset 0 12px 0 13px  #09c, -35px -8px 0 -5px #fff;
          transform: rotate(-35deg);
        }
        .IE:after {
          content: "";
          width: 120px;
          height: 25px;
          background: #09c;
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          margin: auto;
          box-shadow: 50px 23px 0 -2px #fff
        }
        `
        }</style>
      </div>
      <div>
        <hr />
        <h2>safari浏览器</h2>
        <div className="safari"></div>
        <style>{
        `.safari{
          position: relative;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translate(-50%, -20%);
          border-radius: 50%;
          border: 5px solid #E8E8E8;
          box-shadow:
            -1px 3px 1px 2px #999,
            -1px 3px 1px 2px #999 inset;
          background-image:
            radial-gradient(transparent 30%,#fff 30%,#fff 34%, transparent 34%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(rgba(255,255,255,.8) 100%, transparent 100%),
            linear-gradient(#1DE3FF 0%, #1F52EF 100%);
          background-size: 50% 50%,20px 2px,20px 2px,2px 20px,2px 20px,100%,100%;
          background-repeat:no-repeat;
          background-position:center center, 175px center,5px center,center 175px,center 5px,0 0;
        }
        .safari::before{
          content:"";
          position: absolute;
          top: 10px;
          left: 50%;
          border-radius: 10px;
          border-bottom: 100px solid rgba(255,255,255,.9);
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          transform-origin: center 90px;
          z-index: -1;
          transform: translate(-50%, 0%) rotate(40deg);
          transition: transform 1s;
        }
        .safari::after{
          content: "";
          position: absolute;
          top: 10px;
          left: 50%;
          border-radius: 10px;
          border-bottom: 100px solid rgba(255,0,0,.9);
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          transform-origin: center 90px;
          transform: translate(-50%, 0%) rotate(220deg);
          transition: transform 1s;
        }
        .safari:hover::before{
            transform: translate(-50%, 0%) rotate(70deg);
        }
        .safari:hover::after{
            transform: translate(-50%, 0%) rotate(250deg);
        }
        `
        }</style>
      </div>
    </div>
  )
}
About.getInitialProps = async () => {
    return {}
  }
export default About