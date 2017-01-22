import React from 'react'

const styles = {
  step: {
    display: 'inline-block',
    margin: 5,
    padding: 2,
    border: '1px solid #EEE',
    minWidth: 20
  }
}

class StepNav extends React.Component {
  renderStep (step, index) {
    return (
      <div style={styles.step} key={index}>{step.points}</div>
    )
  }

  render () {
    const { steps } = this.props
    return (
      <div>
        {steps.map((s, i) => this.renderStep(s, i))}
      </div>
    )
  }
}

StepNav.propTypes = {
  steps: React.PropTypes.array
}

StepNav.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    points
  }
`)

export default StepNav
