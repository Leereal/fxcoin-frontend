export default{
      getMarketPlaces(context) {
        axios.get("/api/market-place").then((response) => {
          context.commit("updateMarketPlaces", response.data.data);
        });
      },
      getPackages(context) {
        axios.get("/api/package").then((response) => {
          context.commit("updatePackages", response.data.data);
        });
      },
      getDepositPackages(context) {
        axios.get("/api/deposit-packages").then((response) => {
          context.commit("updateDepositPackages", response.data.data);
        });
      },
      getPeerPackages(context) {
        axios.get("/api/peer-packages").then((response) => {
          context.commit("updatePeerPackages", response.data.data);
        });
      },
      getInvestments(context) {
        axios.get("/api/investments").then((response) => {
          context.commit("updateInvestments", response.data.data);
        });
      },
      getTotals(context) {
        axios.get("/api/dashboard").then((response) => {
          context.commit("updateTotals", response.data);
        });
      },
      getPaymentDetails(context) {
        axios.get("/api/user-payment-details").then((response) => {
          context.commit("updatePaymentDetails", response.data.data);
        });
      },
      getCountries(context) {
        axios.get("/api/country").then((response) => {
          context.commit("updateCountries", response.data.data);
        });
      },
}