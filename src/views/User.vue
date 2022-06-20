<template>
  <div class="page">
    <div class="page-center">
      <img src="/images/logo.png" />
      <div class="page-center-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "User-component",
});
</script>

<style lang="scss" scoped>
.page {
  background-image: url(/public/images/User.png);
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-center {
    padding: 30px;
    background-color: rgb(150, 193, 225);
    height: 100%;
    width: 30vw;
    margin-top: 20vh;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 0 5px rgb(150, 193, 225);

    display: flex;
    flex-direction: column;
    align-items: center;

    &-view {
      width: 80%;
    }

    & img {
      margin-bottom: 15px;
    }
  }
}
</style>
