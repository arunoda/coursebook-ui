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
        // Only subscribe if the watching props are different.
        if (this._oldKey !== undefined && this._oldKey === key) return

        this._oldKey = key

        if (this._removeCacheHandler) {
          this._removeCacheHandler()
        }

        const fn = (newData) => this.forceUpdate()
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
      // check the availability and validity of the cached item
      // if okay, we can send the data.
      if (item && item.expireOn > Date.now()) return item.data

      // Let's fetch again.
      const data = await fetch(env, props)
      updateCache(HOC.__cache, key, data, cacheOptions)

      return data
    }

    HOC.updateCache = function (props, updateFn) {
      const key = propsToKey(propsToWatch, props)
      const item = HOC.__cache[key]
      if (!item) throw new Error('No such item:' + key)

      const data = updateFn(item.data)

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
  if (isClient) {
    cache[key] = { data, expireOn: 0 }
    if (cacheOptions.client) {
      cache[key].expireOn = Date.now() + cacheOptions.client
    }
  }
}
