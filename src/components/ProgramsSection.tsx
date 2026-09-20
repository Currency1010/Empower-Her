import {
  BadgeCheck,
  BriefcaseBusiness,
  Handshake,
  HeartPulse,
  Leaf,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const focusAreas = [
  {
    icon: BadgeCheck,
    title: "Education & Learning Opportunities",
    description:
      "Promoting access to quality education through scholarships, school support programs, mentorship, literacy initiatives, and reintegration of out-of-school children especially girls.",
    color: "bg-primary text-white",
  },
  {
    icon: Users,
    title: "Women & Youth Empowerment",
    description:
      "Strengthening leadership, confidence, civic participation, and decision-making capacity of women and young people to become agents of change.",
    color: "bg-secondary text-primary",
  },
  {
    icon: BriefcaseBusiness,
    title: "Skills Acquisition & Entrepreneurship",
    description:
      "Providing vocational training, digital skills, business development, and startup support to improve employability and self-reliance.",
    color: "bg-gray-800 text-white",
  },
  {
    icon: Handshake,
    title: "Economic Livelihoods & Financial Inclusion",
    description:
      "Supporting women, youth, cooperatives, and small businesses through savings groups, micro-enterprise development, and livelihood opportunities.",
    color: "bg-gray-100 text-primary",
  },
  {
    icon: HeartPulse,
    title: "Health, Mental Health & Well-being",
    description:
      "Promoting awareness and access to reproductive health education, maternal health, mental health support, substance abuse prevention, and healthy living.",
    color: "bg-primary text-white",
  },
  {
    icon: ShieldCheck,
    title: "Advocacy, Protection & Social Change",
    description:
      "Advancing girls' education, child protection, gender equality, prevention of gender-based violence, and elimination of harmful cultural practices.",
    color: "bg-secondary text-primary",
  },
  {
    icon: Scale,
    title: "Peacebuilding & Community Cohesion",
    description:
      "Promoting peaceful coexistence, dialogue, tolerance, and community unity across ethnic and religious lines.",
    color: "bg-gray-800 text-white",
  },
  {
    icon: Sprout,
    title: "Community Development & Resilience",
    description:
      "Supporting community-led solutions in sanitation, environment, infrastructure, disaster response, and sustainable local development.",
    color: "bg-gray-100 text-primary",
  },
  {
    icon: Leaf,
    title: "Agriculture & Food Security",
    description:
      "Empowering households through climate-smart agriculture, backyard farming, agribusiness, and food security initiatives.",
    color: "bg-primary text-white",
  },
  {
    icon: Lightbulb,
    title: "Digital Inclusion & Innovation",
    description:
      "Expanding access to digital literacy, technology training, online opportunities, and innovation for youth and women.",
    color: "bg-secondary text-primary",
  },
];

interface ProgramsSectionProps {
  limit?: number;
  showViewAllButton?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
}

const ProgramsSection = ({
  limit,
  showViewAllButton = false,
  viewAllHref = "/focus-areas",
  viewAllLabel = "View All Focus Areas",
}: ProgramsSectionProps) => {
  const displayedFocusAreas = typeof limit === "number" ? focusAreas.slice(0, limit) : focusAreas;

  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
              Focus Areas
            </p>
            <div className="h-px w-12 bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Driving Impact Through <span className="text-primary">Strategic Focus Areas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Advancing inclusive development through education, empowerment, health, innovation, and community-led resilience.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFocusAreas.map((focusArea, index) => (
            <AnimatedSection key={focusArea.title} delay={index * 0.08}>
              <div className="bg-white border border-gray-200 p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 ${focusArea.color} flex items-center justify-center mb-8 shadow-sm`}>
                  <focusArea.icon size={32} />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4 uppercase tracking-wide">
                  {focusArea.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {focusArea.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {showViewAllButton && (
          <AnimatedSection className="mt-12 text-center">
            <Link href={viewAllHref}>
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6 font-semibold tracking-wide uppercase text-sm">
                {viewAllLabel}
              </Button>
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
