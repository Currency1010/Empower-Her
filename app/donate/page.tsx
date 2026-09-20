"use client";

import { useState } from "react";
import { BookOpen, Wrench, Heart, CalendarDays, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSection from "@/components/AnimatedSection";
import SubPageHero from "@/components/SubPageHero";
import { toast } from "sonner";
import aboutImage from "@/assets/about-image.png";

const roles = [
  { icon: BookOpen, title: "Education & Tutoring", desc: "Helping out-of-school children catch up on their studies." },
  { icon: Wrench, title: "Vocational Mentorship", desc: "Sharing practical skills in IT, crafts, or business management." },
  { icon: Heart, title: "Counseling", desc: "Providing guidance to vulnerable youth and women." },
  { icon: CalendarDays, title: "Event Coordination", desc: "Helping with outreach and community programs in Kaduna state, Northern Nigeria and Africa." },
];

const DonatePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skillset: "",
    motivation: "",
  });

  const getNameInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
    return initials || "👤";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email setup missing", {
        description: "Email service is not configured yet. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          reply_to: formData.email,
          time: new Date().toLocaleString(),
          name_initials: getNameInitials(formData.name),
          phone: formData.phone,
          skillset: formData.skillset,
          motivation: formData.motivation,
          message: formData.motivation,
          details: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSkillset: ${formData.skillset}\nMotivation: ${formData.motivation}`,
        },
        { publicKey }
      );

      toast.success("Application Submitted!", {
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", phone: "", skillset: "", motivation: "" });
    } catch {
      toast.error("Submission failed", {
        description: "Something went wrong while sending your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <SubPageHero
        title="Get in Touch"
        subtitle="Change a life and elevate the underserved communities in Kaduna State, Northern Nigeria and Africa"
        image={aboutImage}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-secondary" />
                <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
                  Join Our Mission
                </p>
                <div className="h-px w-12 bg-secondary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Why Donate <span className="text-primary">With Us?</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                By getting involved with the <strong className="text-gray-900 font-semibold">Empower Her and Youth-Rise Initiative</strong>, you are becoming an integral part of a sustainable support system. You are helping to break the cycle of poverty and nurturing the next generation of female leaders and entrepreneurs in Kaduna state, Northern Nigeria and Africa.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {roles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 0.1}>
                <div className="bg-gray-50 border border-gray-200 p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 text-center">
                  <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <role.icon className="text-primary" size={28} />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-gray-900 mb-3">{role.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{role.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Sign Up <span className="text-primary">Today</span></h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below to begin your journey with us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-bold tracking-wide uppercase text-gray-700">Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary rounded-none h-12"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold tracking-wide uppercase text-gray-700">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary rounded-none h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold tracking-wide uppercase text-gray-700">Phone Number</label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="080XXXXXXXX"
                    className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary rounded-none h-12"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold tracking-wide uppercase text-gray-700">Skillset / Area of Interest</label>
                <Input
                  required
                  value={formData.skillset}
                  onChange={(e) => setFormData({ ...formData, skillset: e.target.value })}
                  placeholder="e.g., Teaching, IT, Counseling"
                  className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary rounded-none h-12"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold tracking-wide uppercase text-gray-700">Why do you want to join?</label>
                <Textarea
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Tell us about your motivation..."
                  rows={5}
                  className="bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary rounded-none resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-none px-8 py-6 font-bold tracking-wide uppercase text-sm gap-2"
              >
                <Send size={18} />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default DonatePage;
