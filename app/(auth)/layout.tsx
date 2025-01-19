// import { checkRole } from '@/utils/roles'
// import { useUser } from '@clerk/nextjs'
// import { redirect } from 'next/navigation'

export default async function AuthLayout({
      children
}:{
      children: React.ReactNode
}) {
    return (
        <div className="flex justify-center items-center h-full w-full bg-cover bg-center bg-no-repeat relative">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm" 
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/djlopmpiz/image/upload/v1737279634/Leonardo_Phoenix_09_Natures_Palette_Unveiled_A_Delectable_Arra_3_gdcx5c.jpg')` // Replace with your image URL
                }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 w-full flex justify-center items-center transition ease-in-out duration-100">
                {children}
            </div>
        </div>
    )
}
