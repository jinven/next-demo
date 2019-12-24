import { useRouter } from 'next/router'

const Get = () => {
    const router = useRouter()
    const { slug } = router.query

    return <p>My Blog Get: { slug } </p>
}

export default Get