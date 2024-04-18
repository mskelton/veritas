type DataSourceConnectionDetails = {
  database: string
  host: string
  password: string
  port: number
  type: "mysql" | "postgres"
  username: string
}

export function buildDataSourceURL({
  database,
  host,
  password,
  port,
  type,
  username,
}: DataSourceConnectionDetails) {
  switch (type) {
    case "postgres":
      return `postgresql://${username}:${password}@${host}:${port}/${database}`

    default:
      throw new Error("Unsupported database type")
  }
}
