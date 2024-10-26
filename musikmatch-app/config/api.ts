import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.141:8080",
});

export const apiAuth = axios.create({
  baseURL: "http://192.168.0.141:8080",
});
