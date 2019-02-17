<template>
  <header>
    <div class="title">
      {{GLOBAL.github_username}}的个人主页
    </div>
    <button class="nav_btn" v-if="!$root.isPC" @click="show">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <img @click="login()" :src="'https://avatars1.githubusercontent.com/u/' + $root.loginId">
    <div :class="{navigation:1,navInPho:!$root.isPC}" v-show="$root.isPC||nav_show">
      <router-link class="router" to="/homepage" active-class="active-router">首页</router-link>
      <router-link class="router" to="/blog" active-class="active-router">博客</router-link>
      <router-link class="router" to="/helloWorld" active-class="active-router">测试</router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        nav_show: false,
      }
    },
    methods: {
      show: function () {
        this.nav_show = !this.nav_show;
      },
      login: function () {
        this.$root.showlogin = true
      }
    }
  }

</script>

<style scoped>
  header {
    background: white;
    line-height: 2em;
    box-shadow: 0px -5px 20px 1px #666;
    height: 35px;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .nav_btn {
    border: 1px solid #ccc;
    border-radius: 3px;
    position: absolute;
    top: 1px;
    right: 10px;
    background-color: white;
  }

  .nav_btn:focus {
    background-color: #eee;
  }

  .nav_btn span {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    background-color: #888;
    margin: 4px 0;
  }

  img {
    border-radius: 2em;
    position: absolute;
    top: 1px;
    right: 60px;
    width: 2em;
    cursor: pointer;
  }

  img:hover{
    animation: joggle 1s;
  }

  .navigation {
    position: absolute;
    top: 0px;
    right: calc(50% - 150px);
    width: 300px;
    text-align: center;
    background-color: white
  }

  .navInPho {
    width: 100px;
    right: 0;
    top: 35px;
  }

  .router {
    color: #666;
    text-shadow: 2px 2px 4px #666;
    text-decoration: none;
    font-size: 24px;
    margin: 0 10px;
    position: relative;
  }


  .active-router {
    color: #FE9600;
  }

</style>
