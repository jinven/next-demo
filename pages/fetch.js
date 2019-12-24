import fetch from 'isomorphic-unfetch'

function Page({ starts }) {
    return <div>Next starts: { starts }</div>
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

Page.getInitialProps = async ({ req }) => {
    await sleep(5000)
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { starts: json.stargazers_count }
}

export default Page