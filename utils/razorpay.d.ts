// Export all type definitions
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpayCheckoutResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  order_id?: string;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayCheckoutResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayCheckoutFailure {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
  };
}

export interface RazorpayInstance {
  open: (options?: { modal?: { ondismiss?: () => void } }) => void;
  on: (event: string, handler: (response: RazorpayCheckoutFailure) => void) => void;
}

// Extend the global Window interface
declare global {
  interface Window {
    Razorpay: {
      new (config: RazorpayOptions): RazorpayInstance;
    };
  }
}

export {};