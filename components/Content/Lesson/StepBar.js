import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const styles = {
  bold: {
    fontWeight: 800
  }
}

class Step extends React.Component {
  changeRoute() {
    const { href, as } = this.props
    if (!href) return

    Router.push(href, as)
  }

  render () {
    const { props } = this

    return (
      <div
        className={props.className}
        onClick={() => this.changeRoute()}
      >
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
            cursor: pointer;
            user-select: none;
          }

          div:hover {
            border: 1px solid #8fdcff;
          }

          a {
            color: #000;
            text-decoration: none;
            font-weight: 600;
          }

          .selected a {
            color: #E25E5E;
          }

          .disable a {
            cursor: not-allowed;
          }

          div.disable {
            opacity: 0.5;
            cursor: not-allowed;
          }

          div.disable:hover {
            border: 1px solid #DDD;
          }
        `}</style>
      </div>
    );
  }
}

class StepBar extends React.Component {
  renderStep (step, index) {
    const { courseId, lessonId, currentStepId } = this.props

    if (!step.visited) {
      return (
        <Step
          key={index}
          name={step.points}
          className='disable'
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
