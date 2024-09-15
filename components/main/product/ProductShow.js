"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useCallback } from "react";
import Image from "next/image";

function ProductShow({ variants }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div dir="ltr" className="embla ">
      <div className="embla__viewport  text-red" ref={emblaRef}>
        <div className="embla__container ">
          {variants.map((variant) =>
            variant.variantImages.map((img) => (
              <Image
                width={300}
                height={300}
                className="embla__slide w-52 md:w-64"
                src={img.url}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex mt-2   items-center justify-between">
        <button
          className="border border-gray-500 rounded-full"
          onClick={scrollPrev}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          className="border border-gray-500 rounded-full"
          onClick={scrollNext}>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ProductShow;
