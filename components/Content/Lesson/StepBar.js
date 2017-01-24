import React from 'react'
import Link from 'next/link'

const styles = {
  step: {
    display: 'inline-block',
    margin: 5,
    padding: 2,
    border: '1px solid #EEE',
    minWidth: 20
  }
}

class StepBar extends React.Component {
  renderStep (step, index) {
    const { courseId, lessonId } = this.props

    if (!step.visited) {
      return (
        <div style={styles.step} key={index}>
          {step.points}
        </div>
      )
    }

    return (
      <div style={styles.step} key={index}>
        <Link
          href={`/content?course=${courseId}&lesson=${lessonId}&step=${step.id}`}
          as={`/${courseId}/${lessonId}/${step.id}`}
        >
          <a>{step.points}</a>
        </Link>
      </div>
    )
  }

  render () {
    const { steps, courseId, lessonId } = this.props
    return (
      <div>
        <div style={styles.step}>
          <Link
            href={`/content?course=${courseId}&lesson=${lessonId}`}
            as={`/${courseId}/${lessonId}`}
          >
            <a>Introduction</a>
          </Link>
        </div>
        {steps.map((s, i) => this.renderStep(s, i))}
      </div>
    )
  }
}

StepBar.propTypes = {
  steps: React.PropTypes.array,
  courseId: React.PropTypes.string,
  lessonId: React.PropTypes.string
}

StepBar.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    points,
    visited
  }
`)

export default StepBar
