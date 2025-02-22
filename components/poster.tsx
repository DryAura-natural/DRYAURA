import Image from 'next/image';

interface PosterProps {
  src: string;
  alt: string;
}

const Poster = ({ src, alt }: PosterProps) => {
  return (
    <div 
      className="relative w-full lg:h-[600px] aspect-[16/9] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 "
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="hidden" 
        aria-hidden="true"
      />
    </div>
  );
};

export default Poster;