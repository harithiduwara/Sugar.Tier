import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { FeaturedCakes } from "@/components/sections/featured-cakes";
import { Process } from "@/components/sections/process";
import { Promises } from "@/components/sections/promises";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedCakes />
      <Process />
      <Promises />
      <Testimonials />
      <Cta />
    </>
  );
}
