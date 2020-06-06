<template>
  <div id="app">
    <b-navbar type="dark">
      <b-navbar-brand href="#">DashBoard</b-navbar-brand>
      <b-navbar-nav
        class="ml-auto"
        v-if="this.$route.name!== 'login' && this.$route.name!== 'home' "
      >
        <b-button variant="danger" @click="signOut">log out</b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { auth } from "@/firestore";
export default {
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.replace({
          name: "login"
        });
      });
    }
  }
};
</script>


<style  scoped>
nav {
  background-color: #5343d7;
  border-color: #5343d7;
}
</style>