import Lesson from '../../components/Content/Lesson'
import WithData from '../../lib/with-data'

export default WithData({
  propsToWatch: ['courseId', 'lessonId'],
  dataProps: ['course'],
  cacheOptions: { client: 1000 * 60 * 5 },
  fetch ({ lokkaClient }, props) {
    const query = `
      {
        course(id: "${props.courseId}") {
          ...${Lesson.courseFragment(lokkaClient, props)}
        }
      }
    `

    return lokkaClient.query(query)
  }
})(Lesson)
