/* global location */

export function login () {
  const href = `${BACKEND_URL}/login/github?needToken=1&appRedirectUrl=${encodeURIComponent(location.href)}`
  location.href = href
}

export function logout (loginToken) {
  const camebackUrl = `${location.href}?logout=1`
  // It's important to send the loginToken since that's the way
  // how we say our auth server to logout the user
  const href = `${BACKEND_URL}/logout?loginToken=${loginToken}&appRedirectUrl=${encodeURIComponent(camebackUrl)}`
  location.href = href
}

export async function checkAuth (lokkaClient, state, { res, req }) {
  // Handles only in the server
  if (!res) return

  // We don't need to worry, if there's no loginToken
  if (!state.loginToken) return

  const response = await lokkaClient.query(`{ user { name } }`)
  // If there's an user object, we don't need to check anything again.
  if (response.user) return true

  // Otherwise we need to clear the loginToken
  // delete the cookie
  if (res) {
    res.cookie('loginToken', '', {
      expires: new Date(Date.now(0)),
      httpOnly: false
    })
  }

  delete state.loginToken
}
