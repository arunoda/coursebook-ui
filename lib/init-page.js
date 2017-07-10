import React from 'react'
import { inheritStatics } from './utils'
import PropTypes from 'prop-types'

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
          nextEnv: getEnv(this.props),
          nextData: this.props.__nextData
        }
      }

      render () {
        return (
          <Page {...this.props} />
        )
      }
    }

    HOP.childContextTypes = {
      nextEnv: PropTypes.object,
      nextData: PropTypes.object
    }

    HOP.getInitialProps = async function (context) {
      const props = await getProps(context)
      const env = getEnv(props)

      // TODO: pass these data via the context
      props.__nextData = {}
      for (const Container of rootContainers) {
        props.__nextData[Container.__id] = await Container.fetch(env, props)
      }

      return props
    }

    HOP.pageId = ++pageId
    return inheritStatics(HOP, Page)
  }
}
