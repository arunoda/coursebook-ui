import Podda from 'podda'
import Header from '~/containers/Header'
import getInitialState from '~/lib/state'
import getLokkaClient from '~/lib/lokka'
import InitPage from '~/lib/init-page'
import Layout from '~/components/Layout'
import Link from 'next/link'

const startHref = `/content?courseId=${FIRST_COURSE}&lessonId=${FIRST_LESSON}`
const startAs = `/${FIRST_COURSE}/${FIRST_LESSON}`

let HomePage = () => (
  <Layout>
    <Header />
    <div className="content">
      <h2 className="start">START</h2>
      <h1 className="learning">Learning Next.js</h1>
      <h2 className="tagline">To build server rendered JS web apps with React</h2>
      <div className="call-to-action">
        <Link href={startHref} as={startAs}>
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

      .tagline {
        padding: 0;
        margin: 20px 0 0 0;
        color: #444;
        font-weight: 300;
        font-size: 25px;
        letter-spacing: 1.5px;
      }

      .call-to-action {
        margin: 60px 0 0 0;
      }

      a {
        font-size: 30px;
        font-weight: 300;
        padding: 12px 60px;
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
