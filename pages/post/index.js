import Link from 'next/link'
function Post() {
  return (
    <div>
      <ul>
        <li><Link href="/post/1"><a>/post/1</a></Link></li>
        <li><Link href={{ pathname: '/post/2', query: { name: 'zeit' } }}><a>/post/2</a></Link></li>
        <li><Link href="/post/[pid]" as="/post/abc"><a>/post/abc</a></Link></li>
        <li><a href="/post/pid/comment">/post/pid/comment</a></li>
        <li><a href="/posts">/posts</a></li>
      </ul>
    </div>
  )
}
export default Post