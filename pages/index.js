import Header from '~/containers/Header'
import { getInitialState, WithEnv } from '~/lib/env'

let HomePage = () => (
  <div>
    <Header />
    <div>Home Page</div>
  </div>
)

HomePage = WithEnv()(HomePage)

HomePage.getInitialProps = function (context) {
  const initialState = getInitialState(context)
  return { initialState }
}

export default HomePage
