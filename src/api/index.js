import Axios from "axios";

const API = Axios.create({ baseURL: "http://localhost:5000" });

export const login = async (firebaseToken) => {
  try {
    await API.post(
      "/login",
      {},
      {
        headers: {
          Authorization: `Bearer ${firebaseToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).jwtToken
    }`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => {
    if (res.data.token) {
      localStorage.setItem("profile", res.data.token);
    }

    return res;
  },
  (err) => {
    if (err.response.status === 401) location.href = "/";
    return Promise.reject(err);
  }
);
