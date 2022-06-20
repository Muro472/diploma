<template>
  <div class="page">
    <div class="page-title">
      <h1>{{ route }}</h1>
    </div>
    <div class="page-body">
      <div
        class="page-body-element"
        v-for="(element, index) in post"
        :key="index"
      >
        <div class="page-body-element-text">
          {{ element.content }}
        </div>
        <div class="page-body-element-img" v-if="!!element.image">
          <img :src="element.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import API from "@/plugins/api";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Post-component",
  data() {
    return {
      api: new API(),
      post: [
        {
          post_hash: "",
          image: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      postHash: "post/getPostHash",
    }),
    route() {
      this.getpost();
      return this.$router.currentRoute.value.params.postName;
    },
  },
  methods: {
    async getpost() {
      this.post = await this.api.getPost(this.postHash);
      this.post = this.post.map((element) => {
        element.image = `http://ec2-3-72-233-128.eu-central-1.compute.amazonaws.com:8080/storage/posts/${element.post_hash}/${element.image}`;

        return element;
      });
      console.log(this.post);
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  text-align: center;
  &-title {
    text-transform: uppercase;
    color: #4caf50;
    margin: 5px;
  }
  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-element {
      &-text {
        width: 50vw;
        white-space: initial;
        text-indent: 50px;
        text-align: center;
        letter-spacing: 3px;
      }
    }
  }
}
</style>
