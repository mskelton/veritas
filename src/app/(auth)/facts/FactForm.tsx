import Link from "next/link"
import { FormSection } from "@/components/FormSection"
import { RadioGroup } from "@/components/RadioGroup"
import { SubmitButton } from "@/components/SubmitButton"
import { TextField } from "@/components/TextField"
import { getFact } from "@/lib/api/facts"
import { Button } from "@/ui/button"

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

          <RadioGroup
            className="sm:col-span-2"
            defaultValue={defaultValues?.type ?? "boolean"}
            label="Type"
            name="type"
            options={[
              { label: "Yes/No", value: "boolean" },
              { label: "Count", value: "count" },
            ]}
          />

          <TextField
            className="col-span-full"
            defaultValue={defaultValues?.query ?? ""}
            isMultiline
            label="SQL Query"
            name="query"
            rows={10}
          />
        </FormSection>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button asChild variant="secondary">
          <Link href="/facts">Cancel</Link>
        </Button>

        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  )
}
