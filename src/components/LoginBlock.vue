<template>
  <div v-show="$root.showlogin" class="loginblock">
    <div class="helpblock">
      <div class="login">
        <span class="one">{{mes}}</span>
        <a class="btn yes" @click="setHistoryRoute" :href="'https://github.com/login/oauth/authorize?client_id='+GLOBAL.ClientID[NODE_ENV]+'&scope=public_repo,user'">是</a>
        <span class="btn no" @click="close()">否</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginBlock',
    data() {
      return {
        show: false,
      }
    },
    computed: {
      mes: function () {
        return !this.$root.access_token ? '是否跳转到github授权登录页面?' : '是否退出登录?'
      }
    },
    methods: {
      setHistoryRoute: function () {
        if (!this.$root.access_token) {
          this.$cookie.set("history_route", window.location.hash)
        } else {
          this.close()
          this.$root.access_token = ''
          this.$root.loginId = 0
          this.$cookie.delete("access_token")
          event.preventDefault()
        }
      },
      close: function () {
        this.$root.showlogin = false
      }
    },
    mounted: function () {

    }
  }

</script>

<style scoped>
  .loginblock {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1300;
    background-color: rgba(0, 0, 0, .6);
    animation: fade .25s;
    display: table;
  }

  .helpblock {
    display: table-cell;
    vertical-align: middle;
    background-color: transparent;
  }

  .login {
    max-width: 400px;
    height: 100px;
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
    display: grid;
    border-radius: 5px;
  }

  .one {
    grid-area: 1/1/2/3;
    font-size: 1.5em;
  }

  .btn {
    margin: auto;
    border: 1px solid transparent;
    width: 80px;
    height: 30px;
    color: #fff;
    line-height: 30px;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .yes {
    grid-area: 2/1/3/2;
    border-color: #4cae4c;
    background-color: #5cb85c;
  }

  .yes:hover {
    background-color: #449d44;
    border-color: #398439;
  }

  .no {
    grid-area: 2/2/3/3;
    border-color: #d43f3a;
    background-color: #d9534f;
  }

  .no:hover {
    background-color: #c9302c;
    border-color: #ac2925;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.9;
    }
  }

</style>
