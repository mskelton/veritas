"use client"

import { useFormState } from "react-dom"
import { TextField } from "@/components/TextField"
import { Button } from "@/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { Form } from "@/ui/form"
import { login } from "./actions"

export default function Page() {
  const [state, formAction, isPending] = useFormState(login, {})

  return (
    <Form
      action={formAction}
      className="theme-zinc flex h-screen w-full items-center justify-center px-4"
      state={state}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <TextField
            autoFocus
            label="Email"
            name="email"
            placeholder="me@example.com"
          />

          <TextField label="Password" name="password" type="password" />
        </CardContent>

        <CardFooter>
          <Button className="w-full" loading={isPending} type="submit">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
