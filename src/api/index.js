import Axios from "axios";

const API = Axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("profile")
    )}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      location.href = "/";
    }

    return Promise.reject(err);
  }
);

export const login = (firebaseToken) => {
  return API.post(
    "/login",
    {},
    { headers: { Authorization: `Bearer ${firebaseToken}` } }
  );
};

export const createTodo = (newTodo) => {
  return API.post("/todos", { ...newTodo });
};

export const createGroupTodo = (groupId, newTodo) => {
  return API.post(`/${groupId}/todos`, { ...newTodo });
};

export const updateTodo = (todoId, modifiedTodo) => {
  return API.patch(`/todos/${todoId}`, { ...modifiedTodo });
};

export const updateGroupTodo = (groupId, todoId, modifiedTodo) => {
  return API.patch(`/${groupId}/todos/${todoId}`, { ...modifiedTodo });
};

export const createGroup = (newGroup) => {
  return API.post("/", { ...newGroup });
};

export const updateGroup = (groupId, modifiedGroup) => {
  return API.patch(`/${groupId}`, { ...modifiedGroup });
};

export const deleteTodo = (todoId) => {
  return API.delete(`/todos/${todoId}`);
};

export const deleteGroupTodo = (groupId, todoId) => {
  return API.delete(`/${groupId}/todos/${todoId}`);
};

export const deleteGroup = (groupId) => {
  return API.delete(`/${groupId}`);
};
