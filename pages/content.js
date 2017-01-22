import Header from '../components/Header'
import Navigation from '../components/Content/Navigation'
import getLokkaClient, { query } from '../lib/lokka'

const Content = (props) => (
  <div>
    <Header />
    <div>
      <Navigation {...props.navigationData}/>
    </div>
  </div>
)

Content.getInitialProps = async () => {
  const client = getLokkaClient()
  const navigationData = await query(client, Navigation.query(client))

  return { navigationData }
}

export default Content
