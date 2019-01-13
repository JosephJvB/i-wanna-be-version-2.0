<template>
<b-container class="j-container" fluid> <!-- always 100% view width -->
  <b-row class="header">
    <div class="w-100 d-flex">
      <h4 class="col-8">Currently logged in as: {{currentUsername || 'Guest'}}</h4>
      <button class="col-4">Hamburger here?</button>
    </div>
    <div class="w-100 d-flex py-1">
      <div class="col d-flex justify-center">
        <input class="main-search" type="text" placeholder="search"/>
        <i class="material-icons">search</i>
      </div>
    </div>
  </b-row>
  <!-- main content -->
  <b-row class="main">
    <!-- spacer -->
    <div class="col-md-1"></div>
    <!-- content -->
    <div class="col-md-7 content">
      <h1>Home</h1>
      <div class="row item" v-for="(item, index) in content" :key="index">
        <img src="https://via.placeholder.com/150" alt="holder">
        {{item}}
      </div>
    </div>
    <!-- right-hand sidebar -->
    <div class="col-md-3 sidebar">
      <div class="row item" v-for="(item, index) in sidebar" :key="index">
        <img src="https://via.placeholder.com/50" alt="holder">
        {{item}}
      </div>
    </div>
    <!-- spacer -->
    <div class="col-md-1"></div>
    <!-- modals -->
    <router-view/>
  </b-row>
</b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      content: [1, 2, 3, 4],
      sidebar: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
  .main {
    background-color: #6c757d;
  }
  .item {
    border: solid 1px #ffc107;
  }
  .main-search {
    width: 95%;
  }
  .material-icons {
    margin-top: 2px;
    padding: 10px;
    border: solid 1px transparent;
  }
  .material-icons:hover {
    color: #ffc107;
    border: solid 1px #ffc107;
    border-radius: 1000px;
  }
</style>