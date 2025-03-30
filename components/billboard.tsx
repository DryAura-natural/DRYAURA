import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data?: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  // Fallback to a default image or description if no images
  const backgroundImage = data?.images?.[0]?.url || '';
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : { 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      };

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl h-full xl:h-[600px] overflow-hidden">
      <div
        style={{ 
          ...backgroundStyle,
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
        className="rounded-xl relative h-full w-full overflow-hidden aspect-video"
        role="img"
        aria-label={data?.label || "Billboard Image"}
      >
        {/* <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          {data?.label && (
            <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
              {data.label}
            </div>
          )}
          {!backgroundImage && (
            <div className="text-gray-700 text-xl">
              {data?.description || 'No image available'}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};
export default Billboard;