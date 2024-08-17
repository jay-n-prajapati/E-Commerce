import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import RecentOrders from './components/RecentOrders/RecentOrders';
import Wishlist from './components/WishList/Wishlist';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

const Profile = () => {
  return (
    <div>
      <ProfileHeader />
      <div className="py-6">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <RecentOrders />
          </TabsContent>
          <TabsContent value="wishlist">
            <Wishlist />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
