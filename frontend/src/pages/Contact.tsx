import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send } from "lucide-react";

const EMAIL = "hamza.amr2003@gmail.com";

const Contact = () => {
  const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's Connect")}`;


  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="body-lg max-w-2xl mx-auto">Have a project in mind? Let's discuss how I can help.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="space-y-8 p-8 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">Toronto, CA</p>
                </div>
              </div>
              <Button className="w-full" size="lg" asChild>
                <a href={mailtoLink}>
                  <Send className="w-4 h-4" />
                  Send Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
