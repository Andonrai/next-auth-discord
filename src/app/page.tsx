"use client";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <>
        <div className="min-w-[100vw] flex flex-col items-center justify-center font-semibold">
        Signed in as {session.user!.email} <br />
        <button className="p-4 bg-blue-600 text-white font-bold rounded-xl" onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="min-w-[100vw] flex flex-col items-center justify-center font-semibold">
        Not signed in <br />
        <button className="p-4 bg-blue-600 text-white font-bold rounded-xl" onClick={() => signIn()}>Sign in</button>
      </div>
    </>
  )

}
