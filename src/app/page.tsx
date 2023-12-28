
import { SignIn, SignOut } from "@/components/auth-components";
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <main>
      <a href="todo">Todo</a>

      <SignOut />
    </main>
  );
}
