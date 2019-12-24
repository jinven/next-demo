import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { CURRENT_URL } from '../../utils/consts'

const UsersPage = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <Link href="/user/[id]" as={`/user/${user.id}`}>
          <a>{`User ${user.id}`}</a>
        </Link>
      </li>
    ))}
  </ul>
)

UsersPage.getInitialProps = async () => {
  const response = await fetch(CURRENT_URL + 'api/users')
  const users = await response.json()

  return { users }
}

export default UsersPage
