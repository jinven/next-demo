import { useState } from 'react'
import root from '../data/scripts/user'
function ProtoBuf(){
  let [message, setMessage] = useState({})
  let [binary, setBinary] = useState([])
  function getProtoBuf(){
    fetch('/api/protobuf').then((a) => {
      // console.log('protobuf.js', a.body)
      if(a.body){
        const reader = a.body.getReader();
        let charsReceived = 0
        reader.read().then(function processText({ done, value}) {
          if(done) {
            // console.log('stream complete', value)
            return
          }
          charsReceived += value.length
          const chunk = value
          // console.log('charsReceived', charsReceived, chunk)
          setBinary(value)
            
          let message = root.userpackage.User.decode(value)
          // console.log('protobuf.js message', message)
          let object = root.userpackage.User.toObject(message)
          // console.log('protobuf.js object', object)
          setMessage(object)
          return reader.read().then(processText)
        })
      }
      setMessage({})
    })
  }
  console.log('binary', binary)
  let x16 = ''
  let str = ''
  if(binary){
    for(var index=0;index<binary.length;index++){
      x16 += binary[index].toString(16).padStart(2, '0') + ' ' + (index%8===7?' ':'') + (index%16===15?'\n':'')
      str += String.fromCharCode(binary[index])
    }
  }
  return (
    <div>
      <h1>ProtoBuf Page</h1>
      <p>
        <button onClick={getProtoBuf}>获取 protobuf 数据</button>
      </p>
      <p>
        <span>原数组：</span><pre>{'['+binary.join(', ')+']'}</pre>
      </p>
      <p>
        <span>十六进制信息：</span><pre>{x16}</pre>
      </p>
      <p>
        <span>字符串信息：</span><pre>{str}</pre>
      </p>
      <p>
        <span>转为 JSON：{JSON.stringify(message)}</span>
      </p>
      <style jsx>{`
        pre {
          border: 1px dashed #ccc;
          overflow: auto;
        }
      `}</style>
    </div>
  )
}
ProtoBuf.getInitialProps = async () => {
  console.log('hi-------------------------');
  return {}
}
export default ProtoBuf