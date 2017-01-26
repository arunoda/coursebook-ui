import React from 'react'
import Link from 'next/link'

const A = (props) => (
  <Link href={props.href} as={props.as} onClick={props.onClick}>
    <a style={{ marginRight: 10 }} {...props} />
  </Link>
)

export default class Header extends React.Component {
  fireAction (e, name, ...args) {
    e.preventDefault()
    const action = this.props[name]
    if (action) {
      action(...args)
    }
  }

  renderLoginLink () {
    const { store } = this.props
    const loginToken = store.get('loginToken')

    if (loginToken) {
      return (<a href='#' onClick={(e) => this.fireAction(e, 'onLogout', loginToken)}>Logout</a>)
    }

    return (<a href='#' onClick={(e) => this.fireAction(e, 'onLogin')}>Login</a>)
  }

  render () {
    return (
      <div className='header'>
        <A href='/'>Home</A>
        <A href='/content?course=first-course&lesson=lesson-one' as='/first-course/lesson-one'>Content</A>
        { this.renderLoginLink() }
      </div>
    )
  }
}
