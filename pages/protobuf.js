import { useState } from 'react'
import root from '../data/scripts/user'
function ProtoBuf(){
  let [message, setMessage] = useState({})
  let [binary, setBinary] = useState([])
  function getProtoBuf(){
    fetch('/api/protobuf').then((a) => {
      console.log('protobuf.js', a.body)
      if(a.body){
        const reader = a.body.getReader();
        let charsReceived = 0
        reader.read().then(function processText({ done, value}) {
          if(done) {
            console.log('stream complete', value)
            return
          }
          charsReceived += value.length
          const chunk = value
          console.log('charsReceived', charsReceived, chunk)
          setBinary(value)
            
          let message = root.userpackage.User.decode(value)
          console.log('protobuf.js message', message)
          let object = root.userpackage.User.toObject(message)
          console.log('protobuf.js object', object)
          setMessage(object)
          return reader.read().then(processText)
        })
      }
      setMessage({})
    })
  }
  return (
    <div>
      <h1>ProtoBuf Page</h1>
      <p>
        <button onClick={getProtoBuf}>获取 protobuf 数据</button>
      </p>
      <p>
        <span>二进制信息：{JSON.stringify(binary)}</span>
      </p>
      <p>
        <span>转为 JSON：{JSON.stringify(message)}</span>
      </p>
    </div>
  )
}
ProtoBuf.getInitialProps = async () => {
  console.log('hi-------------------------');
  return {}
}
export default ProtoBuf