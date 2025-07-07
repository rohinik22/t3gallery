import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-4 text-xl font-semibold border-b bg-black shadow">
      <div>Gallery</div>

      <div className="flex flex-row gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
           <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
