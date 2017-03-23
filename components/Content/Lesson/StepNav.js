import React from 'react'
import Router from 'next/router'
import ErrorBox from '~/components/ErrorBox'

const Button = (props) => (
  <button
    {...props}
  >
    {props.children}
    <style jsx>{`
      button {
        display: inline-block;
        min-width: 80px;
        margin: 0px 10px 0 0;
        padding: 6px 15px;
        line-height: 1;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: white;
        background: #699141;
        border: 2px solid #476c1d;
        border-radius: 2px;
        font-size: 13px;
        cursor: pointer;
        outline: 0;
      }

      button:hover {
        opacity: 0.8;
      }
    `}</style>
  </button>
)

class StepNav extends React.Component {
  getNextStep (direction) {
    const { steps, currentStepId } = this.props
    const currentIndex = steps.findIndex((s) => s.id === currentStepId)
    const nextStep = steps[currentIndex + direction]

    return nextStep
  }

  firePrev () {
    const { onPrev } = this.props
    const prevStep = this.getNextStep(-1)
    if (onPrev) onPrev(prevStep)
  }

  fireNext () {
    const { onNext } = this.props
    const nextStep = this.getNextStep(1)
    if (onNext) onNext(nextStep)
  }

  fireLogin () {
    const { onLogin } = this.props
    if (onLogin) onLogin()
  }

  hasNextStep () {
    const nextStep = this.getNextStep(1)
    return Boolean(nextStep)
  }

  nextLesssonUrls () {
    const { allCourses, courseId, lessonId } = this.props
    const allLessons = []

    allCourses.forEach((course) => {
      course.lessons.forEach((lesson) => allLessons.push({
        courseId: course.id, lessonId: lesson.id
      }))
    })

    const currentIndex = allLessons.findIndex((l) => l.courseId === courseId && l.lessonId === lessonId)
    const nextLesson = allLessons[currentIndex + 1]

    if (!nextLesson) return null

    return {
      as: `/${nextLesson.courseId}/${nextLesson.lessonId}`,
      href: `/content?course=${nextLesson.courseId}&lesson=${nextLesson.lessonId}`
    }
  }

  getNextLesson () {
    const urls = this.nextLesssonUrls()
    if (!urls) return null

    return (
      <Button onClick={() => Router.push(urls.href, urls.as)}>Next Lesson</Button>
    )
  }

  render () {
    const { steps, currentStepId, loading, error } = this.props
    if (error) {
      return (<ErrorBox error={error}/>)
    }

    if (loading) {
      return (<div>Loading...</div>)
    }

    if (!steps) {
      return (<Button onClick={() => this.fireLogin()}>Login & Start</Button>)
    }

    if (!currentStepId) {
      return (<Button onClick={() => this.fireNext()}>Start Now</Button>)
    }

    const nextStepButton = (<Button onClick={() => this.fireNext()}>Next</Button>)

    return (
      <div>
        <Button onClick={() => this.firePrev()}>Prev</Button>
        { this.hasNextStep() ? nextStepButton : this.getNextLesson() }
      </div>
    )
  }
}

StepNav.propTypes = {
  error: React.PropTypes.object,
  steps: React.PropTypes.array,
  courseId: React.PropTypes.string,
  lessonId: React.PropTypes.string,
  allCourses: React.PropTypes.array,
  currentStepId: React.PropTypes.string
}

StepNav.courseFragment = (c) => c.createFragment(`
  fragment on Course {
    id
    lessons {
      id
    }
  }
`)

StepNav.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    visited
  }
`)

export default StepNav
