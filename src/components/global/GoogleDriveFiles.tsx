"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import googleDriveAction from "@/actions/google-drive-action";
import { Button } from "../ui/button";
import { toast } from "sonner";

// wip: may need change in logic

const GoogleDriveFiles = () => {
  // helps to listen to a file change
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reqGoogle = async () => {
    try {
        setIsLoading(true);
        const response = await axios.get("/api/drive-activity");
        if(response) {
            toast.success("Successfully started listening to file changes");
            setIsListening(true);
        }
    }
    catch(error) {
        console.log(error);
        toast.error("Failed to start listening to file changes");
    }
    finally {
        setIsLoading(false);
    }
  }

  const onListener = async () => {
    try {
        const isUserFound = await googleDriveAction();
        if(!isUserFound) {
            toast.error("User not found");
            return;
        }

        const { googleResourceId } = isUserFound;
        
        if(googleResourceId) {
            // Re-establish the listener if we have a resource ID
            // await reqGoogle();
            setIsListening(true);
        }
    }
    catch(error) {
        console.log(error);
        toast.error("Failed to initialize Google Drive listener");
    }
  }

  useEffect(() => {
    onListener();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
        {isListening ? (
            <div className="text-primary font-medium">
                <p>Listening to file changes</p>
            </div>
        ) : (
            <div className="flex flex-col items-center gap-4">
                <Button
                    variant="default"
                    onClick={reqGoogle}
                    disabled={isLoading}
                    className="px-4 py-2 bg-primary text-white hover:opacity-80 cursor-pointer rounded-[var(--radius)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Loading...' : 'Create Listener'}
                </Button>
            </div>
        )}
    </div>
  ) 
}

export default GoogleDriveFiles