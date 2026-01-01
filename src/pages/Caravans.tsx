"use client";

import { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
import { Caravan } from "@/types/caravan"; // ← Use the shared full type

const seriesOptions = ["All Series", "Explorer", "Outback", "Horizon", "Summit", "Compact"];
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
  const [caravans, setCaravans] = useState<Caravan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaravans = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "caravans"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Caravan[];

        // Only show available caravans
        const available = data.filter((c) => c.available !== false);
        setCaravans(available);
      } catch (error) {
        console.error("Error fetching caravans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaravans();
  }, []);

  const filteredCaravans = useMemo(() => {
    let result = [...caravans];

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
  }, [caravans, search, series, berth, sort]);

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
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Our Range</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect Caravan
            </h1>
            <p className="text-muted-foreground text-lg">
              From compact tourers to luxury family vans, discover the Equalizer RV
              that matches your adventure style.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border top-20 bg-background/95 backdrop-blur-md z-40">
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
                <SelectContent>
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
                <SelectContent>
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
                <SelectContent>
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              {filteredCaravans.length > 0 ? (
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
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No caravans match your filters
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}