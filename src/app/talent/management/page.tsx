import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TalentManagementPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              Talent Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Hire top talent <span className="text-primary">anywhere</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find the right candidates for your needs no matter where they are
              in the world. Build compliant, remote teams across 170+ countries
              with our comprehensive talent management platform.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="/contact">Get Started</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-muted-foreground">Global Talent Network</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Key Features Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Scale your team flexibly without opening entities
          </h2>
          <p className="text-lg text-muted-foreground">
            Onboard the right candidates for your needs no matter where they
            are. Build compliant, remote teams across 170+ countries.
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <CardTitle>Take the guess work out of compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build your global team compliantly. We assist you in keeping
                compliance at the forefront of your long term goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <CardTitle>Receive expert local advice</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                By partnering with local providers, we ensure that you have
                local employment advisors keeping you up to date with current
                regulations.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle>Provide a great employee experience</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Offer localized benefits packages that match the needs of
                specific employees. Your team will receive a seamless process
                from onboarding to payments.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <CardTitle>Retain your IP Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We ensure that Intellectual Property created by the team remains
                with you. Your team will have the right protection it needs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Centralized Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage all your talent operations under one roof. Say goodbye to
                spreadsheet chaos and disconnected processes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <CardTitle>Global Payroll Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pay your entire global workforce in 150+ countries and 50+ local
                currencies with one click.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* How it Works Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process makes hiring global talent simple and
            compliant
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Evaluate hiring costs
            </h3>
            <p className="text-muted-foreground">
              Estimate the cost to make a hire and request the employee quote
              using our compliance-first platform.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Sign compliant contracts
            </h3>
            <p className="text-muted-foreground">
              Sign globally compliant contracts and review the details of your
              new employee with full legal protection.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Onboard quickly</h3>
            <p className="text-muted-foreground">
              We work with you and the employee to prepare for their new role
              and help you familiarize yourself with our platform.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Manage payments</h3>
            <p className="text-muted-foreground">
              Simplify your invoice and payment operations for all employees
              with just a few clicks, all under one roof.
            </p>
          </div>
        </div>
      </Container>

      {/* Platform Features Section */}
      <ContainerSmall>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Simplify your talent operations from start to finish
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage global talent in one comprehensive
            platform
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Consolidate global reporting
                </h3>
                <p className="text-muted-foreground">
                  Say bye to spreadsheets and hi to real-time insights. Slice
                  and dice talent data for your entire workforce and create
                  reports in minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Automate talent changes</h3>
                <p className="text-muted-foreground">
                  Sync talent changes automatically from your HRIS/HCM across
                  all countries for fast and accurate preparation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Approve cycles in minutes
                </h3>
                <p className="text-muted-foreground">
                  See what changes need your attention at a glance so you can
                  check and approve talent changes in record time.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Validate outputs with ease
                </h3>
                <p className="text-muted-foreground">
                  Find and fix potential errors in your talent cycles. We
                  highlight anomalies so your teams spend less time
                  triple-checking manually.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Make cross-border payments
                </h3>
                <p className="text-muted-foreground">
                  Pay your global workforce in their local currencies without
                  the high FX fees and hassle of managing multiple local bank
                  accounts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Centralized documentation
                </h3>
                <p className="text-muted-foreground">
                  From contracts and liabilities to performance reviews - store
                  and share all of your documents securely on one platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container>
        <div className="text-center py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to see what we can do for you?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform to manage their
            global talent and build compliant, high-performing teams worldwide.
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
