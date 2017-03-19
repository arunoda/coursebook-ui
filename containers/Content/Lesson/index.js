import Lesson from '~/components/Content/Lesson'
import WithData from '~/lib/with-data'

export default WithData({
  id: 'Lesson',
  propsToWatch: ['courseId', 'lessonId'],
  cacheOptions: { client: 1000 * 60 * 5 },
  fetch ({ lokkaClient }, props) {
    // The "courseId" can be undefined when in the `/start` page.
    // Then we need to send null as the courseId to get the first course.
    const courseIdParam = props.courseId? `"${props.courseId}"` : 'null'
    const query = `
      {
        course(id: ${courseIdParam}) {
          ...${Lesson.courseFragment(lokkaClient, props)}
        }

        allCourses: courses {
          ...${Lesson.allCoursesFragment(lokkaClient, props)}
        }
      }
    `

    return lokkaClient.query(query)
  }
})(Lesson)
