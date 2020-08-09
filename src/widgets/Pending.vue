<template>
  <div class="card">
    <div class="card-header border-transparent">
      <h3 class="card-title">Latest Orders</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table m-0">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Package</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pending_payment in pending_payments" :key="pending_payment.id">
              <td><router-link to="trade">{{pending_payment.transaction_code}}</router-link></td>
              <td>{{pending_payment.package.name}}</td>
              <td><span class="badge badge-success">{{pending_payment.status}}</span></td>
              <td>{{pending_payment.amount}}</td>
            </tr>            
          </tbody>
        </table>
      </div>
      <!-- /.table-responsive -->
    </div>
    <!-- /.card-body -->
    <div class="card-footer clearfix">
      <a href="javascript:void(0)" class="btn btn-sm btn-info float-left"
        >Place New Order</a
      >
      <a href="javascript:void(0)" class="btn btn-sm btn-secondary float-right"
        >View All Orders</a
      >
    </div>
    <!-- /.card-footer -->
  </div>
</template>
<script>
export default {
  name: "pending",
  data(){
      return{
          pending_payments:[]
      }

  },
  methods: {
    //---FetchValues Function--//
    fetchValues() {
      axios
        .get("/api/user-pending-payments") //calling the api url for packages data
        .then((response) => {
          this.pending_payments = response;
          console.log(this.pending_payments)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
  };
</script>
<style lang="stylus" scoped>


</style>
