<template>
  <div id="BlogContent">
    <div v-if="loaded">
      <div id="blog_content">
        <h1 class="title"><a :href="blogMessage.html_url" target="_blank" title="文章github源地址">{{blogMessage.title}}</a></h1>
        <div class="usermes">
          <a :href="blogMessage.user.html_url" target="_blank" title="去这货的github"><img :src="'https://avatars1.githubusercontent.com/u/'+blogMessage.user.id"></a>
          <span>{{blogMessage.user.login}}</span>
        </div>
        <div class="cuTime"><span>creat at {{creattime}}，update at {{updatetime}}</span></div>
        <div class="markdown-body task-list-item" v-html="blogContent"></div>
      </div>
      <hr>
      <div id="blog_comments">
        <div v-for="(comment,key) in comments" :key="key">
          <span v-text="comment.user.login"></span>
          <span style="float: right;">{{key+GLOBAL.github_percomments*(comment_currentpage-1)+1}}楼</span>
          <div>
            <a :href="comment.user.html_url" target="_blank" title="去这货的github"><img :src="'https://avatars1.githubusercontent.com/u/'+comment.user.id"></a>
            <div @mouseenter="add_joggle" @mouseleave="del_joggle" class="markdown-body task-list-item" v-html="markdown(comment.body)"></div>
          </div>
        </div>
      </div>
      <p v-if="!comments.length">暂时还没有回复，客官要不要来回复一个=-=</p>
      <page-navigation v-show="comment_lastpage!==1" @x_p="comment_x_page" :lastpage="comment_lastpage" :currentpage="comment_currentpage"></page-navigation>
      <div class="not_logged">
        <a>授权登录</a> 或者跳转到博客的 <a :href="blogMessage.html_url">github源地址</a> 进行回复！
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import PageNavigation from "./PageNavigation";

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
  });

  export default {
    name: 'BlogContent',
    data() {
      return {
        blogMessage: {
          created_at: '',
          updated_at: '',
          user: {
            id: 0,
            login: "xxx"
          }
        },
        blogContent: '',
        comments: '',
        comment_lastpage: 1,
        comment_currentpage: 1,
        loaded: false,
      }
    },
    computed: {
      creattime: function () {
        return this.blogMessage.created_at.slice(0, 10) + " " + this.blogMessage.created_at.slice(11, 19)
      },
      updatetime: function () {
        return this.blogMessage.updated_at.slice(0, 10) + " " + this.blogMessage.created_at.slice(11, 19)
      }
    },
    methods: {
      markdown: function (x) {
        return marked(x);
      },
      comment_x_page: function (x) {
        this.$http.get(
          `https://api.github.com/repos/${this.GLOBAL.github_username}/${this.GLOBAL.github_username}.github.io/issues/${this.$route.params.number}/comments?per_page=${this.GLOBAL.github_percomments}&page=${x}&${this.$root._access_token}`
        ).then(
          data => {
            this.comments = data.body;
            this.comment_currentpage = x;
          });
      },
      add_joggle: function (e) {
        e.currentTarget.previousElementSibling.firstChild.setAttribute('class', 'joggle')
      },
      del_joggle: function (e) {
        e.currentTarget.previousElementSibling.firstChild.removeAttribute('class', 'joggle')
      }
    },
    components: {
      "page-navigation": PageNavigation,
    },
    created: function () {
      this.$http.get(
        `https://api.github.com/repos/${this.GLOBAL.github_username}/${this.GLOBAL.github_username}.github.io/issues/${this.$route.params.number}?${this.$root._access_token}`
      ).then(data => {
        this.blogMessage = data.body;
        this.blogContent = marked(data.body.body);
        document.title = data.body.title
        this.loaded = true;
      });
      this.$http.get(
        `https://api.github.com/repos/${this.GLOBAL.github_username}/${this.GLOBAL.github_username}.github.io/issues/${this.$route.params.number}/comments?per_page=${this.GLOBAL.github_percomments}&page=1&${this.$root._access_token}`
      ).then(data => {
        this.comments = data.body
        if (data.headers.map.link !== undefined) {
          let link = data.headers.map.link[0];
          let re = /&page=(\d+)[&\w/_=]*>; rel="last"/;
          this.comment_lastpage = Number(re.exec(link)[1])
        }
      });

    },
    mounted: function () {},
    updated: function () {
      this.$root.footLoad = true;
    },
    beforeDestroy: function () {
      this.$root.footLoad = false;
    }
  }

</script>

<style scoped>
  #BlogContent {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .title {
    margin: 0;
    text-align: center;
  }

  .title a {
    text-decoration: none;
    color: #2c3e50;
    margin: auto;
  }

  .title a:hover {
    color: #55b559;
  }

  .usermes {
    width: 45%;
    display: inline-block;
  }

  .usermes img {
    width: 40px;
    border-radius: 40px;
    box-shadow: 0 0 2px #666;
  }

  .usermes span {
    margin-left: 10px;
    font-size: 1.5em;
    font-family: fantasy;
  }

  .cuTime {
    color: #999;
    font-size: .75em;
    text-align: right;
    width: 50%;
    display: inline-block;
  }



  #blog_content {
    text-align: left;
    padding: 10px 20px;
    animation: blog-list-show .6s;
  }

  #blog_comments {
    text-align: left;
    padding: 20px;
  }

  #blog_comments .markdown-body {
    padding: 25px;
    line-height: 1.3;
    border-radius: 5px;
    max-height: 500px;
    overflow-y: auto;
    font-size: 14px;
    margin-bottom: 20px;
    transition: all .6s;
  }

  #blog_comments .markdown-body:hover {
    box-shadow: 0 0 5px 2px #ccc;
  }

  #blog_comments img {
    height: 30px;
    width: 30px;
    float: left;
    margin-right: 5px;
    clear: both;
    border-radius: 30px;
    box-shadow: 0 0 2px #666;
  }

  #blog_comments span {
    font-family: Microsoft YaHei;
    line-height: 1.5em;
  }

  #navigation {
    background-color: yellow;
  }

  .joggle {
    animation: joggle 1s;
  }

  .not_logged {
    background-color: #fffbdd;
    color: #735c0f;
    padding: 20px;
    max-width: 500px;
    margin: auto;
    border: 1px dashed;
    border-radius: .5em;
  }

  .not_logged a {
    background-color: #28a745;
    background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
    color: #fff;
    padding: 6px 12px;
    border-radius: .25em;
    cursor: pointer;
    text-decoration: none;
  }

  .not_logged a:active {
    background-color: #279f43;
    background-image: none;
    border-color: rgba(27, 31, 35, .5);
    box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, .15);
  }

</style>
