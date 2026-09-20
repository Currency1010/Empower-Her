import Link from "next/link";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";
import SubPageHero from "@/components/SubPageHero";
import aboutImage from "@/assets/about-image.png";

const coreValues = [
  {
    title: "Empowerment",
    description:
      "We equip women and youth with practical skills, confidence, and opportunities to become self-reliant and contribute positively to their families and communities.",
  },
  {
    title: "Integrity",
    description:
      "We uphold honesty, transparency, accountability, and fairness in all our actions and relationships.",
  },
  {
    title: "Excellence",
    description:
      "We pursue high standards, professionalism, and quality service in every program and partnership.",
  },
  {
    title: "Inclusiveness",
    description:
      "We respect diversity and promote equal opportunities for all, regardless of gender, religion, ethnicity, disability, or social background.",
  },
  {
    title: "Sustainability",
    description:
      "We support long-term solutions that build independence, resilience, and lasting growth.",
  },
  {
    title: "Compassion",
    description:
      "We serve with empathy, dignity, and sincere concern for the well-being of others.",
  },
  {
    title: "Innovation",
    description:
      "We embrace creative and practical ideas that solve community challenges and improve lives.",
  },
  {
    title: "Collaboration",
    description:
      "We value partnerships with communities, leaders, institutions, and stakeholders to achieve shared progress.",
  },
  {
    title: "Peace & Respect",
    description:
      "We promote peaceful coexistence, mutual respect, and unity among all people.",
  },
];

const AboutPage = () => {
  return (
    <main>
      <SubPageHero
        title="About Us"
        subtitle="Learn more about our mission, vision, and impact in Kaduna state, Northern Nigeria and Africa."
        image={aboutImage}
      />

      <AboutSection />

      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              These values guide our programs, partnerships, and day-to-day commitment to transformative community impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value) => (
              <article key={value.title} className="border border-gray-200 bg-gray-50 p-6 h-full">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Together, we can create lasting change through education, skills development, and support.
          </p>
          <Link href="/donate">
            <Button className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6 font-semibold tracking-wide uppercase text-sm">
              Donate Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
