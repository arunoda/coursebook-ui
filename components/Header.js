import React from 'react'
import Link from 'next/link'
import { GetEnv } from '../lib/env'

const A = (props) => (
  <Link href={props.href} as={props.as}>
    <a style={{ marginRight: 10 }} {...props} />
  </Link>
)

let Header = class extends React.Component {
  renderLoginLink () {
    const { store } = this.props
    const loginToken = store.get('loginToken')

    if (loginToken) {
      const href = 'http://localhost:3003/Logout?appRedirectUrl=http://localhost:4004/logout'
      return (<A href={href}>Logout</A>)
    }

    const href = 'http://localhost:3003/login/github?needToken=1&appRedirectUrl=http://localhost:4004'
    return (<A href={href}>Login</A>)
  }

  render () {
    return (
      <div className='header'>
        <A href='/'>Home</A>
        <A href='/content?course=simple&lesson=lesson-one' as='/simple/lesson-one'>Content</A>
        { this.renderLoginLink() }
      </div>
    )
  }
}

Header = GetEnv()(Header)

export default Header
