import { useRef, useEffect } from 'react'
import Head from 'next/head'
function run(canvas) {
  let isRuning = true
  return function () {
    isRuning = false
    console.log('disposing')
  }
}
export default function Collision() {
  const canvasEl = useRef(null)
  useEffect(() => run(canvasEl.current), [])
  return (
    <div id="wrapper">
      <Head>
        <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdn.bootcss.com/three.js/r83/three.min.js"></script>
        <script type="text/javascript" src="/assets/js/three_base.js"></script>
        <script type="text/javascript" src="/assets/js/utils.js"></script>
        <script type="text/javascript" src="/assets/js/gl_core.js"></script>
        <script type="text/javascript" src="/assets/js/gl_core2.js"></script>
        <script type="text/javascript" src="/assets/js/shader_plane.js"></script>
        <script type="text/javascript" src="/assets/js/color-ball.js"></script>
        <script type="text/javascript" src="/assets/js/main.js"></script>
      </Head>
      <div id="top_content">
        <div className="inner">
          <div id="three_area"></div>
          <div id="ball_three_area" style={{display: 'none'}}></div>
        </div>
        <div id="over_lay" className="open"></div>
      </div>
      <style jsx>{`
        #top_content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% + 0px);
          min-height: 400px;
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }
        @media screen and (max-width: 767px) {
          #top_content {
            position: relative;
            min-height: 100vw; 
          } 
        }
        #top_content .inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;
          overflow: hidden;
        }
        #top_content #three_area {
          width: 100%;
          height: 100%;
          position: relative;
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        #top_content #three_area.show {
          opacity: 1; 
        }
        #top_content #three_area canvas {
          position: absolute; 
        }
        #top_content .center_area {
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
          max-width: 1300px;
          width: 100%;
          padding-left: 100px;
          padding-right: 100px;
          box-sizing: border-box;
          transform: translate(-50%, -50%);
          height: auto;
        }
        #top_content .center_area.show .lead,
        #top_content .center_area.show .sub_logo {
          opacity: 1 !important; 
        }
        @media screen and (max-width: 767px) {
          #top_content .center_area {
            padding-left: 0px;
            padding-right: 0px;
            top: calc(50% - 1em); 
          } 
        }
        @media screen and (max-width: 767px) {
          #top_content .center_area {
            width: 84.26vw;
            height: 75.6vw;
            transform: translate(-50%, 0);
          }
        }
        @media screen and (max-width: 320px) {
          #top_content .center_area {
            height: 234px;
          }
        }
        #top_content h1 {
          position: absolute;
          position: relative;
          top: 0;
          width: 100%;
        }
        @media screen and (max-width: 767px) {
          #top_content h1 .main_logo img {
            transform: none;
            -webkit-transform: none;
            width: 59.73vw;
          }
          #top_content h1 .sub_logo {
            opacity: 0;
            transition: opacity 0.6s ease-out;
            -webkit-transition: opacity 0.6s ease-out;
            font-size: 1.1em !important;
          }
        }
        #top_content h1 .lead {
          font-size: 0.85em;
          line-height: 1.5;
          margin-bottom: 2em;
        }
        @media screen and (max-width: 767px) {
          #top_content h1 .lead {
            width: 130%;
            white-space: nowrap;
            font-size: 10px;
            transform: scale(0.8);
            transform-origin: left top;
          }
        }
        @media screen and (max-width: 350px) {
          #top_content h1 .lead {
            width: 150%;
            transform: scale(0.7);
          }
        }
        #top_content h1 .main_logo {
          margin-left: -2px;
          margin-bottom: 2.2em;
          font-size: 80px;
          font-family: 'Montserrat';
          font-weight: bold;
          margin-top: -1em;
          letter-spacing: 0.1em;
          opacity: 0;
          transition: opacity 0.6s ease-in;
          line-height: 1;
          margin-bottom: 0.6em;
          display: block;
        }
        @media screen and (max-width: 767px) {
          #top_content h1 .main_logo {
            font-size: 9.86vw;
          }
        }
        #top_content h1 .main_logo.show {
          opacity: 1;
        }
        #top_content h1 .sub_logo {
          opacity: 0;
          transition: opacity 0.5s ease-in;
          font-size: 24px;
          letter-spacing: 0.1em;
          display: block;
        }
        #top_content h1 .sub_logo img {
          width: 320px;
          transform: translate3d(0, 0, 0);
        }
        @media screen and (max-width: 767px) {
          #top_content h1 .sub_logo img {
            width: 52.8vw;
          }
        }
        #top_content .center_area h1 {
          position: relative;
          letter-spacing: 0.1em;
        }
        #top_content .copyright, #top_content h2 {
          font-size: 10px;
          letter-spacing: 0.05em;
          writing-mode: vertical-rl;
          position: fixed;
          top: 0px;
          z-index: 1;
          height: 95%;
          text-align: center;
        }
        #top_content .copyright .tate_inner, #top_content h2 .tate_inner {
          display: inline-block;
          position: relative;
        }
        #top_content .copyright {
          left: 48px;
          min-height: 500px;
        }
        #top_content .copyright span {
          display: inline-block;
          transform: rotate(90deg);
        }
        @media screen and (max-width: 767px) {
          #top_content .copyright {
            writing-mode: horizontal-tb;
            transform: scale(0.8);
            bottom: 3.85em;
            height: auto;
            left: 50%;
            top: auto;
            width: 91.75vw;
            transform: translate(-50%, 0) scale(0.8);
            text-align: left;
            display: none;
          }
          #top_content .copyright span {
            transform: none;
          }
          #top_content h2 {
            display: none;
          }
        }
        #top_content h2 {
          right: 50px;
          min-height: 500px;
        }
        #top_content .sns {
          position: absolute;
          left: 48px;
          bottom: 2em;
        }
        @media screen and (min-width: 768px) {
          #top_content .sns a {
            transition: opacity 0.6s;
          }
          #top_content .sns a:hover {
            opacity: 0.5;
          }
        }
        @media screen and (max-width: 767px) {
          #top_content .sns {
            left: 50%;
            width: 73.4vw;
            transform: translate(-50%, 0);
            bottom: 7em;
            margin-left: -0.35em;
          }
        }
        @media screen and (max-width: 768px) and (min-aspect-ratio: 550 / 840) {
          #top_content .sns {
            bottom: 7em;
          }
        }
        @media screen and (max-width: 768px) and (min-aspect-ratio: 550 / 760) {
          #top_content .sns {
            bottom: 5em;
          }
        }
        #top_content .sns ul {
          display: flex;
        }
        #top_content .sns li {
          margin-right: 1.56em;
        }
        #top_content .sns li a img {
          width: 22px;
        }
        @media screen and (max-width: 767px) {
          #top_content .sns li a img {
            width: 1.25em;
          }
        }
        @media screen and (max-width: 767px) {
          #top_content .sns li {
            margin-right: 1.25em;
          }
          #top_content .sns li a img {
            width: 1.25em;
          }
        }
        #top_content .sns li:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}
