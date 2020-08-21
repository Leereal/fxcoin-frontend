<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href=""
        ><img
          class="img-responsive"
          height="30"
          src="../assets/logo.png"
          alt="#"
      /></a>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
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
    </div>
    <FlashMessage :position="'bottom right'"></FlashMessage>
  </nav>
</template>
<script>
export default {};
</script>

<style scoped>
.navbar{
  padding: .8rem;
}
.navbar li{
  padding-right: 20px;
}
.nav-link{
  font-size:1.1em !important;
}
</style>
