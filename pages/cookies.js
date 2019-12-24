import fetch from 'isomorphic-unfetch'
import { CURRENT_URL } from '../../utils/consts'

const CookiePage = ({ cookie }) => <div>{`Cookie from response: ${cookie}`}</div>

CookiePage.getInitialProps = async () => {
  const response = await fetch(CURRENT_URL + 'api/cookies')
  const cookie = response.headers.get('set-cookie')

  return { cookie }
}

export default CookiePage
