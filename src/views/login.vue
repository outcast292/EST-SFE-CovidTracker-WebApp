<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Se Connecter</h2>
      <label for="inputEmail" class="sr-only" readonly>Email address</label>
      <input
        v-model="form.login"
        id="inputEmail"
        class="form-control"
        type="email"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        :disabled="form.login.length ==0 && form.password.length==0"
      >Sign in</button>
    </form>
  </div>
</template>

<script>
import { auth } from "@/firestore";

export default {
  name: "Login",
  data: function() {
    return {
      form: {
        login: "",
        password: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("fetchUser", null);
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.form.login, this.form.password)
        .then(() => {
          this.$router.replace({ name: "dashboard" }).catch(error => {
            console.log(error);
            this.$router.replace({ name: "dashboard" });
          });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style  scoped>
body {
  background: #605b56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn {
  background-color: #5343d7;
}
</style>