<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view v-bind="data" />
  </div>
</template>

<script>
import store from "@/store";
import TopNav from "@/components/TopNav";
export default {
  components: {
    TopNav,
  },
  data() {
    return {
      dataError: false,
      pageData: null,
      uuidLookup: null,
    };
  },
  created() {
    this.axios
      .get(process.env.VUE_APP_PAGEDATA_API)
      .then((response) => {
        // Creates a pageData array that is sent to all children
        this.pageData = response.data.results;
        store.dispatch("setPageData", this.pageData);

        // Creates a dictionary lookup based on UUID value without hyphens + headliner article
        let uuidObj = {
          selectedData: {
            type: "10-promise-series",
            headlinerArticle: "",
          },
        };
        response.data.results.forEach((article) => {
          uuidObj[article.uuid.replace(/-/g, "")] = article;
          if (uuidObj.selectedData.headlinerArticle === "") {
            uuidObj.selectedData.headlinerArticle =
              article.article_type === uuidObj.selectedData.type ? article : "";
          }
        });

        this.uuidLookup = uuidObj;

        store.dispatch("setUuidLookup", this.uuidLookup);
      })
      .catch((e) => {
        console.log(e);
        this.dataError = true;
      });
  },
  computed: {
    data() {
      return {
        dataError: this.dataError,
        pageData: this.pageData,
        uuidLookup: this.uuidLookup,
      };
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
  A {
    color: #004186;
    text-decoration: underline;
  }
  .text-white A {
    color: #fff;
  }
}
</style>
