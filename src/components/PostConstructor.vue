<template>
  <div class="page">
    <div class="page-buttons">
      <div class="page-buttons-button">
        <v-btn width="300px" @click="addContent('text')" prepend-icon="mdi-plus"
          >Додати текстове поле</v-btn
        >
      </div>
      <div class="page-buttons-button">
        <v-btn
          width="300px"
          @click="addContent('image')"
          prepend-icon="mdi-plus"
          >Додати фото</v-btn
        >
      </div>
    </div>
    <div class="page-body">
      <div class="page-body-text">
        <v-text-field label="title" v-model="title" clearable></v-text-field>
      </div>
      <div
        class="page-body-elements"
        v-for="(element, index) in contentLeyout"
        :key="index"
      >
        <div v-if="element.type === 'text'">
          <v-text-field
            prepend-inner-icon="mdi-format-color-text "
            label="Текстове поле"
            v-model="element.content"
            clearable
          ></v-text-field>
        </div>
        <div v-if="element.type === 'image'">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            label="Поле фотографії"
            filled
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
            v-model="element.content"
          ></v-file-input>
        </div>
      </div>
      <v-btn width="300px" @click="submit" prepend-icon="mdi-plus"
        >Додати пост</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import API from "@/plugins/api";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PostConstructor",
  data() {
    return {
      api: new API(),
      title: "",
      contentLeyout: [
        {
          type: "",
          content: "",
        },
      ],
    };
  },
  methods: {
    addContent(type: string) {
      if (this.contentLeyout[0].type === "") {
        this.contentLeyout[0] = {
          type: type as string,
          content: "" as string,
        };
      } else {
        this.contentLeyout.push({
          type: type as string,
          content: "" as string,
        });
      }
    },
    submit() {
      this.api.submitPage(
        this.contentLeyout,
        localStorage.getItem("token") as string,
        this.title
      );
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.page {
  &-buttons {
    &-button {
      margin: 10px;
    }
  }

  &-body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &-text {
      width: 500px;
    }
    &-elements {
      width: 500px;
    }
  }
}
</style>
