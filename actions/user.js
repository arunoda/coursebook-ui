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
