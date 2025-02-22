"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Cherry, Clock, Globe, Handshake } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Counter = ({ endValue }: any) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const startCounting = () => {
    if (hasAnimated) return; // Prevent counting again
    setHasAnimated(true);
    let start = 0;
    const duration = 2000; // Duration of the animation in milliseconds
    const stepTime = Math.abs(Math.floor(duration / endValue));

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endValue) {
        clearInterval(counter);
      }
    }, stepTime);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounting();
        observer.disconnect(); // Stop observing after counting starts
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [endValue, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl font-bold text-[#3D1D1D]">
      {count}+
    </div>
  );
};

const DryFruitStats = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const statsData = [
    {
      icon: Cherry,
      endValue: 20,
      title: "Exquisite Varieties",
      description: "From succulent apricots to crunchy almonds, explore our handpicked selection of 20+ premium dry fruits.",
      animation: "animate-bounce",
    },
    {
      icon: Clock,
      endValue: 120,
      title: "Rigorous Quality Checks",
      description: "Each batch undergoes 120+ hours of meticulous testing to ensure unmatched quality and freshness.",
      animation: "animate-spin-slow",
    },
    {
      icon: Globe,
      endValue: 321,
      title: "Global Reach",
      description: "Our premium dry fruits are cherished in 320+ markets worldwide, bringing joy to health-conscious customers.",
      animation: "animate-float",
    },
    {
      icon: Handshake,
      endValue: 220,
      title: "Trusted Partnerships",
      description: "Collaborating with 220+ renowned brands, we deliver only the finest dry fruits to your doorstep.",
      animation: "animate-wiggle",
    },
  ];

  return (
    <motion.div
      className="bg-gradient-to-r from-[#800020] to-orange-400 py-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center md:px-10"
      style={{ opacity, scale }}
    >
      <motion.h2
        className="text-2xl md:text-5xl font-bold tracking-tight text-center text-white/90 mb-4 md:mb-8 px-4 animate-fade-in leading-tight"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Elevate Your Snacking with Pure Goodness
      </motion.h2>
    
      <motion.div
        className="flex overflow-x-scroll gap-6 px-4 py-4 hide-scrollbar snap-x snap-mandatory md:items-center md:gap-4 md:px-2 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="min-w-[250px] p-6 px-4 sm:p-8 text-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 md:w-full md:mx-0 snap-center flex flex-col items-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`text-4xl sm:text-6xl text-[#3D1D1D] mb-4 sm:mb-6 ${stat.animation}`}>
              <stat.icon />
            </div>
            <Counter endValue={stat.endValue} />
            <h3 className="text-xl font-bold text-[#3D1D1D] mb-2">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DryFruitStats;