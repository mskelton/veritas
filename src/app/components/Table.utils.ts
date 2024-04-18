function objectHas<K extends string>(
  obj: unknown,
  key: K,
): obj is { [key in K]: unknown } {
  return typeof obj === "object" && obj !== null && Object.hasOwn(obj, key)
}

export function get(obj: Record<string, unknown>, key: string): unknown {
  const parts = key.split(".")
  let value: unknown = obj

  for (const part of parts) {
    if (objectHas(value, part)) {
      value = value[part]
    } else {
      break
    }
  }

  return value
}
