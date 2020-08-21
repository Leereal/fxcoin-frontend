import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from '../components/Dashboard.vue';
import Profile from '../components/Profile.vue';
import Package from '../components/Package.vue';
import PaymentMethod from '../components/PaymentMethod.vue';
import MarketPlace from '../components/MarketPlace.vue';
import Currency from '../components/Currency.vue';
import PaymentDetail from '../components/PaymentDetail.vue';
import UserPaymentDetail from '../components/UserPaymentDetail.vue';
import ChangePassword from '../components/ChangePassword.vue';
import PendingPayment from '../components/PendingPayment.vue';
import Settings from '../components/Settings.vue';
import Investment from '../components/Investment.vue';
import Referral from '../components/Referral.vue';
import ReferralBonus from '../components/ReferralBonus.vue';
import Bonus from '../components/Bonus.vue';
import Trade from '../components/Trade.vue';
import Offer from '../components/Offer.vue';
import Login from '../auth/Login.vue';
import Register from '../auth/Register.vue';
import PasswordReset from '../auth/PasswordReset.vue';
import ForgotPassword from '../auth/ForgotPassword.vue';
//import Home from '@auth/Home.vue';



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "*",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/market-place",
    name: "market-place",
    component: MarketPlace,
    meta: { requiresAuth: true },
  },
  {
    path: "/packages",
    name: "packages",
    component: Package,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-methods",
    name: "payment-methods",
    component: PaymentMethod,
    meta: { requiresAuth: true },
  },
  {
    path: "/currencies",
    name: "currencies",
    component: Currency,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-details",
    name: "payment-details",
    component: PaymentDetail,
    meta: { requiresAuth: true },
  },  
  {
    path: "/user-payment-details",
    name: "user-payment-details",
    component: UserPaymentDetail,
    meta: { requiresAuth: true },
  }, 
  {
    path: "/change-password",
    name: "change-password",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: "/offers",
    name: "offers",
    component: Offer,
    meta: { requiresAuth: true },
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    meta: { requiresAuth: true },
  },
  {
    path: "/investments",
    name: "investments",
    component: Investment,
    meta: { requiresAuth: true },
  },
  {
    path: "/referrals",
    name: "referrals",
    component: Referral,
    meta: { requiresAuth: true },
  },
  {
    path: "/referral-bonus",
    name: "referral-bonus",
    component: ReferralBonus,
    meta: { requiresAuth: true },
  },
  {
    path: "/bonus",
    name: "bonus",
    component: Bonus,
    meta: { requiresAuth: true },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  }, 
  {
    path: "/password-reset/",
    name: "password-reset",
    component: PasswordReset,
  },  
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
