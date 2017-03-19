import React from 'react'
import StepBar from './StepBar'
import StepNav from '~/containers/Content/Lesson/StepNav'
import AnswerBox from '~/containers/Content/Lesson/AnswerBox'
import Markdown from './Markdown'

const Lesson = class extends React.Component {
  renderContent (lesson) {
    const { stepId } = this.props
    if (!stepId) {
      return (<Markdown content={lesson.intro}/>)
    }

    if (!lesson.steps) {
      return (<p>Unathorized Access</p>)
    }

    const step = lesson.steps.find((s) => s.id === stepId)
    if (step.visited) return (<Markdown content={step.text}/>)

    return (<p>'Not Visited Yet!'</p>)
  }

  render () {
    const { course, stepId, allCourses } = this.props
    const lesson = course.lessons[0]
    const step = lesson.steps ? lesson.steps.find((s) => s.id === stepId) : null

    return (
      <div className='lesson-area'>
        <h2>{lesson.name}</h2>
        <StepBar steps={lesson.steps || []} courseId={course.id} lessonId={lesson.id} currentStepId={stepId} />
        <div className='content'>
          {this.renderContent(lesson)}
        </div>
        {(step && step.type === 'mcq') ? <AnswerBox courseId={course.id} lessonId={lesson.id} step={step} /> : null }
        <StepNav steps={lesson.steps} courseId={course.id} lessonId={lesson.id} currentStepId={stepId} allCourses={allCourses} />
        <style jsx>{`
          h2 {
            margin: 0 0 20px 0;
            padding: 0;
            font-size: 25px;
            color: #333;
          }

          .lesson-area {
            border-left: 1px solid #DDD;
            padding-left: 20px;
          }

          .content {
            margin: 20px 0 0 0;
          }
        `}</style>
      </div>
    )
  }
}

Lesson.propTypes = {
  courseId: React.PropTypes.string,
  lessonId: React.PropTypes.string,
  stepId: React.PropTypes.string,
  course: React.PropTypes.object.isRequired,
  allCourses: React.PropTypes.array.isRequired
}

Lesson.allCoursesFragment = (c) => c.createFragment(`
  fragment on Course {
    ...${StepNav.courseFragment(c)}
  }
`)

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

  // lessonId won't be there for the `/start` page.
  // So, we need to send an empty [] to get the first lesson.
  const lessonIdParam = props.lessonId? `"${props.lessonId}"` : ''

  return c.createFragment(`
    fragment on Course {
      id
      lessons(ids: [${lessonIdParam}]) {
        id
        name
        intro
        ${props.initialState.loginToken ? steps : ''}
      }
    }
  `)
}

export default Lesson
