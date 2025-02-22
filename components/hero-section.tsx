"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Store,ShoppingCart } from "lucide-react"
import { Button } from "./ui/Button"

const slides = [
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b54cd4002f2493b2d1/view?project=67a96cd2001e32766970&mode=admin", // Replace with your actual image paths
    title: "Best Quality",
    subtitle: "Cashew Nuts",
    description: "Sourced from the finest farms at unbeatable prices.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Premium Grade",
    subtitle: "Almonds",
    description: "Handpicked and packed fresh from California for maximum flavor.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Organic",
    subtitle: "Pistachios",
    description: "Pure and natural, straight from organic farms to your table.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Deliciously Fresh",
    subtitle: "Walnuts",
    description: "Packed with Omega-3 and essential nutrients for your health.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Rich in Fiber",
    subtitle: "Dried Apricots",
    description: "Sustainably sourced and packed for natural sweetness and energy.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Gourmet Selection",
    subtitle: "Macadamia Nuts",
    description: "Handcrafted and roasted to perfection for a rich, buttery flavor.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin", // Replace with your actual image paths
    title: "Sustainably Sourced",
    subtitle: "Hazelnuts",
    description: "High in antioxidants and packed with natural goodness.",
  },
 
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const handleSlideChange = useCallback((newIndex: number) => {
    setIsTransitioning(true)
    setCurrentSlide(newIndex)
    setTimeout(() => setIsTransitioning(false), 5000)
  }, [])

  const nextSlide = useCallback(() => {
    handleSlideChange((currentSlide + 1) % slides.length)
  }, [currentSlide, handleSlideChange])

  const prevSlide = useCallback(() => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, handleSlideChange])

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [nextSlide])

  const handleHover = useCallback((pause: boolean) => {
    if (timerRef.current) {
      if (pause) clearInterval(timerRef.current)
      else timerRef.current = setInterval(nextSlide, 5000)
    }
  }, [nextSlide])

  return (
    <section 
      className="relative bg-gradient-to-r from-orange-300 to-orange-400 overflow-hidden animated-background custom-cursor"
      aria-label="Featured Products Carousel"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
    >
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 animate-move" />
      <div className="absolute inset-0 bg-[url('/particles.svg')] opacity-20 animate-pulse" />
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-6">
        <div className="grid md:grid-cols-2 items-center justify-center gap-8">
          <div className="text-center md:text-left p-0 z-10 md:px-20 md:mt-20">
            <div className="relative min-h-[300px] md:min-h-[400px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    currentSlide === index ? 'opacity-100 animate-fadeIn' : 'opacity-0'
                  }`}
                  aria-hidden={currentSlide !== index}
                >
                  <div className="space-y-4 transform transition-transform duration-500 ease-in-out hover:scale-105">
                    <div className=" top-0  right-0 inline-flex items-center gap-2 px-4 py-2 bg-orange-200/30 rounded-full animate-bounce-in">
                      <span className="text-sm font-medium text-orange-900  ">Premium Quality</span>
                      <svg className="w-4 h-4 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-2xl   text-orange-900 animate-slideInLeft font-bold">
                      {slide.title}
                    </p>
                    <h1 className="text-4xl  md:text-6xl font-serif italic font-semibold text-orange-800 animate-slideInRight">
                      {slide.subtitle}
                    </h1>
                    <p className="text-2xl text-orange-900/80 animate-slideInUp font-normal">
                      {slide.description}
                    </p>
                    <Button
                      className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full transform transition-transform duration-300 hover:scale-105"
                      onClick={() => window.location.href = '/shop'}
                    >
                     <ShoppingCart  className="w-4 h-4 text-white" /> Shop Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className=" mt-5 flex gap-16 justify-center md:justify-start">
              <Button
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/30 transform transition-transform duration-300 hover:scale-110"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? "bg-orange-600 scale-125" 
                        : "bg-orange-300 hover:bg-orange-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/30 transform transition-transform duration-300 hover:scale-110"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-xl mx-auto">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                aria-hidden={currentSlide !== index}
              >
                <div className="absolute inset-0  transition-opacity duration-500 ease-in-out hover:opacity-0" />
                <Image
                  src={slide.image}
                  alt={`${slide.subtitle} - ${slide.title}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center drop-shadow-xl rounded-full shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-10 mix-blend-multiply pattern-diagonal-lines pattern-orange-500 pattern-size-4 animate-move-slow" />
    </section>
  )
}