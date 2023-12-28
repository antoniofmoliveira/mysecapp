// 'use client'; // Não pode
import { createTodo } from "@/actions/createTodo";
import { removeTodo } from "@/actions/removeTodo";
import { getTodos } from "@/_lib/queries";
import { Todo } from "@/_lib/definitions";
import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-components";

export default async function Todo({ params }: { params: { userId: string } }) {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  const todos: Todo[] = await getTodos(params.userId);

  return (
    <>
      <form action={createTodo}>
        <input type="text" name="title" id="title" size={50} />
        <input type="hidden" name="todoid" value="" />
        <input type="hidden" name="userid" value={params.userId} />
        <input type="hidden" name="dueDate" value="" />
        <input type="submit" value="gravar" />
      </form>

      {todos &&
        todos.map((todo: Todo) => (
          <li key={todo.todoid}>
            <span>{todo.title}</span>
            <form action={removeTodo}>
              <input type="hidden" name="todoid" value={todo.todoid} />
              <input type="hidden" name="userid" value={todo.userid} />
              <input type="submit" value="Apagar" />
            </form>
          </li>
        ))}
    </>
  );
}
