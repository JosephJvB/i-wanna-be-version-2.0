<template>
  <div>
    <h1>Login</h1>
    <form>
      <label>Username</label>
      <input type="text" v-model="form.username" name="username"/>
      <label>Password</label>
      <input type="password" v-model="form.password" name="password"/>
      <button @click.prevent="doLogin">Submit</button>
      <p>todo: create 'continue as guest' option</p>
      <button @click.prevent="doGuestLogin">Login as Guest</button>
      <div>
        No account?
        <router-link to="/register">register here</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
  ...mapGetters(['currentUser']) 
  },
  methods: {
    ...mapActions(['requestLogin', 'requestGuestLogin']),
    // pull in login action from vuex store
    doLogin() {
      if(this.currentUser) {
        return console.error('User already logged in. Please logout before logging in to another account')
      }
      //check that username and password exist
      if(!this.form.username || !this.form.password) {
        return console.error('Please fill username field and password field to complete login')
      }
      this.requestLogin(this.form)
        .then(response => {
          console.log('user logged in', response)
          this.$router.push('/')
        })
        .catch(console.error)
    },
    doGuestLogin() {
      // if you already have an active token in vuex return? (cos you're already logged in)
      if(this.currentUser) {
        return console.error('User already logged in. Please logout before logging in to another account')
      }
      this.requestGuestLogin()
        .then(response => {
          console.log('guest logged in', response)
          this.$router.push('/')
        })
        .catch(console.error)
    }
  }
}
</script>

<style>
</style>