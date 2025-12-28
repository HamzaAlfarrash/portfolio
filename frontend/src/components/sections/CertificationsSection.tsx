import { ScrollReveal } from "@/components/ScrollReveal";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    badge: "/badges/aws-cloud-practitioner.png",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/4a15eed56bfb4e51b40f010e0d144539",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    badge: "/badges/aws-solutions-architect-associate.png",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/9accdb4c67a44a0689c89bd6cfb3de07",
  },
  {
    name: "AWS Certified AI Practitioner",
    badge: "/badges/aws-ai-practitioner.png",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/6eb6ea0da36e4210badb0419cda8424b",
  },
  {
    name: "AWS Certified Developer – Associate",
    badge: "/badges/aws-developer-associate.png",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/d71aeb9e6cb94d928e1e271c1c78500d",
  },
  {
    name: "AWS Certified Machine Learning Engineer – Associate",
    badge: "/badges/aws-ml-engineer-associate.png",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/4356cdf558c94ba2a992c2ce13a4fa26",
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding bg-card/20">
      <div className="section-container">
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="text-sm font-mono text-primary mb-4 block">04. Certifications</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-lg mb-4">
              Validated <span className="text-gradient">Cloud Expertise</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
              Industry-recognized AWS certifications that back up my hands-on experience designing, building, and
              operating cloud-native systems.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.name} delay={(index + 1) * 100}>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="relative mb-3">
                  <img
                    src={cert.badge}
                    alt={`${cert.name} badge`}
                    className="w-24 h-24 md:w-28 md:h-28 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
                <p className="text-xs md:text-sm text-center text-muted-foreground max-w-[120px] group-hover:text-foreground transition-colors duration-300">
                  {cert.name.replace("AWS Certified ", "").replace(" – Associate", "")}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


