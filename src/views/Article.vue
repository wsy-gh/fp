<template>
  <div class="article">
    <LayoutSelector
      :dataError="dataError"
      :pageData="pageData"
      :uuidLookup="uuidLookup"
      :layoutType="layoutType"
    />
  </div>
</template>

<script>
import LayoutSelector from "@/components/LayoutSelector.vue";

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
  name: "Article",
  components: {
    LayoutSelector,
  },
  data() {
    return {
      layoutType: "article_layout",
    };
  },
};
</script>
