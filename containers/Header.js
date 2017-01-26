import Header from '~/components/Header'
import WithEnv from '~/lib/with-env'
import WithActions from '~/lib/with-actions'
import * as userActions from '~/actions/user'

const HeaderComponent = WithActions((env, props) => ({
  onLogin: userActions.login,
  onLogout (loginToken) {
    userActions.logout(loginToken)
  }
}))(Header)

export default WithEnv()(HeaderComponent)
