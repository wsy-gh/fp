<template>
  <span class="main-layout">
    <div class="container mb-3">
      <div class="row grid">
        <h2 class="section-title mx-3">Today's Featured</h2>
        <b-card
          v-if="headliner && headliner.images[0].url"
          class="headliner-card mx-3"
          :img-src="headliner.images[0].url"
          :img-alt="headliner.images[0].name"
          :sub-title="headliner.promo"
        >
          <b-card-text>
            <h2>
              <b-link :to="createArticlePath(headliner)">{{
                headliner.headline
              }}</b-link>
            </h2>
            by {{ headliner.byline }}<br />
            <div>{{ new Date(headliner.publish_at).toLocaleString() }}</div>
          </b-card-text>
        </b-card>
        <article-list
          :pageData="headlinerSeries"
          :mods="{ title: 'In This Series', total: 7, exclude: '' }"
        ></article-list>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-lg-12 mt-1 mb-3 d-flex justify-content-between">
          <b-select
            class="mx-3"
            v-model="selectedFilter"
            :options="filterOptions"
          ></b-select>
          <b-select
            class="mx-3"
            v-model="selectedOrder"
            :options="orderOptions"
          ></b-select>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row" v-if="otherArticles">
        <h2 class="section-title mx-3">Recent Articles</h2>
        <div
          v-for="article in otherArticles"
          class="col-lg-12 mt-1 mb-3"
          :key="article.uuid"
        >
          <b-card
            class="other-article-card"
            :img-src="article.images[0].url"
            :img-alt="article.images[0].name"
            img-left
          >
            <b-card-text>
              <b-link :to="createArticlePath(article)"
                ><h4>{{ article.headline }}</h4></b-link
              >
              <p v-html="article.promo"></p>
              <strong>{{ article.byline }}</strong>
              <div>
                <div>{{ new Date(article.publish_at).toLocaleString() }}</div>
                <b-link :to="createArticlePath(article)"> Read More </b-link>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import ArticleList from "@/components/widgets/ArticleList";

export default {
  props: {
    dataError: {
      type: Boolean,
      default: false,
    },
    pageData: {
      type: Array,
    },
    uuidLookup: {
      type: Object,
    },
  },
  components: {
    ArticleList,
  },
  data() {
    return {
      selectedFilter: null,
      selectedOrder: null,
      orderOptions: [
        { value: null, text: "Order By:" },
        { value: "newest", text: "Order by Newest" },
        { value: "oldest", text: "Order by Oldest" },
      ],
      otherArticles: [],
    };
  },
  mounted() {
    this.setOtherArticles();
  },
  methods: {
    createArticlePath(article) {
      return `/article${article.path}?uuid=${article.uuid}`;
    },
    getAllTags() {
      if (this.pageData) {
        const map = new Map();

        this.pageData.forEach((article) => {
          article.tags.forEach((tag) => {
            map.set(tag.slug, tag.name);
          });
        });

        let uniqueTags = [...map.entries()];

        let options = [];
        uniqueTags.forEach((e) => {
          options.push({
            value: e[0],
            text: e[1],
          });
        });
        return options;
      }
      return [null];
    },
    setOtherArticles() {
      let headliner_uuid = this.uuidLookup.selectedData.headlinerArticle.uuid;

      this.otherArticles = this.pageData.filter(
        (e) => e.uuid !== headliner_uuid
      );
    },
    applyFilter(val) {
      this.setOtherArticles();
      let filtered = this.otherArticles.filter((article) => {
        return article.tags.find((e) => e.slug === val);
      });

      this.otherArticles = filtered;
    },
    applyOrder(val) {
      let currentOtherArticles = this.otherArticles;
      if (val === this.orderOptions[1].value) {
        // order by newer
        currentOtherArticles.sort((article_a, article_b) => {
          return article_a.publish_at <= article_b.publish_at ? 1 : -1;
        });
        this.otherArticles = currentOtherArticles;
      } else if (val === this.orderOptions[2].value) {
        // order by older
        currentOtherArticles.sort((article_a, article_b) => {
          return article_a.publish_at >= article_b.publish_at ? 1 : -1;
        });
      }

      this.otherArticles = currentOtherArticles;
    },
  },
  computed: {
    filterOptions: function () {
      const allTags = this.getAllTags();
      allTags.unshift({ value: null, text: "Filter By:" });
      return allTags;
    },
    headliner: function () {
      let article = this.uuidLookup.selectedData.headlinerArticle;

      if (article) {
        return article;
      } else {
        return {
          images: [{ url: "" }],
        };
      }
    },
    headlinerSeries: function () {
      let seriesName = this.uuidLookup.selectedData.type;

      let filtered = this.pageData.filter((e) => {
        if (this.headliner.uuid !== e.uuid) {
          return e.article_type === seriesName;
        }
      });

      return filtered;
    },
  },
  watch: {
    pageData: function () {
      this.setOtherArticles();
    },
    selectedFilter: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.applyFilter(newVal);
        if (this.selectedOrder !== null) {
          this.applyOrder(this.selectedOrder);
        }
      }
    },
    selectedOrder: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.applyOrder(newVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  display: block;
  margin: 1rem;
}
.headliner-card {
  IMG {
    max-height: 300px;
    object-fit: cover;
    object-position: 20% 10%;
  }
}
.other-article-card {
  IMG {
    display: none;
  }
}
.card {
  border-radius: 0;
  border-right: none;
  border-left: none;
  IMG {
    border-radius: 0;
  }
}
.row.grid {
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
}
@media (min-width: 768px) {
  .other-article-card {
    IMG {
      display: block;
      max-width: 200px;
      object-fit: cover;
      object-position: 20% 10%;
    }
  }
  .container .section-title {
    transform-origin: 0 12px;
    transform: rotate(90deg);
    white-space: nowrap;
    font-weight: 400;
    font-size: 2.3rem;
    position: absolute;
    line-height: 1em;
    padding-top: 20px;
    margin: 0;
  }
  .row.grid {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: auto;
    align-items: stretch;
  }
}
</style>
