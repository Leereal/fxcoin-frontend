<template>
  <!-- Content Wrapper. Contains page content -->
  <div>
    <!-- Main content -->
    <section
      class="content d-flex justify-content-center align-items-center mt-5"
    >
      <div class="login-box">
        <div class="card">
          <div class="card-body login-card-body">
            <p class="login-box-msg">
              Forgot your password? Reset it.
            </p>
            <form @submit.prevent="forgotPassword">
              <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="form.email"
                  :class="{
                    'is-invalid': form.errors.has('email'),
                  }"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="row">
                <!-- /.col -->
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">
                    Password Reset
                  </button>
                </div>
                <!-- /.col -->
              </div>
            </form>
          </div>
          <!-- /.login-card-body -->
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  name: "forgot-password",
  data() {
    return {
      form: new Form({
        email: ""     
      }),
      error: null,
    };
  },
  methods: {
    //---AddValue Function--//
    forgotPassword() {
      this.form.post("/api/password/email").then((data) => {
        this.flashMessage.setStrategy("single");
        this.flashMessage.success({
          title: "Message Sent",
          message: "Password Reset link sent to your email. Login to your email and click it to rest your password",
        });
      }),
        (err) =>
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please try again or refresh page",
            footer: "Contact Support if you need help",
          });
    },
  },  
};
</script>
<style scoped>
.error {
  text-align: center;
  color: red;
}
</style>
