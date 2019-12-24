import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const str = JSON.stringify(router.query)

    return <p>Post: {str}</p>
}

export default Post