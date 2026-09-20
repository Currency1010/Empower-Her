import { Eye, Target } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import aboutImage from "@/assets/about-image.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <AnimatedSection>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-secondary" />
                <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
                  About Us
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
                Empowering the Next Generation of <span className="text-primary block">Leaders</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                At the <strong className="text-gray-900 font-semibold">Empower Her and Youthrise Initiative</strong>, we believe that education is the ultimate equalizer. Our initiative serves as a sanctuary and a stepping stone for those the world has overlooked. We don't just offer aid; we offer a path to self-reliance.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Eye className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 uppercase tracking-wide">Our Vision</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To inspire and build a generation of self-reliant women and youth transforming communities through innovation, leadership, and positive social change.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Target className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 uppercase tracking-wide">Our Mission</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To empower women and youth with the knowledge, skills, and opportunities to lead, excel, and create sustainable growth in their communities.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative h-[500px]">
              <div className="absolute -inset-4 bg-gray-100 transform -skew-y-3 z-0" />
              <Image
                src={aboutImage}
                alt="Community empowerment meeting"
                fill
                className="relative z-10 object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
