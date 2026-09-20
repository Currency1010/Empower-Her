import Image from "next/image";
import type { StaticImageData } from "next/image";
import AnimatedSection from "./AnimatedSection";

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  image: string | StaticImageData;
}

const SubPageHero = ({ title, subtitle, image }: SubPageHeroProps) => {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-gray-900 mt-20">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            {subtitle}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SubPageHero;
