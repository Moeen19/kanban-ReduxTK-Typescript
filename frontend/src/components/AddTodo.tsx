"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import { useAddTodoMutation } from "@/app/services/todoSlice";

interface Todo {
  _id: string
  user: string
  title: string,
  description: string
  isDone: boolean
  __v: number
}

interface AddTodoProps {
  id: string
  token: string | null
  Upd: boolean
  notDoneTodos: Todo[]
  doneTodos: Todo[]
  setAddModel: React.Dispatch<React.SetStateAction<boolean>>
  setUpd: React.Dispatch<React.SetStateAction<boolean>>
  // setNotDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  // setDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddTodo({
  setAddModel,
  notDoneTodos,
  id,
  Upd,
  token,
  setUpd,
  doneTodos,
}: AddTodoProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    let todo: Todo | undefined = notDoneTodos.find((todo) => {
      return todo._id === id;
    });
    if (!todo) {
      todo = doneTodos.find((item) => {
        return item._id === id;
      });
    }
    if (Upd) {
      if(todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    } else {
      setTitle("");
      setDescription("");
    }
  }, []);
  const [addTodo] = useAddTodoMutation()

  const handleAddTodo = (e: FormEvent , id: string) => {
    let todo;
    e.preventDefault();
    let meth: string;
    if (Upd) {
      meth = "PUT";
      todo = {
        meth,
        _id: id,
        title,
        description,
        token,
      };
      toast.success("Todo Updated!")
      setUpd(false)
    } else if (!Upd) {
      meth = "POST";
      todo = {
        meth,
        title,
        description,
        token,
      };
      toast.success("Todo Added!")
    }
    addTodo(todo)
    setAddModel(false)
  };
  return (
    <div className="flex inset-0 m-auto fixed">
      <div
        onClick={() => {
          setAddModel(false);
          setUpd(false);
        }}
        className="w-screen bg-black bg-opacity-70 h-screen absolute"
      ></div>
      <div className="max-w-[600px] inset-0 m-auto z-10 h-fit w-full bg-white py-[32px] px-[20px] rounded-[12px]">
        <h1 className="mx-auto w-fit font-bold text-[30px] text-[#312E81]">
          {Upd ? "Update Todo" : "Add Todo"}
        </h1>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleAddTodo(e, id)}>
          <input
            type="text"
            value={title}
            className="text-[14px] mt-[8px] text-gray-600 focus:border-indigo-700 focus:outline-none leading-[20px] min-h-[40px] rounded-[4px] w-full border-[1px] pl-[12px] border-solid border-[#D1D5DB]"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="text-[14px] mt-[8px] py-[8px] text-gray-600 resize-none focus:border-indigo-700 focus:outline-none min-h-[200px] leading-[20px] rounded-[4px] w-full border-[1px] pl-[12px] border-solid border-[#D1D5DB]"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between items-center">
            {!Upd && <Button text={"Add"} />}
            {Upd && <Button text={"Update"} />}
            <button
              onClick={() => {
                setAddModel(false);
                setUpd(false);
              }}
              className="py-2 hover:bg-opacity-90 transition duration-500 ease-out px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
