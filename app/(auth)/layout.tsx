

import { checkRole } from '@/utils/roles'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
export default async function AuthLayout({
      children
}:{
      children:React.ReactNode
}){
   
      return(
            <div className="flex justify-center items-center h-full transition ease-in-out duration-100 ">
                  {children}

            </div>
      )
}