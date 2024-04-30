import { getDataSource } from "@/lib/api/dataSources"
import { DataSourceForm } from "../DataSourceForm"
import { updateDataSource } from "./api"

export default async function Page({ params }: { params: { id: string } }) {
  const dataSource = await getDataSource(params.id)

  return <DataSourceForm action={updateDataSource} defaultValues={dataSource} />
}
