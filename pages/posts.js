import fetch from 'isomorphic-unfetch'
import { CURRENT_URL } from '../utils/consts'

const PostsPage = ({ posts }) => (
  <ul>
    {posts.map((post, i) => (
      <li key={i}>{post.title}</li>
    ))}
  </ul>
)

PostsPage.getInitialProps = async () => {
  const response = await fetch(CURRENT_URL + 'api/posts')
  const posts = await response.json()
  return { posts }
}

export default PostsPage
