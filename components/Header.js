/* global location */

import React from 'react'
import Link from 'next/link'
import { GetEnv } from '../lib/env'

const A = (props) => (
  <Link href={props.href} as={props.as} onClick={props.onClick}>
    <a style={{ marginRight: 10 }} {...props} />
  </Link>
)

let Header = class extends React.Component {
  renderLoginLink () {
    const { store } = this.props
    const loginToken = store.get('loginToken')

    if (loginToken) {
      const doLogout = (e) => {
        e.preventDefault()
        const camebackUrl = `${location.href}?logout=1`
        // It's important to send the loginToken since that's the way
        // how we say our auth server to logout the user
        const href = `http://localhost:3003/logout?loginToken=${loginToken}&appRedirectUrl=${encodeURIComponent(camebackUrl)}`
        location.href = href
      }

      return (<a href='#' onClick={doLogout}>Logout</a>)
    }

    const doLogin = (e) => {
      e.preventDefault()
      const href = `http://localhost:3003/login/github?needToken=1&appRedirectUrl=${encodeURIComponent(location.href)}`
      location.href = href
    }

    return (<a href='#' onClick={doLogin}>Login</a>)
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

Header = GetEnv()(Header)

export default Header
