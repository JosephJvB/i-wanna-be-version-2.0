<template>
  <div>
    <h1>Welcome!</h1>
    <router-link to="/login" class="d-flex">
      <i class="material-icons">person</i>
      <button>Login</button>
    </router-link>
    <router-link to="/register" class="d-flex">
      <i class="material-icons">person_add</i>
      <button>Register</button>
    </router-link>
    <h3>{{activeUsers}} active users</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['activeUsers'])
  },
  methods: {
    ...mapActions(['initSockets'])
  },
  mounted() {
    this.initSockets()
  }
}
</script>

<style>
</style>