"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { cookie } from "next/headers"
import { ToastContainer, toast } from "react-toastify";
import { useLoginUserMutation } from "@/app/services/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false)
  const [loader, setLoader] = useState<boolean>(true)
  const router = useRouter();
  const [loginUser] = useLoginUserMutation()
  let token: string | null;
  useEffect(() => {
    router.refresh()
    setTimeout(() => {
      setLoader(false)
    }, 700)
    token = typeof window ? localStorage.getItem("jwt") : null;
    if (token) {
      router.push("/");
    }
  }, []);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const {data: LoginData} = await loginUser(user)
      const token = LoginData.token
      localStorage.setItem("jwt", token)
      router.push('/')
    } catch (error) {
      setIncorrect(true)
    }
  };

  return (
    <div className={`${loader ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-300`}>
      <ToastContainer />
      <h1 className="text-white font-semibold text-[62px] mx-auto w-fit">
        Todo Kanban
      </h1>
      <div className="max-w-[450px] mx-auto mt-[8px] rounded-[8px] shadow-2xl shadow-gray-900 p-4 bg-white w-full">
        <h1 className="w-fit mx-auto font-bold  text-[32px]">Login</h1>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
          className=" flex gap-[18px] flex-col"
        >
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          {incorrect && (
            <h1 className="text-red-600">Incorrect Email or Password.</h1>
          )}
          <div className="flex justify-between">
            <input
              type="submit"
              value="Login"
              className="py-2 px-10 cursor-pointer border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]"
            />
            <Link href="/signup">
              <button className="py-2 px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
                SignUp
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
