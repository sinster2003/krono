import { ClerkProvider as Clerk } from "@clerk/nextjs";
import { ReactNode } from "react";

const ClerkProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Clerk publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}>
        {children}
    </Clerk>
  )
}

export default ClerkProvider