import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL:
    "https://port-0-lg-cns-news-app-mav1legl68dd7f97.sel4.cloudtype.app/",
  withCredentials: true,
});

export default instance;
