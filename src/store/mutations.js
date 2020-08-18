export default{
    updateMarketPlaces(state, payload) {
        state.market_places = payload;
      },
      updatePackages(state, payload) {
        state.plans = payload;
      },
      updateInvestments(state, payload) {
        state.investments = payload;
      },
      updateTotals(state, payload) {
        state.totals = payload;
      },
      updatePaymentDetails(state, payload) {
        state.payment_details = payload;
      },
      updateCountries(state, payload) {
        state.countries = payload;
      },
      updateDepositPackages(state, payload) {
        state.deposit_packages = payload;
      },
      updatePeerPackages(state, payload) {
        state.peer_packages = payload;
      },
}