import { ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CountUpStat from "./CountUpStat";

const impacts = [
  {
    icon: ShieldCheck,
    title: "Breaking Cycles",
    description: "Education reduces the impact of early marriage and pregnancy, giving girls a chance at a brighter future.",
  },
  {
    icon: TrendingUp,
    title: "Economic Growth",
    description: "Empowered women invest 90% of their income back into their families and communities.",
  },
  {
    icon: Sparkles,
    title: "Sustainability",
    description: "When you educate a girl, you educate a nation. Every life changed creates a ripple effect.",
  },
];

const ImpactSection = () => {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
              Our Impact
            </p>
            <div className="h-px w-12 bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Why Focus on <span className="text-secondary">Girls & Women?</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Investing in women and girls is the smartest investment we can make for lasting change.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {impacts.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.15}>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                  <item.icon size={36} className="text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-2xl tracking-wide uppercase">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Stats */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/20">
            {[
              { value: 100, suffix: "+", label: "Girls Educated" },
              { value: 10, suffix: "+", label: "Scholarships Given" },
              { value: 50, suffix: "+", label: "Skills Trained" },
              { value: 20, suffix: "+", label: "Communities Reached" },
            ].map((stat) => (
              <CountUpStat
                key={stat.label}
                endValue={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ImpactSection;
