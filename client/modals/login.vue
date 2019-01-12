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
  //...mapGetters(['getterName']) 
  },
  methods: {
    ...mapActions(['requestLogin']),
    // pull in login action from vuex store
    doLogin() {
      //check that username and password exist
      if(!this.form.username || !this.form.password) {
        return console.error('Please fill username field and password field to complete login')
      }
      this.requestLogin(this.form)
        .then(response => {
          console.log('user logged in', response)
          this.$router.push('/home')
        })
        .catch(console.error)
    },
  }
}
</script>

<style>
</style>