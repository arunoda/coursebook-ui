import React from 'react'

const styles = {
  item: {
    display: 'inline-block',
    margin: 5,
    minWidth: 20
  }
}

class StepNav extends React.Component {
  render () {
    const { steps, currentStepId } = this.props

    if (!steps) {
      return (<button style={styles.item}>Login & Start</button>)
    }

    if (!currentStepId) {
      return (<button style={styles.item}>Start Now</button>)
    }

    return (
      <div>
        <button style={styles.item}>Prev</button>
        <button style={styles.item}>Next</button>
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
