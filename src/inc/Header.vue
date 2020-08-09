<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand ">
    <FlashMessage :position="'bottom right'"></FlashMessage>
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!--Add Notifications here-->
      
      <!-- User Dropdown Menu -->
      <li class="dropdown user user-menu">
        <a
          href="#"
          class="dropdown-toggle a-user"
          data-toggle="dropdown"
          aria-expanded="true"
        >
          <img src="../assets/image.jpg" class="user-image" alt="User Image" />
          <span class="hidden-xs">{{
            currentUser.name + " " + currentUser.surname
          }}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <!-- User image -->
          <li class="user-header">
            <img
              src="../assets/image.jpg"
              class="img-circle"
              alt="User Image"
            />

            <p>
              {{ currentUser.name + " " + currentUser.surname }}
            </p>
            <p>
              {{ currentUser.cellphone }}
              <small
                >Member since
                {{ currentUser.created_at | moment("dddd, MMMM Do YYYY") }}
              </small>
            </p>
          </li>
          <!-- Menu Body -->
          <li class="user-body">
            <div class="row">
              <div class="col-4 text-center">
                <router-link to="/referrals">Referrals</router-link>
              </div>
              <div class="col-4 text-center">
                <router-link to="/history">History</router-link>
              </div>
              <div class="col-4 text-center">
                <router-link to="/profile">Profile</router-link>
              </div>
            </div>
            <!-- /.row -->
          </li>
          <!-- Menu Footer-->
          <li class="user-footer">
            <div class="float-left">
              <router-link
                to="/change-password"
                class="btn btn-default btn-flat"
                >Change Password</router-link
              >
            </div>
            <div class="float-right">
              <a href="" @click.prevent="logout" class="btn btn-danger btn-flat"
                >Sign out</a
              >
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script>
export default {
  name: "app-header",
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
      console.log(currentUser);
    },
  },
};
</script>
<style scoped>
.navbar-nav > .user-menu > .dropdown-menu > li.user-header > img {
  z-index: 5;
  height: 90px;
  width: 90px;
  border: 3px solid;
  border-color: transparent;
  border-color: blue;
}

.navbar-nav > .user-menu > .dropdown-menu > li.user-header > p {
  z-index: 5;
  font-size: 12px;
  margin-top: 10px;
  color: white;
}

.navbar-nav > .user-menu > .dropdown-menu > li.user-header > p > small {
  display: block;
  font-size: 10px;
}

.navbar-nav > .user-menu > .dropdown-menu > .user-body a {
  color: #444 !important;
}
.navbar-nav > .user-menu > .dropdown-menu > .user-body {
  padding: 15px;
  border-bottom: 1px solid #f4f4f4;
  border-top: 1px solid #dddddd;
}
.navbar-nav > .user-menu > .dropdown-menu,
.navbar-nav > .user-menu > .dropdown-menu > .user-body {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
li.user-header {
  background-color: cornflowerblue;
}

.navbar-nav > .user-menu > .dropdown-menu {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 1px 0 0 0;
  border-top-width: 0;
  width: 280px;
}
.main-header {
  background-color: cornflowerblue;
}

.navbar-nav > .user-menu > .dropdown-menu > .user-body:after {
  content: " ";
  display: table;
}
.navbar-nav > .user-menu > .dropdown-menu > .user-body:after {
  clear: both;
}
.hidden-xs {
  color: white;
}
.skin-blue .main-header .navbar .nav > li > a:hover,
.skin-blue .main-header .navbar .nav > li > a:active,
.skin-blue .main-header .navbar .nav > li > a:focus,
.skin-blue .main-header .navbar .nav .open > a,
.skin-blue .main-header .navbar .nav .open > a:hover,
.skin-blue .main-header .navbar .nav .open > a:focus,
.skin-blue .main-header .navbar .nav > .active > a {
  background: rgba(0, 0, 0, 0.1);
  color: #f6f6f6;
}

.fas {
  display: inline-block;
  font: normal normal normal 14 px/1 FontAwesome;
  font-size: 15px;
  text-rendering: auto;
  color: whitesmoke;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.badge-notification {
  position: absolute;
  top: 9px;
  right: 7px;
  text-align: center;
  font-size: 9px;
  padding: 2px 3px;
  line-height: 0.9;
}

/*Dropdowns in general*/
.dropdown-menu {
  box-shadow: none;
  border-color: #eee;
}
.dropdown-menu > li > a {
  color: #777;
}
.dropdown-menu > li > a > .glyphicon,
.dropdown-menu > li > a > .fa,
.dropdown-menu > li > a > .ion {
  margin-right: 10px;
}
.dropdown-menu > li > a:hover {
  background-color: #e1e3e9;
  color: #333;
}
.dropdown-menu > .divider {
  background-color: #eee;
}
.navbar-nav > .notifications-menu > .dropdown-menu {
  width: 280px;
  padding: 0 0 0 0;
  margin: 0;
  top: 100%;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li {
  position: relative;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li.header {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #ffffff;
  padding: 7px 10px;
  border-bottom: 1px solid #f4f4f4;
  color: #444444;
  font-size: 14px;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li.footer > a {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 12px;
  background-color: #fff;
  padding: 7px 10px;
  border-bottom: 1px solid #eeeeee;
  color: #444 !important;
  text-align: center;
}
@media (max-width: 991px) {
  .navbar-nav > .notifications-menu > .dropdown-menu > li.footer > a,
  .navbar-nav > .messages-menu > .dropdown-menu > li.footer > a,
  .navbar-nav > .tasks-menu > .dropdown-menu > li.footer > a {
    background: #fff !important;
    color: #444 !important;
  }
}
.navbar-nav > .notifications-menu > .dropdown-menu > li.footer > a:hover,
.navbar-nav > .messages-menu > .dropdown-menu > li.footer > a:hover,
.navbar-nav > .tasks-menu > .dropdown-menu > li.footer > a:hover {
  text-decoration: none;
  font-weight: normal;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu,
.navbar-nav > .messages-menu > .dropdown-menu > li .menu,
.navbar-nav > .tasks-menu > .dropdown-menu > li .menu {
  max-height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: hidden;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a {
  display: block;
  white-space: nowrap;
  /* Prevent text from breaking */
  border-bottom: 1px solid #f4f4f4;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a:hover {
  background: #f4f4f4;
  text-decoration: none;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a {
  color: #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
}
.navbar-nav
  > .notifications-menu
  > .dropdown-menu
  > li
  .menu
  > li
  > a
  > .glyphicon,
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a > .fa,
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a > .ion {
  width: 20px;
}
.main-header .navbar .nav > li > a:hover,
.main-header .navbar .nav > li > a:active,
.main-header .navbar .nav > li > a:focus,
.main-header .navbar .nav .open > a,
.main-header .navbar .nav .open > a:hover,
.main-header .navbar .nav .open > a:focus,
.main-header .navbar .nav > .active > a {
  background: yellow;
  color: #f6f6f6;
}
.skin-blue .main-header .navbar .nav > li > a:hover,
.skin-blue .main-header .navbar .nav > li > a:active,
.skin-blue .main-header .navbar .nav > li > a:focus,
.skin-blue .main-header .navbar .nav .open > a,
.skin-blue .main-header .navbar .nav .open > a:hover,
.skin-blue .main-header .navbar .nav .open > a:focus,
.skin-blue .main-header .navbar .nav > .active > a {
  background: #00c0ef;
  color: #f6f6f6;
}
.a-notification {
  position: relative;
  display: block;
  padding: 10px 15px;
  line-height: 20px;
}
.a-notification,
.a-user {
  padding-top: 10px;
  padding-bottom: 15px;
}
</style>
