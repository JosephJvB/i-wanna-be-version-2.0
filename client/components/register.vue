<template>
  <div>
    <form>
      <label>Username</label>
      <input type="text" v-model="form.username" name="username"/>
      <label>Password</label>
      <input type="password" v-model="form.password" name="password"/>
      <label>Confirm Password</label>
      <input type="password" v-model="form.confirmPassword" name="confirm password"/>
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
        confirmPassword: ''
      }
    }
  },
  computed: {
  //  state: mapGetters(['getterName']) 
  },
  methods: {
    doRegister() {
      if(this.form.password !== this.form.confirmPassword) {
        return console.error('Passwords do not match')
      }
      // seperate confirmPassword from postData
      const { confirmPassword, ...postData } = this.form
      return fetch('api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(json => {
        if(json.error) return console.error(json.message)
        console.log(json)
        // on success cache user info and push to home
        this.$router.push('/home')
      })
      .catch(console.error)
    },
    // actions: mapActions(['actionName'])
  }
}
</script>

<style>
</style>