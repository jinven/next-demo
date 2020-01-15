let root = require('../../data/scripts/user.js')
export default (req, res) => {
  let auser = root.userpackage.User.create({
    name: 'zhangshan',
    id: 12345,
    email: 'zhangshan@abc.com'
  });
  // console.log('api/protobuf.js auser', auser)
  let buffer = root.userpackage.User.encode(auser).finish();
  // console.log('api/protobuf.js buffer', buffer)
  let message = root.userpackage.User.decode(buffer)
  // console.log('api/protobuf.js message', message)
  let object = root.userpackage.User.toObject(message)
  // console.log('api/protobuf.js object', object)
  // response.setHeader(name, value)
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/protobuf'
    // 'Content-Type': 'application/octet-stream'
  })
  // https://nodejs.org/api/http.html#http_class_http_serverresponse
  res.end(buffer)
  // res.end(buffer, 'binary')
}