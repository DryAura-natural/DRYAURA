import { Order } from "@/types";


const API_URL = `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/orders`;

// Interface for order query parameters
interface OrderQuery {
  customerId?: string;
  storeId?: string;
  page?: number;
  pageSize?: number;
  status?: string;
  paymentStatus?: string;
}

// Cached orders to reduce unnecessary API calls
const orderCache = new Map<string, { orders: Order[], timestamp: number }>();

const getOrders = async (query: OrderQuery): Promise<{
  orders: Order[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalOrders: number;
    totalPages: number;
  }
}> => {
  // Validate input
  if (!query.customerId) {
    console.error('Customer ID is required');
    throw new Error("Customer ID is required");
  }

  if (!query.storeId) {
    console.error('Store ID is required');
    throw new Error("Store ID is required");
  }

  // Check cache first
  const cacheKey = JSON.stringify(query);
  const cachedResult = orderCache.get(cacheKey);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_DURATION) {
    console.log(`Returning cached orders for customer: ${query.customerId}`);
    return cachedResult.orders as any;
  }

  // Construct URL with query parameters
  const url = new URL(API_URL);
  url.searchParams.append('customerId', query.customerId);
  url.searchParams.append('storeId', query.storeId);
  url.searchParams.append('page', (query.page || 1).toString());
  url.searchParams.append('pageSize', (query.pageSize || 10).toString());
  if (query.status) {
    url.searchParams.append('status', query.status);
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch orders:', errorText);
      throw new Error(`Failed to fetch orders: ${errorText}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.orders || !data.pagination) {
      console.error('Invalid orders response structure:', data);
      throw new Error('Invalid orders response structure');
    }

    // Cache the result
    orderCache.set(cacheKey, { 
      orders: data.orders, 
      timestamp: Date.now() 
    });

    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export default getOrders;