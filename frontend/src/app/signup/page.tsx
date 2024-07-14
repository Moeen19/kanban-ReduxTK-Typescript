"use client"
import Link from "next/link";
import RegisterUser from "@/components/RegisterUser";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function signup() {

  const [token, setToken] = useState<string | null>('');
  useEffect(() => {
    const token = localStorage?.getItem("jwt")
    setToken(token)

  }, [token]);

  return (
    <div>
      <Provider store={store}>
        <RegisterUser token={token} />
      </Provider>
    </div>
  );
}