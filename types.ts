export interface Billboard {
  id: string;
  label: string;
  description: string;
  images: {
    id: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
// export interface VideoBillboard {
//   id: string;
//   label: string;
//   subLabel?: string;
//   videoUrl?: string;
//   textColor?: string;
//   subTextColor?: string;
// }

export interface Category {
  id: string;
  name: string;
  billboardId: string;
  
  billboard: Billboard;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  subLabel: string;
  price: number;
  mrp: number;
  images: Image[];
  variants: ProductVariant[];
  categories: Category[];
  badges: Badge[];
  productBanner: Image[];
  benefits: string[];
  specifications: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  isOutOfStock: boolean;
  selectedVariant?: ProductVariant;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  sizeId: string;
  colorId: string | null;
  price: number;
  mrp: number;
  productId: string;
  size?: Size;
  color?: Color;
}

export interface Badge {
  id: string;
  name: string;
  value: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerResponse = {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  streetAddress: string;
  city: string;
  landmark?: string;
  town: string;
  state: IndianState; // Removed empty string option
  postalCode: string;
  country?: string;
  termsAccepted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  orders?: any[];
};

// Define the type for Indian states
export type IndianState = 
  | 'Andhra Pradesh'
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Bihar'
  | 'Chhattisgarh'
  | 'Goa'
  | 'Gujarat'
  | 'Haryana'
  | 'Himachal Pradesh'
  | 'Jharkhand'
  | 'Karnataka'
  | 'Kerala'
  | 'Madhya Pradesh'
  | 'Maharashtra'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Odisha'
  | 'Punjab'
  | 'Rajasthan'
  | 'Sikkim'
  | 'Tamil Nadu'
  | 'Telangana'
  | 'Tripura'
  | 'Uttar Pradesh'
  | 'Uttarakhand'
  | 'West Bengal'
  | 'Andaman and Nicobar Islands'
  | 'Chandigarh'
  | 'Dadra and Nagar Haveli and Daman and Diu'
  | 'Delhi'
  | 'Jammu and Kashmir'
  | 'Ladakh'
  | 'Lakshadweep'
  | 'Puducherry';

  export type Order = {
    id: string; // Unique identifier for the order
    storeId: string; // ID of the store associated with the order
    customerId?: string; // ID of the customer who placed the order
    orderItems: OrderItem[]; // Array of items in the order
    totalAmount: number; // Total amount for the order
    orderStatus: OrderStatus; // Current status of the order
    
    // Contact and Delivery Information
    name?: string; // Customer name
    email?: string; // Customer email
    phone?: string; // Primary phone number
    alternatePhone?: string; // Alternate phone number
    address?: string; // Delivery address
    
    // Payment Details
    isPaid: boolean; // Whether the order is paid
    paymentStatus?: PaymentStatus; // Detailed payment status
    razorpayOrderId?: string; // Razorpay order identifier
    
    // Tracking Information
    trackingId?: string; // Order tracking identifier
    invoiceLink?: string;
    
    // Timestamps
    createdAt: Date; // Timestamp when the order was created
    updatedAt: Date; // Timestamp when the order was last updated
  };

// Define the structure of an order item
export type OrderItem = {
  id: string;
  productId: string;
  productName?: string;
  productImageUrl?: string;
  variantId: string;
  variant?: {
    id: string;
    size?: {
      id: string;
      name: string;
    };
    color?: {
      id: string;
      name: string;
    };
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    name?: string;
  };
};

// Define the possible order statuses
export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export enum PaymentStatus {
  PENDING = 'PENDING...',
  PROCESSING = 'PROCESSING...',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}