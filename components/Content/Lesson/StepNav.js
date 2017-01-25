import React from 'react'

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

  hasNextStep () {
    const nextStep = this.getNextStep(1)
    return Boolean(nextStep)
  }

  render () {
    const { steps, currentStepId, loading } = this.props

    if (loading) {
      return (<div>'Loading...'</div>)
    }

    if (!steps) {
      return (<button style={styles.item}>Login & Start</button>)
    }

    if (!currentStepId) {
      return (<button style={styles.item} onClick={() => this.fireNext()}>Start Now</button>)
    }

    return (
      <div>
        <button style={styles.item} onClick={() => this.firePrev()}>Prev</button>
        { this.hasNextStep() ? <button style={styles.item} onClick={() => this.fireNext()}>Next</button> : null}
      </div>
    )
  }
}

StepNav.propTypes = {
  steps: React.PropTypes.array,
  courseId: React.PropTypes.string.isRequired,
  lessonId: React.PropTypes.string.isRequired,
  currentStepId: React.PropTypes.string
}

StepNav.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    visited
  }
`)

export default StepNav
