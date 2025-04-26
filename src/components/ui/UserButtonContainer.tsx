import { SignedIn, UserButton } from "@clerk/nextjs"

const UserButtonContainer = () => {
  return (
    <SignedIn>
        <div className="fixed left-5 bottom-14">
            <UserButton />
        </div>
    </SignedIn>
  )
}

export default UserButtonContainer