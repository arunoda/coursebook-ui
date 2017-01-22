import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

const cacheMap = {}

export default function (state) {
  let url = 'http://localhost:3003/graphql'
  if (state.loginToken) {
    url = `${url}?loginToken=${state.loginToken}`
  }
  return new Lokka({
    transport: new Transport(url)
  })
}

export async function withCache (key, fn, options = {}) {
  if (cacheMap[key]) {
    return cacheMap[key].data
  }

  const data = await fn()
  setCache(key, data, options)

  return data
}

export function setCache (key, data, options = {}) {
  const isClient = typeof window !== 'undefined'
  if (cacheMap[key]) return

  if (options.client && isClient) {
    cacheMap[key] = { data }
    if (options.client.timeout) {
      setTimeout(() => delete cacheMap[key], options.client.timeout)
    }
  }
}
