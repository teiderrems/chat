"use client"
import { signIn } from "../auth"
 
export default function SignIn() {
  return (
    <
      // onSubmit={() => signIn("github")}
    >
      <button type="submit" onClick={() => signIn("github")}>Sign in</button>
    </>
  )
}