function objectHas<K extends string>(
  obj: unknown,
  key: K,
): obj is { [key in K]: unknown } {
  return typeof obj === "object" && obj !== null && Object.hasOwn(obj, key)
}

export function get(obj: unknown, key: string | number | symbol): unknown {
  if (typeof key !== "string") {
    return (obj as any)[key] as unknown
  }

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
