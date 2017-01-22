import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

const cacheMap = {}

export default function () {
  return new Lokka({
    transport: new Transport('http://localhost:3003/graphql')
  })
}

export async function query(client, query) {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return await client.query(query)
  }
  
  const cachedResult = cacheMap[query]
  if (cachedResult) return cachedResult

  const result = await client.query(query)
  cacheMap[query] = result

  return result
}
