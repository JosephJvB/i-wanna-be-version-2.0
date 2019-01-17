Basic express/vue app with auth talking to postgres db using knex

### todo
- Use vuex to manage state. Haven't done that before
  - [x] basic vuex init: state, actions, getters, mutations
  - Set up vuex to use modules!
  - todo: cache stuff
    - https://github.com/superwf/vuex-cache
    - I dont actually want to use this library tbh. Id rather do a harrison inspired localstorage thing.
- Create a way for guests to login-as-guest
  - & restrict the register route. I dont people signing up without my say so..
- Use sockets so users can see which other users are online in real time
- do some home brew design then create nice looking pages
  - probably use bootstrap: https://www.youtube.com/watch?v=6FOq4cUdH8k
  - draw some pictures first cos that's fun
  - styling is hard I need to look at examples, me homebrewing my own stuff is gonna be uuuuugly