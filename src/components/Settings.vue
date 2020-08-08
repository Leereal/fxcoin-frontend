<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>System Settings</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Home</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <button type="button" @click.prevent="openMarketPlace" class="btn btn-primary btn-lg btn-block">
            Open Market Place
          </button>
          <button type="button" @click.prevent="closeMarketPlace" class="btn btn-secondary btn-lg btn-block">
            Close Market Place
          </button>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>
<script>
export default {
  methods: {
    openMarketPlace() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to open it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I do",
      })
        .then((result) => {
          if (result.value) {
            axios.post("/api/open-market-place").then((data) => {
              this.flashMessage.setStrategy("single");
              this.flashMessage.success({
                title: "Open Successfully",
                message: "Market Place is now open.",
              });
            });
          }
        }).catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Check the system error",
            footer: "Contact Support if you need help",
          })
        );
        
    },
    closeMarketPlace() {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to close it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I do",
      })
        .then((result) => {
          if (result.value) {
            axios.post("/api/close-market-place").then((data) => {
              this.flashMessage.setStrategy("single");
              this.flashMessage.success({
                title: "Closed Successfully",
                message: "Market Place is closed now.",
              });
             });
          }
        }).catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Check the system error",
            footer: "Contact Support if you need help",
          })
        );
        
    },
  },
};
</script>
