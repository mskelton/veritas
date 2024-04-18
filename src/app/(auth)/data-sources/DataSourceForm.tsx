import { Button } from "@/app/components/Button"
import { FormSection } from "@/app/components/FormSection"
import { NumberField } from "@/app/components/NumberField"
import { RadioGroup } from "@/app/components/RadioGroup"
import { TextField } from "@/app/components/TextField"
import { getDataSource } from "@/app/lib/api/dataSources"

export interface DataSourceFormProps {
  action: (formData: FormData) => void
  defaultValues?: Awaited<ReturnType<typeof getDataSource>>
}

export function DataSourceForm({ action, defaultValues }: DataSourceFormProps) {
  return (
    <form action={action} className="max-w-screen-sm">
      <div className="space-y-12">
        <FormSection
          subtitle="This information will be displayed publicly so be careful what you share."
          title="Add Data Source"
        >
          <TextField
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
            description="Select the type of database you want to connect to."
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
            defaultValue={defaultValues?.port ?? ""}
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
            defaultValue={defaultValues?.password ?? ""}
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
