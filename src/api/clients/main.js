import axios from "axios";

const apiRootUrl = process.env.VUE_APP_API_ROOT_URL;

const apiClient = axios.create({
    baseURL: apiRootUrl,
    headers: { "x-camelcase": 1 }
});

apiClient.interceptors.response.use(
    function(resp) {
    },
    function(err) {}
);

export default apiClient;
