import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const configs = getConfig()
const serverRuntimeConfig = configs?.serverRuntimeConfig
const publicRuntimeConfig = configs?.publicRuntimeConfig

export default function (){
    console.log('customkey', process.env)
    console.log('serverRuntimeConfig.mySecret', serverRuntimeConfig?.mySecret)
    console.log('publicRuntimeConfig.staticFolder', publicRuntimeConfig?.staticFolder)
    return <div>
        <p>customkey is: {process.env.customKey}</p>
        <p>serverRuntimeConfig.mySecret is: {serverRuntimeConfig?.mySecret}</p>
        <p>customkey is: {publicRuntimeConfig?.staticFolder}</p>
    </div>
}