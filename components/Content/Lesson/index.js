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
    const { course, courseId, lessonId } = this.props
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

Lesson.propTypes = {
  courseId: React.PropTypes.string.isRequired,
  lessonId: React.PropTypes.string.isRequired,
  stepId: React.PropTypes.string,
  course: React.PropTypes.object.isRequired
}

Lesson.courseFragment = (c, props) => {
  const steps = `
    steps {
      ...${StepNav.fragment(c)}
      text
    }
  `

  return c.createFragment(`
    fragment on Course {
      id
      lessons(ids: ["${props.lessonId}"]) {
        id
        name
        intro
        ${props.initialState.loginToken ? steps : ''}
      }
    }
  `)
}

export default Lesson
