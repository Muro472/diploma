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
      <v-text-field
        label="Confirm password"
        v-model="user.passwordConformation"
        type="password"
        clearable
        clear-icon="mdi-close"
        append-inner-icon="mdi-lock"
      ></v-text-field>
    </div>
    <div class="main-element">
      <v-textarea
        background-color="light-blue"
        color="black"
        label="Information (not required)"
        v-model="user.information"
      ></v-textarea>
    </div>
    <div class="main-element">
      <v-btn
        @click="registerButtonClick"
        width="100%"
        color="green"
        rounded="pill"
        >Register</v-btn
      >
    </div>
    <div class="main-element"></div>
  </div>
</template>

<script lang="ts">
import { mapMutations } from "vuex";
import API from "@/plugins/api";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Registration-component",
  data() {
    return {
      api: new API(),
      user: {
        username: "",
        password: "",
        passwordConformation: "",
        information: "",
      },
    };
  },
  methods: {
    ...mapMutations(["changeUser"]),
    async registerButtonClick() {
      const result = await this.api.register(
        this.user.username,
        this.user.password,
        this.user.passwordConformation,
        this.user.information
      );

      if (result.statusCode === 200) {
        console.log(result.data);

        this.changeUser(result.data);
        this.$router.push("/");
      }
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped></style>
