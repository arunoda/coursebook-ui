import Podda from 'podda'
import Header from '~/containers/Header'
import getInitialState from '~/lib/state'
import getLokkaClient from '~/lib/lokka'
import InitPage from '~/lib/init-page'
import Layout from '~/components/Layout'
import Link from 'next/link'

let HomePage = () => (
  <Layout>
    <Header />
    <div className="content">
      <h2 className="start">START</h2>
      <h1 className="learning">Learning Next.js</h1>
      <h2 className="creators">( A Guide from the Creators )</h2>
      <div className="call-to-action">
        <Link href="/content" as="/start">
          <a>Start Now</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .content {
          margin: 120px 0 0 0;
          text-align: center;
          -webkit-font-smoothing: subpixel-antialiased;
          font-family: 'Source Sans Pro', sans-serif;
      }

      .start {
        padding: 0;
        margin: 0;
        color: #444;
        font-weight: 300;
        font-size: 50px;
        letter-spacing: 10px;
      }

      .learning {
        padding: 0;
        margin: 0;
        font-size: 110px;
        font-weight: 600;
        color: #333;
        line-height: 1;
      }

      .creators {
        padding: 0;
        margin: 20px 0 0 0;
        color: #444;
        font-weight: 300;
        font-size: 30px;
        letter-spacing: 2px;
      }

      .call-to-action {
        margin: 50px 0 0 0;
      }

      a {
        font-size: 30px;
        font-weight: 300;
        padding: 15px 60px;
        line-height: 1;
        letter-spacing: 0.5px;
        color: white;
        background: #699141;
        border-radius: 3px;
        text-decoration: none;
      }

      a:hover {
        opacity: 0.8;
      }
    `}</style>
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
