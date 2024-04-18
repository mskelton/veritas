"use server"

import { runQuery } from "@/app/lib/query"

export type SerializableError = {
  message: string
  stack?: string
}

type RunQueryFormState = {
  error?: SerializableError
  results?: Record<string, unknown>[]
}

export async function runQueryAction(
  _: RunQueryFormState,
  formData: FormData,
): Promise<RunQueryFormState> {
  try {
    const results = await runQuery(formData.get("query") as string, {
      url: process.env.DATABASE_URL!,
    })

    return { results }
  } catch (e) {
    return {
      error:
        e instanceof Error
          ? { message: e.message, stack: e.stack }
          : { message: "Internal server error" },
    }
  }
}
