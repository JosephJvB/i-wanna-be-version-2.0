<template>
<!-- always 100% view width -->
<b-container @click="showModal(false)" fluid>
  <!-- header -->
  <b-row class="header py-3">
    <div class="col-2 d-flex">
      <h4 class="m-auto">As:</h4>
      <h4 class="m-auto username" @click.stop="showModal(true)">{{currentUsername || 'Guest'}}</h4>
    </div>
    <div class="col-8 d-flex mx-auto justify-content-center">
      <input class="main-search" type="text" placeholder="search"/>
      <i class="material-icons">search</i>
    </div>
    <div class="col-2 d-flex justify-content-end">
      <i class="material-icons">reorder</i>
    </div>
  </b-row>
  <!-- main content -->
  <b-row class="main">
    <div v-if="modalActive" class="col-xs-12 col-md-10 col-lg-8 content">
      <div @click.stop id="modal-wrapper">
        <!-- modals -->
        <router-view/>
      </div>
    </div>
    <b-row v-else class="mx-5">
      <h4>CONTENT HERE</h4>
    </b-row>
  </b-row>
</b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      modalActive: true
    }
  },
  methods: {
    showModal(bool) {
      if(bool) {
        this.modalActive = true
        // document.body.style.backgroundColor = 'red'
      } else {
        this.modalActive = false
        // document.body.style.backgroundColor = 'yellow'
      }
    }
  },
  computed: {
    ...mapGetters(['currentUsername'])
  }
}
</script>

<style>
/* box-shadow: h v blur spread color; */
  .header {
    background-color: grey;
    box-shadow: 0 1px 2px 1px #383535;
  }
  .username:hover {
    color: #ffc107;
    cursor: pointer;
    text-decoration: underline;
  }
  .main-search {
    background-color: lightyellow;
    width: 70%;
    margin-right: 5px;
    padding: 0 2rem;
    box-shadow: -3px 1px 5px 1px inset #383535;
  }
  .material-icons {
    margin: auto 0;
    padding: 10px;
    border-radius: 1000px;
    box-shadow: 1px 1px 5px 1px #383535;
    max-width: 45px;
    max-height: 45px;
  }
  .material-icons:hover {
    color: #ffc107;
    cursor: pointer;
  }
  .main {
    border-top: solid 1px #5f5858;
    background-color: #6c757d;
    padding-top: 2rem;
  }
  .content {
    margin: auto;
    padding: 0;
    height: 70vh;
    box-shadow: 2px 2px 10px 5px #383535;
  }
  #modal-wrapper {
    padding: 1rem 1rem 0 1rem;
    height: 100%
  }
</style>