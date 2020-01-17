// https://github.com/zeit/next-plugins/tree/master/packages/next-sass
import css from  '../styles/scss.scss'
// const css = {
//   example: 'abc'
// }
export default () => (
  <div>
    <h1 className={css.example}>scss</h1>
  </div>
)
