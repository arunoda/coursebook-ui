import Header from '../components/Header'
import Navigation from '../components/Content/Navigation'
import Lesson from '../components/Content/Lesson'
import getLokkaClient from '../lib/lokka'
import { getInitialState, WithStore } from '../lib/store'

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
        <Navigation {...props.navigationData} />
      </div>
      <div style={styles.lesson}>
        <Lesson {...props.lessonData}
          stepId={props.stepId}
          courseId={props.courseId}
          lessonId={props.lessonId}
        />
      </div>
    </div>
  </div>
)

Content = WithStore()(Content)

Content.getInitialProps = async (context) => {
  const { query } = context
  const props = {
    courseId: query.course,
    lessonId: query.lesson,
    stepId: query.step,
    initialState: getInitialState(context)
  }

  const env = {
    lokkaClient: getLokkaClient(props.initialState)
  }

  const navigationData = await Navigation.fetch(env, {})
  const lessonData = await Lesson.fetch(env, props)

  return { ...props, navigationData, lessonData }
}

export default Content
