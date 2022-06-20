import axios from "axios";

export default class API {
  url: string;

  constructor() {
    this.url =
      "http://ec2-3-72-233-128.eu-central-1.compute.amazonaws.com:8080/api";
  }

  async logIn(nickname: string, password: string) {
    if (nickname === "" || password === "") {
      return "no";
    } else {
      const response = await axios.post(`${this.url}/users/authorize`, {
        userName: nickname,
        password: password,
      });
      return response.data;
    }
  }

  async register(
    nickname: string,
    password: string,
    passwordConfirmation: string,
    information: string
  ) {
    if (passwordConfirmation !== password) {
      return "no";
    } else {
      const response = await axios.post(`${this.url}/users/register`, {
        userName: nickname,
        password: password,
        description: information,
      });
      return response.data;
    }
  }

  async submitPage(
    data: Array<{
      type: string;
      content: any;
    }>,
    userToken: string,
    title: string
  ) {
    const firstFormData = new FormData();
    const firstElement = data[0];
    if (firstElement.content.type === "image") {
      firstFormData.append("image", firstElement.content[0]);
    }
    if (firstElement.content.type === "text") {
      firstFormData.append("content", firstElement.content);
    }

    firstFormData.append("userToken", userToken);
    firstFormData.append("title", title);

    const firstResponse = await this.submitPageRequest(firstFormData);

    if (firstResponse.statusMessage === 200) {
      const post_hash = firstResponse.data.post_hash;

      data.forEach((elem, index) => {
        if (index !== 0) {
          const formData = new FormData();
          if (elem.content.type === "image") {
            formData.append("image", elem.content[0]);
          }
          if (elem.content.type === "text") {
            formData.append("content", elem.content);
          }

          formData.append("userToken", userToken);
          formData.append("title", "   ");
          formData.append("post_hash", post_hash);
        }
      });
    }
  }

  async submitPageRequest(data: FormData) {
    const response = await axios.post(`${this.url}/posts/add-post-pipe`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getPages() {
    const response = await axios.get(`${this.url}/posts/posts-mapping`);
    return response.data.data;
  }

  async getPost(hash: string) {
    const response = await axios.get(`${this.url}/posts/posts-chunk/${hash}`);

    return response.data.data;
  }
}
