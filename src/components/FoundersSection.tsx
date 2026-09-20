"use client";

import AnimatedSection from "./AnimatedSection";
import FounderCard from "./FounderCard";
import laraiImg from "@/assets/Larai.jpg";
import kalenImg from "@/assets/kelen.jpeg";
import ruthImg from "@/assets/ruth.jpeg";
import rahilaImg from "@/assets/Rahila.jpeg";
import hauwaImg from "@/assets/hauwa-haliru-hassan.jpeg";

const FoundersSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
            Meet Our Founders
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </AnimatedSection>

        <div className="space-y-10">
          <div>
            <FounderCard
              name="Larai Sylvia Ishaku"
              role="Founder"
              imageUrl={laraiImg.src}
              bio="Larai Sylvia Ishaku is a distinguished public servant, community development advocate, entrepreneur, and political leader from Jaba Local Government Area. She currently serves as the Executive Chairman of Jaba Local Government Area, Kaduna State, and also holds the position of ALGON Secretary in Kaduna State. Her leadership is driven by a strong commitment to inclusive governance, women empowerment, sustainable community development, and grassroots mobilization. She possesses extensive experience in public administration, political leadership, information management, and entrepreneurship. Prior to her current role, she served as Senior Special Assistant to the Governor of Kaduna State and Programme Manager of the National Home Grown School Feeding Programme in Kaduna State. Larai Sylvia Ishaku holds academic qualifications from Ahmadu Bello University, including a Master’s degree in Information Management and a Bachelor’s degree in Library and Information Science. She is also pursuing a Master’s degree in Library and Information Science. A passionate advocate for leadership development and women participation in governance, she has attended several international and national trainings, including the prestigious Women and Power Executive Course at Harvard Kennedy School. Her professional engagements span governance, education, ICT security, food systems transformation, advocacy, and leadership development. Beyond public service, she is a successful entrepreneur with interests in interior design, fashion, real estate, event management, and logistics. She is widely recognized for her dedication to integrity, innovation, teamwork, and impactful leadership aimed at improving lives and strengthening communities."
              delay={0}
              className="mx-auto max-w-[360px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            <div className="mx-auto transform scale-90 max-w-[300px] h-full">
              <FounderCard
                name="Kalen Ephraim Audu, PhD"
                imageUrl={kalenImg.src}
                bio="Dr. Audu Kalen Ephraim, Ph.D. is a distinguished researcher, development practitioner, public health advocate, and community leader with extensive experience in scientific research, education, humanitarian programming, and public service. She holds a Ph.D. in Biology (Environmental and Molecular Biology), M.Sc. in Biological Sciences, and B.Sc. (Hons.) in Biological Sciences from Ahmadu Bello University, Zaria. She also possesses a Professional Certificate in Financial Innovation for Sustainable Development Goals (SDGs) from the Jerusalem Institute for Policy Research, Israel; a Professional Diploma in Education from the Federal College of Education, Katsina; a Proficiency Certificate in Management from the Nigerian Institute of Management; and a Diploma in Computer Studies. Dr. Kalen currently serves as Vice Chairman of Lere Local Government Area, Kaduna State, and was also a Research Assistant at the Africa Centre of Excellence for Neglected Tropical Diseases and Forensic Biotechnology, ABU Zaria. Her career includes roles with EGI, ARFH, KADRUWASSA, NAFDAC, WHO, UNICEF, NACA, and CIHP, among others. A published scholar and advocate for community development, women’s empowerment, youth engagement, and public health, she is a Graduate Member of the Nigerian Institute of Management (NIM) and a Member of the Zoological Society of Nigeria."
                delay={0.1}
              />
            </div>

            <div className="mx-auto transform scale-90 max-w-[300px]">
              <FounderCard
                name="Temitope Ruth Jacob"
                imageUrl={ruthImg.src}
                bio="Temitope Ruth Jacob is a branding and marketing strategist with a clear vision and an unwavering commitment to unleashing the true potential of brands through strategic positioning and impactful marketing campaigns. She is the Founder and CEO of Elegance Inspired Limited, the Convener of Brand Xperience, and also serves as a Director at Dream Centre, where she mentors over 700 young leaders from top Nigerian universities, and as an Instructional Facilitator at O2 Academy Abuja, training young professionals in marketing and branding strategy. She holds an MSc in Marketing and Sales from Rome Business School and a Brand Management certification from the London School of Business Administration."
                delay={0.2}
              />
            </div>

            <div className="mx-auto transform scale-90 max-w-[300px]">
              <FounderCard
                name="Rahila Mohammed, MPH, RN, RM"
                imageUrl={rahilaImg.src}
                bio="Rahila Mohammed is a highly experienced Public Health Specialist, Registered Nurse, and Registered Midwife with over two decades of dedicated service in healthcare, community development, and public health leadership. She holds a Master's Degree in Public Health and has extensive expertise in disease prevention and control, maternal and child health, WASH programming, health systems strengthening, community mobilization, and health promotion. Throughout her career, she has successfully led public health programs, strengthened healthcare services, supervised multidisciplinary teams, and supported communities through evidence-based interventions and capacity-building initiatives."
                delay={0.3}
              />
            </div>

            <div className="mx-auto transform scale-90 max-w-[300px]">
              <FounderCard
                name="Hauwa Haliru Hassan"
                // role="Director of Gender Affairs / CEO, NGF Spouse Forum Secretariat"
                imageUrl={hauwaImg.src}
                bio={
                  "Hauwa Haliru Hassan is the Chief Executive Officer at the Nigeria Governors’ Spouse Forum Secretariat, a Non-Governmental Organization dedicated to advocacy for women and children. She also serves as the Director of Gender Affairs at the Nigeria Governors’ Forum Secretariat. With more than 20 years of experience as a legal practitioner, human resources specialist, and gender advocate, Hauwa has spent nearly a decade actively engaged in the gender sector. She leads advocacy on Women Economic Empowerment and Women in Leadership, and is recognised for strategic leadership in designing and implementing impactful programmes, collaborating with government, civil society, and international partners to advance social justice and inclusivity."
                }
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
