import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

export let savedLokkaClient

export default function (state) {
  const isClient = typeof window !== 'undefined'

  let url = 'http://localhost:3003/graphql'
  if (state.loginToken) {
    url = `${url}?loginToken=${state.loginToken}`
  }

  const lokkaClient = new Lokka({
    transport: new Transport(url)
  })

  if (isClient) {
    savedLokkaClient = lokkaClient
  }

  return lokkaClient
}
