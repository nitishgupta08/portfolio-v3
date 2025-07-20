"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaEnvelope } from "react-icons/fa";
import { portfolioTracking } from "@/lib/analytics";

export default function Contact() {
  const handleEmailClick = () => {
    portfolioTracking.trackContactInteraction("email_click");
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 my-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="uppercase tracking-wider">
                    Contact
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Get in touch
                  </h2>
                </div>

                <div className="max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Whether you have an idea for a project, want to collaborate,
                    or just want to say hi, feel free to reach out! I'm always
                    excited to connect with fellow developers and creators.
                  </p>
                </div>

                <div>
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                    asChild
                  >
                    <a
                      href="mailto:nitishkg.88@gmail.com"
                      aria-label="Send email"
                      onClick={handleEmailClick}
                    >
                      <FaEnvelope className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>Say Hello</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </a>
                  </Button>
                </div>

                <div className="pt-8 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="text-2xl">💡</div>
                      <p className="text-sm text-muted-foreground">
                        Open to opportunities
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl">🚀</div>
                      <p className="text-sm text-muted-foreground">
                        Ready to collaborate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
