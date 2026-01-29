import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaravanModel } from "@/data/caravanModels";

interface ModelCardProps {
  model: CaravanModel;
  index?: number;
}

export const ModelCard = ({ model, index = 0 }: ModelCardProps) => {
  return (
    <Link
      href={`/models/${model.id}`}
      className="group card-premium overflow-hidden animate-fade-up block cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={model.image}
          alt={`${model.name} Caravan`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-accent font-medium">{model.tagline}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1">{model.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {model.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {model.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {feature.title}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-foreground">{model.price}</span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
            View Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};





