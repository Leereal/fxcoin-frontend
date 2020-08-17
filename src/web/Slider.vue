<template>
  <div class="container-fluid">
    <!-- Start Slider -->
    <div id="slides" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#slides" data-slide-to="0" class="active">MmMm</li>
        <li data-target="#slides" data-slide-to="1"></li>
        <li data-target="#slides" data-slide-to="2"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/image1.png" alt="caurosel image 1" />
          <div class="carousel-caption">
           
              <button type="button" class="btn btn-lg btn-outline-light ">Login</button>
              <button type="button" class="btn btn-lg btn-outline-light ">Register Now</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/image2.png" alt="caurosel image 2" />
        </div>
        <div class="carousel-item">
          <img src="../assets/image3.png" alt="caurosel image 3" />
        </div>
      </div>
    </div>
    <!-- End Slider -->
  </div>
</template>

<script>
export default {};
</script>

<style></style>
