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
  //  ...mapGetters(['userToken'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    doLogin() {
      // set response in vuex & cache that somehow
      return fetch('api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(this.form),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(json => {
        if(json.error) return console.error(json.message)
        console.log(json)
        // on success push cache user info and push to home
        this.login(json)
        this.$router.push('/home')
      })
      .catch(console.error)
    },
  }
}
</script>

<style>
</style>