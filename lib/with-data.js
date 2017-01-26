import React from 'react'
import { inheritStatics } from './utils'
import mitt from 'mitt'

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

      subscribe (props) {
        const key = propsToKey(propsToWatch, props)
        if (this._oldKey !== undefined && this._oldKey === key) return

        this._oldKey = key

        if (this._removeCacheHandler) {
          this._removeCacheHandler()
        }

        const fn = (newData) => {
          this.forceUpdate()
        }
        HOC.__cacheHandlers.on(key, fn)
        this._removeCacheHandler = () => {
          HOC.__cacheHandlers.off(key, fn)
        }
      }

      componentDidMount () {
        this.subscribe(this.props)
      }

      componentWillReceiveProps (props) {
        this.subscribe(props)
      }

      componentWillUnmount () {
        this._removeCacheHandler()
      }

      render () {
        const key = propsToKey(propsToWatch, this.props)
        const cacheItem = HOC.__cache[key]
        const props = {
          ...this.props,
          ...(cacheItem ? cacheItem.data : {})
        }

        return (
          <ChildComponent {...props} />
        )
      }
    }

    HOC.__cache = {}
    HOC.__cacheHandlers = mitt()

    HOC.fetch = async function (env, props) {
      const key = propsToKey(propsToWatch, props)
      const item = HOC.__cache[key]
      if (item) return item.data

      const data = await fetch(env, props)
      updateCache(HOC.__cache, key, data, cacheOptions)

      return data
    }

    HOC.updateCache = function (props, updateFn) {
      const key = propsToKey(propsToWatch, props)
      const item = HOC.__cache[key]
      if (!item) throw new Error('No such item:' + key)

      const data = updateFn(item.data)
      clearTimeout(item.timeoutHandler)

      updateCache(HOC.__cache, key, data, cacheOptions)
      HOC.__cacheHandlers.emit(key, data)
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

  if (cacheOptions.client && isClient) {
    cache[key] = { data }
    if (cacheOptions.client.timeout) {
      cache[key].timeoutHandler = setTimeout(() => delete cache[key], cacheOptions.client.timeout)
    }
  }
}
