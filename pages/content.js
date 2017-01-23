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
        <Lesson {...props.lessonData} step={props.query.step} />
      </div>
    </div>
  </div>
)

Content = WithStore()(Content)

Content.getInitialProps = async (context) => {
  const initialState = getInitialState(context)
  const { query } = context

  const client = getLokkaClient(initialState)
  const navigationData = await Navigation.fetch(client)
  const lessonData = await Lesson.fetch(initialState, client, query.course, query.lesson)

  return { initialState, navigationData, lessonData, query }
}

export default Content
