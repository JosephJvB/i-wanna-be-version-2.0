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
    // pull in register action from vuex store
    ...mapActions(['requestRegister']),
    doRegister() {
      // client side validation
      // move this to a function that runs @onChange in form. push errors into component state
      // then on submit, stop submit if there are errors
      if(!this.form.username || !this.form.password) {
        return console.error('Please fill username field and password fields to complete registration')
      }
      if(this.form.password !== this.confirmPassword) {
        return console.error('Passwords do not match')
      }
      return this.requestRegister(this.form)
        .then(user => {
          console.log('register this user', user)
          this.$router.push('/home')
        })
      .catch(console.error)
    },
  }
}
</script>

<style>
</style>