import firebase from 'firebase/app'
import 'firebase/auth' // eslint-disable-line
import 'firebase/database' // eslint-disable-line
import 'firebase/firestore' // eslint-disable-line
import 'firebase/functions' // eslint-disable-line
import { LocalStorage } from 'quasar'

const firebaseConfigProd = {
    apiKey: "AIzaSyD0zb_DqCFvf3XV7PhIbwk-4TURIO8eI9k",
    authDomain: "pescador-3727c.firebaseapp.com",
    databaseURL: "https://pescador-3727c.firebaseio.com",
    projectId: "pescador-3727c",
    storageBucket: "pescador-3727c.appspot.com",
    messagingSenderId: "48188014910"
}

const firebaseConfig = firebaseConfigProd

// initialize Firebase from settings
const $fbApp = firebase.initializeApp(firebaseConfig)
const $auth = $fbApp.auth()
const $db = firebase.database()
const $firestore = firebase.firestore()
const $functions = firebase.functions()
$firestore.settings({ timestampsInSnapshots: true })

// Enable logging
// firebase.database.enableLogging(!!process.env.DEV)

export default ({ router, store }) => {
  const localUser = JSON.parse(LocalStorage.get.item('user') || '{}')
  store.commit('setUser', localUser)

  // watch user authentication state
  $auth.onAuthStateChanged(user => {
    if (user) {
      const { uid, email, emailVerified, displayName, photoURL } = user
      // const providerData = user.providerData;
      store.commit('setUser', { uid, email, emailVerified, displayName, photoURL, nome: displayName })
    } else {
      store.commit('setUser', null)
    }

    // if(user && router.currentRoute.fullPath === '/') {
    //   router.replace({name: 'projects' })
    // }
  })
}

export { firebase, $fbApp, $auth, $db, $firestore, $functions }
