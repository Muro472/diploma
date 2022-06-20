import { createStore } from "vuex";
import post from "./modules/post";
export default createStore<any>({
  state: {
    user: {
      isAdmin: false,
      userToken: "",
      userName: "",
    },
  },
  mutations: {
    changeUser(
      state: {
        user: { isAdmin: boolean; userToken: string; userName: string };
      },
      user: { isAdmin: boolean; userToken: string; userName: string }
    ) {
      localStorage.setItem("token", user.userToken);
      state.user = user;
    },
  },
  modules: {
    post,
  },
});
