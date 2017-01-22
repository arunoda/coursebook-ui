import Header from '../components/Header'
import { getInitialState, WithStore } from '../lib/store'

let HomePage = () => (
  <div>
    <Header />
    <div>Home Page</div>
  </div>
)

HomePage = WithStore()(HomePage)

HomePage.getInitialProps = function (context) {
  const initialState = getInitialState(context)
  return { initialState }
}

export default HomePage
