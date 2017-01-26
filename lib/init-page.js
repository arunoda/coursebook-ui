import React from 'react'
import { inheritStatics } from './utils'

let pageId = 0

export default function InitPage ({
  getProps,
  getEnv,
  rootContainers = []
}) {
  return function (Page) {
    class HOP extends React.Component {
      getChildContext () {
        return {
          nextEnv: getEnv(this.props)
        }
      }

      render () {
        return (
          <Page {...this.props} />
        )
      }
    }

    HOP.childContextTypes = {
      nextEnv: React.PropTypes.object
    }

    HOP.getInitialProps = async function (context) {
      const props = getProps(context)
      const env = getEnv(props)

      // TODO: pass these data via the context
      for (const Container of rootContainers) {
        Object.assign(props, await Container.fetch(env, props))
      }

      return props
    }

    HOP.pageId = ++pageId
    return inheritStatics(HOP, Page)
  }
}
