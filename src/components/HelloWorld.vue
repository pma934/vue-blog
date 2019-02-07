<template>
  <div id="HelloWorld">
    <h1>这个页面测试代码用的= -</h1>
    <!-- <h1>双大括号外边:{{ test }}</h1>
    <h1 v-text="'双引号内的单引号，加号连接:'+test"></h1>
    <button v-on:click="from_father()">来自父vue</button> -->
    <a id="login" @click="setHistoryRoute" :href="'https://github.com/login/oauth/authorize?client_id='+GLOBAL.ClientID[NODE_ENV]+'&scope=public_repo,user'">登录</a>
    <!-- <input type="text" v-model="test">
    <button @click="setHistoryRoute">发送</button> -->
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
      from_father: function () {
        this.$emit('f_f', this)
      },
      send: function () {
        console.log('send')
        this.test = window.location.search.slice(6)
        this.$http.get(
          `github/login/oauth/access_token?client_id=ca59308e4fb0e9315900&client_secret=18412ef16d5a3dd246be41719f70a3f268bdd52d&code=`+this.test
        ).then(data => {
          console.log(data.body)
        })
        // this.$http.post(
        //   `https://api.github.com/repos/pma934/pma934.github.io/issues/11/comments?access_token=b8700274e478cdbc2f50633a77a00a67f3dbb066`, {
        //     body: this.test,
        //   }).then(data => {
        //   this.get()
        // })
      },
      get: function () {
        this.$http.get(
            `https://api.github.com/repos/pma934/pma934.github.io/issues/11/comments?time=${new Date().getTime()}&per_page=1&page=first`
          )
          .then(data => {
            console.log(data.headers.map.link)
          })
      },
      setHistoryRoute:function(){
          this.$cookie.set("history_route",window.location.href)
      }
    },
    // beforeCreate:function(){
    //   //alert('beforeCreate');
    //   console.log(`beforeCreate:现在this为${this}`);
    // },
    created: function () {
      //this.get()
      //console.log(this.owner[process.env.NODE_ENV])

      //alert('created');
      //console.log(`created:现在this为${this}`);
      // this.$http.get("/github/login/oauth/authorize?client_id=ca59308e4fb0e9315900&scope=user,public_repo").then(data => {
      //   console.log(data);
      // });
      // this.$http.post("https://jsonplaceholder.typicode.com/posts").then(data => {
      //   console.log(data);
      // });
    },
    // beforeMount:function(){
    //   //alert('beforeMount');
    //   console.log(`beforeMount:现在this.$el为${this.$el}`);
    // },
    mounted: function () {
      // console.log(process.env)
      //alert('mounted');
      //console.log(`mounted:现在this.$el为${this.$el}`);
    },
    // beforeUpdate:function(){
    //   //alert('beforeUpdate');
    //   console.log(`beforeUpdate:现在this.msg为${this.msg}`);
    // },
    // updated:function(){
    //   //alert('updated');
    //   console.log(`updated:现在this.msg为${this.msg}`);
    // },
    // beforeDestroy:function(){
    //   //alert('beforeDestroy');
    //   console.log(`我已经要离开了！ 现在this.$el为${this.$el}`);
    // },
    // destroyed:function(){
    //   //alert('destroyed');
    //   console.log(`我已经离开了！ 现在this.$el为${this.$el}`);
    // }
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
  #login{
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
