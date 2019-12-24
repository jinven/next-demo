import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function (){
    console.log('customkey', process.env)
    console.log('serverRuntimeConfig.mySecret', serverRuntimeConfig.mySecret)
    console.log('publicRuntimeConfig.staticFolder', publicRuntimeConfig.staticFolder)
    return <div>
        <h1>customkey is: {process.env.customKey}</h1>
        <h1>serverRuntimeConfig.mySecret is: {serverRuntimeConfig.mySecret}</h1>
        <h1>customkey is: {publicRuntimeConfig.staticFolder}</h1>
    </div>
}