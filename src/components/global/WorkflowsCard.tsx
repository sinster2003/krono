"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Switch } from '../ui/switch';
import { useState } from 'react';

interface WorkflowsCardProps {
  id: string;
  title: string;
  description: string;
}

const WorkflowsCard = ({ id, title, description }: WorkflowsCardProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleSwitchToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(!isActive);
    // add the API call or state management logic
    // wire up db
    console.log(`Workflow ${id} active state: ${!isActive}`);
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
                  alt="Google Drive"
                  width={20}
                  height={20}
                />
              </div>
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Image
                  src="/notion.png"
                  alt="Google Drive"
                  width={20}
                  height={20}
                />
              </div>
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Image
                  src="/discord.png"
                  alt="Google Drive"
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