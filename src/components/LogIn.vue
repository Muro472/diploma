<template>
  <div class="main">
    <div class="main-element">
      <v-text-field
        label="Username"
        v-model="user.username"
        clearable
        clear-icon="mdi-close"
        append-inner-icon="mdi-account"
      ></v-text-field>
    </div>
    <div class="main-element">
      <v-text-field
        label="Password"
        v-model="user.password"
        type="password"
        clearable
        clear-icon="mdi-close"
        append-inner-icon="mdi-lock"
      ></v-text-field>
    </div>
    <div class="main-element">
      <v-btn @click="logInButtonClick" width="100%" color="green" rounded="pill"
        >Log In</v-btn
      >
    </div>
    <div class="main-element">
      <v-btn @click="registerButtonClick" width="100%" rounded="pill"
        >Register</v-btn
      >
    </div>
  </div>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { mapMutations } from "vuex";
import API from "@/plugins/api";
import { defineComponent } from "vue";
export default defineComponent({
  name: "LogIn",
  data() {
    return {
      snackbar: false,
      text: "",
      api: new API(),
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["changeUser"]),
    async logInButtonClick() {
      const result = await this.api.logIn(
        this.user.username,
        this.user.password
      );
      if (result.statusCode === 200) {
        this.changeUser(result.data);
        this.$router.push("/");
      }
    },
    registerButtonClick() {
      this.$router.push("/user/registration");
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  background-color: rgb(150, 193, 225);
  &-element {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
