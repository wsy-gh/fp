<template>
  <div class="main">
    <LayoutSelector
      :pageData="pageData"
      :uuidLookup="uuidLookup"
      :dataError="dataError"
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
  name: "Main",
  components: {
    LayoutSelector,
  },
  data() {
    return {
      layoutType: "main_layout",
    };
  },
};
</script>
