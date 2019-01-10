<template>
  <div>
    <h1>Register</h1>
    <form>
      <label>Username</label>
      <input type="text" v-model="form.username" name="username"/>
      <label>Password</label>
      <input type="password" v-model="form.password" name="password"/>
      <label>Confirm Password</label>
      <input type="password" v-model="confirmPassword" name="confirm password"/>
      <button @click.prevent="doRegister">Submit</button>
      <p>todo: create 'continue as guest' option</p>
      <div>
        Already have an account?
        <router-link to="/login">login here</router-link>
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
      confirmPassword: ''
    }
  },
  computed: {
  //...mapGetters(['getterName']) 
  },
  methods: {
    ...mapActions(['login']),
    doRegister() {
      if(this.form.password !== this.confirmPassword) {
        return console.error('Passwords do not match')
      }
      return fetch('api/v1/auth/register', {
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
        // on success cache user info and push to home
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