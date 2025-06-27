import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(response => response.data);
};

export default responseInterceptors;
