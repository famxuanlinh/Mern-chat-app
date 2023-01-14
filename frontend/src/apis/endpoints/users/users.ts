import api from "@apis/api";

export interface User {
  email: string;
  name: string;
  pic: string;
  _id: string;
}

export interface LoginUser extends User {
  token: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  pic?: string;
}

export const login = (payload: LoginUserPayload): Promise<LoginUser> => {
  return api.post("/user/login", payload).then((res) => res.data);
};

export const register = (payload: RegisterUserPayload): Promise<LoginUser> => {
  return api.post("/user/register", payload).then((res) => res.data);
};

export const getMany = (): Promise<User[]> => {
  return api.get("/user").then((res) => res.data);
};

const user = {
  login,
  register,
  getMany,
};

export default user;
