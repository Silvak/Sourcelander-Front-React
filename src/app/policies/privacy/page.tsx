import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicyPage() {
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
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the
              security of your personal information. This policy explains how we
              collect, use, and safeguard your data.
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
                  <span className="text-primary text-sm">📋</span>
                </div>
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when
                you create an account, submit a job posting, or contact us for
                support. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Name, email address, and contact information</li>
                <li>Professional background and work history</li>
                <li>Payment and billing information</li>
                <li>Communication preferences and settings</li>
                <li>Profile information and portfolio details</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔍</span>
                </div>
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and
                improve our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Connect employers with qualified freelancers</li>
                <li>Process payments and manage billing</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates and notifications</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure compliance with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔒</span>
                </div>
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security
                measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🌐</span>
                </div>
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>
                  With trusted service providers who assist in our operations
                </li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">⚙️</span>
                </div>
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Control your privacy settings and preferences</li>
                <li>Export your data in a portable format</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📅</span>
                </div>
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                policy. We may retain certain information for longer periods
                when required by law or for legitimate business purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🌍</span>
                </div>
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your data in accordance with applicable
                laws.
              </p>
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
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
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
