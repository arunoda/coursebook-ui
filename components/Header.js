import React from 'react'
import Link from 'next/link'

const A = (props) => (
  <span>
    <Link href={props.href} as={props.as} onClick={props.onClick}>
      <a style={{ marginRight: 10 }} {...props} />
    </Link>
    <style jsx>{`
      a {
        color: #000;
        text-decoration: none;
        padding-right: 10px;
        font-weight: 600;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </span>
)

const ANormal = (props) => (
  <span>
    <a style={{ marginRight: 10 }} {...props} />
    <style jsx>{`
      a {
        color: #000;
        text-decoration: none;
        padding-right: 10px;
        font-weight: 600;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </span>
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
    const store = this.props.nextEnv.store
    const loginToken = store.get('loginToken')

    if (loginToken) {
      return (<ANormal href='#' onClick={(e) => this.fireAction(e, 'onLogout', loginToken)}>Logout</ANormal>)
    }

    return (<ANormal href='#' onClick={(e) => this.fireAction(e, 'onLogin')}>Login</ANormal>)
  }

  renderUserInfo () {
    const { user } = this.props
    if (!user) return null

    return (
      <span>{user.name}({user.points} points)</span>
    )
  }

  render () {
    const startHref = `/content?courseId=${FIRST_COURSE}&lessonId=${FIRST_LESSON}`
    const startAs = `/${FIRST_COURSE}/${FIRST_LESSON}`

    return (
      <div className='header'>
        <A href='/'>Home</A>
        <A href={startHref} as={startAs}>Content</A>
        { this.renderLoginLink() }
        { this.renderUserInfo() }
        <style jsx>{`
          .header {
            padding: 40px 50px;
            font-size: 14px;
            border-bottom: 1px solid #EEE
          }
        `}</style>
      </div>
    )
  }
}

Header.propTypes = {
  user: React.PropTypes.object,
  onLogout: React.PropTypes.func,
  onLogin: React.PropTypes.func
}

Header.userFragment = (c) => c.createFragment(`
  fragment on User {
    points,
    name
  }
`)
