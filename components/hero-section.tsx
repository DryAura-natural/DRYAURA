"use client"

import { useState, useEffect, useCallback, useRef } from "react" 
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/Button"

const slides = [
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Best Quality",
    subtitle: "Cashew Nuts",
    description: "Sourced from the finest farms at unbeatable prices.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Premium Grade",
    subtitle: "Almonds",
    description: "Handpicked and packed fresh from California for maximum flavor.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Organic",
    subtitle: "Pistachios",
    description: "Pure and natural, straight from organic farms to your table.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Deliciously Fresh",
    subtitle: "Walnuts",
    description: "Packed with Omega-3 and essential nutrients for your health.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Rich in Fiber",
    subtitle: "Dried Apricots",
    description: "Sustainably sourced and packed for natural sweetness and energy.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Gourmet Selection",
    subtitle: "Macadamia Nuts",
    description: "Handcrafted and roasted to perfection for a rich, buttery flavor.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Sustainably Sourced",
    subtitle: "Hazelnuts",
    description: "High in antioxidants and packed with natural goodness.",
  },
  {
    image: "https://cloud.appwrite.io/v1/storage/buckets/67a8d237003af1ec0197/files/67a8d6930035e6060bfe/view?project=677bf12a000e83aee344&mode=admin",
    title: "Health Boosting",
    subtitle: "Pecans",
    description: "Rich in vitamins and minerals for a nutritious snack.",
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const handleSlideChange = useCallback((newIndex: number) => {
    setIsTransitioning(true)
    setCurrentSlide(newIndex)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [])

  const nextSlide = useCallback(() => {
    handleSlideChange((currentSlide + 1) % slides.length)
  }, [currentSlide, handleSlideChange])

  const prevSlide = useCallback(() => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, handleSlideChange])

  // Auto-change slide with cleanup
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [nextSlide])

  // Pause auto-rotate on hover
  const handleHover = useCallback((pause: boolean) => {
    if (timerRef.current) {
      if (pause) clearInterval(timerRef.current)
      else timerRef.current = setInterval(nextSlide, 5000)
    }
  }, [nextSlide])

  return (
    <section 
      className="relative bg-gradient-to-r from-orange-300 to-orange-200 overflow-hidden"
      aria-label="Featured Products Carousel"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
    >
      <div className="container mx-auto px-4 py-16 md:py-12">
        <div className="grid md:grid-cols-2 items-center justify-center gap-8 ">
          {/* Text Content */}
          <div className="text-center md:text-left p-0 z-10 md:px-20 md:mt-20">
            <div className="relative min-h-[300px] md:min-h-[400px] ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100 animate-fadeIn' : 'opacity-0'
                  }`}
                  aria-hidden={currentSlide !== index}
                >
                  <div className="space-y-4 ">
                    <p className="text-2xl font-medium text-orange-800">
                      {slide.title}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif italic font-semibold text-black-900">
                      {slide.subtitle}
                    </h1>
                    <p className="text-2xl text-gray-800">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <Button
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/30"
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
                className="bg-white/20 hover:bg-white/30 border-white/30"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-square w-full max-w-xl mx-auto">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100 animate-fadeIn' : 'opacity-0'
                }`}
                aria-hidden={currentSlide !== index}
              >
                <Image
                  src={slide.image}
                  alt={`${slide.subtitle} - ${slide.title}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center rounded-full shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 mix-blend-multiply pattern-diagonal-lines pattern-orange-500 pattern-size-4" />
    </section>
  )
}
