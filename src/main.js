// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import VueCookie from 'vue-cookie'
import App from './App'
import HelloWorld from './components/HelloWorld'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogContent from './components/BlogContent'
import global_ from '../static/config.json'
require('./assets/css/markdown.css')
require('./assets/css/main.css')
require('./assets/js/discoloration-nest.js')

Vue.use(VueRouter)
Vue.use(VueResouce)
Vue.use(VueCookie)

Vue.prototype.GLOBAL = global_
Vue.prototype.GLOBAL.github_username = process.env.NODE_ENV === "production" ? window.location.hostname.slice(0,-10):"pma934"
Vue.prototype.NODE_ENV = process.env.NODE_ENV
Vue.config.productionTip = false


Vue.filter('myformatTime', function (value) {
  return value.slice(0,4)+'年'+value.slice(5,7)+'月'+value.slice(8,10)+'日'
})


const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/homepage'
    },
    {
      path: "/homepage",
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: "/helloworld",
      component: HelloWorld,
      meta: {
        title: '测试'
      }
    },
    {
      path: "/blog",
      component: Blog,
      meta: {
        title: '博客'
      }
    },
    {
      path: "/blog/:number",
      component: BlogContent
    },
  ],
  //mode:'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  el: '#app',
  data() {
    return {
      access_token: '',
      history_route: '',
      isPC: !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
      footLoad:false,
      loginId:0,
    }
  },
  computed: {
    _access_token:function(){
      return !this.access_token?'':"access_token="+this.access_token
    }
  },
  template: '<App/>',
  components: {
    App
  },
  methods: {
    login: function () {
      window.location.hash = this.history_route
      this.code = /^\?code=(\w+)&?/.exec(window.location.search)[1]
      this.$http.get(
        `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${this.GLOBAL.ClientID[this.NODE_ENV]}&client_secret=${this.GLOBAL.ClientSecret[this.NODE_ENV]}&code=` + this.code
      ).then(data => {
        this.$cookie.set("access_token", /^access_token=(\w+)&?/.exec(data.body)[1], 1)
        this.$cookie.delete("history_route")
        this.access_token = this.$cookie.get("access_token")
      }, error => {
        console.log(error)
      }).then(()=>{
        this.usermes()
      })
    },
    usermes:function(){
      this.$http.get(`https://api.github.com/user?access_token=${this.access_token}`).then(data => {
        console.log(data.body)
        this.loginId = data.body.id
      }, error => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.history_route = this.$cookie.get("history_route")
    this.access_token = this.$cookie.get("access_token")

    if (this.history_route !== null) {
      // 登录时
      this.login()
    } else if (this.access_token !== null) {
      // 已登录时
      this.usermes()
    } else {
      // 未登录时
    }
  }
})
