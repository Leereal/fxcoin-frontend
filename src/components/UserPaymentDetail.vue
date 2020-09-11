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
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Payment Method</th>
                <th v-if="currentUser.currency_id == 2" scope="col">Branch</th>
                <th scope="col">Account Name Holder</th>
                <th scope="col">Account Number</th>
                <th v-if="currentUser.currency_id == 2" scope="col">Account Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="payment_details==''">
                <td colspan="6" class="text-center">
                  Please enter your payment details in order for you to transact
                </td>
              </tr>
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
                <td v-if="currentUser.currency_id == 2">
                  {{ payment_detail.branch }}
                </td>
                <td>{{ payment_detail.account_holder }}</td>
                <td>{{ payment_detail.account_number }}</td>
                <td v-if="currentUser.currency_id == 2">
                  {{ payment_detail.account_type }}
                </td>
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
      ref="modal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-primary">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalTitle">
              {{ modalTitle }}
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
                <input v-if="edit" type="text" disabled class="form-control" :value="p_m"/>
                <select
                  v-else
                  class="form-control"
                  id="payment_method"
                  v-model="form.payment_method_id"
                  name="payment_method"
                  :class="{
                    'is-invalid': form.errors.has('payment_method_id'),
                  }"
                >
                  <option
                    v-for="payment_method in payment_methods"
                    v-bind:key="payment_method.id"
                    :value="payment_method.id"
                    >{{ payment_method.name }}</option
                  >
                </select>
                <has-error :form="form" field="payment_method_id"></has-error>
              </div>
              <div v-if="currentUser.currency_id == 2" class="form-group">
                <label for="branch">Branch Code</label>
                <input
                  type="text"
                  class="form-control"
                  id="branch"
                  name="branch"
                  v-model="form.branch"
                  :class="{
                    'is-invalid': form.errors.has('branch'),
                  }"
                />
                <has-error :form="form" field="branch"></has-error>
              </div>
              <div v-if="currentUser.currency_id == 2" class="form-group">
                <label for="branch">Account Type</label>
                <select               
                  class="form-control"
                  id="account_type"
                  v-model="form.account_type"
                  name="account_type"
                  :class="{
                    'is-invalid': form.errors.has('account_type'),
                  }"
                >
                 <option value="">Select Account Type</option>
                 <option value="Cheque">Cheque</option>
                 <option value="Savings">Savings</option>
                 <option value="Current">Current</option>
                 <option value="Investment">Investment</option>
                </select>
                <has-error :form="form" field="account_type"></has-error>
              </div>
              <div class="form-group">
                <label for="account_holder">Account Name Holder</label>
                <input
                  type="text"
                  class="form-control"
                  id="account_holder"
                  name="account_holder"
                  v-model="form.account_holder"
                  :class="{
                    'is-invalid': form.errors.has('account_holder'),
                  }"
                />
                <has-error :form="form" field="account_holder"></has-error>
              </div>
              <div class="form-group">
                <label for="account_number">Account</label>
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
        account_holder: "",
        account_type:"",
        branch: "",
      }),
      pm_id: "",
      edit: false,
      modalTitle: "Add Payment Details",
      p_m:""
    };
  },
  methods: {   
    //---AddValue Function--//
    addValue() {
      if (this.edit === false) {
        //Add Values
        this.form
          .post("/api/payment-detail")
          .then((data) => {
            this.form.reset();
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Payment Details Added",
            });
            this.$store.dispatch("getPaymentDetails");
            $("#addModal").modal("hide");
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Please check if your details are correct",
              footer: "Contact Support if you need help",
            })
          );
        //End Add Values
      } else {
        //Update Values
        this.form

          .put("/api/payment-detail/" + this.form.id)
          .then((data) => {
            this.flashMessage.setStrategy("single");
            this.flashMessage.success({
              title: "Succefully Saved",
              message: "Payment details Updated",
            });
            this.$store.dispatch("getPaymentDetails");
            $("#addModal").modal("hide");
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Please check if your details are correct",
              footer: "Contact Support if you need help",
            })
          );
      }
      //End Update Values
    },
    //---End AddValue Function--//
    //---End EditValue Function--//
    editValue(form) {
      this.edit = true;
      this.form.id = form.id;
      this.form.account_number = form.account_number;
      this.form.account_holder = form.account_holder;
      this.form.account_type = form.account_type;
      this.form.branch = form.branch;
      this.p_m = form.payment_method;
      this.modalTitle = "Edit Payment Details";
    },
    //---End EditValue Function--//
  },
  computed: {
    payment_details() {
      return this.$store.getters.payment_details;
    },
    payment_methods() {
      return this.$store.getters.payment_methods;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  mounted() {
    if (this.payment_details.length) {
      return;
    }
    this.$store.dispatch("getPaymentDetails");

    if (this.payment_methods.length) {
      return;
    }
    this.$store.dispatch("getPaymentMethods");

     $(this.$refs.modal).on('hidden.bs.modal', () => {
        this.form.reset();
        this.edit=false;
    });
  },
};
</script>
<style scoped>
@media (max-width: 576px) {
  table {
    font-size: 70%;
  }
}
</style>
