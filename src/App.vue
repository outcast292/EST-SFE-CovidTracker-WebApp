<template>
  <div id="app">
    <b-navbar type="dark">
      <b-navbar-brand href="#">DashBoard</b-navbar-brand>
      <b-navbar-nav
        class="ml-auto"
        v-if="this.$route.name!== 'login' && this.$route.name!== 'home' "
      >
        <b-dropdown variant="warning" right text="options">
          <b-dropdown-item-button @click="showModal=true">Changer Mot de passe</b-dropdown-item-button>
          <b-dropdown-item-button @click="signOut">log out</b-dropdown-item-button>
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-modal v-model="showModal" centered size="lg">
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="6">Votre ancien mot de passe</b-col>
          <b-col cols="6">
            <b-input :state="validation1" type="password" v-model="old_password" />
          </b-col>
        </b-row>
        <b-row class="mb-1 text-center">
          <b-col cols="6">Votre nouveau mot de passe</b-col>
          <b-col cols="6">
            <b-input :state="validation2" type="password" v-model="new_pass" />
          </b-col>
        </b-row>
        <b-row class="mb-1 text-center">
          <b-col cols="6">confiermer votre mot de passe</b-col>
          <b-col cols="6">
            <b-input :state="validation2" type="password" v-model="new_pass_2" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-invalid-feedback
              :state="validation1"
            >votre ancien mot de passe doit pas etre equivalent au nouveau mot de passe</b-form-invalid-feedback>
          </b-col>
          <b-col>
            <b-form-invalid-feedback :state="validation2">les mots de passe sont pas egaux</b-form-invalid-feedback>
          </b-col>
        </b-row>
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <p class="float-left"></p>
          <b-button
            variant="primary"
            block
            class="float-right"
            :disabled=" !(validation1 && validation2)"
            @click="changePassword"
          >Confimer</b-button>
        </div>
      </template>
    </b-modal>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { auth } from "@/firestore";
export default {
  data() {
    return {
      showModal: false,
      old_password: "",
      new_pass: "",
      new_pass_2: ""
    };
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.replace({
          name: "login"
        });
      });
    },
    changePassword() {
      var user = auth.currentUser;
      user
        .updatePassword(this.new_pass)
        .then(() => {
          this.$bvToast.toast("succès", {
            title: `mdp a ete changé`,
            variant: "success",
            solid: true
          });
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    validation1() {
      return this.old_password != this.new_pass && this.old_password.length > 0;
    },
    validation2() {
      return (
        this.new_pass == this.new_pass_2 &&
        this.new_pass.length >= 6 &&
        this.new_pass_2.length >= 6
      );
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