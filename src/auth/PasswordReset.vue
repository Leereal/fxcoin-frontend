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
              Change your password here
            </p>
            <form @submit.prevent="changePassword">              
              <div class="form-group mb-3" v-if="authError">
                <p class="error">
                  {{ authError }}
                </p>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="New Password"
                  v-model="form.password"
                  :class="{
                    'is-invalid': form.errors.has('password'),
                  }"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="form.confirm_password"
                  :class="{
                    'is-invalid': form.errors.has('confirm_password'),
                  }"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
                <has-error :form="form" field="confirm_password"></has-error>
              </div>
              <div class="row">
                <!-- /.col -->
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">
                    Change Password
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
  name: "password-reset",
  data() {
    return {
      form: new Form({
        token: "",
        password: "",
        confirm_password: "",
      }),
      error: null,
    };
  },
  created(){
    this.form.token =  this.$route.query.token;
  },
  methods: {
    //---AddValue Function--//
    changePassword() {
      this.form.post("/api/password/reset").then((data) => {
        this.flashMessage.setStrategy("single");
        this.flashMessage.success({
          title: "Succefully Changed",
          message: "Password Changed Successfully",
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
  computed: {
    authError() {
      return this.$store.getters.authError;
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
