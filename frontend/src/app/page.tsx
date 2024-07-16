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
    setTimeout(() => {
      setLoader(false)
    }, 1000)
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
    <main className={`${loader ? 'overflow-hidden' : ''}`}>
      {loader && <div className="flex gap-[5px] h-screen w-full items-center justify-center">
        <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
      </div>}
      <div className={`${loader ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-300`}>
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