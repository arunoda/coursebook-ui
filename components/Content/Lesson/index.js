import React from 'react'
import StepBar from './StepBar'
import StepNav from '~/containers/Content/Lesson/StepNav'
import AnswerBox from '~/containers/Content/Lesson/AnswerBox'
import ErrorBox from '~/components/ErrorBox'
import Markdown from './Markdown'
import Head from 'next/head'
import PropTypes from 'prop-types'

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
    const { course, courseId, lessonId, stepId, allCourses, error } = this.props

    if (error) return (<ErrorBox error={error} />)

    const lesson = course.lessons[0]
    const step = lesson.steps ? lesson.steps.find((s) => s.id === stepId) : null

    return (
      <div className='lesson-area'>
        <Head>
          <title>{lesson.name} - {SITE_NAME}</title>
        </Head>
        <h2>{lesson.name}</h2>
        <StepBar steps={lesson.steps || []} courseId={courseId} lessonId={lessonId} currentStepId={stepId} />
        <div className='content'>
          {this.renderContent(lesson)}
        </div>
        {(step && step.type === 'mcq') ? <AnswerBox courseId={courseId} lessonId={lessonId} step={step} /> : null }
        <StepNav steps={lesson.steps} courseId={courseId} lessonId={lessonId} currentStepId={stepId} allCourses={allCourses} />
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
  error: PropTypes.object,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  stepId: PropTypes.string,
  course: PropTypes.object,
  allCourses: PropTypes.array
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
