<template>
  <div style="padding-bottom: 20px;">
    <span class="pc" @click="to_page(1)">◀◀</span>
    <span :class="{pc:true,select:page==currentpage}" v-for="page in pages" @click="to_page(page)" :key="page">{{page}}</span>
    <span class="pc" @click="to_page(lastpage)">▶▶</span>
  </div>
</template>

<script>
  export default {
    name: 'PageNavigation',
    props: ['lastpage', 'currentpage'],
    computed: {
      pages: function () {
        let p = this.currentpage
        let pages = [p - 4, p - 3, p - 2, p - 1, p, p + 1, p + 2, p + 3, p + 4]
        let l = this.lastpage
        pages = pages.filter(function (x) {
          return x >= 1 && x <= l
        })
        return pages
      }
    },
    methods: {
      to_page: function (x) {
        this.$emit('x_p', x)
      },
    },
  }

</script>

<style scoped>
  .hide {
    display: none;
  }
  .pc {
    width: 2em;
    height: 2em;
    line-height: 2em;
    border: 1px solid #e1e2e3;
    cursor: pointer;
    color: #8e8fd3;
    display: inline-block;
  }
  .select {
    color: white;
    background-color: #8e8fd3;
    border-style: inset;
  }

</style>
