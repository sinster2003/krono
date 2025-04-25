"use client" // since user interactivity is needed

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useTheme } from 'next-themes';
import { Button } from './button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfilePicture = ({ userImage } : { userImage: string }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const removeProfile = () => {
    try {
        // remove userImage from the current logged In user
        router.refresh();
    }
    catch(error) {
        console.log(error);
    }
  }

  return (
    <div>
      {
        userImage
        ?
        <div className="flex flex-col items-center justify-center pt-4 pb-2">
            <Image
                src={userImage}
                alt="User-image"
                height={200}
                width={200}
                className="mb-4"
            />
            <Button variant="default" className="text-white bg-primary text-center" onClick={removeProfile}>
                Remove Image
            </Button>
        </div>
        :
        <FileUploaderRegular
            sourceList="local, camera"
            classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}
            pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY || ""}
            imgOnly={true}
            multipleMax={1}
            onFileUploadSuccess={(e) => {
                // add the profile pic to current logged in user
                try {
                    console.log(e.cdnUrl);
                    router.refresh();
                }
                catch(error) {
                    console.log(error);
                }
            }}
        />
      }
    </div>
  );
}

export default ProfilePicture;