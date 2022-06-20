import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import User from "@/views/User.vue";
import LogIn from "@/components/LogIn.vue";
import Registration from "@/components/Registration.vue";

import MainPage from "@/views/MainPage.vue";
import Post from "@/components/Post.vue";
import PostConstructor from "@/components/PostConstructor.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "log-in",
        name: "LogIn",
        component: LogIn,
      },
      {
        path: "registration",
        name: "Registration",
        component: Registration,
      },
    ],
  },
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    children: [
      {
        path: ":postName",
        name: "Post",
        component: Post,
      },
      {
        path: "post-constructor",
        name: "PostConstructor",
        component: PostConstructor,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
