import React from 'react'
import Podda from 'podda'
import BrowserCookies from 'js-cookies'
import { withContext, getContext } from 'recompose'
import createLokkaClient from './lokka'
import { inheritStatics } from './utils'

let store

export function getInitialState (context) {
  const isServer = Boolean(context.req)
  if (isServer) {
    const { loginToken } = context.req.cookies
    return { loginToken }
  }

  const loginToken = BrowserCookies.getItem('loginToken')
  return { loginToken }
}

export function WithEnv () {
  return withContext(
    {
      store: React.PropTypes.object,
      lokkaClient: React.PropTypes.object
    },
    (props) => {
      if (!props.initialState) {
        throw new Error('Did not receive "initialState" prop to create the store')
      }

      const isServer = typeof window === 'undefined'
      if (isServer) {
        const store = new Podda(props.initialState)
        return { store }
      }

      if (!store) {
        store = new Podda(props.initialState)
      }

      const lokkaClient = createLokkaClient(props.initialState)
      return { store, lokkaClient }
    }
  )
}

export function GetEnv () {
  const fn = getContext(
    {
      store: React.PropTypes.object,
      lokkaClient: React.PropTypes.object,
      nextEnv: React.PropTypes.object
    }
  )

  return function (ChildComponent) {
    const HOC = fn(ChildComponent)
    return inheritStatics(HOC, ChildComponent)
  }
}
