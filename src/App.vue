<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/css/default.css';
@import '@/assets/css/bg.scss';
@import '@/assets/css/media.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

  // background-image: url('./assets/images/bg.jpg');
  // background-size: 100% 100%;
  // min-height: 100vh;
}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


</style>
