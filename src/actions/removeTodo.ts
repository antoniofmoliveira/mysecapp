"use server";

import { deleteTodo } from "@/_lib/queries";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function removeTodo(formData: FormData) {
  const session = await auth();
  if (!session?.user) return;

  ("use server");
  const userId = "" + formData.get("userid");
  deleteTodo("" + formData.get("todoid"));
  revalidatePath(`/myapp/${userId}/todo`);
}
// http://localhost:3000/user/410544b2-4001-4271-9855-fec4b6a6442a/todo
