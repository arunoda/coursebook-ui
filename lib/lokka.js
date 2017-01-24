import Lokka from 'lokka'
import Transport from 'lokka-transport-http'

export default function (state) {
  let url = 'http://localhost:3003/graphql'
  if (state.loginToken) {
    url = `${url}?loginToken=${state.loginToken}`
  }
  return new Lokka({
    transport: new Transport(url)
  })
}
