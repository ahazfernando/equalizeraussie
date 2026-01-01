"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const models = [
  {
    id: "cruzer",
    name: "Cruzer",
    route: "/models/cruzer",
    image: "/caravan/CruzerCaravan.png",
    logo: "/caravanlogos/CruzerLogo.png",
    description: "Perfect on-road model for touring in luxury! Designed to provide an unparalleled experience, combining functionality and style.",
    accentColor: "from-cyan-400/40 to-teal-600/20",
    hoverColor: "hover:from-cyan-500/50 hover:to-teal-700/30",
    buttonHover: "hover:bg-cyan-600 hover:text-white hover:shadow-cyan-500/50",
    borderHover: "group-hover:border-cyan-500 group-hover:shadow-cyan-500/40",
  },
  {
    id: "rebel",
    name: "Rebel",
    route: "/models/rebel",
    image: "/caravan/RebelCaravan.png",
    logo: "/caravanlogos/RebelLogo.png",
    description: "This semi-offroad model is the ideal choice for those seeking to explore both on and off-road in style",
    accentColor: "from-orange-400/40 to-amber-600/20",
    hoverColor: "hover:from-orange-500/50 hover:to-amber-700/30",
    buttonHover: "hover:bg-orange-600 hover:text-white hover:shadow-orange-500/50",
    borderHover: "group-hover:border-orange-500 group-hover:shadow-orange-500/40",
  },
  {
    id: "rogue",
    name: "Rogue",
    route: "/models/rogue",
    image: "/caravan/RogueCaravan.png",
    logo: "/caravanlogos/RogueLogo.png",
    description: "Ultimate off-road caravan designed for those that enjoy exploring locations off the beaten track.",
    accentColor: "from-emerald-400/40 to-green-700/20",
    hoverColor: "hover:from-emerald-500/50 hover:to-green-800/30",
    buttonHover: "hover:bg-emerald-600 hover:text-white hover:shadow-emerald-500/50",
    borderHover: "group-hover:border-emerald-500 group-hover:shadow-emerald-500/40",
  },
];

export function ModelSelector() {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-background to-muted/40 relative overflow-hidden">
      {/* Vibrant decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-red-100 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-500 text-red-500 dark:text-red-400 text-base font-semibold shadow-lg">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              Explore Our Models
            </span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-8 leading-tight">
            CHOOSE YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 relative inline-block">
              CARAVAN
              <span className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-red-500/50 to-red-600/50 blur-xl" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-xl sm:text-2xl leading-relaxed font-medium">
            As a customisation expert we cater for everyone's needs, whether it's
            tackling the Gibb River Road, heading to the Cape or going on that Christmas
            holiday at the caravan park.
          </p>
        </div>

        <div className="relative perspective-1000">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {models.map((model, index) => (
                <CarouselItem
                  key={model.id}
                  className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Link href={model.route} className="group block h-full">
                    <div className={`h-full relative overflow-hidden rounded-3xl transition-all duration-700 ease-out bg-background/95 cursor-pointer backdrop-blur-xl border border-border`}>
                      {/* Bold gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${model.accentColor} ${model.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 rounded-3xl`} />

                      {/* Content */}
                      <div className="relative z-20 h-full flex flex-col">
                        {/* Image with dramatic effects */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                          <Image
                            src={model.image}
                            alt={`${model.name} Caravan`}
                            fill
                            className="object-contain p-6 md:p-12 group-hover:scale-115 transition-transform duration-1000 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0}
                          />
                          {/* Intense shine sweep */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
                        </div>

                        {/* Lower content */}
                        <div className="p-8 md:p-10 space-y-6 bg-gradient-to-t from-background to-background/90">
                          <div className="relative h-20 w-full transform group-hover:scale-110 transition-transform duration-700 drop-shadow-xl">
                            <Image
                              src={model.logo}
                              alt={`${model.name} Logo`}
                              fill
                              className="object-contain object-left"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                          <textarea
                            className="w-full bg-transparent text-muted-foreground text-base md:text-lg leading-relaxed group-hover:text-foreground transition-colors duration-700 resize-none"
                            rows={5}
                            readOnly
                            defaultValue={model.description}
                          />

                          <div className="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-200">
                            <Button
                              size="lg"
                              className={`w-full justify-between font-semibold shadow-lg ${model.buttonHover} transition-all duration-500`}
                            >
                              <span>Explore {model.name}</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Glowing border effect */}
                      <div className={`absolute inset-0 rounded-3xl border-2 border-transparent ${model.borderHover} opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none shadow-2xl`} />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 md:-left-4 h-14 w-14 rounded-full bg-background/95 backdrop-blur-xl border-4 border-border hover:bg-red-500/20 hover:border-red-500 hover:scale-110 transition-all duration-500 shadow-2xl" />
            <CarouselNext className="right-4 md:-right-4 h-14 w-14 rounded-full bg-background/95 backdrop-blur-xl border-4 border-border hover:bg-red-500/20 hover:border-red-500 hover:scale-110 transition-all duration-500 shadow-2xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}