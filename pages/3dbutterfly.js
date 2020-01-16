const svgHtml = `
<svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:xml="http://www.w3.org/XML/1998/namespace" version="1.1" className="svg-defs">
  <defs>
    <pattern id="image" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
      <image width="100" height="100" preserveAspectRatio="none" fill="red"></image>
    </pattern>
    <g id="shape-butterfly-1">
      <path class="path" fill="" clip-rule="evenodd" d="M8.65,2.85c0.934-0.2,2.15-0.333,3.65-0.4c1.534-0.1,2.667-0.083,3.4,0.05
        c1.533,0.267,3.45,0.767,5.75,1.5c2.466,0.8,4.35,1.617,5.65,2.45c2.066,1.2,3.883,2.383,5.45,3.55c2.567,2.1,4.35,3.8,5.35,5.1
        l2.1,2.5c0.933,1.167,1.517,1.983,1.75,2.45c0.333,0.767,1.083,2.117,2.25,4.05c0.233,0.467,0.717,1.683,1.45,3.65
        c0.733,2.067,1.2,3.45,1.4,4.15c0.467,1.733,0.917,3.767,1.35,6.1l0.4,3.85l-0.25-3.4c-0.6-5.967-1.267-10.25-2-12.85
        c-0.733-2.434-2.167-5.467-4.3-9.1c-0.966-1.667-1.566-3-1.8-4c-0.233-0.933-0.1-1.267,0.4-1c1.3,0.733,2.917,3.867,4.85,9.4
        c1.667,4.7,2.85,11.2,3.55,19.5c0.567,6.934,0.667,11.917,0.3,14.95l0.2,0.05c0.231,0,0.348-0.05,0.35-0.15v0.05l0.1,0.05v27.4
        c-0.032-0.018-0.065-0.035-0.1-0.05v-0.05c-0.7,0.267-0.983,0.117-0.85-0.45c0.067-0.333,0.017-0.817-0.15-1.45
        c-0.2-0.6-0.316-0.983-0.35-1.15l-0.5-1.65c-0.533-2.967-0.833-5.034-0.9-6.2c-0.1-1.533-0.133-2.4-0.1-2.6
        c0-0.933,0.167-1.667,0.5-2.2c0.567-0.9,0.684-1.75,0.35-2.55c-0.167-0.367-0.367-0.6-0.6-0.7c-0.333-0.133-0.517,0.283-0.55,1.25
        c-0.033,1.533-0.167,2.9-0.4,4.1c-0.1,2.3-0.267,3.684-0.5,4.15c-0.333,0.667-1.25,2.95-2.75,6.85c-1.167,2.8-2.233,4.817-3.2,6.05
        c-0.9,1.2-1.583,2.1-2.05,2.7c-0.8,1-1.434,1.667-1.9,2c-2.067,1.333-3.633,2.067-4.7,2.2c-3.033,0.267-4.95,0.317-5.75,0.15
        c-0.8-0.167-1.383-0.217-1.75-0.15c-0.533,0.1-1.033,0.45-1.5,1.05c-0.5,0.667-1.217,1.284-2.15,1.85
        c-0.934,0.567-1.85,0.934-2.75,1.1c-2.467,0.433-4.45,0.25-5.95-0.55c-0.7-0.4-1.467-1.15-2.3-2.25c-0.6-0.867-1.033-1.567-1.3-2.1
        c-0.267-0.667-0.483-1.483-0.65-2.45c-0.3-1.467-0.383-2.717-0.25-3.75c0.267-1.9,0.45-3.05,0.55-3.45
        c0.233-1.233,0.566-2.333,1-3.3C9.25,77.45,9.767,76.4,10,76c0.667-1.233,1.55-2.583,2.65-4.05c1.1-1.434,2.184-2.583,3.25-3.45
        c0.367-0.3,1.15-0.867,2.35-1.7c0.767-0.566,1.917-1.25,3.45-2.05c1.733-0.933,3.267-1.633,4.6-2.1
        c2.133-0.733,4.534-1.467,7.2-2.2c0.467-0.1,1.517-0.3,3.15-0.6c0.967-0.233,0.4-0.4-1.7-0.5c-2.434-0.1-4.534-0.3-6.3-0.6
        c-1.566-0.267-3.383-0.7-5.45-1.3c-2.8-0.8-4.467-1.317-5-1.55c-1.567-0.667-3.2-1.75-4.9-3.25c-1.733-1.533-3-3.1-3.8-4.7
        c-0.533-1.067-0.967-2.434-1.3-4.1c-0.233-1.067-0.3-2.133-0.2-3.2c0.133-0.833,0.183-1.3,0.15-1.4v-0.6
        c-2.467-3.233-3.983-5.433-4.55-6.6c-0.533-1.033-0.883-1.833-1.05-2.4c-0.3-0.867-0.466-1.85-0.5-2.95
        c-0.033-2.367,0.034-4.117,0.2-5.25c0.3-1.034,0.483-1.8,0.55-2.3c0.167-0.867,0.034-1.533-0.4-2c-0.6-0.7-1.133-1.517-1.6-2.45
        c-0.566-1.133-0.833-2.117-0.8-2.95c0.033-1.333,0.167-2.367,0.4-3.1c0.367-1.267,1.05-2.267,2.05-3
        C4.417,4.25,6.483,3.317,8.65,2.85z"></path>
      <g></g>
    </g>
  </defs>
</svg>
`
const useHtml = `<use class="left" xlink:href="#shape-butterfly-1"></use>`

function About() {
  return (
    <div>
      <h2>3D 蝴蝶</h2>
      <div dangerouslySetInnerHTML={{__html: svgHtml}}></div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" {...attrXml} version="1.1" className="svg-defs">
        <defs>
          <pattern id="image" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="none">
            <image width="100" height="100" preserveAspectRatio="none" fill="red"></image>
          </pattern>
          <g id="shape-butterfly-1">
            <path className="path" fill="" {...attrClipRule} d="M8.65,2.85c0.934-0.2,2.15-0.333,3.65-0.4c1.534-0.1,2.667-0.083,3.4,0.05
              c1.533,0.267,3.45,0.767,5.75,1.5c2.466,0.8,4.35,1.617,5.65,2.45c2.066,1.2,3.883,2.383,5.45,3.55c2.567,2.1,4.35,3.8,5.35,5.1
              l2.1,2.5c0.933,1.167,1.517,1.983,1.75,2.45c0.333,0.767,1.083,2.117,2.25,4.05c0.233,0.467,0.717,1.683,1.45,3.65
              c0.733,2.067,1.2,3.45,1.4,4.15c0.467,1.733,0.917,3.767,1.35,6.1l0.4,3.85l-0.25-3.4c-0.6-5.967-1.267-10.25-2-12.85
              c-0.733-2.434-2.167-5.467-4.3-9.1c-0.966-1.667-1.566-3-1.8-4c-0.233-0.933-0.1-1.267,0.4-1c1.3,0.733,2.917,3.867,4.85,9.4
              c1.667,4.7,2.85,11.2,3.55,19.5c0.567,6.934,0.667,11.917,0.3,14.95l0.2,0.05c0.231,0,0.348-0.05,0.35-0.15v0.05l0.1,0.05v27.4
              c-0.032-0.018-0.065-0.035-0.1-0.05v-0.05c-0.7,0.267-0.983,0.117-0.85-0.45c0.067-0.333,0.017-0.817-0.15-1.45
              c-0.2-0.6-0.316-0.983-0.35-1.15l-0.5-1.65c-0.533-2.967-0.833-5.034-0.9-6.2c-0.1-1.533-0.133-2.4-0.1-2.6
              c0-0.933,0.167-1.667,0.5-2.2c0.567-0.9,0.684-1.75,0.35-2.55c-0.167-0.367-0.367-0.6-0.6-0.7c-0.333-0.133-0.517,0.283-0.55,1.25
              c-0.033,1.533-0.167,2.9-0.4,4.1c-0.1,2.3-0.267,3.684-0.5,4.15c-0.333,0.667-1.25,2.95-2.75,6.85c-1.167,2.8-2.233,4.817-3.2,6.05
              c-0.9,1.2-1.583,2.1-2.05,2.7c-0.8,1-1.434,1.667-1.9,2c-2.067,1.333-3.633,2.067-4.7,2.2c-3.033,0.267-4.95,0.317-5.75,0.15
              c-0.8-0.167-1.383-0.217-1.75-0.15c-0.533,0.1-1.033,0.45-1.5,1.05c-0.5,0.667-1.217,1.284-2.15,1.85
              c-0.934,0.567-1.85,0.934-2.75,1.1c-2.467,0.433-4.45,0.25-5.95-0.55c-0.7-0.4-1.467-1.15-2.3-2.25c-0.6-0.867-1.033-1.567-1.3-2.1
              c-0.267-0.667-0.483-1.483-0.65-2.45c-0.3-1.467-0.383-2.717-0.25-3.75c0.267-1.9,0.45-3.05,0.55-3.45
              c0.233-1.233,0.566-2.333,1-3.3C9.25,77.45,9.767,76.4,10,76c0.667-1.233,1.55-2.583,2.65-4.05c1.1-1.434,2.184-2.583,3.25-3.45
              c0.367-0.3,1.15-0.867,2.35-1.7c0.767-0.566,1.917-1.25,3.45-2.05c1.733-0.933,3.267-1.633,4.6-2.1
              c2.133-0.733,4.534-1.467,7.2-2.2c0.467-0.1,1.517-0.3,3.15-0.6c0.967-0.233,0.4-0.4-1.7-0.5c-2.434-0.1-4.534-0.3-6.3-0.6
              c-1.566-0.267-3.383-0.7-5.45-1.3c-2.8-0.8-4.467-1.317-5-1.55c-1.567-0.667-3.2-1.75-4.9-3.25c-1.733-1.533-3-3.1-3.8-4.7
              c-0.533-1.067-0.967-2.434-1.3-4.1c-0.233-1.067-0.3-2.133-0.2-3.2c0.133-0.833,0.183-1.3,0.15-1.4v-0.6
              c-2.467-3.233-3.983-5.433-4.55-6.6c-0.533-1.033-0.883-1.833-1.05-2.4c-0.3-0.867-0.466-1.85-0.5-2.95
              c-0.033-2.367,0.034-4.117,0.2-5.25c0.3-1.034,0.483-1.8,0.55-2.3c0.167-0.867,0.034-1.533-0.4-2c-0.6-0.7-1.133-1.517-1.6-2.45
              c-0.566-1.133-0.833-2.117-0.8-2.95c0.033-1.333,0.167-2.367,0.4-3.1c0.367-1.267,1.05-2.267,2.05-3
              C4.417,4.25,6.483,3.317,8.65,2.85z"></path>
            <g></g>
          </g>
        </defs>
      </svg> */}
      <section className="background"></section>
      <section className="scene3d">
        <div className="cube skybox">
          <var className="scale">
            <figure className="face front"></figure>
            <figure className="face back"></figure>
            <figure className="face right"></figure>
            <figure className="face left"></figure>
            <figure className="face top"></figure>
            <figure className="face bottom"></figure>
          </var>
        </div>
        <div className="butterfly_container">
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container" style={{ marginTop: -150, marginLeft: 140, animationDuration: '5s' }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.75s'}}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.75s'}}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container scale_half" style={{ marginTop: -10, marginLeft: 50, animationDuration: '5s' }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.75s' }}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.75s' }}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container scale_half" style={{ marginTop: 20, animationDuration: '20s' }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '1s' }}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '1s' }}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container scale_half" style={{ animationDuration: '20s', marginLeft: 50, marginTop: 100 }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '1.2s' }}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '1.2s' }}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container scale_third" style={{ animationDuration: '20s', marginTop: 150 }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.35s' }}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.35s' }}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
        <div className="butterfly_container scale_third" style={{ animationDuration: '4s', marginLeft: 300, marginTop: -250 }}>
          <var className="rotate3d">
          <var className="scale">
          <var className="translate3d">
          <var className="translate3d-1">
          <figure className="butterfly">
            <svg className="wing left" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.45s' }}></svg> 
            <svg className="wing right" viewBox="0 0 50 100" dangerouslySetInnerHTML={{__html: useHtml}} style={{ animationDuration: '.45s' }}></svg> 
          </figure>
          </var>
          </var>
          </var>
          </var>
        </div>
      </section>
      <style jsx>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
          display: block;
        }
        body {
          line-height: 1;
        }
        ol,ul {
          list-style: none;
        }
        blockquote, q {
          quotes:none;
        }
        blockquote:before, blockquote:after, q:before, q:after {
          content:'';
          content:none;
        }
        table{
          border-collapse:collapse;
          border-spacing:0;
        }
        @keyframes rotating {
          0% {
            transform: rotate3d(0, 0, 0, 0deg);
          }
          100% {
            transform: rotate3d(0, 1, 0, 720deg);
          }
        }
        @keyframes rotatingY {
          100% {
            transform: rotateY(-360deg);
          }
        }
        @keyframes fluttering {
          0%, 25%, 50%, 75%, 100% {
            transform: translate3d(0, 0, 0);
          }
          10%, 60% {
            transform: translate3d(0, 150px, 0);
          }
          30%, 80% {
            transform: translate3d(0, 50px, 0);
          }
        }
        @keyframes left-wing-flap {
          0% {
            transform: translate3d(0, 0, 0) scaleX(1) rotate3d(0, 1, 0, 60deg);
          }
          50% {
            transform: translate3d(0, 0, 0) scaleX(1) rotate3d(0, 1, 0, -70deg);
          }
          100% {
            transform: translate3d(0, 0, 0) scaleX(1) rotate3d(0, 1, 0, 60deg);
          }
        }
        @keyframes right-wing-flap {
          0% {
            transform: translate3d(0, 0, 0) scaleX(-1) rotate3d(0, 1, 0, 60deg);
          }
          50% {
            transform: translate3d(0, 0, 0) scaleX(-1) rotate3d(0, 1, 0, -70deg);
          }
          100% {
            transform: translate3d(0, 0, 0) scaleX(-1) rotate3d(0, 1, 0, 60deg);
          }
        }
        .background {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .scene3d {
          perspective: 1000px;
          perspective-origin: 50% 50%;
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .skybox.cube {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 512px;
          height: 512px;
          margin-left: -256px;
          margin-top: -256px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          animation: rotatingY 40s linear infinite;
        }
        .skybox.cube var.scale {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 512px;
          height: 512px;
          margin-left: -256px;
          margin-top: -256px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          transform: rotate3d(0, 0, 1, 15deg) translate3d(0, 100px, 0) scale3d(4, 6, 4);
        }
        .skybox.cube .face {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 512px;
          height: 512px;
          margin-left: -256px;
          margin-top: -256px;
          backface-visibility: hidden;
        }
        .skybox.cube .face.front {
          transform: rotateY(0deg) translateZ(-256px);
        }
        .skybox.cube .face.back {
          transform: rotateY(180deg) translateZ(-256px);
        }
        .skybox.cube .face.right {
          transform: rotateY(-90deg) translateZ(-256px);
        }
        .skybox.cube .face.left {
          transform: rotateY(90deg) translateZ(-256px);
        }
        .skybox.cube .face.top {
          transform: rotateX(-90deg) translateZ(-256px);
        }
        .skybox.cube .face.bottom {
          transform: rotateX(90deg) translateZ(-256px);
          background: none;
        }
        .butterfly_container {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100px;
          height: 100px;
          margin-left: -50px;
          margin-top: -50px;
          transform-origin: 50% 50%;
          transform-style: preserve-3d;
          animation: rotatingY 10s linear infinite;
        }
        .butterfly_container var {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100px;
          height: 100px;
          margin-left: -50px;
          margin-top: -50px;
          transform-style: preserve-3d;
        }
        .butterfly_container var.rotate3d {
          transform: rotate3d(1, 0.5, 0, 70deg);
        }
        .butterfly_container var.translate3d {
          transform: translate3d(-300px, 0px, 0px);
        }
        .butterfly_container var.translate3d-1 {
          animation: fluttering 10s ease-in-out infinite;
        }
        .butterfly_container.scale_half var.scale {
          transform: scale3d(0.5, 0.5, 0.5);
        }
        .butterfly_container.scale_third var.scale {
          transform: scale3d(0.333, 0.333, 0.333);
        }
        .butterfly_container.scale_quarter var.scale {
          transform: scale3d(0.25, 0.25, 0.25);
        }
        .butterfly_container figure.butterfly {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100px;
          height: 100px;
          margin-left: -50px;
          margin-top: -50px;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
        }
        .butterfly_container figure.butterfly .wing {
          position: absolute;
          width: 50px;
          height: 100px;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          transform: translate3d(0, 0, 0) rotate3d(1, 0.5, 0, 45deg);
        }
        .butterfly_container figure.butterfly .wing.right {
          transform-origin: 50px 50px;
          transform: translate3d(0px, 0, 0) scaleX(-1) rotate3d(0, 1, 0, 45deg);
          animation: right-wing-flap 0.5s ease-in-out infinite;
          filter: FlipH;
        }
        .butterfly_container figure.butterfly .wing.left {
          transform-origin: 50px 50px;
          animation: left-wing-flap 0.5s ease-in-out infinite;
        }
        .butterfly_container figure.butterfly .wing use {
          display: block;
          transform-style: preserve-3d;
          stroke: white;
        }
        .svg-defs {
          position: absolute;
          height: 0;
          width: 0;
        }
      `}</style>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About