import React from 'react'
import { inheritStatics } from './utils'
import PropTypes from 'prop-types'

export default function WithActions (actionFn) {
  return function (ChildComponent) {
    class HOC extends React.Component {
      constructor (...args) {
        super(...args)
        this.state = { newProps: {} }
      }

      handleError (err) {
        console.error(err.stack)
        this.changeProps({})
      }

      changeProps (newProps) {
        this.setState({ newProps })
      }

      getActions () {
        const promisedActions = actionFn(
          this.context.nextEnv,
          this.props,
          (newProps) => this.changeProps(newProps)
        )

        const self = this
        const actions = {}

        Object.keys(promisedActions).forEach(function (actionName) {
          actions[actionName] = function (...args) {
            Promise.resolve(promisedActions[actionName](...args))
              .then(() => null)
              .catch((err) => self.handleError(err))
          }
        })

        return actions
      }

      getProps () {
        return {
          ...this.props,
          ...this.state.newProps,
          ...this.getActions()
        }
      }

      render () {
        const props = this.getProps()
        return (
          <ChildComponent {...props} />
        )
      }
    }

    HOC.contextTypes = {
      nextEnv: PropTypes.object
    }

    return inheritStatics(HOC, ChildComponent)
  }
}
