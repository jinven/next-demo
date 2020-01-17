import fetch from 'isomorphic-unfetch'

const CookiePage = ({ cookie }) => <div>{`Cookie from response: ${cookie}`}</div>

CookiePage.getInitialProps = async ({req}) => {
  let url = req.headers['host']
  const response = await fetch('http://' + (url || '') + '/api/cookies')
  const cookie = response.headers.get('set-cookie')
  return { cookie }
}

export default CookiePage
