import { Button } from "@/app/components/Button"
import { FormSection } from "@/app/components/FormSection"
import { RadioGroup } from "@/app/components/RadioGroup"
import { TextField } from "@/app/components/TextField"
import { getFact } from "@/app/lib/api/facts"

export interface FactFormProps {
  action: (formData: FormData) => void
  defaultValues?: Awaited<ReturnType<typeof getFact>>
}

export function FactForm({ action, defaultValues }: FactFormProps) {
  return (
    <form action={action} className="max-w-screen-sm">
      <div className="space-y-12">
        <FormSection
          subtitle="This information will be displayed publicly so be careful what you share."
          title="Add Fact"
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

          <RadioGroup
            className="sm:col-span-2"
            defaultValue={defaultValues?.type ?? "boolean"}
            description="Select the type of fact you want to create."
            label="Type"
            name="type"
            options={[
              { label: "Yes/No", value: "boolean" },
              { label: "Count", value: "count" },
            ]}
          />

          <TextField
            className="sm:col-span-2"
            defaultValue={defaultValues?.query ?? ""}
            isMultiline
            label="SQL Query"
            name="query"
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
