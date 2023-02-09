import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const UserKey = "current-user";

// 可以设置为空时候的数据模型
const defaultUser = {
    username: null,
    loginName: null,
};
  

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: any) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export const setCurrentUser = (currentUser:string) => {
  return Cookies.set(UserKey, JSON.stringify(currentUser));
};

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? [] : JSON.parse(user);
};

export const removeCurrentUser = () => {
  Cookies.remove(UserKey);
};
