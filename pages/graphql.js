import fetch from 'isomorphic-unfetch'
import { CURRENT_URL } from '../utils/consts'

const GraphqlPage = ({ users }) => (
  <div>
    {users.map((user, i) => (
      <div key={i}>{user.name}</div>
    ))}
  </div>
)

GraphqlPage.getInitialProps = async () => {
  const response = await fetch(CURRENT_URL + 'api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: '{ users { name } }' }),
  })

  const {
    data: { users },
  } = await response.json()

  return { users }
}

export default GraphqlPage
