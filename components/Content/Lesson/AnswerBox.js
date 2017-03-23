import React from 'react'

const styles = {
  box: {
    border: '1px solid #DDD',
    margin: '10px 0 20px 0',
    padding: 10,
    backgroundColor: '#EFEFEF'
  },
  red: {
    color: 'red'
  },
  green: {
    color: 'green'
  }
}

const Area = (props) => (
  <div>
    {props.children}
    <style jsx>{`
      div {
        border: 1px solid #FFE0B2;
        max-width: 580px;
        padding: 10px;
        margin: 0 0 20px 0;
        background-color: #FFF8E1;
      }
    `}</style>
  </div>
)

class Answer extends React.Component {
  render () {
    const { answer, onChange, symbol } = this.props

    return (
      <div>
        {symbol? symbol : (
          <input
            type='radio'
            value={answer}
            name='answer'
            onChange={(e) => onChange(e)}
          />
        )}
        <span>{answer}</span>
        <style jsx>{`
          div {
            font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
            font-size: 15px;
            margin: 0 0 5px 0;
            letter-spacing: 0.1px;
            vertical-align: center;
          }

          input {
            margin: 0;
            padding: 0;
            top: -2px;
            display: inline-block;
          }

          span {
            margin: 0 0 0 10px;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}

const CorrectAnswer = ({ correctAnswer }) => (
  <div>
    <span><b>Correct answer is:</b> {correctAnswer}</span>
    <style jsx>{`
      div {
        font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
        font-size: 14px;
        margin: 15px 0 7px 0;
      }

      span {
        padding: 3px 10px;
        border-radius: 2px;
        border: 2px solid #FF5722;
      }
    `}</style>
  </div>
)

class AnswerBox extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = { answer: null }
  }

  chooseAnswer (e) {
    this.setState({
      answer: e.target.value
    })
  }

  handleSubmit () {
    const { answer } = this.state
    const { onSubmit } = this.props

    if (onSubmit) onSubmit(answer)
  }

  renderPrompt () {
    const { step } = this.props

    return (
      <Area>
        {step.answers.map((answer) => (
          <Answer
            key={answer}
            answer={answer}
            onChange={(e) => this.chooseAnswer(e)}
          />
        ))}
        <button onClick={() => this.handleSubmit()}>Submit</button>
        <style jsx>{`
          button {
            margin: 10px 0 0 0;
            border: 2px solid #2d88ba;
            border-radius: 2px;
            font-size: 12px;
            padding: 3px 15px;
            background-color: #00BCD4;
            cursor: pointer;
            color: #FFF;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          button:hover {
            opacity: 0.7;
          }
        `}</style>
      </Area>
    )
  }

  renderStatus () {
    const { step } = this.props
    const isCorrect = step.givenAnswer === step.correctAnswer

    const getSymbol = (answer) => {
      if (answer !== step.givenAnswer) return (<span>✦</span>)
      if (isCorrect) return (<span style={styles.green}>✓</span>)
      return (<span style={styles.red}>✘</span>)
    }

    return (
      <Area>
        {step.answers.map((answer) => (
          <Answer
            key={answer}
            answer={answer}
            symbol={getSymbol(answer)}
          />
        ))}
        {!isCorrect ? <CorrectAnswer correctAnswer={step.correctAnswer} /> : null}
        <style jsx>{`

        `}</style>
      </Area>
    )
  }

  render () {
    const { step, loading } = this.props

    if (loading) return (<p>Loading...</p>)
    if (!step.givenAnswer) return this.renderPrompt()
    return this.renderStatus()
  }
}

AnswerBox.propTypes = {
  step: React.PropTypes.object.isRequired,
  courseId: React.PropTypes.string,
  lessonId: React.PropTypes.string
}

AnswerBox.fragment = (c) => c.createFragment(`
  fragment on Step {
    id,
    answers,
    correctAnswer,
    givenAnswer
  }
`)

export default AnswerBox
