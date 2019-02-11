<template>
  <div id="HelloWorld">
    <br>
    <h1>这个页面测试代码用的= -:{{ test }}</h1>
    <h1 v-text="'这个页面测试代码用的= -:'+test"></h1>
    <a id="login" @click="setHistoryRoute" :href="'https://github.com/login/oauth/authorize?client_id='+GLOBAL.ClientID[NODE_ENV]+'&scope=public_repo,user'">登录</a>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        test: "测试",
        owner: {
          "development": "pma934",
          "production": window.location.pathname,
        }
      }
    },
    methods: {
      send: function () {
        console.log('send')
        this.test = window.location.search.slice(6)
        this.$http.get(
          `github/login/oauth/access_token?client_id=ca59308e4fb0e9315900&client_secret=18412ef16d5a3dd246be41719f70a3f268bdd52d&code=` +
          this.test
        ).then(data => {
          console.log(data.body)
        })
      },
      setHistoryRoute: function () {
        this.$cookie.set("history_route", window.location.href)
      }
    },
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {},
    mounted: function () {
       this.$root.footLoad = true;
    },
    beforeUpdate: function () {},
    updated: function () {},
    beforeDestroy: function () {
       this.$root.footLoad = false;
    },
    destroyed: function () {}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #HelloWorld {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #login {
    width: 100px;
    height: 100px;
    display: block;
    text-decoration: none;
    border-radius: 50px;
    background-color: beige;
    line-height: 100px;
    font-size: 50px;
    margin: 0 auto;
  }

</style>
