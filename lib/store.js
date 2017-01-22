import React from 'react'
import Podda from 'podda'
import BrowserCookies from 'js-cookies'
import { withContext, getContext } from 'recompose'

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

export function WithStore () {
  return withContext(
    { store: React.PropTypes.object },
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

      return { store }
    }
  )
}

export function GetStore () {
  return getContext(
    { store: React.PropTypes.object }
  )
}
