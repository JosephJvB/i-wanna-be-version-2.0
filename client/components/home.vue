<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">back</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
  //  state: mapGetters(['getterName']) 
  },
  methods: {
    toLogin() {
      this.$router.push('/')
    }
    // actions: mapActions(['actionName'])
  }
}
</script>

<style>
</style>