import Podda from 'podda'
import Header from '~/containers/Header'
import getInitialState from '~/lib/state'
import InitPage from '~/lib/init-page'

let HomePage = () => (
  <div>
    <Header />
    <div>Home Page</div>
  </div>
)

export default InitPage({
  getProps: (context) => {
    const initialState = getInitialState(context)
    return { initialState }
  },
  getEnv: (props) => {
    return {
      store: new Podda(props.initialState)
    }
  }
})(HomePage)
