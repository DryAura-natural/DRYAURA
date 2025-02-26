export default function TrackOrder() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form>
        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
          Enter Order Number
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="orderNumber"
            id="orderNumber"
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Order number"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Track
          </button>
        </div>
      </form>
    </div>
  );
}
