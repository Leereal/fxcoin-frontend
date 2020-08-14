<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-blue"
    style="margin:24px 0;"
  >
    <router-link to="/home" class="navbar-brand"
      ><div class="full">
        <img class="img-responsive" height="30" src="../assets/logo.png" alt="#" /></div
    ></router-link>
    <button
      class="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navb"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navb">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <router-link to="/register" class="nav-link"
            ><i class="fas fa-user-plus"></i> Sign Up</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"
            ><i class="fas fa-sign-in-alt"></i> Login</router-link
          >
        </li>
      </ul>
    </div>
    <FlashMessage :position="'bottom right'"></FlashMessage>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: red;
  cursor: pointer;
}
nav {
  background-color: blue !important;
  color: white;
}
</style>
