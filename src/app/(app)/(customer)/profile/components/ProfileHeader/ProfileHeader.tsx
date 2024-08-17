'use client';

import { Button } from '@/components/ui/button';
import ECommerceAvatar from '@/components/ui/common/ECommerceAvatar';
import Heading3 from '@/components/ui/headings/Heading3';
import useAuthSession from '@/hooks/useAuthSession';

const ProfileHeader = () => {
  const { user } = useAuthSession();

  return (
    <div className="flex justify-between border-b py-6">
      <div className="flex gap-8">
        <div>
          <ECommerceAvatar
            username={user?.name || 'Unknown'}
            src={user?.image || '/images/profile-placeholder.jpg'}
            className="size-20"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Heading3 className="text-primary">{user?.name}</Heading3>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button size={'lg'}>Edit Profile</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
