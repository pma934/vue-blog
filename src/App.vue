<template>
  <div id="App">
    <img id="bgi" :src='url' v-if="$root.isPC">
    <app-header></app-header>
    <router-view :style="{minHeight: min_height + 'px'}"  :class="{router_view:1,rvInPho:!$root.isPC}"></router-view>
    <live2d @swbg="Switch_background" v-if="$root.isPC" style="position: fixed;right: -50px;bottom: 0px;"></live2d>
    <login-block></login-block>
    <app-footer v-show="$root.footLoad"></app-footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Live2D from "./components/Live2D";
  import LoginBlock from "./components/LoginBlock";

  export default {
    name: "App",
    data() {
      return {
        url: this.GLOBAL.bgiUrl[Math.floor(Math.random() * this.GLOBAL.bgiUrl.length)],
        min_height: window.innerHeight - 35 - 30,
        timer: true,
      };
    },
    methods: {
      Switch_background: function (x) {
        this.url = this.GLOBAL.bgiUrl[Math.floor(Math.random() * this.GLOBAL.bgiUrl.length)]
      }
    },
    components: {
      "app-header": Header,
      "app-footer": Footer,
      "live2d": Live2D,
      "login-block":LoginBlock,
    },
    mounted: function () {
      let _onresize = window.onresize
      let that = this
      window.onresize = function () {
        if (that.timer) {
          that.timer = false
          setTimeout(function () {
            that.timer = true
            that.min_height = window.innerHeight - 35 - 30
          }, 50)
        }
        return _onresize()
      }
    },
  };

</script>

<style scoped>
  #App {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #bgi {
    position: fixed;
    top: 0px;
    z-index: -999;
    opacity: 0.3;
    width: 100%;
    float: left;
  }

  .router_view {
    max-width: 860px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, .8);
    position: relative;
    right: 50px;
  }

   .router_view {
    max-width: 860px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, .8);
    position: relative;
    right: 10px;
  }

  .rvInPho{
    position: static;
  }

</style>
