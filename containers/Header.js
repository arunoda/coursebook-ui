import Header from '~/components/Header'
import WithEnv from '~/lib/with-env'
import WithActions from '~/lib/with-actions'
import WithData from '~/lib/with-data'
import * as userActions from '~/actions/user'

let HeaderComponent

HeaderComponent = WithData({
  id: 'Header',
  propsToWatch: [],
  cacheOptions: { client: 1000 * 60 * 5 },
  fetch ({ lokkaClient }, props) {
    const query = `
      {
        user {
          ...${Header.userFragment(lokkaClient)}
        }
      }
    `
    return lokkaClient.query(query)
  }
})(Header)

HeaderComponent = WithActions((env, props) => ({
  onLogin: userActions.login,
  onLogout (loginToken) {
    userActions.logout(loginToken)
  }
}))(HeaderComponent)

export default WithEnv()(HeaderComponent)
