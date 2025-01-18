const DeliveryAddress = () => {
  // Retrieve data from localStorage and parse it
  const userData = JSON.parse(localStorage.getItem("billingInfo") || "{}");
  if(userData === null){
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Delivery Address
      </h2>
      <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md">
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">
            Street Address:
          </span>
          <span className="text-base text-gray-800 block">
            {userData.streetAddress || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">City:</span>
          <span className="text-base text-gray-800 block">
            {userData.city || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">State:</span>
          <span className="text-base text-gray-800 block">
            {userData.state || "Not available"}
          </span>
        </div>
        <div className="border-b pb-2">
          <span className="text-sm font-semibold text-gray-600">
            Postal Code:
          </span>
          <span className="text-base text-gray-800 block">
            {userData.postalCode || "Not available"}
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-600">Country:</span>
          <span className="text-base text-gray-800 block">
            {userData.country || "INDIA"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
