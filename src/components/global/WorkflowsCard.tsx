"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Switch } from '../ui/switch';
import { useEffect, useState } from 'react';
import publishWorkflow from '@/actions/publish-workflow';
import getPublish from '@/actions/get-publish';

interface WorkflowsCardProps {
  id: string;
  title: string;
  description: string;
}

const WorkflowsCard = ({ id, title, description }: WorkflowsCardProps) => {
  const [isActive, setIsActive] = useState(false);
  // wip: toggle button when clicked should publish the workflow in the database - will do when workflows are traversed

  useEffect(() => {
    const getWorkflow = async () => {
      try {
        const response = await getPublish(id);
        setIsActive(response?.publish || false);
      }
      catch(error) {
        console.log(error);
      }
    }

    getWorkflow();
  }, []);

  const handleSwitchToggle = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setIsActive(!isActive);
      // add the API call or state management logic
      // wire up db
      await publishWorkflow(id, !isActive);
      console.log(`Workflow ${id} active state: ${!isActive}`);
    }
    catch(error) {
      console.log(error);
    }
  };

  return (
    <Link href={`/workflows/editor/${id}`}>
      <div className="group relative transition-all duration-300 rounded-lg p-6 border cursor-pointer hover:bg-primary/5 my-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                {/* wip: should be coming db and based on the nodes used */}
                <Image
                  src="/googleDrive.png"
                  alt="Google Drive"
                  width={20}
                  height={20}
                />
              </div>
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Image
                  src="/slack.png"
                  alt="Slack"
                  width={20}
                  height={20}
                />
              </div>
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Image
                  src="/notion.png"
                  alt="Notion"
                  width={20}
                  height={20}
                />
              </div>
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Image
                  src="/discord.png"
                  alt="Discord"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {isActive ? 'On' : 'Off'}
            </span>
            <Switch
              checked={isActive}
              onClick={handleSwitchToggle}
              className="bg-primary cursor-pointer [&_span[data-state=checked]]:bg-white [&_span[data-state=unchecked]]:bg-white"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkflowsCard;