<template>
  <div id="Blog">
    <h1>{{ msg }}</h1>
    <div class="blog_list" v-for="blog in bloglist" :key="blog.number">
      <h3>题目:{{blog.title}}</h3>
      <p>摘要：{{blog.body.slice(0,50)}}</p>
      <router-link :to='"/blog/"+blog.number'>阅读全文</router-link>
      <p>时间：{{blog.updated_at}}</p>
    </div>
    <page-navigation v-on:x_p="x_page" :lastpage="lastpage" :currentpage="currentpage"></page-navigation>
  </div>
</template>

<script>
  import PageNavigation from "./PageNavigation";

  export default {
    name: 'Blog',
    data() {
      return {
        msg: '这里是博客',
        bloglist: '',
        lastpage: 1,
        currentpage: 1,
      }
    },
    methods: {
      x_page: function (x) {
        this.$http.get("https://api.github.com/repos/" + this.GLOBAL.github_username + "/" + this.GLOBAL.github_username +
          ".github.io/issues?labels=blog&state=open&per_page=" + this.GLOBAL.github_perpage + "&page=" + x).then(
          data => {
            this.bloglist = data.body;
            this.currentpage = x;
          });
      }
    },
    components: {
      "page-navigation": PageNavigation,
    },
    created: function () {
      this.$http.get("https://api.github.com/repos/" + this.GLOBAL.github_username + "/" + this.GLOBAL.github_username +
        ".github.io/issues?labels=blog&state=open&per_page=" + this.GLOBAL.github_perpage + "&page=first").then(
        data => {
          this.bloglist = data.body;
          if (data.headers.map.link !== undefined) {
            let link = data.headers.map.link[0];
            let re = /&page=(\d+)>; rel="last"/;
            this.lastpage = Number(re.exec(link)[1])
          }
        });
    },
    mounted: function () {},
  }

</script>

<style scoped>
#Blog {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #175899;
  }

  .blog_list {
    border: 0.5px solid blue;
  }
  
</style>
