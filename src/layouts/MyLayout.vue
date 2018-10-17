<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary">
        <q-toolbar-title>
          Pescador
        </q-toolbar-title>
        <q-btn flat icon="more_vert">
            <q-popover>
                <q-list separator link>
                  <q-item v-close-overlay @click.native="newPost">
                    Post
                  </q-item>
                  <q-item v-close-overlay @click.native="logout">
                    Sair
                  </q-item>
                </q-list>
              </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
        <q-modal maximized content-css="padding: 10%" v-model="postopened">
                <q-field class="q-mb-sm" helper="Título">
                  <q-input 
                    type="text"
                    placeholder="Título do Post"
                    v-model="title"
                    :error="$v.form.title.$error"
                  />
                </q-field>
                <br><br>
                <q-field class="q-mb-sm" helper="Link do Vídeo">
                    <q-input 
                      type="text"
                      placeholder="cole aqui o link do vídeo"
                      v-model="video"
                    />
                  </q-field>
                <br><br>
                <q-editor
                  v-model="texto"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-flat
                  toolbar-bg="primary"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    [{
                      label: $q.i18n.editor.formatting,
                      icon: $q.icon.editor.formatting,
                      list: 'no-icons',
                      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                    }]
                  ]"
              />
              <br><br>
              <div>
                <q-btn class="float-left" color="negative" @click.native="postopened = false">Cancelar</q-btn>
                <q-btn class="float-right" color="positive" @click.native="submeterpost">Enviar</q-btn>
              </div>
        </q-modal>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Vuex from 'vuex'

import { required } from 'vuelidate/lib/validators'
import { $firestore } from '../plugins/firebase'

  
export default {
  name: 'MyLayout',
  data () {
    return {
      postopened: false,
      title: '',
      video: '',
      texto: ''
    }
  },
  validations: {
    form: {
      title: { required }
    }
  },
  computed: {
    ...Vuex.mapGetters(['loading', 'currentUser']),
  },
  methods: {
    logout() {
      Promise.resolve()
        .then(_ => this.$store.dispatch('logout'))
        .then(_ => {
          this.$router.push('/login')
        })
    },
    submeterpost() {
      var userid = this.currentUser

      var newData = {
        title: this.title,
        video: this.video,
        texto: this.texto,
        nome: userid.displayName,
        foto: userid.photoURL
      };

      $firestore.collection('Users').doc(userid.uid).collection('Posts').doc().set(newData)
      this.postopened = false

    },
    newPost () {
      this.postopened = true
    }
  }
}
</script>

<style>
</style>
