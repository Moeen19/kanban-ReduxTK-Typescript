"use client";
import registerUser from "@/components/RegisterUser";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Logout from "@/components/LogoutBtn";
import Todos from "@/components/Todos";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useGetTodosQuery } from "./services/todoSlice";

interface Todo {
  _id: string
  user: string
  __v: number
  isDone: boolean
  title: string
  description: string
}

const HomeContent = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const [loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    router.refresh();
    
    const fetchTok = () => {
      let tok =
        typeof window !== undefined ? localStorage.getItem("jwt") : null;
      setToken(tok);
      if (!tok) {
        router.push('/login')
      }
    };
    fetchTok()
  }, [token]);
  const hookObj = useGetTodosQuery(token)
  let todos: Todo[] = hookObj.data


  useEffect(() => {
    console.log("Updated todos state:", todos);
  }, [todos]);

  return (
    <main className=''>
      
      <div className=''>
        <div className={`flex items-center justify-between`}>
          <h1 className="text-white pl-[110px] font-semibold text-[62px] mx-auto w-fit">
            Todo Kanban
          </h1>
          <Logout todos={todos} token={token} />
        </div>
        <Todos todos={todos} token={token} />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  )
}