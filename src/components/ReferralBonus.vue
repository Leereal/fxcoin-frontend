<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Referral Bonus</h1>
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
        <div class="card-body">
          <div class="row mb-5">
            <div class="col-sm-12">
              <div class="input-group">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="ref-label">Referral / Affiliate Link</span>
                  </div>
                </div>
                <input
                  type="text"
                  id="referral-link"
                  class="form-control"
                  readonly
                  :value="referralLink"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span
                      class="btn btn-info btn-sm text-white copy-btn ml-auto fa fa-copy"
                      @click.stop.prevent="copyReferralLink"
                    >
                      Copy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <div class="row col-12">
                <div class="col-12 col-md-6">
                  <h3>
                    Available bonus is
                    <span class="text-success">{{ available_bonus }}</span>
                    points
                  </h3>
                  <p>
                    Minimum allowed withdrawal is 400 points if you are using
                    ZAR account and 25 points if you are using USD account
                  </p>
                </div>
                <div class="col-12 col-md-6">
                  <button
                    class="btn  btn-block btn-success"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    Sell Referral Bonus
                  </button>
                </div>
              </div>
              <table class="table table-bordered table-striped table-sm col-12">
                <thead>
                  <tr>
                    <th>Date Received</th>
                    <th>Username</th>
                    <th>Package</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="referral_bonus in referral_bonuses"
                    :key="referral_bonus.id"
                  >
                    <td>
                      {{
                        referral_bonus.date_received
                          | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                      }}
                    </td>
                    <td>{{ referral_bonus.referral }}</td>
                    <td>{{ referral_bonus.package }}</td>
                    <td>
                      {{ currentUser.currency_id == 2 ? "R" : "$"
                      }}{{ referral_bonus.amount }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer-->
      </div>
      <!-- /.card -->
    </section>
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
              Choose Payment Method
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
          <form @submit.prevent="withdrawBonus" id="withdrawBonus">
            <div class="modal-body">              
             <div class="form-group">
                <label for="payment_detail_id">Payment Method</label>
                <select
                  class="form-control"
                  id="payment_detail_id"
                  v-model="form.payment_detail_id"
                  name="payment_detail_id"
                  :class="{
                    'is-invalid': form.errors.has('payment_detail_id'),
                  }"
                >
                  <option value="">Select Payment Method</option>
                  <option
                    v-for="payment_detail in payment_details"
                    v-bind:key="payment_detail.id"
                    :value="payment_detail.id"
                    >{{ payment_detail.payment_method }}</option
                  >
                </select>
                <has-error
                  :form="form"
                  field="payment_detail_id"
                ></has-error>
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
                Sell
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
      }),
      available_bonus: "",
      referral_bonuses: [],
      payment_details: [],
    };
  },
  created() {
    this.getAvailableBonus();
    this.fetchValues(); //Calling function/method to output data after component created
    this.fetchPaymentMethods();
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    referralLink() {
      return (
        this.$ipAdr +
        "/register?ref=" +
        this.$store.getters.currentUser.username
      );
    },
  },
  methods: {
    copyReferralLink() {
      let referralLinkToCopy = document.querySelector("#referral-link");
      referralLinkToCopy.setAttribute("type", "text");
      referralLinkToCopy.select();

      try {
        var successful = document.execCommand("copy");
        this.flashMessage.setStrategy("single");
        this.flashMessage.success({
          title: "Succefully Copied",
          message: "Link was successfully copied to clipboard",
        });
      } catch (err) {
        alert("Oops, unable to copy");
      }
    },
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/user-referral-bonus") //calling the api url for packages data
        .then((response) => {
          this.referral_bonuses = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //---End FetchValues Function--//
    //---FetchValues Function--//
    getAvailableBonus() {
      axios
        .get("/api/available-bonus") //calling the api url for packages data
        .then((response) => {
          this.available_bonus = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //---End FetchValues Function--//
     //---FetchPaymentMethods Function--//
    fetchPaymentMethods() {
      axios
        .get("/api/user-payment-details") //calling the api url for PaymentMethods data
        .then((response) => {
          this.payment_details = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     //---AddValue Function--//
    withdrawBonus() {
      this.form
        .post("/api/bonus-withdrawal")
        .then((data) => {
          console.log(data);
          this.flashMessage.setStrategy("single");
          this.flashMessage.success({
            title: "Successfully Done",
            message: "You placed your bonus on Market Place",
          });
          this.fetchValues();
          this.getAvailableBonus();
          $("#addModal").modal("hide");
      
        })
        .catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: error.response.data.message,
            footer: "Contact Support if you need help",
          });
        });
    },
  },
};
</script>
<style scoped>
@media (max-width: 576px) {
  .card-body {
    font-size: 70%;
  }
}
</style>
