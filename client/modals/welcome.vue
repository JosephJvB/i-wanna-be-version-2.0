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
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
</style>