import { useRef, useEffect } from 'react'


function neuQuant(arrPixels,intQuality) {
  let intNetsize = 256;
  let intPrime1 = 499;
  let intPrime2 = 491;
  let intPrime3 = 487;
  let intPrime4 = 503;
  let intMinpicturebytes = 3 * intPrime4;
  let intMaxnetpos = intNetsize - 1;
  let intNetbiasshift = 4;
  let intNcycles = 100;
  let intbiasshift = 16;
  let intbias = 1 << intbiasshift;
  let intGammashift = 10;
  let intBetashift = 10;
  let intBeta = intbias >> intBetashift;
  let intBetagamma = intbias << (intGammashift - intBetashift);
  let intRadiusbiasshift = 6;
  let initradius = (intNetsize >> 3) * (1 << intRadiusbiasshift);
  let intRadiusdec = 30;
  let intInitalpha = 1 << 10;
  let intAlphadec;
  let intRadbias = 1 << 8;
  let alpharadbshift = 10 + 8;
  let alpharadbias = 1 << alpharadbshift;
  let intPixelsLength=arrPixels.length;
  let intSamplefac=intQuality;
  let arrNetwork = new Array(intNetsize);
  let arrNetindex = [];
  let arrBias = [];
  let arrFreq = [];
  let arrRadpower = [];
  let fooColorMap = function() {
    let arrMap = [];
    let arrIndex = new Array(intNetsize);
    for (let i = 0; i < intNetsize; i++){
      arrIndex[arrNetwork[i][3]] = i;
    }
    let k = 0;
    for (let l = 0; l < intNetsize; l++) {
      let j = arrIndex[l];
      arrMap[k++] = (arrNetwork[j][0]);
      arrMap[k++] = (arrNetwork[j][1]);
      arrMap[k++] = (arrNetwork[j][2]);
    }
    return arrMap;
  };
  let fooInxbuild = function () {
    let j;
    let intPreviouscol = 0;
    let intStartpos = 0;
    for (let i = 0; i < intNetsize; i++) {
      let p = arrNetwork[i];
      let intSmallpos = i;
      let intSmallval = p[1];
      for (j = i + 1; j < intNetsize; j++) {
        if (arrNetwork[j][1] < intSmallval) {
          intSmallpos = j;
          intSmallval = arrNetwork[j][1];
        }
      }
      let q = arrNetwork[intSmallpos];
      if (i != intSmallpos) {
        j = q[0];
        q[0] = p[0];
        p[0] = j;
        j = q[1];
        q[1] = p[1];
        p[1] = j;
        j = q[2];
        q[2] = p[2];
        p[2] = j;
        j = q[3];
        q[3] = p[3];
        p[3] = j;
      }
      if (intSmallval != intPreviouscol) {
        arrNetindex[intPreviouscol] = (intStartpos + i) >> 1;
        for (j = intPreviouscol + 1; j < intSmallval; j++) {
          arrNetindex[j] = i;
        }
        intPreviouscol = intSmallval;
        intStartpos = i;
      }
    }
    arrNetindex[intPreviouscol] = (intStartpos + intMaxnetpos) >> 1;
    for (j = intPreviouscol + 1; j < 256; j++) {
      arrNetindex[j] = intMaxnetpos;
    }
  };
  let fooLearn = function() {
    let i;
    let j;
    let b;
    let g;
    let r;
    let intStep;
    let intPix = 0;
    if (intPixelsLength < intMinpicturebytes) {
      intSamplefac = 1;
    }
    intAlphadec = 30 + ((intSamplefac - 1) / 3);
    let samplepixels = intPixelsLength / (3 * intSamplefac);
    let intDelta = (samplepixels / intNcycles) | 0;
    let intAlpha = intInitalpha;
    let intRadius = initradius;
    let intRadBia = intRadius >> intRadiusbiasshift;
    if (intRadBia <= 1) {
      intRadBia = 0;
    }
    for (i = 0; i < intRadBia; i++) {
      arrRadpower[i] = intAlpha * (((intRadBia * intRadBia - i * i) * intRadbias) / (intRadBia * intRadBia));
    }
    if (intPixelsLength < intMinpicturebytes) {
      intStep = 3;
    } else if ((intPixelsLength % intPrime1) !== 0) {
      intStep = 3 * intPrime1;
    } else {
      if ((intPixelsLength % intPrime2) !== 0) {
        intStep = 3 * intPrime2;
      } else {
        if ((intPixelsLength % intPrime3) !== 0) {
          intStep = 3 * intPrime3;
        } else {
          intStep = 3 * intPrime4;
        }
      }
    }
    i = 0;
    while (i < samplepixels) {
      b = (arrPixels[intPix + 0] & 0xff) << intNetbiasshift;
      g = (arrPixels[intPix + 1] & 0xff) << intNetbiasshift;
      r = (arrPixels[intPix + 2] & 0xff) << intNetbiasshift;
      j = fooContest(b, g, r);
      fooAltersingle(intAlpha, j, b, g, r, intInitalpha);
      if (intRadBia !== 0) {
        fooAlterneigh(intRadBia, j, b, g, r);
      }
      intPix += intStep;
      if (intPix >= intPixelsLength) {
        intPix -= intPixelsLength;
      }
      i++;
      if (intDelta === 0) {
        intDelta = 1;
      }
      if (i % intDelta === 0) {
        intAlpha -= intAlpha / intAlphadec;
        intRadius -= intRadius / intRadiusdec;
        intRadBia = intRadius >> intRadiusbiasshift;
        if (intRadBia <= 1) {
          intRadBia = 0;
        }
        for (j = 0; j < intRadBia; j++) {
          arrRadpower[j] = intAlpha * (((intRadBia * intRadBia - j * j) * intRadbias) / (intRadBia * intRadBia));
        }
      }
    }
  };
  var fooMap = function(b, g, r) {
    var i = arrNetindex[g];
    var j = i - 1;
    var intBestd = 1000;
    var intBest = -1;
    while ((i < intNetsize) || (j >= 0)) {
      if (i < intNetsize) {
        var objPa=arrNetwork[i];
        var intDist = objPa[1] - g;
        if (intDist >= intBestd) {
          i = intNetsize;
        } else {
          i++;
          if (intDist < 0) {
            intDist = -intDist;
          }
          intDist += objPa[0]>b ? (objPa[0] - b) : (b-objPa[0]);
          if (intDist < intBestd) {
            intDist += objPa[2]>r ? (objPa[2]-r) : (r-objPa[2]);
            if (intDist < intBestd) {
              intBestd = intDist;
              intBest = objPa[3];
            }
          }
        }
      }
      if (j >= 0) {
        var objPa=arrNetwork[j];
        var intDist = g - objPa[1];
        if (intDist >= intBestd) {
          j = -1;
        } else {
          j--;
          if (intDist < 0) {
            intDist = -intDist;
          }
          intDist += objPa[0]>b ? (objPa[0]-b) : (b-objPa[0]);
          if (intDist < intBestd) {
            intDist += objPa[2]>r? (objPa[2]-r) : (r-objPa[2]);
            if (intDist < intBestd) {
              intBestd = intDist;
              intBest = objPa[3];
            }
          }
        }
      }
    }
    return intBest;
  };
  var fooProcess = function() {
    fooLearn();
    fooUnbiasnet();
    fooInxbuild();
    return fooColorMap();
  };
  var fooUnbiasnet = function() {
    for (var i = 0; i < intNetsize; i++) {
      arrNetwork[i][0] >>= intNetbiasshift;
      arrNetwork[i][1] >>= intNetbiasshift;
      arrNetwork[i][2] >>= intNetbiasshift;
      arrNetwork[i][3] = i;
    }
  };
  var fooAlterneigh = function(rad, i, b, g, r) {
    var j = i + 1;
    var k= i - 1;
    var lo = (i<rad-1) ? -1 : (i-rad);
    var hi = (i+rad>intNetsize) ? intNetsize : (i+rad);
    var m = 1;
    while (j < hi || k > lo) {
      var intAlpha = arrRadpower[m++];
      if (j < hi) {
        fooAltersingle(intAlpha, j++, b, g, r, alpharadbias);
      }
      if (k > lo) {
        fooAltersingle(intAlpha, k--, b, g, r, alpharadbias);
      }
    }
  };
  var fooAltersingle = function(intAlpha, i, intBlue, intGreen, intRed, intAlphaRadius) {
    arrNetwork[i][0] -= intAlpha * (arrNetwork[i][0] - intBlue) / intAlphaRadius;
    arrNetwork[i][1] -= intAlpha * (arrNetwork[i][1] - intGreen) / intAlphaRadius;
    arrNetwork[i][2] -= intAlpha * (arrNetwork[i][2] - intRed) / intAlphaRadius;
  };
  var fooContest = function(b, g, r) {
    var intBestd = ~ (1 << 31);
    var intBestbiasd = intBestd;
    var intBestpos = -1;
    var intBestbiaspos = intBestpos;
    for (var i = 0; i < intNetsize; i++) {
      var intDist = arrNetwork[i][0]>b ? (arrNetwork[i][0]-b) : (b-arrNetwork[i][0]);
      intDist += arrNetwork[i][1]>g ? (arrNetwork[i][1]-g) : (g-arrNetwork[i][1]);
      intDist += arrNetwork[i][2]>r ? (arrNetwork[i][2]-r) : (r-arrNetwork[i][2]);
      if (intDist < intBestd) {
        intBestd = intDist;
        intBestpos = i;
      }
      var intBiasdist = intDist - (arrBias[i] >> (intbiasshift - intNetbiasshift));
      if (intBiasdist < intBestbiasd) {
        intBestbiasd = intBiasdist;
        intBestbiaspos = i;
      }
      var intBetafreq = arrFreq[i] >> intBetashift;
      arrFreq[i] -= intBetafreq;
      arrBias[i] += intBetafreq << intGammashift;
    }
    arrFreq[intBestpos] += intBeta;
    arrBias[intBestpos] -= intBetagamma;
    return intBestbiaspos;
  };
  for (var i = 0; i < intNetsize; i++) {
    arrNetwork[i] = new Array(4);
    arrNetwork[i][0] = arrNetwork[i][1] = arrNetwork[i][2] = (i << (intNetbiasshift + 8)) / intNetsize;
    arrFreq[i] = intbias / intNetsize;
    arrBias[i] = 0;
  }
  return {
    map:fooMap,
    process:fooProcess
  };
}
function lZWEncoder(arrData, intWidth, intHeight, arrPixels, intColorDepth) {
  let intEOF = -1;
  let initCodeSize=Math.max(2, intColorDepth);
  let intRemaining = intWidth * intHeight;
  let intCurPixel=0;
  let intMaxbits = 12;
  let intMaxmaxcode = 1 << intMaxbits;
  let arrHtab = [];
  let arrCodetab = [];
  let intHsize = 5003;
  let booClearFlg = false;
  let intGInitBits = initCodeSize + 1;
  let intNBits = intGInitBits;
  let intMaxcode = (1 << intNBits) - 1;
  let intClearCode = 1 << (intGInitBits - 1);
  let intEOFCode = intClearCode + 1;
  let intFreeEnt = intClearCode + 2;
  let intCurAccum = 0;
  let intCurBits = 0;
  let arrMasks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
  let intACount = 0;
  let arrAccum = [];
  let fooCharOut = function(c) {
    arrAccum[intACount++] = c;
    if (intACount >= 254) {
      fooFlushChar();
    }
  };
  let fooClhash = function(intHsize) {
    for (let i = 0; i < intHsize; ++i) {
      arrHtab[i] = -1;
    }
  };
  let fooCompress = function() {
    let fcode = intHsize;
    let i;
    let c;
    let ent = fooNextPixel();
    let disp;
    let hsize_reg = intHsize;
    let hshift = 0;
    for (; fcode < 65536; fcode *= 2){
      ++hshift;
    }
    hshift = 8 - hshift;
    fooClhash(hsize_reg);
    fooOutput(intClearCode);
    outer_loop: while ((c = fooNextPixel()) != intEOF) {
      fcode = (c << intMaxbits) + ent;
      i = (c << hshift) ^ ent;
      if (arrHtab[i] == fcode) {
        ent = arrCodetab[i];
        continue;
      }
      if (arrHtab[i] >= 0) {
        disp = hsize_reg - i;
        if (i === 0) {
          disp = 1;
        }
        do {
          if ((i -= disp) < 0){
            i += hsize_reg;
          }
          if (arrHtab[i] == fcode) {
            ent = arrCodetab[i];
            continue outer_loop;
          }
        } while (arrHtab[i] >= 0);
      }
      fooOutput(ent);
      ent = c;
      if (intFreeEnt < intMaxmaxcode) {
        arrCodetab[i] = intFreeEnt++;
        arrHtab[i] = fcode;
      } else {
        fooClhash(intHsize);
        intFreeEnt = intClearCode + 2;
        booClearFlg = true;
        fooOutput(intClearCode);
      }
    }
    fooOutput(ent);
    fooOutput(intEOFCode);
  };
  var fooFlushChar = function() {
    if (intACount > 0) {
      arrData.push(intACount);
      for(var l=intACount||arrAccum.length,i=0;i<l;i++){
        arrData.push(arrAccum[i]);
      }
      intACount = 0;
    }
  };
  var fooNextPixel = function() {
    if (intRemaining === 0) {
      return intEOF;
    }
    --intRemaining;
    return arrPixels[intCurPixel++] & 0xff;
  };
  var fooOutput = function(code) {
    intCurAccum &= arrMasks[intCurBits];
    if (intCurBits > 0) {
      intCurAccum |= (code << intCurBits);
    } else {
      intCurAccum = code;
    }
    intCurBits += intNBits;
    while (intCurBits >= 8) {
      fooCharOut(intCurAccum & 0xff);
      intCurAccum >>= 8;
      intCurBits -= 8;
    }
    if (intFreeEnt > intMaxcode || booClearFlg) {
      if (booClearFlg) {
        intNBits = intGInitBits;
        intMaxcode = (1 << intNBits) - 1;
        booClearFlg = false;
      } else {
        ++intNBits;
        intMaxcode = intNBits == intMaxbits ? intMaxmaxcode : ((1 << intNBits) - 1);
      }
    }
    if (code == intEOFCode) {
      while (intCurBits > 0) {
        fooCharOut(intCurAccum & 0xff);
        intCurAccum >>= 8;
        intCurBits -= 8;
      }
      fooFlushChar();
    }
  };
  arrData.push(initCodeSize);
  fooCompress();
  arrData.push(0);
}
function About() {
  const canvasOneEl = useRef(null);
  const canvasTwoEl = useRef(null);
  const canvasFixEl = useRef(null);
  const imgAllEl = useRef(null);
  useEffect(() => {
    let canvasOne = canvasOneEl.current;
    let canvasTwo = canvasTwoEl.current;
    let canvasFix = canvasFixEl.current;
    let imgAll = imgAllEl.current;
    let contextOne=canvasOne.getContext('2d');
    let contextTwo=canvasTwo.getContext('2d');
    let contextFix=canvasFix.getContext('2d');
    contextOne.fillStyle='rgba(50,100,200,.5)';
    contextOne.fillRect(10,10,10,10);
    contextTwo.fillStyle='rgba(200,100,50,.5)';
    contextTwo.fillRect(25,25,20,20);
    contextFix.fillStyle='rgba(50,100,200,.5)';
    contextFix.fillRect(10,10,20,20);
    contextFix.fillStyle='rgba(200,100,50,.5)';
    contextFix.fillRect(10,20,50,10);
    // 开始
    let arrFrameData=[];
    let arrFrameOneData=contextOne.getImageData(0,0,contextOne.canvas.width,contextOne.canvas.height).data;
    let arrFrameTwoData=contextTwo.getImageData(0,0,contextTwo.canvas.width,contextTwo.canvas.height).data;
    let intImageWidth=contextOne.canvas.width;
    let intImageHeight=contextOne.canvas.height;
    let intQuality=10;
    let arrUsedEntry=[];
    let intColorDepth=0;
    let intTransparent=null;
    let intTransIndex=16;
    let arrColorTabFirst=null;
    let intRepeat=0;
    let intDispose=-1;
    let intDelay = Math.round(500 / 10);
    let strFileSignal='NETSCAPE2.0';
    let strComment = "GENERATED BY XIU.TOP";
    arrFrameData.push(arrFrameOneData);
    arrFrameData.push(arrFrameTwoData);
    let arrAllData=[];
    for(let i=0;i<arrFrameData.length;i++){
      let intCount=0;
      let intRgbIndex = 0;
      let arrPixels=[];
      for(let j=0;j<intImageHeight;j++){
        for(let k=0;k<intImageWidth;k++){
          arrPixels[intCount++] = arrFrameData[i][intRgbIndex++];
          arrPixels[intCount++] = arrFrameData[i][intRgbIndex++];
          arrPixels[intCount++] = arrFrameData[i][intRgbIndex++];
          intRgbIndex++;
        }
      }
      let intPix=arrPixels.length/3;
      let arrIndexPixels=[];
      let objNq=neuQuant(arrPixels,intQuality);
      let arrColorTab=objNq.process();
      intCount=0;
      for(let j=0;j<intPix;j++){
        let intIndex=objNq.map(arrPixels[intCount++] & 0xff, arrPixels[intCount++] & 0xff, arrPixels[intCount++] & 0xff);
        arrUsedEntry[intIndex]=true;
        arrIndexPixels[j]=intIndex;
      }
      intColorDepth=8;
      if(intTransparent!=null){
        if(arrColorTab==null){
          intTransIndex=-1;
        } else {
          let intTempRed=(intTransparent & 0xFF0000) >> 16;
          let intTempGreen=(intTransparent & 0x00FF00) >> 8;
          let intTempBlue=(intTransparent & 0x0000FF);
          let intMinpos=0;
          let intDmin=256 * 256 * 256;
          let intTabLength=arrColorTab.length;
          for(let j=0;j<intTabLength;){
            let intTempDr=intTempRed - (arrColorTab[j++] & 0xff);
            let intTempDg=intTempGreen - (arrColorTab[j++] & 0xff);
            let intTempDb=intTempBlue - (arrColorTab[j] & 0xff);
            let intTempDa = intTempDr * intTempDr + intTempDg * intTempDg + intTempDb * intTempDb;
            let intTempIndex=j/3;
            if(arrUsedEntry[intTempIndex] && (intTempDa < intDmin)){
              intDmin=intTempDa;
              intMinpos = intTempIndex;
            }
            j++;
          }
          intTransIndex=intMinpos;
        }
      }
      if(i==0){
        arrColorTabFirst=arrColorTab;
      }
      // 图形控制扩展帧GCE（2字节）
      arrAllData.push(0x21);
      arrAllData.push(0xf9);
      // 接下来4字节，第一字节：bit-fields 3x:3:1:1, 000|010|0|0 -> Restore to bg color，二三字节：下一帧延时，第四字节：是否透明
      arrAllData.push(4);
      let intTempTransp=1;
      let intTempDisp=2;
      if(intTransparent!=null){
        intTempTransp=1;
        intTempDisp=2;
      }
      // 重写
      if(intDispose>=0){
        intTempDisp=intDispose & 7;
      }
      intTempDisp <<= 2;
      arrAllData.push(0 | intTempDisp | 0 | intTempTransp);
      // 延时
      arrAllData.push(intDelay & 0xFF);
      arrAllData.push((intDelay >> 8) & 0xFF);
      arrAllData.push(intTransIndex);
      // 结束GCE块
      arrAllData.push(0);
      // 图片注明
      if(i==0){
        if(strComment!=null && strComment!=''){
          arrAllData.push(0x21);
          arrAllData.push(0xFE);
          arrAllData.push(strComment.length);
          for(var j=0;j<strComment.length;j++){
            arrAllData.push(strComment.charCodeAt(j));
          }
          arrAllData.push(0);
        }
      }
      // 图片描述、x坐标、y坐标、宽度、高度（9字节）
      arrAllData.push(0x2C);
      arrAllData.push(0 & 0xFF);
      arrAllData.push((0 >> 8) & 0xFF);
      arrAllData.push(0 & 0xFF);
      arrAllData.push((0 >> 8) & 0xFF);
      arrAllData.push(intImageWidth & 0xFF);
      arrAllData.push((intImageWidth >> 8) & 0xFF);
      arrAllData.push(intImageHeight & 0xFF);
      arrAllData.push((intImageHeight >> 8) & 0xFF);
      // 本帧颜色表
      if(i==0){
        arrAllData.push(0);
      } else {
        arrAllData.push(0x87);
        for(let j=0;j<arrColorTab.length;j++){
          arrAllData.push(arrColorTab[j]);
        }
        let intTempColorLength=3 * 256 - arrColorTab.length;
        for(let j=0;j<intTempColorLength;j++){
          arrAllData.push(0);
        }
      }
      // LZW图片数据
      lZWEncoder(arrAllData, intImageWidth, intImageHeight, arrIndexPixels, intColorDepth);
    }

    // 1.gif字节数据
    let arrGifData=[];
    // 2.gif头标识（6字节）
    let strGifHeader='GIF89a';
    for(let i=0;i<strGifHeader.length;i++){
      arrGifData.push(strGifHeader.charCodeAt(i));
    }
    // 3.gif宽度、高度（4字节）
    arrGifData.push(intImageWidth & 0xFF);
    arrGifData.push((intImageWidth >> 8) & 0xFF);
    arrGifData.push(intImageHeight & 0xFF);
    arrGifData.push((intImageHeight >> 8) & 0xFF);
    // 4.全局颜色、背景色、相素比（3字节）
    // arrGifData.push(0x80 | 0x70 | 0x00 | intPalSize);
    arrGifData.push(0xF7);
    arrGifData.push(0);
    arrGifData.push(0);
    // 5.主色彩（768字节）
    for(let i=0;i<arrColorTabFirst.length;i++){
      arrGifData.push(arrColorTabFirst[i]);
    }
    // for(var i=0;i<768;i++){
    //     arrGifData.push(0xFF);
    // }
    let intNt = 3*256 - arrColorTabFirst.length;
    for(let i=0;i<intNt;i++){
      arrGifData.push(0);
    }
    // 6.重复（19字节）
    if(intRepeat>=0){
      // 程序扩展块
      arrGifData.push(0x21);
      arrGifData.push(0xff);
      // 接下来是11字节的数据，程序名+程序号
      arrGifData.push(11);
      for(let i=0;i<strFileSignal.length;i++){
        arrGifData.push(strFileSignal.charCodeAt(i));
      }
      // 3个字节，未签名数字
      arrGifData.push(3);
      arrGifData.push(1);
      arrGifData.push(intRepeat & 0xFF);
      arrGifData.push((intRepeat >> 8) & 0xFF);
      // 程序扩展块结束
      arrGifData.push(0);
    }

    // 7.图片(帧)
    for(let i=0;i<arrAllData.length;i++){
      arrGifData.push(arrAllData[i]);
    }
    // 8.结束标识（1字节）
    arrGifData.push(0x3B);
    
    // 9.生成地址
    let strResult='';
    let arrCharCodes=[];
    for(let i=0;i<256;i++){
      arrCharCodes[i]=String.fromCharCode(i);
    }
    for(let i=0;i<arrGifData.length;i++){
      strResult+=arrCharCodes[arrGifData[i]];
    }
    strResult='data:image/gif;base64,' + btoa(strResult);
    imgAll.src=strResult;
  }, []);
  return (
    <div>
      <div>
          <canvas className="img-one" ref={canvasOneEl} width="200" height="150"></canvas>
          <canvas className="img-two" ref={canvasTwoEl} width="200" height="150"></canvas>
          <canvas className="img-fix" ref={canvasFixEl} width="200" height="150"></canvas>
      </div>
      <div>
          <img className="img-all" ref={imgAllEl} width="200" height="150" />
      </div>
      <style jsx>{`
        .img-one{
          margin:10px;
          border:1px dashed #f00;
        }
        .img-two{
          margin:10px;
          border:1px dashed #0f0;
        }
        .img-fix{
          margin:10px;
          border:1px dashed #00f;
        }
        .img-all{
          margin:10px;
          border:1px dashed #000;
        }
      `}</style>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About