export default function LatestOrder() {
  // Fetch latest order data here
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Order #12345</h3>
        <span className="text-sm text-green-600">Delivered</span>
      </div>
      <p className="text-gray-600 mb-2">Placed on February 20, 2025</p>
      <button className="text-blue-600 hover:text-blue-800">Download Invoice</button>
    </div>
  );
}
