<template>
  <div class="main">
    <div class="main-header">
      <div class="main-header-element"></div>
      <img src="/images/logo.png" />
      <v-btn
        class="main-header-element"
        variant="text"
        size="x-large"
        prepend-icon="mdi-login-variant"
        @click="goToLogIn"
        >Log In</v-btn
      >
    </div>
    <div class="main-center">
      <div class="main-center-selector">
        <div
          class="main-center-selector-button"
          v-for="(page, index) in pages"
          :key="index"
        >
          <v-btn
            color="rgb(150, 193, 225)"
            height="60px"
            width="100%"
            value="left"
            @click="goToPage(page.title, page.post_hash)"
          >
            {{ page.title }}
          </v-btn>
        </div>
        <div v-if="user.isAdmin" class="main-center-selector-button">
          <v-btn
            color="rgb(150, 193, 225)"
            height="60px"
            width="100%"
            value="left"
            append-inner-icon="mdi-plus"
            @click="goToPostConstructor"
          >
            Add post
          </v-btn>
        </div>
      </div>
      <div class="main-center-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import API from "@/plugins/api";
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
export default defineComponent({
  name: "MainPage",
  data() {
    return {
      api: new API(),
      pages: [
        {
          title: "",
          post_hash: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations({
      setPostHash: "post/setPostHash",
    }),
    goToPostConstructor() {
      this.$router.push("/post-constructor");
    },
    goToPage(pageName: string, data: string) {
      this.setPostHash(data);
      this.$router.push({
        name: "Post",
        params: { postName: pageName },
      });
    },
    goToLogIn() {
      this.$router.push("/user/log-in");
    },
    async getPages() {
      this.pages = await this.api.getPages();
      console.log(this.pages);
    },
  },
  mounted() {
    this.getPages();
  },
});
</script>

<style lang="scss" scoped>
.main {
  background-image: url(/public/images/mainpage.png);
  background-size: cover;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-header {
    padding: 10px 0;
    background-color: rgb(150, 193, 225);
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-element {
      width: 20%;
    }
  }
  &-center {
    margin-top: 100px;
    background-color: white;
    box-shadow: 0 0 5px black;

    height: 100%;
    width: 60vw;

    &-selector {
      width: 100%;
      display: flex;

      &-button {
        width: 100%;
      }
    }
  }
}
</style>
