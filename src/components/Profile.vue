<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
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
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img
                    class="profile-user-img img-fluid img-circle"
                    src="../assets/user.png"
                    alt="User profile picture"
                  />
                </div>

                <h3 class="profile-username text-center">
                  {{ currentUser.name + " " + currentUser.surname }}
                </h3>

                <p class="text-muted text-center">{{ currentUser.username }}</p>
<!-- 
                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Affiliates</b> <a class="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Total Invested</b> <a class="float-right">543</a>
                  </li>
                  <li class="list-group-item">
                    <b>Total Withdrawn</b> <a class="float-right">13,287</a>
                  </li>
                </ul> -->

                <router-link
                  to="/change-password"
                  class="btn btn-primary btn-block"
                  ><b>Change Password</b></router-link
                >
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      href="#settings"
                      data-toggle="tab"
                      >Settings</a
                    >
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active" id="settings">
                    <form @submit.prevent="updateValue">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label"
                          >Full Name</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="inputName"
                            readonly
                            placeholder="Name"
                            :value="
                              currentUser.name + ' ' + currentUser.surname
                            "
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label"
                          >Email</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="inputEmail"
                            placeholder="Email"
                            readonly
                            :value="currentUser.email"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="cellphone" class="col-sm-2 col-form-label"
                          >Cellphone</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="cellphone"
                            :placeholder="currentUser.cellphone"
                            v-model="form.cellphone"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" class="btn btn-danger">
                            Submit
                          </button>
                          (Only if you want to change cellphone number)
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        cellphone: "",
      }),
    };
  },
  methods: {
    //---AddValue Function--//
    updateValue() {     
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to change it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed.  I do!",
      }).then((result) => {
        if (result.value) {
          this.form.post("/api/update-profile").then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Profile Updated",
            });
            this.fetchValues();
          });
        }
      }),
        (err) =>
          this.flashMessage.error({
            title: "Error",
            message: "Please try again",
          });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;     
    },
  },
};
</script>
