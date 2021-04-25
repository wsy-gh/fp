<template>
  <span>
    <template v-if="layoutType && !dataError">
      <component
        v-if="pageData && uuidLookup"
        v-bind:is="LAYOUT_DICTIONARY[layoutType].name"
        :dataError="dataError"
        :pageData="pageData"
        :uuidLookup="uuidLookup"
      ></component>
    </template>
    <template v-else-if="dataError === true">
      <div class="d-flex justify-content-center align-content-center m-5">
        <h1>Not Found</h1>
      </div>
    </template>
  </span>
</template>

<script>
import LayoutMain from "@/components/layouts/LayoutMain";
import LayoutArticle from "@/components/layouts/LayoutArticle";

export default {
  props: {
    dataError: {
      type: Boolean,
      default: false,
    },
    layoutType: {
      type: String,
    },
    pageData: {
      type: Array,
    },
    uuidLookup: {
      type: Object,
    },
  },
  components: {
    LayoutMain,
    LayoutArticle,
  },
  data() {
    return {
      LAYOUT_DICTIONARY: {
        main_layout: {
          name: "LayoutMain",
        },
        article_layout: {
          name: "LayoutArticle",
        },
      },
    };
  },
};
</script>
