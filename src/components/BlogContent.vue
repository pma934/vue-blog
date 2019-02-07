<template>
  <div id="BlogContent">
    <div id="body">
      <div id="blog_content">
        <h1>{{blogMessage.title}}</h1>
        <h3>{{blogMessage.created_at}}</h3>
        <h3>{{blogMessage.updated_at}}</h3>
        <a :href="blogMessage.html_url" target="_blank">源地址</a>
        <div class="markdown-body task-list-item" v-html="blogContent"></div>
      </div>
      <page-navigation v-on:x_p="comment_x_page" :lastpage="comment_lastpage" :currentpage="comment_currentpage"></page-navigation>
      <div id="blog_comments">
        <div v-for="(comment,key) in comments" :key="key">
          <div class="markdown-body task-list-item" v-html="markdown(comment.body)"></div>
          <br>
        </div>
      </div>
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
        blogMessage: '',
        blogContent: '',
        comments: '',
        comment_lastpage: 1,
        comment_currentpage: 1,
      }
    },
    methods: {
      markdown: function (x) {
        return marked(x);
      },
      comment_x_page: function (x) {
        this.$http.get("https://api.github.com/repos/" + this.GLOBAL.github_username + "/" + this.GLOBAL.github_username +
          ".github.io/issues/" + this.$route.params.number + "/comments?per_page=" + this.GLOBAL.github_percomments +
          "&page=" + x).then(
          data => {
            this.comments = data.body;
            this.comment_currentpage = x;
          });
      }
    },
    components: {
      "page-navigation": PageNavigation,
    },
    created: function () {
      this.$http.get("https://api.github.com/repos/" + this.GLOBAL.github_username + "/" + this.GLOBAL.github_username +
        ".github.io/issues/" + this.$route.params.number).then(data => {
        this.blogMessage = data.body
        this.blogContent = marked(data.body.body);
        // this.$http.post("https://api.github.com/markdown", {
        //   text: data.body.body,
        //   mode: "gfm",
        // }).then(data => {
        //   this.blogContent1 = data.body
        // })
      });
      this.$http.get("https://api.github.com/repos/" + this.GLOBAL.github_username + "/" + this.GLOBAL.github_username +
        ".github.io/issues/" + this.$route.params.number + "/comments?per_page=" + this.GLOBAL.github_percomments +
        "&page=first").then(data => {
        this.comments = data.body;
        if (data.headers.map.link !== undefined) {
          let link = data.headers.map.link[0];
          let re = /&page=(\d+)>; rel="last"/;
          this.comment_lastpage = Number(re.exec(link)[1])
        }
      });
    },
    mounted: function () {},
  }

</script>

<style scoped>
#BlogContent{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #blog_content {
    border: 1px solid blue;
    text-align: left;
    padding: 20px;
  }

  #blog_comments {
    border: 1px solid blue;
    text-align: left;
    padding: 20px;
  }

  #body {
    margin: 0 10%;
  }

  #navigation {
    background-color: yellow;
  }
</style>
