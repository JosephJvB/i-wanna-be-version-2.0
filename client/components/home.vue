<template>
  <div>
    <h1>Home</h1>
    <p>current user = {{currentUsername || 'no one'}}</p>
    <router-link to="/login">back</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
   ...mapGetters(['currentUsername'])
  },
  methods: {
    // ...mapActions(['actionName'])
  }
}
</script>

<style>
</style>