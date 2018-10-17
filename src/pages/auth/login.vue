<template>
    <q-page>
       <q-layout class="flex column">
          <div class="bg-amber-8 cardtop">
            <router-link to="/">
             <!-- <base-logo></base-logo> -->
            </router-link>
          </div>
          <div class="imagemthinking gt-md">
            <img src="" alt="">
          </div>
          <div class="flex flex-center">
            <div class="flex flex-center column shadow-4 cardlogin" v-show="!currentUser">
                <h2 class="text-primary text-bold">Login</h2>
                <p class="subtitulo">A maior plataforma de conteúdo cristão</p>
                <div id="firebaseui-auth-container"></div>
            </div>
            <div class="flex flex-center column shadow-4 cardlogin" v-show="currentUser">
                <h2 class="q-headline">Você já está conectado!</h2>
                <h3>Redirecionando...</h3>
                <!-- <div>
                  <p class="q-mt-lg q-mb-none text-center">O que você quer?</p>
                  <q-btn class="q-ma-lg" color="negative" flat @click="logout()">Desconectar</q-btn>
                  <q-btn class="q-ma-lg" color="primary" :to="'/app/projects'">Acessar seu ambiente</q-btn>
                </div> -->
            </div>
          </div>
        <q-layout-footer reveal class="no-shadow">
          <div class="row items-center">
            <div class="col-12 col-md-5">
              <base-social></base-social>
            </div>
            <div class="col-12 col-md-7 text-right">
              <q-btn flat class="q-mx-md lowercase" to="../legal/terms-of-service">termos de uso</q-btn>
              <q-btn flat class="q-mx-md lowercase" to="../legal/privacy">política de privacidade</q-btn>
              <q-btn flat class="q-mx-md lowercase" to="../legal/sobre">sobre</q-btn>
              <q-btn flat class="q-mx-md lowercase">contato</q-btn>
            </div>
          </div>
        </q-layout-footer>
      </q-layout>
    </q-page>
</template>

<script>
import Vuex from 'vuex'
import { firebase } from '../../plugins/firebase.js'
import BaseLogo from 'components/base-logo'
import BaseSocial from 'components/base-social'

export default {
  name: 'PageLogin',
  meta: { title: 'garage thinking - Login' },
  components: {
    BaseLogo,
    BaseSocial
  },
  data() {
    return {}
  },
  mounted() {
    if (this.currentUser) {
      const rediretDelay = 2000
      this.redirectToApp(rediretDelay)
      return
    }
    // Confgiure and add the FirebaseUI Widget
    let signInFlow = 'popup'
    // For iOS full screen apps we use the redirect auth mode.
    if ('standalone' in window.navigator && window.navigator.standalone) {
      signInFlow = 'redirect'
    }

    const uiConfig = {
      signInFlow: signInFlow,
      // signInSuccessUrl: '/auth/success',
      // signInSuccessUrl: '/app/projects',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      tosUrl: '/legal/terms-of-service',
      privacyPolicyUrl: '/legal/privacy',
      callbacks: {
        uiShown: function() {
          // The widget is rendered.

          // Update text content of buttons
          updateLabels()
          function updateLabels() {
            const elGoogle = document.querySelector('.firebaseui-idp-google .firebaseui-idp-text-long')
            const elFacebook = document.querySelector('.firebaseui-idp-facebook .firebaseui-idp-text-long')
            // const elEmail = document.querySelector('.firebaseui-idp-password .firebaseui-idp-text-long')
            const elementsExists = elGoogle && elFacebook /* && elEmail */
            if (!elementsExists) {
              window.requestAnimationFrame(updateLabels)
            } else {
              elGoogle.textContent = 'Acessar com Google'
              elFacebook.textContent = 'Acessar com Facebook'
              // elEmail.textContent = 'Acessar com Email'
            }
          }
        }
      }
    }
    this.$firebaseui.start('#firebaseui-auth-container', uiConfig)
  },
  computed: {
    ...Vuex.mapGetters({
      currentUser: 'currentUser'
    })
  },
  methods: {
    ...Vuex.mapActions(['logout']),
    redirectToApp(redirectDelay) {
      this.$q.loading.show({ delay: 300 })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$router.push("/")
      }, redirectDelay)
    }
  },
  watch: {
    currentUser(newUser, oldUser) {
      if (newUser) {
        // user is logged, so... lets redirect to App
        this.redirectToApp(1000)
      }
    }
  }
}
</script>

<style scope>
.imagemthinking {
  position: absolute;
  right: 1rem;
  top: 50px;
}
.cardtop {
  width: 100%;
  height: 200px;
  padding: 1rem;
  text-align: center;
}

.base-logo {
  max-width: 200px;
}

.cardlogin {
  position: relative;
  margin-top: -100px;
  border-radius: 5px;
  background-color: white;
  padding: 2rem 2rem;
}

.subtitulo {
  font-size: 1.5em;
}

.firebaseui-idp-button {
  max-width: 300px;
  min-height: 60px;
  border-radius: 30px;
}

.firebaseui-idp-text {
  font-size: 18px;
}

h1 {
  font-size: 56px;
  font-weight: 200;
}

h2 {
  font-size: 28px;
  font-weight: 300;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

@media only screen and (max-width: 480px) {
  h1 {
    font-size: 10vw;
  }
  h2 {
    font-size: 10vw;
  }

  .q-layout-footer {
    position: relative;
    margin: 1rem 0;
  }

  .q-layout-footer .q-btn {
    display: block;
  }

  .base-social {
    width: 100vw;
    text-align: center;
  }

  .base-social a {
    width: 16vw;
    margin: 0 4vw;
  }

  .base-social img {
    width: 100%;
  }
}
</style>
