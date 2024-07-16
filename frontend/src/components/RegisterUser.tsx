"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRegisterUserMutation } from "@/app/services/userSlice";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

interface tokenInterface {
  token: string | null
}

interface LoginInfoInterface {
  name: string
  email: string
  password: string
  ConfirmPassword: string
}

function RegisterUser({ token }: tokenInterface) {
  const [registerUser] = useRegisterUserMutation()
  const [passMatch, setpassMatch] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true)
  const [loginInfo, setLoginInfo] = useState<LoginInfoInterface>({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 700)
    if (token) {
      router.push("/");
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // redirect.push("/kekw")
    // console.log("user");
    try {
      if (loginInfo.password === loginInfo.ConfirmPassword) {
        const user = {
          ...loginInfo
        };
        const { data: regData } = await registerUser(user)
        if (regData) {
          router.push('/login')
        }
      } else {
        setpassMatch(true);
      }
    } catch (error) {
      console.log(`Error while registering user: ${error}`)
    }
  };

  return (
    <div className={`${loader ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-300`}>
      <h1 className="text-white font-semibold text-[62px] mx-auto w-fit">
        Todo Kanban
      </h1>
      <div className="max-w-[450px] mx-auto mt-[8px] rounded-[8px] shadow-2xl shadow-gray-900 p-4 bg-white w-full">
        <h1 className="w-fit mx-auto font-bold  text-[32px]">Signup</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex gap-[18px] flex-col"
        >
          <div className="flex flex-col">
            <label className="font-semibold">Username:</label>
            <input
              type="text"
              placeholder="Username"
              required
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginInfo((previousData) => ({
                  ...previousData,
                  [e.target.name]: e.target.value
                }))
              }}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginInfo((previousData) => ({
                  ...previousData,
                  [e.target.name]: e.target.value
                }))
              }}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginInfo((previousData) => ({
                  ...previousData,
                  [e.target.name]: e.target.value
                }))
              }}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Confirm Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="ConfirmPassword"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginInfo((previousData) => ({
                  ...previousData,
                  [e.target.name]: e.target.value
                }))
              }}
              className="p-1 rounded-[6px] border-solid border-[2px] border-black"
            />
          </div>
          {passMatch && (
            <span className="text-[red]">Passwords don't match.</span>
          )}
          <div className="flex justify-between">
            <Link href="/login">
              <div className="py-2 px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
                Cancel
              </div>
            </Link>
            <button className="py-2 px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;