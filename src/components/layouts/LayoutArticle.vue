<template>
  <span v-if="article" class="article-layout">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mt-3">
          <h1>{{ article.headline }}</h1>
          <div class="m-3">
            <p>
              By: {{ article.byline }}<br />{{
                new Date(article.publish_at).toLocaleString()
              }}
            </p>
          </div>
          <div v-html="article.body" m-5></div>
          <div class="mb-5">
            <h3>Comment</h3>
            <b-form-textarea
              id="textarea"
              v-model="comments"
              placeholder="Comment"
              rows="3"
              max-rows="6"
              class="mb-3"
            ></b-form-textarea>
            <b-button
              variant="outline-primary"
              v-on:click.prevent="submitComment"
            >
              Submit Comment
            </b-button>
          </div>
        </div>
        <div class="col-lg-4">
          <stocks :article="article"></stocks>
          <article-list
            :pageData="pageData"
            :mods="{ title: 'Latest Headlines', total: 7, exclude: '' }"
          ></article-list>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import ArticleList from "@/components/widgets/ArticleList";
import Stocks from "@/components/widgets/Stocks";

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
  data() {
    return {
      comments: "",
    };
  },
  components: {
    ArticleList,
    Stocks,
  },
  methods: {
    submitComment() {
      alert(this.comments);
      this.comments = "";
    },
  },
  computed: {
    article: function () {
      const UUID = this.$route.query.uuid;
      const ARTICLE_PATH = "/" + this.$route.params.pathMatch;

      if (UUID) {
        // Finds based on uuid
        let uuid = UUID.replace(/-/g, "");

        return this.uuidLookup[uuid];
      } else if (ARTICLE_PATH) {
        // Finds based on plain path
        return this.pageData.find((e) => {
          return e.path === ARTICLE_PATH;
        });
      }

      return null;
    },
    image_url: function () {
      if (this.article.images[0]) {
        return this.article.images[0].url;
      } else {
        return "";
      }
    },
    image_alt: function () {
      if (this.article.images[0]) {
        return this.article.images[0].name;
      } else {
        return "image placeholder";
      }
    },
  },
};
</script>
