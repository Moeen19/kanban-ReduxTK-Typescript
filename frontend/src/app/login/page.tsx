"use client"
import Link from "next/link";
import Login from "@/components/Login";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function login() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}
