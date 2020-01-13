// https://github.com/zeit/next-plugins/tree/master/packages/next-sass
import css from  '../styles/scss.scss'

export default () => (
  <div>
    <h1 className={css.example}>scss</h1>
  </div>
)
