import BrowserCookies from 'js-cookies'

export default function getInitialState (context) {
  const isServer = Boolean(context.req)
  if (isServer) {
    const { loginToken } = context.req.cookies
    return { loginToken }
  }

  const loginToken = BrowserCookies.getItem('loginToken')
  return { loginToken }
}
