Basic express/vue app with auth talking to postgres db using knex

### todo
- Create a way for guests to login-as-guest
  - & restrict the register route. I dont people signing up without my say so..
  - where do I store activeGuests/activeUser data. is that a table?
- Use sockets so users can see which other users are online in real time
- do some home brew design then create nice looking pages
  - probably use bootstrap: https://www.youtube.com/watch?v=6FOq4cUdH8k
  - [x] draw some pictures first cos that's fun
  - styling is hard I need to look at examples, me homebrewing my own stuff is gonna be uuuuugly
  - it is ugly! haha

### done
- Use vuex to manage state. Haven't done that before
    - COOL PLUGINS: https://vuejsdevelopers.com/2017/09/11/vue-js-vuex-plugins/
    - [x] basic vuex init: state, actions, getters, mutations
    - [x] Set up vuex to use modules!
    - [x] sessionStorage caching
    - My caching is weird and bad, vue getters are strange