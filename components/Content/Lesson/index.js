import React from 'react'
import StepBar from './StepBar'
import StepNav from '../../../containers/Content/Lesson/StepNav'
import AnswerBox from '../../../containers/Content/Lesson/AnswerBox'

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
    const { course, courseId, lessonId, stepId } = this.props
    const lesson = course.lessons[0]
    const step = lesson.steps? lesson.steps.find((s) => s.id === stepId) : null

    return (
      <div>
        <h2>{lesson.name}</h2>
        {lesson.steps ? <StepBar steps={lesson.steps} courseId={courseId} lessonId={lessonId} currentStepId={stepId} /> : null}
        <p>
          {this.renderContent(lesson)}
        </p>
        {(step && step.type === 'mcq') ? <AnswerBox courseId={courseId} lessonId={lessonId} step={step} /> : null }
        <StepNav steps={lesson.steps} courseId={courseId} lessonId={lessonId} currentStepId={stepId} />
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
      ...${AnswerBox.fragment(c)}
      type
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
