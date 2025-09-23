import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description:
        "Join our frontend team to build the next generation of our platform using React, TypeScript, and modern web technologies.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      description:
        "Lead product strategy and roadmap for our core platform, working closely with engineering and design teams.",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote / London",
      type: "Full-time",
      description:
        "Create intuitive and beautiful user experiences that help connect talent with opportunities worldwide.",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Berlin",
      type: "Full-time",
      description:
        "Build and maintain our cloud infrastructure, ensuring scalability, security, and reliability.",
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Austin",
      type: "Full-time",
      description:
        "Help our clients succeed by providing exceptional support and building long-term relationships.",
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Remote / Toronto",
      type: "Full-time",
      description:
        "Analyze user behavior and market trends to drive data-informed decisions across the platform.",
    },
  ];

  const benefits = [
    {
      icon: "🏠",
      title: "Remote First",
      description:
        "Work from anywhere in the world with flexible hours and async collaboration.",
    },
    {
      icon: "💰",
      title: "Competitive Salary",
      description:
        "Market-leading compensation with equity options and performance bonuses.",
    },
    {
      icon: "🏥",
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, mental health support, and wellness stipend.",
    },
    {
      icon: "📚",
      title: "Learning & Development",
      description:
        "Annual learning budget, conference attendance, and skill development programs.",
    },
    {
      icon: "🌴",
      title: "Unlimited PTO",
      description:
        "Take the time you need to recharge with our unlimited vacation policy.",
    },
    {
      icon: "💻",
      title: "Equipment & Setup",
      description:
        "Top-tier equipment and home office setup allowance to optimize your workspace.",
    },
  ];

  const values = [
    {
      title: "Innovation First",
      description:
        "We embrace new technologies and creative solutions to solve complex problems.",
      image: "/innovation.jpg",
    },
    {
      title: "Global Mindset",
      description:
        "We think globally and act locally, building bridges across cultures and time zones.",
      image: "/global-mindset.jpg",
    },
    {
      title: "Continuous Growth",
      description:
        "We invest in our people's growth and celebrate learning from both successes and failures.",
      image: "/continuous-growth.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 -z-10" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                Join Our Team
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Build the Future of{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Global Work
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Join a passionate team of innovators who are reshaping how the
                  world works. We&apos;re building the platform that connects
                  exceptional talent with amazing opportunities.
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  asChild
                >
                  <a href="#open-positions">View Open Positions</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Remote-First</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/team-collaboration.jpg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </Container>
      </div>

      {/* Company Values */}
      <ContainerSmall>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Our Values Drive Everything We Do
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;re not just building a platform; we&apos;re creating a
            culture that empowers people to do their best work and make a
            meaningful impact.
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <div className="relative h-56">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* Benefits & Perks */}
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why You&apos;ll Love Working Here
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in taking care of our team so they can do their best work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* Open Positions */}
      <Container id="open-positions">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <p className="text-lg text-muted-foreground">
            Find your next opportunity and help us shape the future of work
          </p>
        </div>

        <div className="space-y-6">
          {openPositions.map((position) => (
            <Card
              key={position.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {position.title}
                      </h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {position.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>📍 {position.location}</span>
                      <span>🏢 {position.department}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {position.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button asChild>
                      <Link
                        href={`/contact?position=${encodeURIComponent(
                          position.title,
                        )}`}
                      >
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don&apos;t see a position that fits? We&apos;re always looking for
            exceptional talent.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact?subject=General Application">
              Send Us Your Resume
            </Link>
          </Button>
        </div>
      </Container>

      {/* Application Process */}
      <ContainerSmall>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Hiring Process</h2>
          <p className="text-lg text-muted-foreground mb-12">
            We&apos;ve designed our process to be transparent, efficient, and
            respectful of your time
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 border rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2">1. Application</h3>
              <p className="text-sm text-muted-foreground">
                Submit your application and we&apos;ll review it within 48 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 border rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">2. Initial Call</h3>
              <p className="text-sm text-muted-foreground">
                30-minute conversation to get to know each other better
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 border rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold mb-2">3. Technical Round</h3>
              <p className="text-sm text-muted-foreground">
                Role-specific assessment or portfolio review
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/50 border rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">4. Final Interview</h3>
              <p className="text-sm text-muted-foreground">
                Meet the team and discuss how we can grow together
              </p>
            </div>
          </div>
        </div>
      </ContainerSmall>

      {/* Team Culture */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/team-culture.jpg"
              alt="Team working together"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">
              A Culture Built on{" "}
              <span className="text-primary">Collaboration</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold mb-2">Diverse & Inclusive</h3>
                  <p className="text-muted-foreground">
                    We celebrate different perspectives and backgrounds,
                    creating an environment where everyone can thrive and
                    contribute their unique talents.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Transparent Communication
                  </h3>
                  <p className="text-muted-foreground">
                    Open communication is at the heart of our culture. We share
                    knowledge, give honest feedback, and make decisions
                    together.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold mb-2">Work-Life Balance</h3>
                  <p className="text-muted-foreground">
                    We believe that great work happens when people are
                    well-rested and fulfilled. That&apos;s why we prioritize
                    flexibility and personal well-being.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building the future of work. Whether you&apos;re just
            starting your career or you&apos;re a seasoned professional,
            we&apos;d love to hear from you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <a href="#open-positions">Browse Positions</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
