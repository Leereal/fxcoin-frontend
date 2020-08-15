import Vue from "vue";
import Vuex from "vuex";
import { market_place } from "./modules/market_place";

Vue.use(Vuex);

import { getLocalUser } from "../helpers/auth";

const user = getLocalUser();

export default {
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    market_places: [],
    plans: [],
    investments: [],
    totals: [],
    payment_details: [],
    countries: [],
    deposit_packages:[],
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    authError(state) {
      return state.auth_error;
    },
    market_places(state) {
      return state.market_places;
    },
    plans(state) {
      return state.plans;
    },
    investments(state) {
      return state.investments;
    },
    payment_details(state) {
      return state.payment_details;
    },
    totals(state) {
      return state.totals;
    },
    countries(state) {
      return state.countries;
    },
    deposit_packages(state) {
      return state.deposit_packages;     
    },
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loginSuccess(state, payload) {
      state.auth_error = null;
      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = Object.assign({}, payload.user, {
        token: payload.access_token,
      });

      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    loginFailed(state, payload) {
      state.loading = false;
      state.auth_error = payload.error;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
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
  },
  actions: {
    login(context) {
      context.commit("login");
    },
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
  },
};
