import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl h-full xl:h-[600px] overflow-hidden">
      <div
        style={{ 
          backgroundImage: `url(${data?.imageUrl})`, 
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
        </div> */}
      </div>
    </div>
  );
};

export default Billboard;