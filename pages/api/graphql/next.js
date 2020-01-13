var { graphql, buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    hello: String
    users: [User!]!
  }
  type User {
    name: String
  }
`)
var root = {
  hello: () => {
    return 'Hello world!'
  },
  users(parent, args, context) {
    return [{ name: 'Nextjs' }]
  },
}
export default (req, res) => {
  graphql(schema, req.body.query, root).then((response) => {
    res.json(response)
  })
}