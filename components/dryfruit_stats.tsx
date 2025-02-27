import { FaChevronDown } from "react-icons/fa";

const StoreLocator = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto lg:px-32 px-4 pb-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-1/2 p-2">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 -mt-16  text-center  lg:hidden">
              We've Got You Covered!
            </h1>
            <img
              alt="Store interior with shelves of products and a neon sign that reads 'DRYAURA SINCE 1926'"
              className="rounded-tl-[50px] rounded-br-[50px] shadow-lg"
              height="200"
              src="https://storage.googleapis.com/a1aa/image/q814yGav0_5Ykq3z1i2JIWwCxCAcAy74hCBy2oROSts.jpg"
              width="600"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4  hidden lg:block ">
              We've Got You Covered!
            </h1>
            <p className="text-gray-600 mb-4 text-xs md:text-sm ">
              At Dryaura, we believe in the power of human connection. That's
              why we've intentionally avoided selling our products online, so
              you can experience the full range of our offerings in-store, where
              our knowledgeable staff can help you find the perfect products for
              your needs. Explore our locations and discover the Dryaura
              difference for yourself!
            </p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Find us Here
            </h2>
            <button className="bg-[#7a1d1d] text-white py-2 px-4 rounded-lg shadow-lg mt-2 flex items-center sm:absolute  hover:bg-[#8b3737] transition-colors duration-200 hover:scale-105">
              Shop Now
              <FaChevronDown className="ml-2 hover:scale-125" />
            </button>
            <div className="flex justify-center items-center bg-white shadow-lg rounded-lg lg:mt-72 mt-6">
              <div className="text-center p-4">
                <h3 className="text-xl lg:text-3xl font-bold text-gray-800">20+</h3>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl lg:text-3xl font-bold text-gray-800">100+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl font-bold lg:text-3xl text-gray-800">1000+</h3>
                <p className="text-gray-600">Orders Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
