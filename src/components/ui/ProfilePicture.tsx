"use client" // since user interactivity is needed

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useTheme } from 'next-themes';
import { Button } from './button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchUserImage } from '@/actions/fetch-image';
import { useUser } from '@clerk/nextjs';
import { removeImage } from '@/actions/remove-image';
import { addImage } from '@/actions/add-image';

const ProfilePicture = () => {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    // if no user return
    if (!user) return;

    async function fetchImage() {
      try {
        // server action to fetch image from db
        const image = await fetchUserImage(user?.id || "");
        setUserImage(image);
      } 
      catch (error) {
        console.log(error);
        // toast
      }
    }

    fetchImage();
  }, [user]);

  const removeProfile = async () => {
    try {
        // remove userImage from the current logged In user
        // server action
        const isRemoved = await removeImage(user?.id || "");
        if(isRemoved) {
            // remove from uploadcare if uploaded
            // removeUploadCareImage() -> use api

            // successful toast
            console.log(isRemoved);
            setUserImage(null);
        }
    }
    catch(error) {
        console.log(error);
        // unsuccessful toast
    }
  }

  if(!isLoaded && !user) {
    return <div>Loading...</div>
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
            <Button variant="default" className="text-white bg-primary text-center cursor-pointer hover:bg-primary/20" onClick={removeProfile}>
                Remove Profile
            </Button>
        </div>
        :
        <FileUploaderRegular
            sourceList="local, camera"
            classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}
            pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY || ""}
            imgOnly={true}
            multipleMax={1}
            onDoneClick={async  (e) => {
                try {
                    if(e.isSuccess) {
                        // add the single entry into the user db
                        // server action to add image into db
                        const isAdded = await addImage(user?.id || "", e.allEntries?.[0].cdnUrl);
                        if(isAdded) {
                            // successful toast
                            setUserImage(e.allEntries?.[0].cdnUrl);
                        }
                        else {
                            // unsuccesful toast
                        }
                    }
                    else {
                        // unsuccessful toast
                    }
                }
                catch(error) {
                    console.log(error);
                    // unsuccessful toast
                }
            }}
        />
      }
    </div>
  );
}

export default ProfilePicture;