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
import axios from 'axios'
require('./assets/css/markdown.css')
require('./assets/css/scrollbar.css')
require('./assets/css/myfont.css')
require('./assets/js/discoloration-nest.js')
//require('./assets/js/live2d.min.js')
import live2DModelList from '../static/live2D_model_list.json'

Vue.use(VueRouter)
Vue.use(VueResouce)
Vue.use(VueCookie)

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
// axios.defaults.headers.get['Content-type'] = "application/json"
// Vue.http.options.headers = {
//   'Access-Control-Allow-Origin': '*/*'
// }
// Vue.http.interceptors.push({
//   request (request) {
//     request.headers = request.headers || {}
//     request.headers['Access-Control-Allow-Origin'] = '*/*'
//     return request
//   },
//   response (response) {
//     if (response.data.code === '200') {
//     }
//     return response
//   }
// })
Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = global_
Vue.prototype.NODE_ENV = process.env.NODE_ENV
Vue.config.productionTip = false

Vue.prototype.pio = function () {
  let num = Math.floor(Math.random() * live2DModelList.length);
  let Model = live2DModelList[num]
  //num =  Math.floor(Math.random() * Model.img.length);
  window.Live2D_img_path = Model.img //Model.img[num];
  loadlive2d("live2d_canvas", Model.model);
}
Vue.prototype.save_pio = function () {
  window.Live2D.captureName = 'Screenshot-' + Date.now() + '.png';
  window.Live2D.captureFrame = true;
}

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/homepage'
    },
    {
      path: "/homepage",
      component: Home
    },
    {
      path: "/helloworld",
      component: HelloWorld
    },
    {
      path: "/blog",
      component: Blog
    },
    {
      path: "/blog/:number",
      component: BlogContent
    },
  ],
  //mode:'history'
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  data() {
    return {
      code: '',
      loginStatus: '',
      access_token: '',
      history_route: '',
    }
  },
  template: '<App/>',
  components: {
    App
  },
  methods: {
    login: function () {
      this.code = /^\?code=(\w+)&?/.exec(window.location.search)[1]

      // let path = `${this.GLOBAL.proxyTable.github[this.NODE_ENV]}//login/oauth/access_token`;
      // const params = {
      //   client_id: this.GLOBAL.ClientID[this.NODE_ENV],
      //   client_secret: this.GLOBAL.ClientSecret[this.NODE_ENV],
      //   code: this.code
      // };
      // fetch(path, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(params)
      // }).then(res => {
      //   return res.text();
      // })
      // .then(body => {
      //   console.log(body)
      // })

      // this.$axios.get(`${this.GLOBAL.proxyTable.github[this.NODE_ENV]}/login/oauth/access_token?client_id=${this.GLOBAL.ClientID[this.NODE_ENV]}&client_secret=${this.GLOBAL.ClientSecret[this.NODE_ENV]}&code=` + this.code).then(data => {
      //   console.log(data)
      // })

      // fetch(`${this.GLOBAL.proxyTable.github[this.NODE_ENV]}/login/oauth/access_token?client_id=${this.GLOBAL.ClientID[this.NODE_ENV]}&client_secret=${this.GLOBAL.ClientSecret[this.NODE_ENV]}&code=` + this.code
      // ,{
      //   method:"get",
      // }).then(result => {
      //   return result.json()
      // }).then(data =>{
      //   console.log(data)
      // })

      this.$http.get(
        `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${this.GLOBAL.ClientID[this.NODE_ENV]}&client_secret=${this.GLOBAL.ClientSecret[this.NODE_ENV]}&code=` + this.code
      ).then(data => {
        console.log(data.body)
        this.$cookie.set("access_token", data.body.access_token, 1)
        this.$cookie.delete("history_route")
        //window.location.href = this.history_route
      },error =>{
        console.log(error)
      })

      // function doCORSRequest(options) {
      //   var x = new XMLHttpRequest();
      //   x.open(options.method, 'https://cors-anywhere.herokuapp.com/' + options.url);
      //   x.onload = x.onerror = function() {console.log(x.responseText)};
      //   x.send(options.data);
      // }

      // doCORSRequest({
      //   method: 'GET',
      //   url: `https://github.com/login/oauth/access_token?client_id=${this.GLOBAL.ClientID[this.NODE_ENV]}&client_secret=${this.GLOBAL.ClientSecret[this.NODE_ENV]}&code=` + this.code
      // });

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
      this.$http.get(`https://api.github.com/user?access_token=${this.access_token}`).then(data => {
        console.log(data.body.login)
      }, error => {
        console.log(error)
      })
      // fetch(`https://api.github.com/user?access_token=${this.access_token}`,{
      //   method:"get",
      // }).then(result => {
      //   return result.json()
      // }).then(data =>{
      //   console.log(data)
      // })
    } else {
      // 未登录时
    }
  }
})
