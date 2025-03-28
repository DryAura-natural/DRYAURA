import axios from 'axios';

// Expanded Promotion interface with more flexible typing
interface Promotion {
  id: string;
  code: string;
  discountType?: 'percentage' | 'fixed' | 'PERCENTAGE' | 'FIXED';
  discountValue?: number;
  discount?: string | number;  // Added to handle string discount values
  type?: 'percentage' | 'fixed' | 'PERCENTAGE' | 'FIXED';
  minPurchaseAmount?: number;
  expirationDate?: string | Date;
  endDate?: string | Date;
  isActive: boolean;
  storeId?: string;
  [key: string]: any;
}

// Helper function to normalize discount type and value
function normalizePromotion(promotion: Promotion): Promotion {
  // Create a copy to avoid mutating the original object
  const normalizedPromotion = { ...promotion };

  // Normalize discount type
  if (promotion.type) {
    normalizedPromotion.discountType = promotion.type.toLowerCase() as 'percentage' | 'fixed';
  } else if (promotion.discountType) {
    normalizedPromotion.discountType = promotion.discountType.toLowerCase() as 'percentage' | 'fixed';
  }

  // Normalize discount value
  if (promotion.discount !== undefined) {
    normalizedPromotion.discountValue = typeof promotion.discount === 'string' 
      ? parseFloat(promotion.discount) 
      : promotion.discount;
  }

  // Use endDate if expirationDate is not provided
  if (promotion.endDate && !promotion.expirationDate) {
    normalizedPromotion.expirationDate = promotion.endDate;
  }

  return normalizedPromotion;
}

export const getPromotion = async (storeId: string, code: string): Promise<Promotion | null> => {
  try {
    // Enhanced logging
    console.group('Promotion Retrieval Process');
    console.log('Input Parameters:', { storeId, code });

    // Normalize code
    const normalizedCode = code.trim().toUpperCase();

    // Detailed API call
    const response = await axios.get(`/api/${storeId}/promotions`, {
      params: { code: normalizedCode },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Raw API Response:', response.data);

    // Validate response
    if (!response.data || response.data.length === 0) {
      console.warn('No promotions found');
      throw new Error('No promotions available');
    }

    // Find matching promotion with case-insensitive comparison
    const promotionData = response.data.find((promo: Promotion) => 
      promo.code.trim().toUpperCase() === normalizedCode
    );

    console.log('Matched Promotion:', promotionData);

    // Validate promotion data
    if (!promotionData) {
      console.warn('No matching promotion found');
      throw new Error('Invalid promotion code');
    }

    // Comprehensive validation
    if (!isValidPromotion(promotionData)) {
      console.warn('Invalid promotion structure', promotionData);
      throw new Error('Invalid promotion structure');
    }

    // Check promotion validity
    if (!isPromotionValid(promotionData)) {
      console.warn('Promotion is not currently valid', promotionData);
      throw new Error('Promotion is not active');
    }

    console.groupEnd();
    return promotionData;
  } catch (error) {
    console.groupEnd();
    console.error('Promotion Retrieval Error:', error);

    // Axios error handling
    if (axios.isAxiosError(error)) {
      console.error('Axios Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }

    // Throw a specific error message
    if (error instanceof Error) {
      throw new Error(error.message || 'Error retrieving promotion');
    }

    throw new Error('Unexpected error in promotion retrieval');
  }
};

// Robust validation function
function isValidPromotion(promotion: any): promotion is Promotion {
  // Normalize the promotion first
  const normalizedPromotion = normalizePromotion(promotion);

  // Validation errors array to collect all validation issues
  const validationErrors: string[] = [];

  // Check for required fields
  if (!normalizedPromotion) {
    validationErrors.push('Promotion object is null or undefined');
    return false;
  }

  // ID validation
  if (typeof normalizedPromotion.id !== 'string' || normalizedPromotion.id.trim() === '') {
    validationErrors.push('Invalid or missing promotion ID');
  }

  // Code validation
  if (typeof normalizedPromotion.code !== 'string' || normalizedPromotion.code.trim() === '') {
    validationErrors.push('Invalid or missing promotion code');
  }

  // Discount type validation
  const validDiscountTypes = ['percentage', 'fixed'];
  if (!validDiscountTypes.includes(normalizedPromotion.discountType as string)) {
    validationErrors.push(`Invalid discount type: ${normalizedPromotion.discountType}. Must be 'percentage' or 'fixed'`);
  }

  // Discount value validation
  const discountValue = normalizedPromotion.discountValue;
  if (typeof discountValue !== 'number' || isNaN(discountValue)) {
    validationErrors.push('Discount value must be a valid number');
  } else {
    // Additional type-specific validation
    if (normalizedPromotion.discountType === 'percentage') {
      if (discountValue < 0 || discountValue > 100) {
        validationErrors.push(`Percentage discount must be between 0 and 100. Got: ${discountValue}`);
      }
    } else if (normalizedPromotion.discountType === 'fixed') {
      if (discountValue <= 0) {
        validationErrors.push(`Fixed discount must be greater than 0. Got: ${discountValue}`);
      }
    }
  }

  // Active status validation
  if (typeof normalizedPromotion.isActive !== 'boolean') {
    validationErrors.push('Promotion active status must be a boolean');
  }

  // Optional fields validation
  if (normalizedPromotion.minPurchaseAmount !== undefined) {
    if (typeof normalizedPromotion.minPurchaseAmount !== 'number' || normalizedPromotion.minPurchaseAmount < 0) {
      validationErrors.push(`Minimum purchase amount must be a non-negative number. Got: ${normalizedPromotion.minPurchaseAmount}`);
    }
  }

  // Expiration date validation
  if (normalizedPromotion.expirationDate !== undefined) {
    const expirationDate = new Date(normalizedPromotion.expirationDate);
    if (isNaN(expirationDate.getTime())) {
      validationErrors.push(`Invalid expiration date: ${normalizedPromotion.expirationDate}`);
    }
  }

  // Log detailed validation errors
  if (validationErrors.length > 0) {
    console.error('Promotion Validation Errors:', {
      promotionData: normalizedPromotion,
      errors: validationErrors
    });
    return false;
  }

  return true;
}

// Promotion validity check
function isPromotionValid(promotion: Promotion): boolean {
  // Check active status
  if (!promotion.isActive) {
    console.warn('Promotion is not active');
    return false;
  }

  // Check expiration date if exists
  if (promotion.expirationDate) {
    const expirationDate = new Date(promotion.expirationDate);
    const currentDate = new Date();
    if (expirationDate < currentDate) {
      console.warn('Promotion has expired', { 
        expirationDate, 
        currentDate 
      });
      return false;
    }
  }

  // Optional: Check minimum purchase amount if specified
  if (promotion.minPurchaseAmount && promotion.minPurchaseAmount > 0) {
    console.warn('Minimum purchase amount validation not implemented');
    // TODO: Implement minimum purchase amount validation
  }

  // Validate discount value based on type
  if (promotion.discountType === 'percentage') {
    if (promotion.discountValue < 0 || promotion.discountValue > 100) {
      console.warn('Invalid percentage discount', { 
        discountValue: promotion.discountValue 
      });
      return false;
    }
  } else if (promotion.discountType === 'fixed') {
    if (promotion.discountValue <= 0) {
      console.warn('Invalid fixed discount', { 
        discountValue: promotion.discountValue 
      });
      return false;
    }
  }

  return true;
}

// Update applyPromotion to use normalized promotion
export function applyPromotion(
  totalPrice: number, 
  promotion: Promotion
): { discountAmount: number; finalTotal: number } {
  // Normalize the promotion first
  const normalizedPromotion = normalizePromotion(promotion);

  // Validate inputs
  if (totalPrice < 0) {
    console.warn('Invalid total price', { totalPrice });
    return { discountAmount: 0, finalTotal: totalPrice };
  }

  // Check if promotion is valid
  if (!isValidPromotion(normalizedPromotion)) {
    console.warn('Cannot apply invalid promotion', normalizedPromotion);
    return { discountAmount: 0, finalTotal: totalPrice };
  }

  // Extract discount value with explicit type conversion and validation
  const extractDiscountValue = (promo: Promotion): number => {
    // First try discountValue
    if (promo.discountValue !== undefined) {
      return Number(promo.discountValue);
    }

    // Then try discount
    if (promo.discount !== undefined) {
      const parsed = parseFloat(promo.discount.toString());
      return isNaN(parsed) ? 0 : parsed;
    }

    // Fallback to 0
    console.warn('No discount value found', promo);
    return 0;
  };

  const discountValue = extractDiscountValue(normalizedPromotion);

  // Check minimum purchase amount if specified
  if (normalizedPromotion.minPurchaseAmount && totalPrice < normalizedPromotion.minPurchaseAmount) {
    console.warn('Total price does not meet minimum purchase requirement', {
      totalPrice,
      minPurchaseAmount: normalizedPromotion.minPurchaseAmount
    });
    return { discountAmount: 0, finalTotal: totalPrice };
  }

  // Calculate discount based on type
  let discountAmount = 0;
  switch (normalizedPromotion.discountType) {
    case 'percentage':
      discountAmount = totalPrice * (discountValue / 100);
      break;
    case 'fixed':
      discountAmount = Math.min(discountValue, totalPrice);
      break;
    default:
      console.warn('Unknown discount type', normalizedPromotion.discountType);
      return { discountAmount: 0, finalTotal: totalPrice };
  }

  // Ensure discount doesn't exceed total price
  discountAmount = Math.min(discountAmount, totalPrice);

  // Round to 2 decimal places
  discountAmount = Number(discountAmount.toFixed(2));
  const finalTotal = Number((totalPrice - discountAmount).toFixed(2));

  console.log('Promotion Application Details:', {
    totalPrice,
    discountType: normalizedPromotion.discountType,
    discountValue,
    discountAmount,
    finalTotal
  });

  return { discountAmount, finalTotal };
}