import { Button } from "@/app/components/Button"
import { FormSection } from "@/app/components/FormSection"
import RadioGroup from "@/app/components/RadioGroup"
import { TextField } from "@/app/components/TextField"

export default function Page() {
  return (
    <form className="max-w-screen-sm">
      <div className="space-y-12">
        <FormSection
          subtitle="This information will be displayed publicly so be careful what you share."
          title="Add Data Source"
        >
          <TextField className="sm:col-span-2" label="Name" name="name" />

          <TextField
            className="col-span-full"
            label="Description"
            multiline
            name="description"
          />
        </FormSection>

        <FormSection
          subtitle="Database credentials are encrypted and only used when evaluating facts."
          title="Database Connection"
        >
          <RadioGroup
            className="sm:col-span-2"
            description="Select the type of database you want to connect to."
            label="Database Engine"
            name="type"
            options={[
              { label: "PostgreSQL", value: "postgres" },
              { label: "MySQL", value: "mysql" },
            ]}
          />

          <TextField className="sm:col-span-2" label="Host" name="host" />
          <TextField className="sm:col-span-2" label="Port" name="port" />
          <TextField
            className="sm:col-span-2"
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
            defaultValue="public"
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
