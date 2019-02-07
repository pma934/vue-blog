<template>
  <header>
    <div id="title">
      {{title}}
    </div>
    <div id="navigation">
      <router-link class="router" to="/homepage" active-class="active-router">首页</router-link>
      <router-link class="router" to="/blog" active-class="active-router">博客</router-link>
      <router-link class="router" to="/helloWorld" active-class="active-router">测试</router-link>
    </div>
    <div id="search"></div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        title: "围巾落地冻成狗"
      }
    },
  }

</script>

<style scoped>
  header {
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    line-height: 3em;
    box-shadow: 0px -5px 20px 1px #666;
  }
  #title{
    width: 300px;
    text-align: center;
    font-size: 32px;
  }
  #navigation {
    flex-grow: 1;
    text-align: center;
  }
  #search{
    width: 350px
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

   .active-router::before {
            content: "🌫";
            position: absolute;
            font-size: 2em;
            color: #FE9600;
            text-shadow: 2px 2px 4px #666;
            top: -2px;
            animation: move 1s infinite;
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
        }

</style>
