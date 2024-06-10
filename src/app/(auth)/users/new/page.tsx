import { UserForm } from "../UserForm"
import { createUser } from "./api"

export default function Page() {
  return <UserForm action={createUser} />
}
