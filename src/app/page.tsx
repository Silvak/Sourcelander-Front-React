import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import HeroGraph from "@/components/landing/HeroGraph";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              Talent Management Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Manage & Hire Expert <span className="text-primary">Talent</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We handle all your HR needs - from finding and hiring the best
              freelance talent to managing payroll, compliance, and global
              workforce operations.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/freelancer">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/freelancer">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <HeroGraph />
          </div>
        </div>
      </Container>

      {/* Stats Section */}
      <ContainerSmall>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">800,000+</div>
            <p className="text-sm text-muted-foreground">Employers Worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <p className="text-sm text-muted-foreground">Paid Invoices</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">$250M+</div>
            <p className="text-sm text-muted-foreground">Paid to Freelancers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <p className="text-sm text-muted-foreground">
              Customer Satisfaction
            </p>
          </div>
        </div>
      </ContainerSmall>

      {/* Categories Section */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Access Global Talent Pool</h2>
          <p className="text-lg text-muted-foreground">
            We manage thousands of skilled professionals across all categories
            for your HR needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <CardTitle>Programming & Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>316,108 Freelancers</CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <CardTitle>Writing & Translation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>212,946 Freelancers</CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>Design & Art</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>205,832 Freelancers</CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Administrative & Secretarial</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>99,083 Freelancers</CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <CardTitle>Sales & Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>74,824 Freelancers</CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <CardTitle>Engineering & Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>57,750 Freelancers</CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/contact">See All Skills</a>
          </Button>
        </div>
      </Container>

      {/* Features Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Our HR Management
          </h2>
          <p className="text-lg text-muted-foreground">
            We handle all your talent management needs with confidence
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <CardTitle>HR Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We handle all compliance requirements, verify talent, and manage
                documentation to ensure your HR operations meet global
                standards.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <CardTitle>Global HR Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We manage your global workforce with flexible employment models
                and handle all HR operations across multiple countries.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <CardTitle>Payroll & Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We handle payroll processing, benefits administration, and
                secure payments for your entire global workforce.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <CardTitle>Cost Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We optimize your HR costs with competitive rates and efficient
                talent management processes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <CardTitle>HR Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our dedicated HR support team works 24/7 to handle all your
                talent management queries and operational needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Rapid Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We streamline the entire HR process from talent sourcing to
                onboarding, getting your team operational in record time.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* How it Works Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our HR Management Process</h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process makes talent management simple and efficient
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Talent Sourcing</h3>
            <p className="text-muted-foreground">
              We source and screen qualified candidates for your specific HR
              needs.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">HR Onboarding</h3>
            <p className="text-muted-foreground">
              We handle all HR paperwork, contracts, and compliance
              requirements.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Workforce Management</h3>
            <p className="text-muted-foreground">
              We manage payroll, benefits, and performance tracking for your
              team.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Payroll & Compliance</h3>
            <p className="text-muted-foreground">
              We handle all payroll processing and ensure regulatory compliance.
            </p>
          </div>
        </div>
      </Container>

      {/* Payment Options Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Flexible Employment Models
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from multiple employment arrangements that work for your
            business
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Project-Based</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hire talent for specific projects with defined deliverables and
                timelines managed by our HR team.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Part-Time</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Flexible part-time arrangements with our HR team handling all
                employment logistics and compliance.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Full-Time</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete full-time employment with comprehensive HR management
                including benefits and career development.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fixed-term contracts with our HR team managing all employment
                aspects and renewal processes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* Enterprise Section */}
      <Container>
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Enterprise HR Solutions for Your Business
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Scale your business with our enterprise-grade HR solutions
                designed for large teams and complex workforce management.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Custom HR Solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Global Compliance & Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Optimized HR Costs</span>
                </div>
              </div>
              <Button size="lg" className="mt-6" asChild>
                <a href="/contact">Learn About Enterprise HR</a>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <p className="text-muted-foreground">
                    Enterprise HR Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container>
        <div className="text-center py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to optimize your HR operations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust our HR management platform
            to handle their global workforce needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Get Started</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Book a Demo</a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
