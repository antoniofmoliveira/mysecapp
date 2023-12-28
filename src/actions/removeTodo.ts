'use server';

import { deleteTodo} from "@/_lib/queries";
import { revalidatePath } from "next/cache";

export async function removeTodo(formData: FormData) {
    'use server';
    const userId = "" + formData.get('userId')
    deleteTodo("" + formData.get('todoId'))
    revalidatePath(`/myapp/${userId}/todo`)
}
// http://localhost:3000/user/410544b2-4001-4271-9855-fec4b6a6442a/todo