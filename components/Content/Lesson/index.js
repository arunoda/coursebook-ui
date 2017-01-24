import React from 'react'
import StepNav from './StepNav'
import WithData from '../../../lib/with-data'

let Lesson = class extends React.Component {
  renderContent (lesson) {
    const { stepId } = this.props
    if (!stepId) {
      return lesson.intro
    }

    return lesson.steps.find((s) => s.id === stepId).text
  }

  render () {
    const { course } = this.props
    const lesson = course.lessons[0]

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

export default WithData({
  propsToWatch: ['courseId', 'lessonId'],
  dataProps: ['course'],
  cacheOptions: { client: 1000 * 60 * 5 },
  fetch ({ lokkaClient }, { initialState, courseId, lessonId }) {
    const steps = `
      steps {
        ...${StepNav.fragment(lokkaClient)}
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
            ${initialState.loginToken ? steps : ''}
          }
        }
      }
    `

    return lokkaClient.query(query)
  }
})(Lesson)
