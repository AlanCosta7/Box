import firebaseui from 'firebaseui'
import { $auth } from './firebase'

export default ({ Vue }) => {
  Vue.prototype.$firebaseui = new firebaseui.auth.AuthUI($auth)
}

