'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {  Settings, ShoppingCart, User } from 'lucide-react';
import { FaCreditCard } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import { BillingInfo } from '@/app/(routes)/cart/components/deliveryAddress';
import BillingDialog from '@/components/BillingDialog';

// Mock data for orders
const mockOrders = [
  { id: 1, date: '2023-10-01', total: 120.5, status: 'Delivered' },
  { id: 2, date: '2023-09-25', total: 95.0, status: 'Shipped' },
  { id: 3, date: '2023-09-18', total: 45.75, status: 'Processing' },
];

const AccountPage = () => {
  // Fetch user details from Clerk
  const { user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);
  const [isBillingCollapsed, setIsBillingCollapsed] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('customerData');
    if (storedData) {
      setBillingInfo(JSON.parse(storedData));
    }
  }, []);

  // Handle "View Orders" button click
  const handleViewOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
      router.push('/account/orders');
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto py-8 px-2'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-4 px-4'>
        <h1 className='text-2xl font-bold text-gray-900'>My Account</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <UserButton afterSignOutUrl='/' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Manage your account settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Profile Section */}
      <div className='bg-white shadow-sm rounded-lg p-6 mb-8'>
        <div className='flex items-center gap-4 mb-6 justify-between'>
          <div className='flex'>
          <User className='w-6 h-6 text-gray-700' />
          <h2 className='text-lg font-semibold text-gray-800'>Profile Information</h2>
          </div>
          <Button variant='ghost' className='text-sm border hover:border-gray-600 px-2 py-2' >
            <FaEdit className='w-4 h-4 text-gray-700' />
            Edit Account
          </Button>
        </div>
        <div className='space-y-4 text-gray-600'>
          <p>
            <strong>Name:</strong> {user?.fullName || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress || 'N/A'}
          </p>
          <p>
            <strong>Joined:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className='bg-white shadow-sm rounded-lg p-6 mb-8'>
        <div className='flex items-center gap-4 mb-6 justify-between'>
          <FaCreditCard className='w-8 h-8 text-gray-700' />
          <h2 className='text-lg font-semibold text-gray-800'>Billing Information</h2>
          <Button variant='ghost' onClick={() => setIsBillingCollapsed(!isBillingCollapsed)}>
            {isBillingCollapsed ? 'Show Details' : 'Hide Details'}
          </Button>
        </div>
        {!isBillingCollapsed && (
          <div className='space-y-4 text-gray-600 '>
            {billingInfo ? (
              <>
                <p><strong>Street Address:</strong> {billingInfo.streetAddress}</p>
                <p><strong>City:</strong> {billingInfo.city}</p>
                <p><strong>State:</strong> {billingInfo.state}</p>
                <p><strong>Postal Code:</strong> {billingInfo.postalCode}</p>
                <p><strong>Phone:</strong> {billingInfo.phone}</p>
              </>
            ) : (
              <p className='text-gray-600'>No billing information found.</p>
            )}
          </div>
        )}
      
      <div className='py-4'>
      <BillingDialog
          title={billingInfo ? 'Update Billing Information' : 'Add Billing Information'}
          subtitle={billingInfo ? 'Update your billing details' : 'Add your billing details'}
          triggerLabel={billingInfo ? 'Update Billing Information' : 'Add Billing Information'}
          onSuccess={() => setIsBillingDialogOpen(false)}
        />
      </div>
    
      </div>

      {/* Orders Section */}
      <div className='bg-white shadow-sm rounded-lg p-6 mb-8'>
        <div className='flex items-center gap-4 mb-6'>
          <ShoppingCart className='w-8 h-8 text-gray-700' />
          <h2 className='text-xl font-semibold text-gray-800'>Order History</h2>
        </div>
        <div className='space-y-4'>
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className='flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div>
                <p className='font-medium text-gray-800'>Order #{order.id}</p>
                <p className='text-sm text-gray-500'>{order.date}</p>
              </div>
              <div>
                <p className='text-gray-800'>${order.total.toFixed(2)}</p>
                <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleViewOrders} className='mt-6 flex items-center gap-2'>
          <ShoppingCart className='w-5 h-5' />
          View All Orders
        </Button>
      </div>

      {/* Actions Section */}
      {/* <div className='bg-white shadow-sm rounded-lg p-6'>
        <div className='flex items-center gap-4 mb-6'>
          <Settings className='w-8 h-8 text-gray-700' />
          <h2 className='text-xl font-semibold text-gray-800'>Quick Actions</h2>
        </div>
        <div className='flex gap-4 flex-wrap'>
          <Button variant='outline' onClick={() => {}} className='flex items-center gap-2'>
            <Settings className='w-5 h-5' />
            Account Settings
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default AccountPage;