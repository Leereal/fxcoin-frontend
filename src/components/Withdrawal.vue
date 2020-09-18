<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>My Direct Withdrawals</h1>
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
          <h3 class="card-title">My Direct Withdrawals</h3>
        </div>
        <div class="card-body" style="overflow-x:auto;">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">Transaction Code</th>
                <th scope="col">Date Created</th>                
                <th scope="col">Amount</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Account</th>                 
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="withdrawals==''">
                <td colspan="6" class="text-center">
                  No withdrawals done so far. You can only withdraw if you had purchased points directly from the system.
                </td>
              </tr>
              <tr
                v-for="withdrawal in withdrawals"
                v-bind:key="withdrawal.id"
              >
                <td>{{ withdrawal.transaction_code }}</td>  
                <td>{{ withdrawal.created | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>  
                <td>{{ currentUser.currency_id == 2 ? "R" : "$"}}{{ withdrawal.amount }}</td>  
                <td>{{ withdrawal.payment_method }}</td>  
                <td>{{ withdrawal.account_number }}</td>             
                <td v-if="withdrawal.status == 0"><span class="badge bg-success">Paid</span></td>
                <td v-if="withdrawal.status == 2"><span class="badge bg-warning">Pending</span></td> 
                <td v-if="withdrawal.status == 1"><span class="badge bg-primary">Processing <i class="fas fa-spinner fa-pulse"></i></span></td>                  
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
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  data() {
    return {    
      withdrawals:[]
    };
  },
   created() {
    this.fetchValues(); //Calling function/method to output data after component created
  },
  methods: {   
      fetchValues() {    
      axios
        .get("/api/withdrawals") //calling the api url for packages data
        .then((response) => {
          this.withdrawals = response.data.data;       
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //---End FetchValues Function--//  
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  }, 
};
</script>
<style scoped>
td {overflow:hidden; white-space:nowrap}
th {overflow:hidden; white-space:nowrap}
@media (max-width: 576px) {
  .card-body{
    font-size: 70%;
  }
    
}
</style>
