<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>All Investments</h1>
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
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body" style="overflow-x:auto;">
              <table class="table table-bordered table-striped table-sm col-12">
                <thead>
                  <tr>
                    <!-- <th>Market Place Date</th> -->
                    <th>Inv Date</th>       
                    <th>Name</th> 
                    <th>Surname</th>
                    <th>Amount</th>
                    <th>Balance</th> 
                    <th>Maturity Date</th>
                    <th>Status</th>
                    <th>Period</th>    
                    <th>Description</th>
                    <th>Method</th>   
                    <th>POP</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="investment in investments"
                    :key="investment.id"
                  >                   
                    <td>{{ investment.created | moment("from", "now", true)}}</td> 
                    <td>{{ investment.firstname}}</td> 
                    <td>{{ investment.surname}}</td>              
                    <td>{{ investment.currency}}{{ investment.amount}}</td>
                    <td>{{ investment.currency}}{{ investment.balance}}</td>
                    <td>{{ investment.due_date | moment("DD-MM-YYYY")}}</td>
                    <td v-if="investment.status == 0"><span class="badge bg-primary" disabled>Closed</span></td>
                    <td v-if="investment.status == 2"><span class="badge bg-warning">Pending Approval</span></td> 
                    <td v-if="investment.status == 3"><span class="badge bg-danger">Cancelled</span></td>
                    <td v-if="investment.status == 101"><span class="badge bg-primary">Approved</span></td>
                    <td v-if="investment.status == 1"><span class="badge bg-success">Matured</span></td>
                    <td>{{ investment.period}}</td>
                    <td>{{ investment.description}}</td>
                    <td>{{ investment.payment_method}}</td>
                    <td>{{ investment.pop}}</td>
                  </tr>
                </tbody>               
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          
        </div>
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
      investments: [],    
    };
  },
  created() {
    this.fetchValues(); //Calling function/method to output data after component created
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },    
  },
  methods: {   
    fetchValues() {    
      axios
        .get("/api/investment") //calling the api url for packages data
        .then((response) => {
          this.investments = response.data.data;       
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //---End FetchValues Function--//
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

