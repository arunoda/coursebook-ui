import Header from '../components/Header'
import Navigation from '../components/Content/Navigation'
import Lesson from '../components/Content/Lesson'
import getLokkaClient, { query } from '../lib/lokka'

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
        <Navigation {...props.navigationData}/>
      </div>
      <div style={styles.lesson}>
        <Lesson {...props.lessonData}/>
      </div>
    </div>
  </div>
)

Content.getInitialProps = async ({ query }) => {
  const client = getLokkaClient()
  const navigationData = await Navigation.fetch(client)
  const lessonData = await Lesson.fetch(client, query.course, query.lesson)

  return { navigationData, lessonData }
}

export default Content
