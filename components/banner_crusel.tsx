import React from 'react'

const BannerCrusel = () => {
  return (
    <div className="relative bg-cover bg-center h-[450px] bg-fixed " style={{ backgroundImage: `url('https://res.cloudinary.com/djlopmpiz/image/upload/v1737269415/Leonardo_Phoenix_09_Natures_Palette_Unveiled_A_Delectable_Arra_1_sl489w.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <h1 className="text-white text-4xl md:text-6xl font-normal text-center tracking-wide ">
      Building Health, Creating Bonds, Shaping a Better Tomorrow—Join Us on the Journey!

        </h1>
      </div>
    </div>
  )
}

export default BannerCrusel;
