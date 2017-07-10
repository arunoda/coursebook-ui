import React from 'react'
import { inheritStatics } from '~/lib/utils'
import PropTypes from 'prop-types'

export default function WithEnv () {
  return function (ChildComponent) {
    class HOC extends React.Component {
      render () {
        const { nextEnv } = this.context
        const newProps = {
          ...this.props,
          nextEnv
        }

        return (<ChildComponent {...newProps} />)
      }
    }

    HOC.contextTypes = {
      nextEnv: PropTypes.object
    }

    return inheritStatics(HOC, ChildComponent)
  }
}
