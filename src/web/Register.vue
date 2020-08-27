<template>
  <!-- section -->
  <div class="section white_fonts">
    <div class="container">
      <div class="row">
        <div class="col-md-6" style="background-color:yellow;">
          <div class="full text_align_right_img">
            <img src="../assets/currencies.png" alt="#" class="img-fluid" />
          </div>
        </div>
        <div class="col-md-6 " style="background: #2a2a2a;">
          <div class="full">
            <div class="heading_main text_align_left">
              <h2><span class="theme_color">Register</span> Today</h2>
            </div>
          </div>
          <div class="full paddding_left_15">
            <h3>Goals</h3>
            <p>
              We strive to be the market leader in the provision of online
              virtual investments services offering the best of service to our members.
              Timeous response through our support panel to any requests or
              queries that may be raised by our members. Ensure ease of use of
              the system through the provision of dedicated servers to make our
              system accessible anywhere anytime. Maximum integrity in the
              handling of member funds to ensure timely payouts are adhered to.
            </p>
          </div>
          <div class="full paddding_left_15">
            <router-link to="/register"><button class="btn btn-xl btn-outline-light btn-block">Register</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end section -->
</template>

<script>
export default {};
</script>
<style scoped src="@/assets/style.css">
h {
  background-color: yellow;
}
</style>
