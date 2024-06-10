import { getUser } from "@/lib/api/users"
import { UserForm } from "../UserForm"
import { updateUser } from "./api"

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

  return <UserForm action={updateUser} defaultValues={user} />
}
