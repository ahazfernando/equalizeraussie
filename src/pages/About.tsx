import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Wrench, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Caravans Built" },
  { value: "50+", label: "Team Members" },
  { value: "100%", label: "Australian Made" },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on materials or craftsmanship. Every caravan is built to last generations.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your journey is our priority. We listen, adapt, and deliver caravans that exceed expectations.",
  },
  {
    icon: Wrench,
    title: "Innovation",
    description: "Constantly pushing boundaries with new designs, materials, and technologies.",
  },
  {
    icon: MapPin,
    title: "Australian Spirit",
    description: "Born from the Australian love of adventure and designed for our unique conditions.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl">
            <p className="text-accent font-medium mb-2">Our Story</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Australian Engineered.<br />Adventure Approved.
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome to Equalizer RV, where we turn the dream of endless adventure into reality. As a proudly Australian company, we specialise in crafting a diverse range of caravans tailored to every adventurer’s needs. From compact models ideal for couples seeking a romantic escape to spacious family caravans with bunk beds, we have your perfect travel companion waiting.
            </p>
            <p className="mt-5 text-muted-foreground text-lg">
              At Equalizer RV, we understand the diverse landscapes Australia offers, and that’s why our caravans come in various types, ranging from on-road touring models for scenic drives to full off-road beasts designed for the ultimate adventure. Every caravan is 100% Australian made, constructed with the finest materials to withstand the rugged beauty of our country.
            </p>
            <p className="mt-5 text-muted-foreground text-lg">
              Our mission is clear: to build vans for every type of adventurer. We are passionate about enabling unforgettable experiences, and we take pride in creating homes-on-wheels that seamlessly blend comfort, style, and functionality. Whether you’re embarking on a solo journey, a romantic getaway, or a family expedition, our caravans are crafted to elevate your travel experience.
            </p>
            <p className="mt-5 text-muted-foreground text-lg">
              Discover the joy of the open road with Equalizer RV—where your adventure begins, and memories are made.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Born From a Passion for Adventure
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Equalizer RV started with a simple question: why should Australian 
                travellers have to choose between rugged capability and comfortable 
                living? Our founders, lifelong caravan enthusiasts, set out to create 
                something better.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From our Melbourne manufacturing facility, we combine traditional 
                craftsmanship with modern engineering. Every caravan is hand-finished 
                by skilled artisans who share our passion for quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Equalizer RV caravans can be found exploring every corner of 
                Australia – from the red heart of the outback to pristine coastal 
                campgrounds. Our owners don&apos;t just buy a caravan; they join a 
                community of like-minded adventurers.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/caravan-lifestyle-1.jpg"
                alt="Equalizer RV caravan in the Australian outback"
                width={800}
                height={600}
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card-premium p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/caravan-interior.jpg"
                alt="Premium caravan interior craftsmanship"
                width={800}
                height={600}
                className="rounded-2xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Crafted in Melbourne
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our state-of-the-art manufacturing facility in Melbourne&apos;s south-east 
                is where the magic happens. Here, skilled tradespeople bring together 
                premium materials and precision engineering.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We source the best Australian and international components – 
                from locally-milled timber to European appliances – ensuring every 
                Equalizer RV meets our exacting standards.
              </p>
              <Link href="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Visit Our Showroom
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
