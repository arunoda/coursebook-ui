import React from 'react'
import StepNav from './StepNav'
import { withCache, setCache } from '../../../lib/lokka'
import { GetStore } from '../../../lib/store'

let Lesson = class extends React.Component {
  renderContent (lesson) {
    const { step } = this.props
    if (!step) {
      return lesson.intro
    }

    return lesson.steps.find((s) => s.id === step).text
  }

  render () {
    const { course } = this.props
    const lesson = course.lessons[0]
    setCache(`lesson-${course.id}-${lesson.id}`, { course }, Lesson.cacheOptions)

    return (
      <div>
        <h2>{lesson.name}</h2>
        {lesson.steps ? <StepNav steps={lesson.steps} courseId={course.id} lessonId={lesson.id} /> : null}
        <p>
          {this.renderContent(lesson)}
        </p>
      </div>
    )
  }
}

Lesson = GetStore()(Lesson)

Lesson.cacheOptions = { client: 1000 * 60 * 5 }
Lesson.fetch = async (state, c, courseId, lessonId) => {
  const steps = `
    steps {
      ...${StepNav.fragment(c)}
      text
    }
  `

  const query = `
    {
      course(id: "${courseId}") {
        id
        lessons(ids: ["${lessonId}"]) {
          id
          name
          intro
          ${state.loginToken ? steps : ''}
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
