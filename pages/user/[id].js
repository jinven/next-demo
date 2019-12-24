import fetch from 'isomorphic-unfetch'
import { CURRENT_URL } from '../../utils/consts'

const User = ({ user }) => <div>{user.name}</div>

User.getInitialProps = async ({ query: { id } }, res) => {
  const response = await fetch(CURRENT_URL + `api/user/${id}`)
  const user = await response.json()

  return { user }
}

export default User
