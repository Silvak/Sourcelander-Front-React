import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CookiesPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Container>
        <div className="py-12">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Legal Information
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookies <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We use cookies and similar technologies to enhance your experience
              on our platform. This policy explains how we use these
              technologies and your choices regarding them.
            </p>
          </div>
        </div>
      </Container>

      {/* Policy Content */}
      <ContainerSmall>
        <div className="space-y-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🍪</span>
                </div>
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our platform.
              </p>
              <p className="text-muted-foreground">
                We use cookies and similar technologies such as web beacons,
                pixel tags, and local storage to enhance your browsing
                experience and provide personalized services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔧</span>
                </div>
                Types of Cookies We Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-muted-foreground mb-2">
                  These cookies are necessary for the website to function
                  properly. They enable basic functions such as page navigation,
                  access to secure areas, and form submissions.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Authentication and security cookies</li>
                  <li>Session management cookies</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Performance Cookies</h4>
                <p className="text-muted-foreground mb-2">
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Analytics and usage statistics</li>
                  <li>Error tracking and debugging</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Functional Cookies</h4>
                <p className="text-muted-foreground mb-2">
                  These cookies enable enhanced functionality and
                  personalization, such as remembering your preferences and
                  settings.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Language and region preferences</li>
                  <li>User interface customization</li>
                  <li>Form data retention</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-muted-foreground mb-2">
                  These cookies are used to track visitors across websites to
                  display relevant and engaging advertisements.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Advertising and retargeting</li>
                  <li>Social media integration</li>
                  <li>Campaign effectiveness tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📊</span>
                </div>
                How We Use Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>To provide and maintain our services</li>
                <li>To authenticate users and prevent fraud</li>
                <li>To remember your preferences and settings</li>
                <li>
                  To analyze how our website is used and improve performance
                </li>
                <li>To provide personalized content and recommendations</li>
                <li>To deliver relevant advertisements</li>
                <li>To ensure security and prevent abuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🌐</span>
                </div>
                Third-Party Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may use third-party services that place cookies on your
                device. These services help us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Analyze website traffic and user behavior</li>
                <li>Provide customer support and live chat</li>
                <li>Process payments securely</li>
                <li>Deliver targeted advertisements</li>
                <li>Integrate social media features</li>
              </ul>
              <p className="text-muted-foreground">
                These third-party services have their own privacy policies and
                cookie practices. We encourage you to review their policies for
                more information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">⚙️</span>
                </div>
                Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Browser Settings:</strong> Most browsers allow you to
                  control cookies through their settings
                </li>
                <li>
                  <strong>Cookie Consent:</strong> We provide cookie consent
                  options when you first visit our site
                </li>
                <li>
                  <strong>Opt-out Tools:</strong> You can opt out of certain
                  types of cookies through our preferences center
                </li>
                <li>
                  <strong>Third-party Opt-outs:</strong> Many third-party
                  services provide their own opt-out mechanisms
                </li>
              </ul>
              <p className="text-muted-foreground">
                Please note that disabling certain cookies may affect the
                functionality of our website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📱</span>
                </div>
                Mobile Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                When you use our mobile applications, we may use similar
                technologies such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Device identifiers and advertising IDs</li>
                <li>Local storage and app data</li>
                <li>Analytics and crash reporting</li>
                <li>Push notification tokens</li>
              </ul>
              <p className="text-muted-foreground">
                These technologies serve similar purposes to cookies and are
                subject to the same privacy protections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📅</span>
                </div>
                Cookie Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Cookies have different lifespans:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Session Cookies:</strong> Temporary cookies that are
                  deleted when you close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Cookies that remain on
                  your device for a set period or until manually deleted
                </li>
                <li>
                  <strong>First-party Cookies:</strong> Set by our website and
                  typically last longer
                </li>
                <li>
                  <strong>Third-party Cookies:</strong> Set by external services
                  and may have different expiration periods
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📞</span>
                </div>
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies or this
                policy, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: privacy@sourcelander.com</p>
                <p>
                  Address: 1032 E Brandon Blvd #7182, Brandon, FL 33511 (USA)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContainerSmall>

      {/* Last Updated */}
      <Container>
        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Container>
    </div>
  );
}
