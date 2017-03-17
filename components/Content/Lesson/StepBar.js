import React from 'react'
import Link from 'next/link'

const styles = {
  bold: {
    fontWeight: 800
  }
}

const Step = (props) => (
  <div className={props.className}>
    {props.href? (
      <Link
        href={props.href}
        as={props.as}
      >
        <a>{props.name}</a>
      </Link>
    ) : <a>{props.name}</a>}

    <style jsx>{`
      div {
        display: inline-block;
        padding: 5px 8px;
        font-size: 13px;
        margin-right: 5px;
        border: 1px solid #DDD;
        border-radius: 3px;
      }

      div:hover {
        border: 1px solid #03a9f4;
      }

      a {
        color: #000;
        text-decoration: none;
      }

      .selected {
        border: 1px solid #888;
        background-color: #fafafa;
      }
    `}</style>
  </div>
)

class StepBar extends React.Component {
  renderStep (step, index) {
    const { courseId, lessonId, currentStepId } = this.props

    if (!step.visited) {
      return (
        <Step
          key={index}
          name={step.points}
        />
      )
    }

    return (
      <Step 
        key={index}
        className={step.id === currentStepId ? "selected" : null}
        href={`/content?course=${courseId}&lesson=${lessonId}&step=${step.id}`}
        as={`/${courseId}/${lessonId}/${step.id}`}
        name={step.points}
      />
    )
  }

  render () {
    const { steps, courseId, lessonId, currentStepId } = this.props

    return (
      <div>
        <Step
          className={!currentStepId ? "selected" : null}
          href={`/content?course=${courseId}&lesson=${lessonId}`}
          as={`/${courseId}/${lessonId}`}
          name="Introduction"
        />
        {steps.map((s, i) => this.renderStep(s, i))}
      </div>
    )
  }
}

StepBar.propTypes = {
  steps: React.PropTypes.array,
  courseId: React.PropTypes.string,
  lessonId: React.PropTypes.string,
  currentStepId: React.PropTypes.string
}

StepBar.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    points,
    visited
  }
`)

export default StepBar
