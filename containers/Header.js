import Header from '~/components/Header'
import { GetEnv } from '~/lib/env'
import WithActions from '~/lib/with-actions'
import * as userActions from '~/actions/user'

const HeaderComponent = WithActions((props) => ({
  onLogin: userActions.login,
  onLogout (loginToken) {
    console.log('XXX', loginToken)
    userActions.logout(loginToken)
  }
}))(Header)

export default GetEnv()(HeaderComponent)
