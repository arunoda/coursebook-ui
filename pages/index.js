import Podda from 'podda'
import Header from '~/containers/Header'
import getInitialState from '~/lib/state'
import getLokkaClient from '~/lib/lokka'
import InitPage from '~/lib/init-page'
import Layout from '~/components/Layout'

let HomePage = () => (
  <Layout>
    <Header />
    <div>Home Page</div>
  </Layout>
)

export default InitPage({
  rootContainers: [Header],
  getProps: (context) => {
    const initialState = getInitialState(context)
    return { initialState }
  },
  getEnv: (props) => {
    return {
      store: new Podda(props.initialState),
      lokkaClient: getLokkaClient(props.initialState)
    }
  }
})(HomePage)
