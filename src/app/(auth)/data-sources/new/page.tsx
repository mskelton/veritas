import { DataSourceForm } from "../DataSourceForm"
import { createDataSource } from "./api"

export default function Page() {
  return <DataSourceForm action={createDataSource} />
}
