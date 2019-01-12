<template>
<b-container class="j-container" fluid> <!-- always 100% view width -->
<b-row class="header">
  <!-- header content -->
  <div class="col-lg-2 col-sm-4">
    <h4>H || {{ currentUserName || 'Guest' }}</h4>
  </div>
  <div class="col-lg-2 col-sm-8">
    login/logout/register
  </div>
  <div class="col-lg-8 col-sm-12">
    searchbar
  </div>
</b-row>
<b-row class="main">
  <!-- main content -->
    <h1>Home</h1>
    <div class="col-xs-12 item" v-for="(i, item) in test" :key="i">
      {{item}}
    </div>
    <router-link to="/login">back</router-link>
    <router-view/> <!-- modals only for now.. -->
</b-row>
</b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      test: [1, 2, 3, 4]
    }
  },
  computed: {
    ...mapGetters(['currentUsername'])
  }
}
</script>

<style>
  .j-container {
    height:100%
  }
  .header {
    background-color: grey;
  }
  .header div {
    border: solid white 1px;
    padding: 1.5rem 1rem;
  }
  .main {
    padding: 1.5rem 2rem 0rem 2rem;
    height: 100vh;
    background-color: coral;
  }
  .items {
    padding: 1rem 0;
    height: 25%;
  }
</style>