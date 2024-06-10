import Link from "next/link"
import { FormSection } from "@/components/FormSection"
import { SubmitButton } from "@/components/SubmitButton"
import { TextField } from "@/components/TextField"
import { getUser } from "@/lib/api/users"
import { Button } from "@/ui/button"
import { Form } from "@/ui/form"

export interface UserFormProps {
  action: (formData: FormData) => void
  defaultValues?: Awaited<ReturnType<typeof getUser>>
}

export function UserForm({ action, defaultValues }: UserFormProps) {
  return (
    <Form action={action} className="max-w-screen-sm">
      <div className="space-y-12">
        <FormSection subtitle="TODO" title="Add User">
          <input name="id" type="hidden" value={defaultValues?.id ?? ""} />

          <TextField
            autoFocus
            className="sm:col-span-2"
            defaultValue={defaultValues?.name ?? ""}
            label="Name"
            name="name"
          />

          <TextField
            className="sm:col-span-2"
            defaultValue={defaultValues?.email ?? ""}
            label="Email"
            name="email"
            type="email"
          />

          <TextField
            className="sm:col-span-2"
            label="Password"
            name="password"
            type="password"
          />
        </FormSection>
      </div>

      <div className="mt-6 flex items-center gap-x-6">
        <Button asChild variant="secondary">
          <Link href="/users">Cancel</Link>
        </Button>

        <SubmitButton>Save</SubmitButton>
      </div>
    </Form>
  )
}
