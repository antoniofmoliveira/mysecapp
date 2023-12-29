import { SignIn, SignOut } from "@/components/auth-components";
import { auth } from "@/auth";
import { addUser, getUser } from "@/_lib/queries";
import { User } from "@/_lib/definitions";

export default async function Home() {
  const session = await auth();
  let user: User = {
    userid: "",
    name: "",
    email: "",
    bio: "",
    blocked: false,
  };
  if (!session?.user) return <SignIn />;
  if (session?.user?.email) {
    user = await getUser(session?.user?.email);
    if (!user?.userid) {
      user = await addUser({
        userid: "",
        name: "" + session.user.name,
        email: "" + session.user.email,
        bio: "",
        blocked: false,
      });
    }
    // console.log("USRID =" + user.userid);
  }
  return (
    <main>
      <a href={`/myapp/${user.userid}/todo`}>Todo</a>

      <SignOut />
    </main>
  );
}
