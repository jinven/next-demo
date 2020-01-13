import cowsay from 'cowsay-browser'
import { useRouter } from 'next/router'

function CowsayHi(){
    const router = useRouter()
    // console.log('cowsayhi router: ', JSON.stringify(router))
    return <pre>{cowsay.say({ text: 'hi there!'})}</pre>
}

export default CowsayHi