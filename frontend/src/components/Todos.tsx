"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import AddTodo from "./AddTodo";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteTodoMutation, useUpdateTodoStatusMutation } from "@/app/services/todoSlice";

interface Todo {
  _id: string
  user: string
  title: string
  description: string
  isDone: boolean
  __v: number
}

interface TodoProps {
  token: string | null
  todos?: Todo[]
}

interface DragDropFunc {
  (results: DropResult): void
}

export default function Todos({ todos = [], token }: TodoProps) {
  // const [notDoneTodos, setNotDoneTodos] = useState<Todo[]>([]);
  const [Upd, setUpd] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true)
  // const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const [addModel, setAddModel] = useState<boolean>(false);
  const [handledeleteTodo] = useDeleteTodoMutation()
  const [handleUpdateStatus] = useUpdateTodoStatusMutation();

  useEffect(() => {
    toast.success("Welcome!");

  }, []);

  useEffect(() => {
    if (!todos) {
      setTimeout(() => {
        setLoader(false)
      }, 1500)
    }
  }, [todos])

  const notDoneTodos: Todo[] = useMemo(() => todos.filter((todo) => todo.isDone === false), [todos])
  const doneTodos: Todo[] = useMemo(() => todos.filter((todo) => todo.isDone === true), [todos])

  // useEffect(() => {
  //   if (token) {
  //     const notDone: Todo[] = todos.filter((item) => {
  //       return item.isDone === false;
  //     });
  //     notDoneTodos = notDone
  //     console.log(notDoneTodos, 'notDone')
  //     const done: Todo[] = todos.filter((todo) => {
  //       return todo.isDone === true;
  //     });
  //     doneTodos = done
  //     // setDoneTodos(done);
  //     // setNotDoneTodos(notDone);
  //   }
  // }, [todos]);

  const handleTodoClick = (todo: string): void => {
    setId(todo);
    setAddModel(true);
    setUpd(true);
  };

  const deleteTodo = (id: string) => {
    const todoid: {
      _id: string
      token: string | null
    } = {
      _id: id,
      token: token,
    };
    handledeleteTodo(todoid)
    toast.error("Todo Deleted!")
  };

  const updatingDoneProp = (_id: string, status: boolean) => {
    let TodoInfo: {
      _id: string
      status: boolean
      token: string | null
    } = {
      _id,
      status,
      token
    }
    handleUpdateStatus(TodoInfo)
  };

  const handleDragDrop: DragDropFunc = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      let delTodo;
      const reorderedTodos: Todo[] = [...notDoneTodos];
      const doneReordered: Todo[] = [...doneTodos];
      const sourceIndex: number = source.index;
      const destinationIndex: number = destination.index;
      if (destination.droppableId !== source.droppableId) {
        if (destination.droppableId === "DONE") {
          [delTodo] = reorderedTodos.splice(sourceIndex, 1);
          toast.success("Todo moved to Completed");
          const todo: Todo = notDoneTodos[sourceIndex];
          updatingDoneProp(todo._id, true);
          doneTodos.splice(destinationIndex, 0, delTodo);
          // setNotDoneTodos(reorderedTodos);
          // return setDoneTodos(doneTodos);
        } else if (destination.droppableId === "ROOT") {
          [delTodo] = doneReordered.splice(sourceIndex, 1);
          toast.success("Todo moved to Pending");
          const todo: Todo = doneTodos[sourceIndex];
          updatingDoneProp(todo._id, false);
          notDoneTodos.splice(destinationIndex, 0, delTodo);
          // setDoneTodos(doneReordered);
          // return setNotDoneTodos(notDoneTodos);
        }
      } else if (
        source.droppableId === "ROOT" &&
        destination.droppableId === "ROOT"
      ) {
        const [removedTodo]: Todo[] = reorderedTodos.splice(sourceIndex, 1);
        reorderedTodos.splice(destinationIndex, 0, removedTodo);
        // return setNotDoneTodos(reorderedTodos);
      } else if (
        source.droppableId === "DONE" &&
        destination.droppableId === "DONE"
      ) {
        const [removedTodo]: Todo[] = doneReordered.splice(sourceIndex, 1);
        doneReordered.splice(destinationIndex, 0, removedTodo);
        // return setDoneTodos(doneReordered);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <ToastContainer />
      <div className="mt-[32px] flex justify-between">
        {addModel && (
          <AddTodo
            token={token}
            notDoneTodos={notDoneTodos}
            id={id}
            setAddModel={setAddModel}
            Upd={Upd}
            setUpd={setUpd}
            doneTodos={doneTodos}
          />
        )}
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-[24px] max-w-[560px] h-fit w-full rounded-[16px] bg-[#D5CCFF]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-[8px]">
                  <img src="/clip.svg" />
                  <h1 className="font-bold text-[30px] text-[#2B1887]">
                    To-Do
                  </h1>
                </div>
                <button
                  onClick={() => setAddModel(true)}
                  className="hover:bg-opacity-50 transtion ease-out duration-500 font-semibold text-[#2B1887] p-[8px] bg-white rounded-[8px]"
                >
                  Add +
                </button>
              </div>
              <div>
                {loader && <div className="flex my-[40px] gap-[5px] items-center justify-center">
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
                </div>}
                {!loader && <div>
                  {!notDoneTodos.length && (
                    <div className="mx-auto w-fit my-[24px] font-semibold text-[24px]">
                      <h1>No Todos Here</h1>
                    </div>
                  )}
                  {notDoneTodos.map((todo: Todo, index: number) => {
                    return (
                      <Draggable
                        draggableId={todo._id}
                        key={todo._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            onClick={() => handleTodoClick(todo._id)}
                            className="p-[24px] hover:bg-opacity-60 transtion ease-in-out duration-300 cursor-pointer mt-[24px] bg-[#F4F2FF] rounded-[12px]"
                          >
                            <div>
                              <div className="flex justify-between">
                                <h1 className="font-bold text-[24px]">
                                  {todo.title}
                                </h1>
                                <img
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTodo(todo._id);
                                  }}
                                  className="trasition hover:cursor-pointer hover:-translate-y-1 trasition-all ease-in-out duration-300"
                                  src="/trash.svg"
                                />
                              </div>
                              <p className="mt-[16px]">{todo.description}</p>
                              <div className="mt-[26px] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="p-[8px] bg-[#ECB800] rounded-[8px] max-w-[35.76px] w-full">
                                    <h1 className="text-white font-semibold text-[16px] leading-[24px]">
                                      Fri
                                    </h1>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <img
                                      className="max-w-[24px] w-full max-h-[25px]"
                                      src="/orange.svg"
                                    />
                                    <img
                                      className="max-w-[24px] w-full max-h-[25px]"
                                      src="/gray.svg"
                                    />
                                  </div>
                                </div>
                                <div className="text-[24px] leading-[32px] text-[#2B1887]">
                                  {notDoneTodos.indexOf(todo) + 1}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="DONE" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-[24px] max-w-[560px] h-fit w-full rounded-[16px] bg-[#D5CCFF]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-[8px]">
                  <img src="/isDone.svg" />
                  <h1 className="font-bold text-[30px] text-[#2B1887]">Done</h1>
                </div>
              </div>
              <div>
                {loader && <div className="flex my-[40px] gap-[5px] items-center justify-center">
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                  <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
                </div>}
                {!loader && (<div>
                  {!doneTodos.length && (
                    <div className="mx-auto w-fit my-[28px] font-semibold text-[24px]">
                      <h1>No Todos Here</h1>
                    </div>
                  )}
                  {doneTodos.map((todo: Todo, index: number) => {
                    return (
                      <Draggable
                        index={index}
                        draggableId={todo._id}
                        key={todo._id}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            onClick={() => handleTodoClick(todo._id)}
                            className="p-[24px] hover:bg-opacity-60 transtion ease-in-out duration-300 cursor-pointer mt-[24px] bg-[#F4F2FF] rounded-[12px]"
                          >
                            <div>
                              <div className="flex justify-between">
                                <h1 className="font-bold text-[24px]">
                                  {todo.title}
                                </h1>
                                <img
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTodo(todo._id);
                                  }}
                                  className="trasition hover:cursor-pointer hover:-translate-y-1 trasition-all ease-in-out duration-300"
                                  src="/trash.svg"
                                />
                              </div>
                              <p className="mt-[16px]">{todo.description}</p>
                              <div className="mt-[26px] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="p-[8px] bg-[#ECB800] rounded-[8px] max-w-[35.76px] w-full">
                                    <h1 className="text-white font-semibold text-[16px] leading-[24px]">
                                      Fri
                                    </h1>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <img
                                      className="max-w-[24px] w-full max-h-[25px]"
                                      src="/blue.svg"
                                    />
                                    <img
                                      className="max-w-[24px] w-full max-h-[25px]"
                                      src="/blue.svg"
                                    />
                                  </div>
                                </div>
                                <div className="text-[24px] leading-[32px] text-[#2B1887]">
                                  {doneTodos.indexOf(todo) + 1}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>)}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
