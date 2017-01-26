import Header from '~/containers/Header'
import Navigation from '~/containers/Content/Navigation'
import Lesson from '~/containers/Content/Lesson'
import getLokkaClient from '~/lib/lokka'
import { getInitialState, WithEnv } from '~/lib/env'

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

let Content = (props) => (
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

Content = WithEnv()(Content)

Content.getInitialProps = async (context) => {
  const { query } = context
  const initialState = getInitialState(context)
  const env = {
    lokkaClient: getLokkaClient(initialState)
  }

  const props = {
    courseId: query.course,
    lessonId: query.lesson,
    stepId: query.step,
    initialState
  }

  Object.assign(props, await Navigation.fetch(env, props))
  Object.assign(props, await Lesson.fetch(env, props))

  return props
}

export default Content
