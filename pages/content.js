import Podda from 'podda'
import Header from '~/containers/Header'
import Navigation from '~/containers/Content/Navigation'
import Lesson from '~/containers/Content/Lesson'
import getLokkaClient from '~/lib/lokka'
import getInitialState from '~/lib/state'
import InitPage from '~/lib/init-page'
import Layout from '~/components/Layout'


const Content = (props) => (
  <Layout>
    <Header />
    <div className='content'>
      <div className='navigation'>
        <Navigation {...props} />
      </div>
      <div className='lesson'>
        <Lesson {...props} />
      </div>
    </div>
    <style jsx>{`
      .content {
        margin: 30px 0 0 0;
      }

      .navigation {
        display: inline-block;
        vertical-align: top;
        width: 25%;
      }

      .lesson {
        display: inline-block;
        vertical-align: top;
        width: 75%;
      }
    `}</style>
  </Layout>
)

export default InitPage({
  rootContainers: [Header, Navigation, Lesson],
  getProps: (context) => {
    const { query } = context
    const initialState = getInitialState(context)

    return {
      courseId: query.course,
      lessonId: query.lesson,
      stepId: query.step,
      initialState
    }
  },
  getEnv: (props) => {
    return {
      store: new Podda(props.initialState),
      lokkaClient: getLokkaClient(props.initialState)
    }
  }
})(Content)
