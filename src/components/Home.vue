<template>
  <div id="Home">
    <br>
    <h1>这是首页</h1>
    <h1>TODO</h1>
    <h1>TODO</h1>
    <h1>TODO</h1>
    <h1>TODO</h1>
    <h1>TODO</h1>
    <h1>TODO</h1>
    <canvas id="canvasTime"></canvas>
  </div>
</template>

<script>
  import {canvasTime} from "../assets/js/canvasTime.js";

  export default {
    name: "Home",
    data() {
      return {
        
      }
    },
    methods: {
    },
    created() {
      
    },
    mounted: function () {
      canvasTime();
      this.$root.footLoad = true;
    },
    updated: function () {
      
    },
    beforeDestroy: function(){
      this.$root.footLoad = false;
    }
  };

</script>

<style scoped>
  #Home {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #canvasTime{
    max-width: 100%;
  }
</style>
