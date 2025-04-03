'use client';

import { SignedIn, UserButton, UserProfile, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Settings, ShoppingCart, User, Package } from 'lucide-react';
import { FaCreditCard } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';

import BillingDialog from '@/components/BillingDialog';
import TrackOrder from '@/components/orders/TrackOrder';
import LatestOrder from '@/components/orders/LatestOrder';
import { Order } from '@/types';
import getOrders from '@/actions/get-order';
import { BillingInfo } from '@/utils/validation';
import getCustomerData from '@/actions/getCustomerData';

const AccountPage = () => {

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);
  const [isBillingCollapsed, setIsBillingCollapsed] = useState(true);
  

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const { orders: fetchedOrders } = await getOrders({
            customerId: user.id,
            storeId: process.env.NEXT_PUBLIC_STORE_ID,
            page: 1,
            pageSize: 10
          });
          
          console.log('Fetched Orders Full Details:', JSON.stringify(fetchedOrders, null, 2));
          
          // Sort orders by creation date (most recent first)
          const sortedOrders = fetchedOrders.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          setOrders(sortedOrders);
          
          // Set the latest order (first in the sorted array)
          setLatestOrder(sortedOrders.length > 0 ? sortedOrders[0] : null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to load orders');
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        
        // Fetch billing information
        const customerData = await getCustomerData(user.id);
        setBillingInfo({
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          alternatePhone: customerData.alternatePhone || '',
          streetAddress: customerData.streetAddress,
          city: customerData.city,
          state: customerData.state,
          postalCode: customerData.postalCode,
          country: customerData.country || 'India',
          landmark: customerData.landmark || '',
          town: customerData.town || ''
        });

        // Fetch latest order
        const { orders: fetchedOrders } = await getOrders({
          customerId: user.id,
          storeId: process.env.NEXT_PUBLIC_STORE_ID,
          page: 1,
          pageSize: 1
        });
        
        // Set the latest order
        setLatestOrder(fetchedOrders.length > 0 ? fetchedOrders[0] : null);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error instanceof Error && error.message.includes('Customer not found')) {
          setError('Please complete your profile to view account details');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        setIsLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchData();
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div><SignedIn/></div>;
  }

  const handleViewOrders = () => {
    router.push('/account/orders');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No orders state
  if (orders.length === 0) {
    return (
      <div className='max-w-4xl mx-auto py-8 px-2 space-y-6'>
        {/* Track Order Section */}
        <div className='bg-white shadow-sm rounded-lg p-6'>
          <div className='flex items-center gap-4 mb-4'>
            <Package className='w-8 h-8 text-gray-700' />
            <h2 className='text-xl font-semibold text-gray-800'>Track Your Order</h2>
          </div>
          <TrackOrder />
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md border border-[#3D1D1D]/10 text-center">
          <h2 className="text-2xl font-bold">No Orders Found</h2>
          <p className="text-gray-600 mt-2">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto py-8 px-2 space-y-6'>
      {/* Track Order Section */}
      <div className='bg-white shadow-sm rounded-lg p-6'>
        <div className='flex items-center gap-4 mb-4'>
          <Package className='w-8 h-8 text-gray-700' />
          <h2 className='text-xl font-semibold text-gray-800'>Track Your Order</h2>
        </div>
        <TrackOrder />
      </div>
  {/* Profile Section */}
  <div className='bg-white shadow-sm rounded-lg p-6'>
  <div className='flex items-center justify-between mb-6'>
    <div className='flex items-center gap-3'>
      <User className='w-6 h-6 text-gray-700' />
      <h2 className='text-lg font-semibold text-gray-800'>Profile Information</h2>
    </div>
    <Button 
      variant='outline' 
      className='group flex items-center gap-2 border-gray-300 hover:border-gray-500 transition-colors'
      
    >
      <FaEdit className='w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors' />
      Edit<UserButton/>
    </Button>

    
  </div>
  <div className='space-y-4 text-gray-600'>
    <div className='flex items-center justify-between border-b pb-2 border-gray-200'>
      <span className='font-medium text-gray-800'>Name</span>
      <span className='text-gray-700'>{user?.fullName || 'N/A'}</span>
    </div>
    <div className='flex items-center justify-between border-b pb-2 border-gray-200'>
      <span className='font-medium text-gray-800'>Email</span>
      <span className='text-gray-700'>{user?.primaryEmailAddress?.emailAddress || 'N/A'}</span>
    </div>
    <div className='flex items-center justify-between'>
      <span className='font-medium text-gray-800'>Joined</span>
      <span className='text-gray-700'>
        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
      </span>
    </div>
  </div>
</div>

      {/* Billing Information Section */}
      <div className='bg-white shadow-sm rounded-lg p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <FaCreditCard className='w-6 h-6 text-gray-700' />
            <h2 className='text-lg font-semibold text-gray-800'>Billing Information</h2>
          </div>
          <Button 
            variant='ghost' 
            onClick={() => setIsBillingCollapsed(!isBillingCollapsed)}
          >
            {isBillingCollapsed ? 'Show Details' : 'Hide Details'}
          </Button>
        </div>
        {!isBillingCollapsed && (
          <div className='space-y-4 text-gray-600'>
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
        <div className='mt-4'>
          <BillingDialog
            title={billingInfo ? 'Update Billing Information' : 'Add Billing Information'}
            subtitle={billingInfo ? 'Update your billing details' : 'Add your billing details'}
            triggerLabel={billingInfo ? 'Update Billing Information' : 'Add Billing Information'}
            onSuccess={() => setIsBillingDialogOpen(false)}
          />
        </div>
      </div>

      {/* Latest Order Section */}
      {latestOrder && (
        <div className='bg-white shadow-sm rounded-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <ShoppingCart className='w-8 h-8 text-gray-700' />
              <h2 className='text-xl font-semibold text-gray-800'>Latest Order</h2>
            </div>
            <Button 
              onClick={handleViewOrders} 
              variant='outline'
              className='flex items-center gap-2'
            >
              View All Orders
            </Button>
          </div>
          <LatestOrder latestOrder={latestOrder} />
        </div>
      )}

    </div>
  );
};

export default AccountPage;