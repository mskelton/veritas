import { FormSection } from "@/components/FormSection"
import { NumberField } from "@/components/NumberField"
import { RadioGroup } from "@/components/RadioGroup"
import { SubmitButton } from "@/components/SubmitButton"
import { TextField } from "@/components/TextField"
import { getDataSource } from "@/lib/api/dataSources"
import { Button } from "@/ui/button"
import { Form } from "@/ui/form"

export const placeholderPassword = "XXXXXXXX"

export interface DataSourceFormProps {
  action: (formData: FormData) => void
  defaultValues?: Awaited<ReturnType<typeof getDataSource>>
}

export function DataSourceForm({ action, defaultValues }: DataSourceFormProps) {
  return (
    <Form action={action} className="max-w-screen-sm">
      <div className="space-y-12">
        <FormSection
          subtitle="This information will be displayed publicly so be careful what you share."
          title="Add Data Source"
        >
          <input name="id" type="hidden" value={defaultValues?.id ?? ""} />

          <TextField
            autoFocus
            className="sm:col-span-2"
            defaultValue={defaultValues?.name ?? ""}
            label="Name"
            name="name"
          />

          <TextField
            className="col-span-full"
            defaultValue={defaultValues?.description ?? ""}
            isMultiline
            label="Description"
            name="description"
          />
        </FormSection>

        <FormSection
          subtitle="Database credentials are encrypted and only used when evaluating facts."
          title="Database Connection"
        >
          <RadioGroup
            className="sm:col-span-2"
            defaultValue={defaultValues?.type ?? "postgres"}
            label="Database Engine"
            name="type"
            options={[
              { label: "PostgreSQL", value: "postgres" },
              { label: "MySQL", value: "mysql" },
            ]}
          />

          <TextField
            className="sm:col-span-2"
            defaultValue={defaultValues?.host ?? ""}
            label="Host"
            name="host"
          />

          <NumberField
            className="sm:col-span-2"
            defaultValue={defaultValues?.port ?? 5432}
            label="Port"
            name="port"
          />

          <TextField
            className="sm:col-span-2"
            defaultValue={defaultValues?.username ?? ""}
            label="Username"
            name="username"
          />

          <TextField
            className="sm:col-span-2"
            label="Password"
            name="password"
            type="password"
          />

          <TextField
            className="sm:col-span-2"
            defaultValue={defaultValues?.database ?? ""}
            label="Database"
            name="database"
          />
        </FormSection>
      </div>

      <div className="mt-6 flex items-center gap-x-6">
        <Button variant="secondary">Cancel</Button>
        <SubmitButton>Save</SubmitButton>
      </div>
    </Form>
  )
}
