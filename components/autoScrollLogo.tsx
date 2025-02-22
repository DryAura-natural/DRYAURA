"use client";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const logos = [
  { id: 1, url: "https://cdn-icons-png.freepik.com/256/5223/5223408.png?uid=R181052270&ga=GA1.1.571043210.1723348349&semt=ais_hybrid", alt: "Brand 1" },
  { id: 2, url: "https://cdn-icons-png.freepik.com/256/4172/4172571.png?uid=R181052270&ga=GA1.1.571043210.1723348349&semt=ais_hybrid", alt: "Brand 2" },
  { id: 3, url: "https://cdn-icons-png.freepik.com/512/5223/5223387.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 3" },
  { id: 4, url: "https://cdn-icons-png.freepik.com/512/5223/5223216.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 4" },
  { id: 5, url: "https://cdn-icons-png.freepik.com/512/5223/5223207.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 5" },
  { id: 6, url: "https://cdn-icons-png.freepik.com/512/5223/5223357.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 5" },
  { id: 7, url: "https://cdn-icons-png.freepik.com/512/3705/3705746.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 5" },
  { id: 8, url: "https://cdn-icons-png.freepik.com/512/564/564804.png?uid=R181052270&ga=GA1.1.571043210.1723348349", alt: "Brand 5" },
];

const AutoScrollLogos: React.FC = () => {
  return (
    <div className="py-8 bg-white">
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        {logos.map((logo) => (
          <div key={logo.id} className="p-2  mx-16  rounded-md">
            <Image src={logo.url} alt={logo.alt} width={60} height={60} className="object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AutoScrollLogos;
