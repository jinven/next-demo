function About() {
  return (
    <div>
      <h1>垂直居中</h1>
      <h3>1. display: table, vertical-align: middle</h3>
      <div className="out" style={{display: 'table', width: 600, height: 300}}>
        <div className="in" style={{display: 'table-cell', verticalAlign: 'middle', background: 'transparent', color: 'gray'}}>ABC</div>
      </div>
      <h3>2. display: flex, align-self: center</h3>
      <div className="out" style={{display: 'flex'}}>
        <div className="in" style={{display: 'flex', alignSelf: 'center'}}>ABC</div>
      </div>
      <h3>3. position, top: 50%, margin-top: -height/2</h3>
      <div className="out" style={{position: 'relative'}}>
        <div className="in" style={{position: 'absolute', top: '50%', marginTop: '-12.5%'}}>ABC</div>
      </div>
      <h3>4. before</h3>
      <div className="out before">
        <div className="in" style={{display: 'inline-block', verticalAlign: 'middle'}}>ABC</div>
      </div>
      <h3>5. transform: translateY(-50%)</h3>
      <div className="out">
        <div className="in" style={{position: 'relative', top: '50%', display: 'inline-block', transform: 'translateY(-50%)'}}>ABC</div>
      </div>
      <h3>6. line-height: height+childHeight/2, display: inline</h3>
      <div className="out" style={{lineHeight: '305px'}}>
        <span className="in" style={{display: 'inline'}}>ABC</span>
      </div>
      <h1>水平居中</h1>
      <h3>1. text-align: center</h3>
      <div className="out" style={{textAlign: 'center'}}>
        <div className="in" style={{display: 'inline-block'}}>ABC</div>
      </div>
      <h3>2. margin: 0 auto</h3>
      <div className="out">
        <div className="in" style={{display: 'block', margin: '0 auto'}}>ABC</div>
      </div>
      <h3>3. position</h3>
      <div className="out" style={{position: 'relative'}}>
        <div className="in" style={{position: 'absolute', left: '50%', marginLeft: '-25%'}}>ABC</div>
      </div>
      <h3>4. transform: translateX(-50%)</h3>
      <div className="out">
        <div className="in" style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>ABC</div>
      </div>
      <h3>5. display: flex</h3>
      <div className="out" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="in" style={{display: 'flex', justifySelf: 'center'}}>ABC</div>
      </div>
      <h1>垂直水平居中</h1>
      <h3>1. display: table, text-align: center, vertical-align: middle</h3>
      <div className="out" style={{display: 'table', width: 600, height: 300, textAlign: 'center'}}>
        <div className="in" style={{display: 'table-cell', verticalAlign: 'middle', background: 'transparent', color: 'gray'}}>ABC</div>
      </div>
      <h3>2. display: flex, align-self: center, justify-content: center, align-items: center</h3>
      <div className="out" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="in" style={{display: 'flex', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>ABC</div>
      </div>
      <h3>3. position, top: 50%, left: 50%, margin-top: -height/2, margin-left: -width/2</h3>
      <div className="out" style={{position: 'relative', textAlign: 'center'}}>
        <div className="in" style={{position: 'absolute', top: '50%', left: '50%', marginTop: '-12.5%', marginLeft: '-25%', lineHeight: '150px'}}>ABC</div>
      </div>
      <h3>4. before</h3>
      <div className="out before" style={{textAlign: 'center'}}>
        <div className="in" style={{display: 'inline-block', verticalAlign: 'middle', lineHeight: '150px'}}>ABC</div>
      </div>
      <h3>5. transform: translateY(-50%)</h3>
      <div className="out" style={{textAlign: 'center'}}>
        <div className="in" style={{position: 'relative', top: '50%', display: 'inline-block', transform: 'translateY(-50%)', lineHeight: '150px'}}>ABC</div>
      </div>
      <h3>6. line-height: height+childHeight/2, display: inline</h3>
      <div className="out" style={{lineHeight: '305px', textAlign: 'center'}}>
        <span className="in" style={{display: 'inline'}}>ABC</span>
      </div>
      <style jsx>{`
        .out{
          width: 600px;
          height: 300px;
          background: black;
        }
        .in{
          width: 50%;
          height: 50%;
          background: gray;
        }
        .before:before{
          content: '';
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }
      `}</style>
    </div>
  )
}
About.getInitialProps = async () => {
  return {}
}
export default About