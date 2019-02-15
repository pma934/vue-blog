<template>
  <div>
    <span @click="toggle()" id="show" v-show="!showlive2d" title="显示"></span>
    <div id="Live2D" v-show="showlive2d">
      <div class="live2d">
        <canvas id="live2d_canvas" width="400" height="500"></canvas>
      </div>
      <div class="buttons">
        <span @click="pio()" class="qiehuan" title="换装"></span>
        <span @click="save_pio()" class="jietu" title="保存图片"></span>
        <span @click="gotop()" class="gotop" title="回到顶部"></span>
        <span @click="toggle()" class="hidden" title="隐藏"></span>
        <span @click="swbg()" class="swbg" title="切换背景"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    live2dModel
  } from '../assets/js/live2dModel.js'
  require('../assets/js/live2d.min.js')

  export default {
    name: 'Live2D',
    data() {
      return {
        showlive2d: true,
        num:Number(this.$cookie.get("live2Dmodel")),
      }
    },
    methods: {
      pio: function () {
        this.$cookie.set("live2Dmodel",this.num++)
        console.log(this.num)
        let Model = live2dModel(this.num);
        window.Live2D_img_path = Model.img
        loadlive2d("live2d_canvas", Model.model);
      },
      save_pio: function () {
        window.Live2D.captureName = 'Screenshot-' + Date.now() + '.png';
        window.Live2D.captureFrame = true;
      },
      gotop: function () {
        scrollTo(0, 0)
      },
      toggle: function () {
        this.showlive2d = !this.showlive2d
      },
      swbg: function () {
        this.$emit('swbg')
      }
    },
    mounted: function () {
      this.pio();
    }
  }

</script>

<style scoped>
  .live2d {
    width: 300px;
    height: 400px;
    position: relative;
    cursor: pointer;
    /* overflow: hidden; */
  }

  .buttons {
    position: absolute;
    top: 170px;
    left: 200px;
    display: none;
  }

  #Live2D:hover .buttons {
    display: block;
  }

  .buttons span {
    font-family: 'Glyphicons Halflings';
    display: block;
    margin: 5px;
    padding: 2px 3.25px;
    background-color: #fff;
    border: 2px solid rgb(57, 57, 57);
    animation: shake 30s infinite ease-in-out;
  }

  .buttons span:hover {
    z-index: 1;
    transform: scale(1.5);
    animation: none;
  }

  .buttons .qiehuan:before {
    content: "\e031";
  }

  .buttons .jietu:before {
    content: "\e046";
  }

  .buttons .gotop:before {
    content: "\e108";
  }

  .buttons .hidden:before {
    content: "\e106";
  }

  .buttons .swbg:before {
    content: "\e060"
  }

  #live2d_canvas {
    position: absolute;
    top: 53px;
    left: -40px;
    width: 320px;
    height: 400px;
  }

  #show {
    position: absolute;
    top: -80px;
    left: -100px;
    padding: 2px 3.25px;
    background-color: #fff;
    font-family: 'Glyphicons Halflings';
    border: 2px solid rgb(57, 57, 57);
    animation: shake 30s infinite ease-in-out;
  }

  #show:before {
    content: "\e105";
  }

  #show:hover {
    z-index: 1;
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-animation: none;
    animation: none;
  }

</style>
