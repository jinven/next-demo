import Router from 'next/router'

const handler = () => {
    Router.push({
        pathname: '/about',
        query: { name: 'Zeit' },
    })
}

function ReadMore() {
    return (
        <div>
            点击 <span onClick={handler}>这里</span> 查看关于页面
            <style jsx>{`
                span {
                    color: #28f;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

export default ReadMore