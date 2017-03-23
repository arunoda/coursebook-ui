import React from 'react'
import { login } from '~/actions/user'

export default class ErrorBox extends React.Component {
  login (e) {
    e.preventDefault()
    login()
  }

  render () {
    const { error } = this.props
    return (
      <div>
        <h1>Error</h1>
        <h2>{error.message}</h2>
        <p>
          <a href='#' onClick={(e) => this.login(e)}>Login again</a>
          , to resolve the issue.</p>
        <style jsx>{`
          div {
            border: 2px solid red;
            margin: 0 0 20px 0;
            padding: 20px;
            max-width: 560px;
          }

          h1 {
            margin: 0 0 0px 0;
            padding: 0;
            color: #F44336;
          }

          h2 {
            margin: 0;
            padding: 0 0 5px 0;
            font-size: 16px;
            color: #333;
            font-weight: 400;
            border-bottom: 1px solid #b6b6b6;
          }

          p {
            font-size: 14px;
          }

          a {
            color: #2196F3;
            text-decoration: none;
            border-bottom: 1px solid #2196F3;
          }
        `}</style>
      </div>
    )
  }
}
