import Axios from "axios";
import catchAsync from "../utils/catchAsync";

const API = Axios.create({ baseURL: "http://localhost:5000" });

export const login = catchAsync(async (firebaseToken) => {
  console.log(firebaseToken);
  await API.post(
    "/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
      },
    }
  );
});

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
    if (err.response.status === 401) {
      location.href = "/";
    }

    return Promise.reject(err);
  }
);
