"use client";
import { useState, useMemo } from "react";
import { caravans, Caravan } from "@/data/caravans";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const seriesOptions = ["All Series", "Cruzer", "Rebel", "Rogue"];
const berthOptions = ["All Berths", "2", "4"];
const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "length", label: "Length" },
];

export default function Caravans() {
  const [search, setSearch] = useState("");
  const [series, setSeries] = useState("All Series");
  const [berth, setBerth] = useState("All Berths");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Use static data instead of fetching from Firebase
  const staticCaravans = useMemo(() => caravans.filter((c) => c.available !== false), []);

  const filteredCaravans = useMemo(() => {
    let result = [...staticCaravans];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.series.toLowerCase().includes(searchLower) ||
          (c.tagline && c.tagline.toLowerCase().includes(searchLower))
      );
    }

    if (series !== "All Series") {
      result = result.filter((c) => c.series === series);
    }

    if (berth !== "All Berths") {
      result = result.filter((c) => c.berth === parseInt(berth));
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "length":
        result.sort((a, b) => {
          const aLen = parseInt(a.length) || 0;
          const bLen = parseInt(b.length) || 0;
          return aLen - bLen;
        });
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, series, berth, sort]);

  const clearFilters = () => {
    setSearch("");
    setSeries("All Series");
    setBerth("All Berths");
    setSort("featured");
  };

  const hasActiveFilters = search || series !== "All Series" || berth !== "All Berths";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-20 -mt-24 pt-24">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/caravans-hero.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-white text-base font-semibold cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-foreground animate-ping" />
                Our Ranges
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-[1.1] mb-8 text-foreground">
              Find Your Perfect Caravan
            </h2>
            <p className="text-muted-foreground text-md sm:text-lg leading-relaxed max-w-4xl mx-auto font-light mb-5">
              From compact tourers to luxury family vans, discover the Equalizer RV that matches your adventure style.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b-2 border-border top-20 bg-background backdrop-blur-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search caravans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input-premium pl-10 w-full"
              />
            </div>

            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>

            <div className={`flex-wrap gap-4 items-center ${showFilters ? "flex" : "hidden lg:flex"} w-full lg:w-auto`}>
              <Select value={series} onValueChange={setSeries}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Series" />
                </SelectTrigger>
                <SelectContent className="bg-card text-foreground">
                  {seriesOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={berth} onValueChange={setBerth}>
                <SelectTrigger className="w-full lg:w-32">
                  <SelectValue placeholder="Berth" />
                </SelectTrigger>
                <SelectContent className="bg-card text-foreground">
                  {berthOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option === "All Berths" ? option : `${option} Berth`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full lg:w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card text-foreground">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaravans.map((caravan, index) => (
              <div
                key={caravan.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CaravanCard caravan={caravan} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}