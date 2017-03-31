import Lesson from '~/components/Content/Lesson'
import WithData from '~/lib/with-data'

export default WithData({
  id: 'Lesson',
  propsToWatch: ['courseId', 'lessonId'],
  cacheOptions: { client: 1000 * 60 * 60 },
  async fetch ({ lokkaClient }, props) {
    const query = `
      {
        course(id: "${props.courseId}") {
          ...${Lesson.courseFragment(lokkaClient, props)}
        }

        allCourses: courses {
          ...${Lesson.allCoursesFragment(lokkaClient, props)}
        }
      }
    `

    try {
      const result = await lokkaClient.query(query)
      return result
    } catch(err) {
      const error = { message: err.message }
      return { error }
    }
  }
})(Lesson)
