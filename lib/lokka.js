import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

export let savedLokkaClient

export default function (state) {
  const isClient = typeof window !== 'undefined'

  let url = `${BACKEND_URL}/graphql`
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
