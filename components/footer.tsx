import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    
    <div className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-bold font-sans text-2xl">
            <Image src="https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png" width={100} height={100} alt=""/>
          
          </h1>
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            {/* <h4 className="text-lg font-semibold mb-4">Quick Links</h4> */}
            <ul className="flex space-x-6">
              <li><a href="/about" className="text-sm hover:text-gray-400 hover:underline">About Us</a></li>
              <li><a href="/shop" className="text-sm hover:text-gray-400 hover:underline">Shop</a></li>
              <li><a href="/contact" className="text-sm hover:text-gray-400 hover:underline">Contact</a></li>
              <li><a href="/privacy" className="text-sm hover:text-gray-400 hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="https://www.facebook.com" className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="text-xl hover:text-gray-400 hover:scale-125 transition ease-in-out">
              <FaLinkedin />
            </a>
          </div>
        </div>

        
      </div>
    </div>
    </>
  );
};

export default Footer;
