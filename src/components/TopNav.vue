<template>
  <div id="nav">
    <div class="container">
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-6">
          <div id="nav_logo">
            <img alt="Vue logo" src="@/assets/logo.svg" />
          </div>
        </div>
        <div class="col-6">
          <div class="router_links d-flex justify-content-end">
            <router-link to="/">Main</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
  padding: 30px;
  border-bottom: 1px #ccc solid;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  #nav_logo {
    width: 10rem;
  }
}
</style>
