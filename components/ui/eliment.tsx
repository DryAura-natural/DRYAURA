import Image from 'next/image';

interface ElimentProps {
  src: string;
  heading: string;
  subheading: string;
}

const Eliment = ({ src, heading, subheading }: ElimentProps) => {
  return (
    <div className="flex flex-col items-center max-w-xs sm:max-w-sm text-center p-4">
      <Image src={src} alt={heading} width={80} height={80} className="w-20 h-20 sm:w-24 sm:h-24" />
      <h1 className="text-xl sm:text-2xl font-semibold mt-4 text-balance text-[#2D1515]">{heading}</h1>
      <p className="text-base sm:text-lg text-gray-600 mt-2 font-light">{subheading}</p>
    </div>
  );
};

export default Eliment;
