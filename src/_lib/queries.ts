// "use server";

import db, { sql } from "./db";
import { Photo, Todo, User } from "./definitions";

//ok
export async function getUser(email: string) {
  const res: User[] = await db.query(
    sql`select * from users where email=${email}`
  );
  return res[0];
}

//ok
export async function addUser(user: User) {
  const res: User[] = await db.query(
    sql`insert into users (email, name, bio, blocked) VALUES (${user.email}, ${user.name}, '', false)`
  );
  return res[0];
}

export async function setPhoto(userId: string, type: string, buffer: Buffer) {
  const res = await db.query(
    sql`INSERT INTO photo (userId, type, photo) values (${userId}, ${type}, ${buffer})`
  );
  // console.log(res);
}

export async function getPhoto(userId: string) {
  const res: Photo[] = await db.query(
    sql`SELECT userId, type, photo FROM photo WHERE userId = ${userId}`
  );
  return res[0];
}

//ok
export async function getTodos(userId: string) {
  const res = await db.query(
    sql`SELECT todoid, userid, title, completed, dueDate FROM todo WHERE userid = ${userId}`
  );
  // const res2 = res.map(reg => ({ todoId: reg.todoid, userId: reg.userid, title: reg.title, completed: reg.completed, dueDate: reg.duedate }))
  return res;
}

export async function getTodo(todoId: string) {
  const res: Todo[] = await db.query(
    sql`SELECT todoid, userid, title, completed, dueDate FROM todo WHERE todoid = ${todoId}`
  );
  return res[0];
}

//ok
export async function setTodo(todo: Todo) {
  const res = await db.query(
    sql`INSERT INTO todo (userid, title, completed, dueDate) VALUES (${todo.userid}, ${todo.title}, ${todo.completed}, ${todo.dueDate})`
  );
  return res;
}

//ok
export async function deleteTodo(todoId: string) {
  const res = await db.query(sql`DELETE FROM todo WHERE todoid = ${todoId}`);
  return res;
}

export async function completeTodo(todoId: string) {
  const res = await db.query(
    sql`UPDATE todo SET completed = TRUE WHERE todoid = ${todoId}`
  );
  return res;
}
