const tokenAccess = "token-access";
const tokenRefresh = "token-refresh";
import axios from "axios";
import jwd_decode, { JwtPayload } from "jwt-decode";

export function getAuthenticationToken() {
  return localStorage.getItem(tokenAccess);
}

export function setAuthenticationToken(token = "") {
  return localStorage.setItem(tokenAccess, token);
}

export function getRefreshToken() {
  return localStorage.getItem(tokenRefresh);
}

export function setRefreshToken(token = "") {
  return localStorage.setItem(tokenRefresh, token);
}

export function renewToken() {
  axios
    .post<Token>("https://med-source.herokuapp.com/refresh", {
      refresh: getRefreshToken(),
    })
    .then((result) => {
      setAuthenticationToken(result.data.access);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function isAuth() {
  let token = getAuthenticationToken() || "";
  let refresh = getRefreshToken() || "";
  if (token == "" && refresh == "") return false;
  let access_exp = -1;
  let refresh_exp = -1;
  if (token != null)
    access_exp = (jwd_decode<JwtPayload>(token)?.exp || 0) * 1000;
  if (refresh != null)
    refresh_exp = (jwd_decode<JwtPayload>(refresh)?.exp || 0) * 1000;
  let now = Date.now();
  if (now < access_exp) return true;
  if (now > refresh_exp || refresh == "") return false;
  renewToken();
  return true;
}

interface Token {
  access: string;
}
