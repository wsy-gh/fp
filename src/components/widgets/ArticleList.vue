<template>
  <b-card v-if="articleList" text-variant="white" class="series-card mx-3">
    <b-card-text>
      <h3>{{ mods.title }}</h3>
      <div>
        <ul>
          <li v-for="article in articleList" :key="article.uuid">
            <b-link :to="createArticlePath(article)">{{
              article.headline
            }}</b-link>
          </li>
        </ul>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    pageData: {
      type: Array,
    },
    mods: {
      type: Object,
    },
  },
  methods: {
    createArticlePath(article) {
      return `/article${article.path}?uuid=${article.uuid}`;
    },
  },
  computed: {
    articleList: function () {
      if (this.mods.total) {
        let list = [...this.pageData];
        return list.splice(0, this.mods.total);
      } else {
        return this.pageData;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.series-card {
  border-radius: 0;
  background-color: #000;
  A {
    color: #fff;
  }
}
</style>
