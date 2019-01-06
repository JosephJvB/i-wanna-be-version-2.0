<template>
  <div>
    <h1>{{ formName }}</h1>
    <form v-if="isLogin">
      <label>Username</label>
      <input type="text" v-model="loginForm.username" name="username"/>
      <label>Password</label>
      <input type="password" v-model="loginForm.password" name="password"/>
      <button @click.prevent="doLogin">Submit</button>
      <p>todo: create 'continue as guest' option</p>
      <div>
        No account?
        <button @click.prevent="isLogin=false">register here</button>
      </div>
    </form>
    <form v-else>
      <label>Username</label>
      <input type="text" v-model="registerForm.username" name="username"/>
      <label>Password</label>
      <input type="password" v-model="registerForm.password" name="password"/>
      <label>Confirm Password</label>
      <input type="password" v-model="registerForm.confirmPassword" name="confirm password"/>
      <button @click.prevent="doRegister">Submit</button>
      <p>todo: create 'continue as guest' option</p>
      <div>
        back to login
        <button @click.prevent="isLogin=true">login here</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isLogin: true,
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  computed: {
    formName() {
      return this.isLogin ? 'Login' : 'Register'
    }
  //  state: mapGetters(['getterName']) 
  },
  methods: {
    doLogin() {
      // set response in vuex & cache that somehow
      return fetch('api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(this.loginForm),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(json => {
        if(json.error) return console.error(json.message)
        console.log(json)
        // on success push to home
        this.$router.push('/home')
      })
      .catch(console.error)
    },
    doRegister() {
      if(this.registerForm.password !== this.registerForm.confirmPassword) {
        return console.error('Passwords do not match')
      }
      const { confirmPassword, ...postData } = this.registerForm
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
        // on success push to home
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