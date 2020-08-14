<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>My Payment Details</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard" class="nav-link">Home</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">My Payment Details</h3>

          <div class="card-tools">
            <button
              class="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#addModal"
              type="button"
            >
              <i class="fa fa-plus"></i> Create
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="remove"
              title="Remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Payment Method</th>
                <th scope="col">Account Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="payment_detail in payment_details"
                v-bind:key="payment_detail.id"
              >
                <td>
                  <img
                    class="img-circle"
                    :src="payment_detail.payment_method_avatar"
                    alt="User Image"
                    width="30"
                  />{{ payment_detail.payment_method }}
                </td>
                <td>{{ payment_detail.account_number }}</td>
                <td>
                  <span data-toggle="modal" data-target="#addModal">
                    <button
                      @click="editValue(payment_detail)"
                      class="btn btn-success btn-sm rounded-0"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      data-original-title="Edit"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </span>
                  <button
                    @click="deleteValue(payment_detail.id)"
                    class="btn btn-danger btn-sm rounded-0"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    data-original-title="Delete"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer-->
      </div>
      <!-- /.card -->
    </section>
    <!-- /.content -->
    <!-- Add Modal -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-primary">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalTitle">
              Add Payment Details
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addValue" id="addValue">
            <div class="modal-body">
              <div class="form-group">
                <label for="payment_method">Payment Method</label>
                <select
                  class="form-control"
                  id="payment_method"
                  v-model="form.payment_method_id"
                  name="payment_method"
                  :class="{
                    'is-invalid': form.errors.has('payment_method_id'),
                  }"
                >
                  <option value="">Select Payment Method</option>
                  <option
                    v-for="payment_method in payment_methods"
                    v-bind:key="payment_method.id"
                    :value="payment_method.id"
                    >{{ payment_method.name }}</option
                  >
                </select>
                <has-error :form="form" field="payment_method_id"></has-error>
              </div>
              <div class="form-group">
                <label for="account_number">Account Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="account_number"
                  name="account_number"
                  v-model="form.account_number"
                  :class="{
                    'is-invalid': form.errors.has('account_number'),
                  }"
                />
                <has-error :form="form" field="account_number"></has-error>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-light"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-outline-light">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        payment_method: "",
        account_number: "",
      }),

      payment_methods: [],

      pm_id: "",

      edit: false,
    };
  },
  created() {
    if (this.payment_details.length) {
      return;
    }
    this.$store.dispatch("getPaymentDetails");
    this.fetchPM();
  },
  mounted() {},
  computed: {
    payment_details() {
      return this.$store.getters.payment_details;
    },
  },
  methods: {
    //---Delete Function--//
    deleteValue(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          fetch(axios.defaults.baseURL + "/api/payment-detail/" + id, {
            method: "delete",
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.$store.dispatch("getPaymentDetails");
            })
            .catch((err) =>
              Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Please check if your balance is enough",
                footer: "Contact Support if you need help",
              })
            );
        }
      });
    },
    //---End Delete Function--//
    //---AddValue Function--//
    addValue() {
      if (this.edit === false) {
        //Add Values
        this.form
          .post("/api/payment-detail")
          .then((data) => {
            this.form.payment_method = "";
            this.form.account_number = "";
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Trade Created",
            });
            this.$store.dispatch("getPaymentDetails");
            $("#addModal").modal("hide");
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Please check if your balance is enough",
              footer: "Contact Support if you need help",
            })
          );
        //End Add Values
      } else {
        //Update Values
        this.form

          .put("/api/payment-detail/" + this.form.id)
          .then((data) => {
            this.form.payment_method = "";
            this.form.account_number = "";
            Swal.fire("Good job!", "Saved Successfully", "success");
            //this.fetchValues();
          })
          .catch(
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Please try again or refresh page",
              footer: "Contact Support if you need help",
            }),
            (err) => console.log(err)
          );
      }
      //End Update Values
    },
    //---End AddValue Function--//
    //---End EditValue Function--//
    editValue(form) {
      this.edit = true;
      this.form.id = form.id;
      this.form.payment_method = form.payment_method;
      this.form.account_number = form.account_number;
    },
    //---End EditValue Function--//
    //---FetchValues Function--//
    fetchPM() {
      axios
        .get("/api/payment-method") //calling the api url for packages data
        .then((response) => {
          this.payment_methods = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
