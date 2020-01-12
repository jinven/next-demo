var protobuf = require("protobufjs");
protobuf.load("./data/protos/awesome.proto", function(err, root) {
  if (err)
    throw err;
  console.log('root:', root)
  // Obtain a message type
  var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
  console.log('AwesomeMessage:', AwesomeMessage)
  // Exemplary payload
  var payload = { awesomeField: "AwesomeString" };
  console.log('payload:', payload)
  // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
  var errMsg = AwesomeMessage.verify(payload);
  console.log('errMsg:', errMsg)
  if (errMsg)
    throw Error(errMsg);
  // Create a new message
  var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
  console.log('message:', message)
  // Encode a message to an Uint8Array (browser) or Buffer (node)
  var buffer = AwesomeMessage.encode(message).finish();
  console.log('buffer:', buffer)
  // ... do something with buffer
  // Decode an Uint8Array (browser) or Buffer (node) to a message
  var message = AwesomeMessage.decode(buffer);
  console.log('message:', message)
  // ... do something with message
  // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
  // Maybe convert the message back to a plain object
  var object = AwesomeMessage.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // see ConversionOptions
  });
  console.log('object:', object)
});
