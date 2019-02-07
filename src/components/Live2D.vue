<template>
  <div id="Live2D">
    <div class="live2d">
      <canvas id="live2d_canvas" width="400" height="500"></canvas>
    </div>
    <div class="buttons">
      <span @click="pio()" class="qiehuan"></span>
      <span @click="save_pio()" class="jietu"></span>
      <span class="gotop"></span>
      <span class="hidden"></span>
      <span>@</span>
      <span>@</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Live2D',
    methods: {

    },
    mounted: function () {
      this.pio();
    }
  }

</script>

<style scoped>
  .live2d {
    width: 300px;
    height: 300px;
    position: relative;
    cursor: pointer;
  }

  .buttons {
    position: absolute;
    top: 70px;
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

  #live2d_canvas {
    position: absolute;
    top: -47px;
    left: -50px;
    width: 320px;
    height: 400px;
  }

  @keyframes shake {
    2% {
      transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }

    4% {
      transform: translate(0.5px, 1.5px) rotate(1.5deg);
    }

    6% {
      transform: translate(1.5px, 1.5px) rotate(1.5deg);
    }

    8% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    10% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }

    12% {
      transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }

    14% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }

    16% {
      transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }

    18% {
      transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }

    20% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }

    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }

    24% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }

    26% {
      transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }

    28% {
      transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }

    30% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    32% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    34% {
      transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }

    36% {
      transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }

    38% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    40% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }

    42% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }

    44% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    46% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }

    48% {
      transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }

    50% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    52% {
      transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }

    54% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }

    56% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    58% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    60% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    62% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    64% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }

    66% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }

    68% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    70% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }

    72% {
      transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }

    74% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    76% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    78% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }

    80% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    82% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }

    84% {
      transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    }

    86% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }

    88% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }

    90% {
      transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    }

    92% {
      transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    }

    94% {
      transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }

    96% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }

    98% {
      transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }

    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

</style>
