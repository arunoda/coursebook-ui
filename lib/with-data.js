import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

export default function WithData ({
  propsToWatch,
  fetch,
  dataProps,
  cacheOptions = {}
}) {
  return function (ChildComponent) {
    class HOC extends React.Component {
      constructor (props, ...rest) {
        super(props, ...rest)
        const data = propsToData(dataProps, props)
        const key = propsToKey(propsToWatch, props)
        // We only need to do this in the very first time just after the
        // page has been loaded from SSR.
        // We don't need to run this every contructor run. But we can't
        // differentiate whether it's just after SSR or not correctly.
        // So, that's why we do this in constructor and it's safe to run
        // multiple times.
        updateCache(HOC.__cache, key, data, cacheOptions)
      }

      render () {
        return (
          <ChildComponent {...this.props} />
        )
      }
    }

    HOC.__cache = {}

    HOC.fetch = function (env, props) {
      const key = propsToKey(propsToWatch, props)
      const item = HOC.__cache[key]
      if (item) return item.data

      const data = fetch(env, props)
      updateCache(HOC.__cache, key, data, cacheOptions)

      return data
    }

    return inheritStatics(HOC, ChildComponent)
  }
}

function propsToKey (propsToWatch, props) {
  return propsToWatch
    .map((name) => JSON.stringify(props[name]))
    .join('::')
}

function propsToData (dataProps, props) {
  const data = {}
  dataProps.forEach((name) => {
    data[name] = props[name]
  })

  return data
}

function updateCache (cache, key, data, cacheOptions) {
  const isClient = typeof window !== 'undefined'
  if (cache[key]) return

  if (cacheOptions.client && isClient) {
    cache[key] = { data }
    if (cacheOptions.client.timeout) {
      setTimeout(() => delete cache[key], cacheOptions.client.timeout)
    }
  }
}

function inheritStatics (Container, ChildComponent) {
  const childDisplayName =
      // Get the display name if it's set.
      ChildComponent.displayName ||
      // Get the display name from the function name.
      ChildComponent.name ||
      // If not, just add a default one.
      'ChildComponent'

  Container.displayName = `WithData(${childDisplayName})`; // eslint-disable-line
  return hoistStatics(Container, ChildComponent)
}
