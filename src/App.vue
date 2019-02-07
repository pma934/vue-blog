<template>
  <div id="App">
    <!-- <img id="bgi" src="./assets/imgs/1.jpg"> -->
    <app-header></app-header>
    <router-view @f_f="from_father" class="router-view"></router-view>
    <!-- <live2d style="position: fixed;right: -50px;bottom: 0px;"></live2d> -->
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Live2D from "./components/Live2D";

  export default {
    name: "App",
    data() {
      return {};
    },
    methods: {
      from_father: function (x) {
        console.log("当前页面$vue");
        console.log(x);
        console.log("主页面$vue");
        console.log(this);
      }
    },
    components: {
      "app-header": Header,
      "app-footer": Footer,
      "live2d": Live2D
    }
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
    opacity: 0.1;
    width: 100%;
    float: left;
  }

  .router-view {
    max-width: 860px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(255, 255, 255, .8);
  }

</style>
