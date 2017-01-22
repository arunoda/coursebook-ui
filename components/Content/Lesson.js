import React from 'react'
import { withCache, setCache } from '../../lib/lokka'

class Lesson extends React.Component {
  render() {
    const { course } = this.props
    const lesson = course.lessons[0]
    setCache(`lesson-${course.id}-${lesson.id}`, { course }, Lesson.cacheOptions)
    
    return (
      <div>
        <h2>{lesson.name}</h2>
        <p>
          {lesson.intro}
        </p>
      </div>
    )
  }
}

Lesson.cacheOptions = { client: 1000 * 60 * 5 }
Lesson.fetch = async (c, courseId, lessonId) => {
  const query = `
    {
      course(id: "${courseId}") {
        id
        lessons(ids: ["${lessonId}"]) {
          id
          name
          intro
        }
      }
    }
  `

  const data = await withCache(`lesson-${courseId}-${lessonId}`, async () => {
    return c.query(query)
  }, Lesson.cacheOptions)

  return data
}

export default Lesson
