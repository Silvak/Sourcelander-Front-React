import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Container className="py-12 min-h-[50vh] flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-primary uppercase text-sm mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting <span className="text-primary">Global Talent</span> with
            Innovative Companies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sourcelander is the leading platform for finding and hiring top-tier
            freelancers and remote professionals worldwide. We bridge the gap
            between exceptional talent and forward-thinking businesses.
          </p>
        </div>
      </Container>

      {/* Mission & Vision */}
      <ContainerSmall>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
          <p className="text-lg text-muted-foreground">
            We envision a world where geographical boundaries don&apos;t limit access
            to exceptional talent. Our mission is to democratize the global
            workforce and empower businesses to build world-class teams.
          </p>
        </div>
      </ContainerSmall>

      {/* Core Values */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We maintain the highest standards in everything we do, from
                talent verification to customer service, ensuring exceptional
                results for all our users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <CardTitle>Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Trust is the foundation of our platform. We implement rigorous
                verification processes and maintain transparency in all our
                interactions and transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <CardTitle>Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in the power of global collaboration. Our platform
                connects diverse talents from around the world, fostering
                innovation and cultural exchange.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We continuously evolve our platform with cutting-edge technology
                and innovative solutions to meet the changing needs of the
                modern workforce.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <CardTitle>Empowerment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We empower both freelancers and businesses to achieve their
                goals by providing the tools, resources, and opportunities they
                need to succeed.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We prioritize the security and privacy of our users&apos; data,
                implementing robust security measures and maintaining compliance
                with global standards.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* Our Story */}
      <ContainerSmall>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              From a simple idea to a global platform
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      The Beginning
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Founded with the vision of creating a more connected and
                      efficient global workforce, Sourcelander began as a
                      solution to the growing need for businesses to access
                      top-tier talent regardless of geographical constraints.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Growth & Evolution
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Through continuous innovation and user feedback, we&apos;ve
                      evolved from a simple freelancer marketplace to a
                      comprehensive talent management platform, serving
                      thousands of businesses and freelancers worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Today & Beyond
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, Sourcelander stands as a trusted partner for
                      businesses seeking exceptional talent and professionals
                      looking for meaningful opportunities. We continue to
                      innovate and expand our services to meet the evolving
                      needs of the global workforce.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContainerSmall>

      {/* Statistics */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground">
            Numbers that reflect our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                10,000+
              </div>
              <p className="text-muted-foreground">Verified Freelancers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Satisfied Clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* CTA Section */}
      <Container>
        <div className="text-center py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a business looking for top talent or a professional
            seeking new opportunities, Sourcelander is here to help you succeed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/freelancer">Find Freelancers</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
