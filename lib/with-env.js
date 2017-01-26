import React from 'react'
import { inheritStatics } from '~/lib/utils'

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
      nextEnv: React.PropTypes.object
    }

    return inheritStatics(HOC, ChildComponent)
  }
}
