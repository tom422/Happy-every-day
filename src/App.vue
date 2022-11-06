<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/bootstrap.min.css';
// @import '@/assets/css/owl.carousel.min.css';
@import '@/assets/css/animate.min.css';
@import '@/assets/css/magnific-popup.css';
// @import '@/assets/css/fontawesome-all.min.css';
// @import '@/assets/css/themify-icons.css';
@import '@/assets/css/meanmenu.css';
@import '@/assets/css/slick.css';
@import '@/assets/css/default.css';
@import '@/assets/css/style.css';
@import '@/assets/css/responsive.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
