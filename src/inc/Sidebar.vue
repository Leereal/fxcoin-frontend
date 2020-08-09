<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/home" class="brand-link">
      <img
        src="../assets/logo.png"
        alt="Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      />
      <span class="brand-text font-weight-light">{{ $appName }}</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="../assets/user.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <router-link to="/profile" class="d-block">{{
            currentUser.name + " " + currentUser.surname
          }}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview">
            <router-link to="/dashboard" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt text-blue"></i>
              <p>
                Dashboard
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/investments" class="nav-link">
              <i class=" nav-icon fas fa-wallet text-purple"></i>
              <p>
                My Investments
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/market-place" class="nav-link">
              <i class=" nav-icon fas fa-funnel-dollar text-yellow"></i>
              <p>
                Market Place
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/trade" class="nav-link">
              <i class="nav-icon fas fa-shopping-cart text-green"></i>
              <p>
                My Payments
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/offers" class="nav-link">
              <i class="nav-icon fas fa-gift text-red"></i>
              <p>
                Offers
              </p>
            </router-link>
          </li>          
          <li class="nav-item">
            <router-link to="/user-payment-details" class="nav-link">
              <i class="nav-icon fas fa-info-circle text-blue"></i>
              <p>
                Payment Details
              </p>
            </router-link>
          </li>
          <li class="nav-item has-treeview">
            <a href="" class="nav-link">
              <i class="nav-icon fa fa-cog text-white"></i>
              <p>
                Other
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul v-if="currentUser.id ==1" class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/settings" class="nav-link">
                  <i class="fa fa-circle nav-icon"></i>
                  <p>Settings</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/profile" class="nav-link">
                  <i class="nav-icon fas fa-user"></i>
                  <p>
                    Profile
                    <span class="right badge badge-danger">New</span>
                  </p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/referrals" class="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>
                    Referrals                   
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/referral-bonus" class="nav-link">
                  <i class="nav-icon fas fa-gift"></i>
                  <p>
                    Referrals Bonus                   
                  </p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link" @click.prevent="logout">
              <i class="nav-icon fas fa-power-off text-red"></i>
              <p>
                Logout
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  name: "sidebar",
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>
<style scoped></style>
