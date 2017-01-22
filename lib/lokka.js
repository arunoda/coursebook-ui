import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

const cacheMap = {}

export default function () {
  return new Lokka({
    transport: new Transport('http://localhost:3003/graphql')
  })
}

export async function withCache(key, fn, options = {}) {
  const isServer = typeof window === 'undefined'
  if (cacheMap[key]) {
    return cacheMap[key].data
  }

  const data = await fn()
  setCache(key, data, options)

  return data
}

export function setCache(key, data, options = {}) {
  if (cacheMap[key]) return

  if (options.client) {
    cacheMap[key] = { data }
    if (options.client.timeout) {
      setTimeout(() => delete cacheMap[key], options.client.timeout)
    }
  }
}
