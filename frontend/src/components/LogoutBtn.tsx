"use client";
import { useLogoutUserMutation } from "@/app/services/userSlice";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

interface Todo {
  _id: string
  user: string
  title: string
  description: string
  isDone: boolean
  __v: number
}

interface LogoutProps {
  token: string | null
  todos: Todo[]
}

export default function Logout({ todos, token }: LogoutProps) {
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      const {data: LogoutData} = await logoutUser('')
      if(LogoutData.msg === "User logged Out") {
        localStorage.removeItem("jwt")
        router.push('/login')
      }
    } catch (error) {
      console.log(`Error while logging out: ${error}`)
    }
  };
  
  const logFunc = () => {
    toast.loading("Logging Out");
    setTimeout(handleLogout, 2000)
  }
  return (
    <div>
      <button
        onClick={logFunc}
        className="py-2 px-10 hover:bg-opacity-80 transition duration-500 ease-out cursor-pointer font-bold border-[1px] text-[#2B187D] rounded-[6px] border-solid border-black bg-[white]"
      >
        Logout
      </button>
    </div>
  );
}