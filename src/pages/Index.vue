<template>
  <q-page class="flex flex-center">
      <q-card inline class="q-ma-sm">
          <q-card-media>
            <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />
          </q-card-media>
          <q-card-title>
            Title
            <span slot="subtitle">Subtitle</span>
          </q-card-title>
          <q-card-main>
            {{ lorem }}
          </q-card-main>
      </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
