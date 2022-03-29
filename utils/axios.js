import axios from "axios";

const axio = axios.create({
  baseURL: "https://kontext-api.y2labs.io",
});

export default axio;
