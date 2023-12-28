"use server";

import { setTodo } from "@/_lib/queries";
import { Todo } from "@/_lib/definitions";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createTodo(formData: FormData) {
  const session = await auth();
  if (!session?.user) return;

  ("use server");
  const todo: Todo = {
    todoid: "",
    userid: "" + formData.get("userid"),
    title: "" + formData.get("title"),
    completed: false,
    dueDate: !formData.get("dueDate")
      ? undefined
      : new Date("" + formData.get("dueDate")),
  };
  // console.log(todo);
  setTodo(todo);
  revalidatePath(`/myapp/${todo.userid}/todo`);
}
// http://localhost:3000/user/410544b2-4001-4271-9855-fec4b6a6442a/todo
