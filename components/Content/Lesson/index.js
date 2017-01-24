import React from 'react'
import StepBar from './StepBar'

let Lesson = class extends React.Component {
  renderContent (lesson) {
    const { stepId } = this.props
    if (!stepId) {
      return lesson.intro
    }

    const step = lesson.steps.find((s) => s.id === stepId)
    if (step.visited) {
      return step.text
    }

    return 'Not Visited Yet!'
  }

  render () {
    const { course, courseId, lessonId } = this.props
    const lesson = course.lessons[0]

    return (
      <div>
        <h2>{lesson.name}</h2>
        {lesson.steps ? <StepBar steps={lesson.steps} courseId={courseId} lessonId={lessonId} /> : null}
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
      ...${StepBar.fragment(c)}
      text
      visited
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
