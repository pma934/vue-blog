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

  /* 
  .active-router {
    color: #FE9600;
  }

   .active-router::before {
            content: "🌫";
            position: absolute;
            font-size: 2em;
            color: #FE9600;
            text-shadow: 2px 2px 4px #666;
            top: -2px;
        }

        @keyframes move {
            0%   {left: 1px;}
            10%  {left: 2px;}
            20%  {left: 3px;}
            30%  {left: 4px;}
            40%  {left: 5px;}
            50%  {left: 6px;}
            60%  {left: 5px;}
            70%  {left: 4px;}
            80%  {left: 3px;}
            90%  {left: 2px;}
            100% {left: 1px;}
        } */

</style>
