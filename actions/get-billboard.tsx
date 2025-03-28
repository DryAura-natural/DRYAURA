import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// Simple in-memory cache to reduce unnecessary network requests
const billboardCache = new Map<string, { data: Billboard; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

const getBillboard = async (id: string): Promise<Billboard | null> => {
  // Validate input
  if (!id) {
    console.error('Billboard ID is required');
    return null;
  }

  // Validate environment
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error('CRITICAL: NEXT_PUBLIC_API_URL environment variable is not set');
    return null;
  }

  // Check cache first
  const cachedBillboard = billboardCache.get(id);
  if (cachedBillboard && Date.now() - cachedBillboard.timestamp < CACHE_DURATION) {
    console.log(`Returning cached billboard for ID: ${id}`);
    return cachedBillboard.data;
  }

  // Abort controller for timeout management
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  try {
    // Detailed fetch configuration
    const fetchOptions: RequestInit = {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    };

    const url = `${URL}/${id}`;
    console.log(`Attempting to fetch billboard from URL: ${url}`);

    const res = await fetch(url, fetchOptions);

    // Clear the timeout
    clearTimeout(timeoutId);

    // Detailed response validation
    if (!res.ok) {
      const errorText = await res.text();
      const errorDetails = {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        errorBody: errorText
      };
      
      console.error('Billboard fetch failed:', JSON.stringify(errorDetails, null, 2));
      
      // Log additional context
      console.error('Fetch configuration:', {
        url,
        method: fetchOptions.method,
        headers: fetchOptions.headers
      });

      return null;
    }

    // Safe JSON parsing
    let data: Billboard;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return null;
    }

    // Validate billboard data
    if (!data || !data.id || !data.label || !data.imageUrl) {
      console.error('Invalid billboard data structure:', data);
      return null;
    }

    // Update cache
    billboardCache.set(id, {
      data,
      timestamp: Date.now()
    });

    console.log(`Successfully fetched billboard: ${data.label}`);
    return data;

  } catch (error) {
    // Extremely detailed error logging
    console.error('Catastrophic error in getBillboard:', error);
    
    if (error instanceof Error) {
      console.error('Detailed error breakdown:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // Specific error type handling
      if (error.name === 'AbortError') {
        console.error('Billboard fetch operation timed out');
      }
    }

    // Additional system context logging
    console.error('System context:', {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    });

    // Remove from cache if it exists
    billboardCache.delete(id);

    return null;
  }
};

export default getBillboard;