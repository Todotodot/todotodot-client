import Axios from "axios";

const API = Axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("profile")}`;
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

export const getUserInfo = () => {
  return API.get("/");
};

export const getGroupInfo = (groupId) => {
  return API.get(`/groups/${groupId}`);
};

export const createTodo = (newTodo) => {
  return API.post("/users/todos", { ...newTodo });
};

export const updateTodo = (todoId, modifiedTodo) => {
  return API.patch(`/users/todos/${todoId}`, { ...modifiedTodo });
};

export const createGroupTodo = (groupId, newTodo) => {
  return API.post(`/groups/${groupId}/todos`, { ...newTodo });
};

export const updateGroupTodo = (groupId, todoId, modifiedTodo) => {
  return API.patch(`/groups/${groupId}/todos/${todoId}`, { ...modifiedTodo });
};

export const createGroup = (newGroup) => {
  return API.post("/groups", { ...newGroup });
};

export const updateGroup = (groupId, modifiedGroup) => {
  return API.patch(`/groups/${groupId}`, { ...modifiedGroup });
};

export const deleteTodo = (todoId) => {
  return API.delete(`/users/todos/${todoId}`);
};

export const deleteGroupTodo = (groupId, todoId) => {
  return API.delete(`/groups/${groupId}/todos/${todoId}`);
};

export const deleteGroup = (groupId) => {
  return API.delete(`/groups/${groupId}`);
};

export const completeTodo = (todoId, userData) => {
  return API.patch(`/users/todos/${todoId}/complete`, { ...userData });
};

export const completeGroupTodo = (groupId, todoId, userData) => {
  return API.patch(`/groups/${groupId}/todos/${todoId}/complete`, {
    ...userData,
  });
};
