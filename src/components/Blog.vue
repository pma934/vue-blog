<template>
  <div id="Blog">
    <div class="blog_lists" >
      <div :class="{blog_list:1,blog_listOnPhone:!$root.isPC}" v-for="blog in bloglist" :key="blog.number">
        <router-link v-if="$root.isPC" class="blogImg" :to='"/blog/"+blog.number'>
          <img :src="blog.meta.img">
        </router-link>
        <div :class="{blogInfo:1,blogInfoOnPhone:!$root.isPC}">
          <div class="title"><router-link  :to='"/blog/"+blog.number'>{{blog.title}}</router-link></div>
          <span class="abstract"> {{blog.meta.summary}}</span>
          <div class="dian">
            <router-link :to='"/blog/"+blog.number'>···</router-link>
          </div>
          <span class="creatTime">{{blog.created_at.slice(0,10)|myformatTime}}</span>
          <span class="labels">
            <span v-for="(label,key) in blog.labels" :key="key"> {{label.name}}</span>
          </span>
        </div>
      </div>
    </div>
    <page-navigation v-if="blogLoaded" @x_p="x_page" :lastpage="lastpage" :currentpage="currentpage"></page-navigation>
  </div>
</template>

<script>
  import PageNavigation from "./PageNavigation";

  export default {
    name: 'Blog',
    data() {
      return {
        bloglist: '',
        lastpage: 1,
        currentpage: 1,
        blogLoaded: false,
      }
    },
    methods: {
      x_page: function (x) {
        this.$http.get(
          `https://api.github.com/repos/${this.GLOBAL.github_username}/${this.GLOBAL.github_username}.github.io/issues?labels=blog&state=open&per_page=${this.GLOBAL.github_perpage}&page=${x}&${this.$root._access_token}`
        ).then(data => {
          this.bloglist = data.body.map(this.decorateBlog);
          this.currentpage = x;
          if (data.headers.map.link !== undefined) {
            let link = data.headers.map.link[0];
            let re = /&page=(\d+)[&\w/_=]*>; rel="last"/;
            try {
            this.lastpage = Number(re.exec(link)[1])
            }catch(e){}
          }
          this.blogLoaded = true;
        });
      },
      decorateBlog: function (blog) {
        var meta, metaStr;
        metaStr = blog.body.substring(0, blog.body.indexOf('-->'));
        metaStr = metaStr.replace(/\n|\r|<!-{2,}/gm, ' ');
        try {
          meta = JSON.parse(metaStr)
        } catch (error) {
          blog.meta = {
            summary: "这个人很懒，没有写简介",
            img: "http://s9.rr.itc.cn/r/wapChange/201611_7_14/a9pibx776956197461.jpg",
          }
          return blog
        }
        meta.summary = !meta.summary ? "这个人很懒，没有写简介" : meta.summary
        meta.img = !meta.img ? "http://s9.rr.itc.cn/r/wapChange/201611_7_14/a9pibx776956197461.jpg" : meta.img
        blog.meta = meta;
        return blog;
      }
    },
    components: {
      "page-navigation": PageNavigation,
    },
    created: function () {
      this.x_page(1)
    },
    updated: function () {
      this.$root.footLoad = true;
    },
    beforeDestroy: function () {
      this.$root.footLoad = false;
    }
  }

</script>

<style scoped>
  #Blog {
    font-family: "Avenir", Helvetica, 'Glyphicons Halflings', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #175899;
  }

  .blog_lists {
    padding-top: 20px;
  }

  .blog_list {
    border-radius: 1em;
    box-shadow: 0 0 5px 0px #333;
    margin-bottom: 20px;
    display: flex;
    overflow: hidden;
    height: 260px;
    color: cadetblue;
    transition: all .6s;
    animation: blog-list-show .6s;
  }

  .blog_listOnPhone {
    height: 200px;
  }

  .blog_list:nth-child(even) {
    flex-direction: row-reverse;
  }

  .blog_list:hover {
    box-shadow: 0 0 10px 2px #777;
    z-index: 9;
  }

  .blogImg {
    flex: 0 0 470px;
    overflow: hidden;
  }

  .blogImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all .6s;
  }

  .blogImg:hover img {
    transform: scale(1.1);
  }

  .blogInfo {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 20px 50px 40px 100px auto;
    margin: 10px 20px;
    text-align: right;
  }

  .blog_list:nth-child(even) .blogInfo {
    text-align: left;
  }

  .blogInfoOnPhone {
    grid-template-rows: 20px 30px 20px 100px auto;
    margin: 0 20px;
    text-align: left;
  }

  .blogInfo .title {
    grid-area: 2/1/3/6;
    font-size: 1.2em;
    font-weight: bold;
  }

  .blogInfoOnPhone .title {
    font-size: 1em;
  }

  .blogInfo .abstract {
    grid-area: 4/1/5/6;
  }

  .blogInfo .abstract:before {
    content: '\e032'
  }

  .blogInfo .creatTime {
    grid-area: 1/1/2/6;
  }

  .blogInfo .creatTime:before {
    content: '\e023'
  }

  .blogInfo .dian {
    grid-area: 5/1/6/6;
    font-size: 50px;
    line-height: 30px;
  }

  .blogInfo a {
    text-decoration: none;
    color: cadetblue;
  }

  .blogInfo a:hover {
    color: blue;
  }

  .blogInfo .labels {
    grid-area: 3/1/4/6;
  }

  .blogInfo .labels:before {
    content: '\e042';
  }

</style>
