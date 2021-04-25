<template>
  <b-card v-if="stockList && article" class="stocks-card mx-3">
    <b-card-text>
      <h3>Stocks</h3>
      <ul>
        <li v-for="stock in stockList" :key="stock.symbol">
          {{ stock.company_name }}<br />
          Symbol: {{ stock.symbol }}<br />
          Price: {{ "654 Dogecoin" }}
        </li>
      </ul>
      <b-button variant="outline-primary" v-on:click.prevent="randomize">
        Reorder List
      </b-button>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {
      stockList: null,
    };
  },
  mounted() {
    this.stockList = this.article.instruments;
  },
  watch: {
    article: function () {
      this.stockList = this.article.instruments;
    },
  },
  methods: {
    randomize() {
      const arr = [...this.stockList];
      let arrSize = arr.length;
      const seed = arr.length;
      const temp = [];

      while (arrSize > 0) {
        let random = Math.floor(Math.random() * seed);
        if (arr[random] !== undefined) {
          temp.push(arr[random]);
          arr[random] = undefined;
          arrSize -= 1;
        }
      }
      this.stockList = temp;
    },
  },
};
</script>

<style lang="scss" scoped>
.stocks-card {
  border-top: none;
  border-bottom: none;
  border-radius: 0;
}
</style>
