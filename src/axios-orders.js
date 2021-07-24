import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://burger-builder-4be54-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default instance;
