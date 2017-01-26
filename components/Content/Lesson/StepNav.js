import React from 'react'
import Router from 'next/router'

const styles = {
  item: {
    display: 'inline-block',
    margin: 5,
    minWidth: 20
  }
}

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
      <button onClick={() => Router.push(urls.href, urls.as)}>Next Lesson</button>
    )
  }

  render () {
    const { steps, currentStepId, loading } = this.props

    if (loading) {
      return (<div>'Loading...'</div>)
    }

    if (!steps) {
      return (<button style={styles.item} onClick={() => this.fireLogin()}>Login & Start</button>)
    }

    if (!currentStepId) {
      return (<button style={styles.item} onClick={() => this.fireNext()}>Start Now</button>)
    }

    const nextStepButton = (<button style={styles.item} onClick={() => this.fireNext()}>Next</button>)

    return (
      <div>
        <button style={styles.item} onClick={() => this.firePrev()}>Prev</button>
        { this.hasNextStep() ? nextStepButton : this.getNextLesson() }
      </div>
    )
  }
}

StepNav.propTypes = {
  steps: React.PropTypes.array,
  courseId: React.PropTypes.string.isRequired,
  lessonId: React.PropTypes.string.isRequired,
  allCourses: React.PropTypes.array.isRequired,
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
