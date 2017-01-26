import Header from '~/containers/Header'
import Navigation from '~/containers/Content/Navigation'
import Lesson from '~/containers/Content/Lesson'
import getLokkaClient from '~/lib/lokka'
import getInitialState from '~/lib/state'
import InitPage from '~/lib/init-page'
import Podda from 'podda'

const styles = {
  navigation: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '25%'
  },
  lesson: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '75%'
  }
}

const Content = (props) => (
  <div>
    <Header />
    <div>
      <div style={styles.navigation}>
        <Navigation {...props} />
      </div>
      <div style={styles.lesson}>
        <Lesson {...props} />
      </div>
    </div>
  </div>
)

export default InitPage({
  rootContainers: [Navigation, Lesson],
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
