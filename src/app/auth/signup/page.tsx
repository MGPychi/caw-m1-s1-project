import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpForm } from "./components/signup-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />

          <div className="mt-4 text-center text-sm">
            you have an account ?
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

