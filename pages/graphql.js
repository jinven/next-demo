import { useState } from 'react'
import fetch from 'isomorphic-unfetch'

const serverQuery = JSON.stringify({ query: '{ users { name } }' })
const clientQuery = JSON.stringify({ query: '{ hello, users { name } }'})
const GraphqlPage = function({ users }) {
  const [result, setResult] = useState({})
  const [nextResult, setNextResult] = useState({})
  const fetchResult = async () => {
    const response = await fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: clientQuery,
    })
    const { data } = await response.json()
    setResult(data)
  }
  const fetchNextResult = async () => {
    const response = await fetch('api/graphql/next', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: clientQuery
    })
    const { data } = await response.json()
    setNextResult(data)
  }
  return (
    <div>
      <h1>Graphql 测试</h1>
      <a href="/api/graphql?query={hello}" target="_blank">本地运行内置客户端：/api/graphql</a>
      <div>
        <hr />
        <h2>服务端定义</h2>
        <div className="graphql-query">
          <pre>{
`type Query {
  hello: String
  users: [User!]!
}
type User {
  name: String
}

Query: {
  hello: () => {
    return 'Hello world!'
  },
  users(parent, args, context) {
    return [{ name: 'Nextjs' }]
  }
}`}
          </pre>
        </div>
      </div>
      <div>
        <hr />
        <h2>服务端API获取数据</h2>
        <p>请求参数：</p>
        <div className="graphql-query">
          {serverQuery}
        </div>
        <p>返回结果：</p>
        <div className="graphql-query">
          {JSON.stringify(users)}
          {users.map((user, i) => (
            <div key={i}>{user.name}</div>
          ))}
        </div>
      </div>
      <div style={{marginTop: 50}}>
        <hr />
        <h2>客户端API获取数据 - 使用 Next Api</h2>
        <p>请求参数：</p>
        <div className="graphql-query">
          {clientQuery}
        </div>
        <p>
          <button onClick={fetchNextResult}>获取数据</button>
        </p>
        <p>返回结果：</p>
        <div className="graphql-query">
            {JSON.stringify(nextResult)}
        </div>
      </div>
      <div style={{marginTop: 50}}>
        <hr />
        <h2>客户端API获取数据 - 使用 ApolloServer</h2>
        <p>请求参数：</p>
        <div className="graphql-query">
          {clientQuery}
        </div>
        <p>
          <button onClick={fetchResult}>获取数据</button>
        </p>
        <p>返回结果：</p>
        <div className="graphql-query">
            {JSON.stringify(result)}
        </div>
      </div>
      <style jsx>{`
        .graphql-query {
          margin: 10px;
          padding: 10px;
          border: 1px dashed #ccc;
        }
      `}</style>
    </div>
  )
}

GraphqlPage.getInitialProps = async ({req}) => {
  let url = req.headers['host']
  const response = await fetch('http://' + (url || '') + '/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: serverQuery,
  })
  const {
    data: { users },
  } = await response.json()
  return { users }
}

export default GraphqlPage
