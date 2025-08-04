import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TermsOfServicePage() {
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
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These terms govern your use of our talent management platform. By
              using our services, you agree to these terms and conditions.
            </p>
          </div>
        </div>
      </Container>

      {/* Terms Content */}
      <ContainerSmall>
        <div className="space-y-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📋</span>
                </div>
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using Sourcelander's talent management
                platform, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                These terms apply to all users of the platform, including
                employers, freelancers, and any other users who access or use
                our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔧</span>
                </div>
                Description of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sourcelander provides a comprehensive talent management platform
                that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Talent sourcing and recruitment services</li>
                <li>HR management and compliance support</li>
                <li>Payroll processing and benefits administration</li>
                <li>Global workforce management solutions</li>
                <li>Project-based and full-time employment arrangements</li>
                <li>Professional development and training resources</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">👤</span>
                </div>
                User Accounts and Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To access certain features of our platform, you must create an
                account. You agree to provide accurate, current, and complete
                information during registration and to update such information
                to keep it accurate, current, and complete.
              </p>
              <p className="text-muted-foreground">
                You are responsible for safeguarding your account credentials
                and for all activities that occur under your account. You must
                notify us immediately of any unauthorized use of your account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">💰</span>
                </div>
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Payment terms vary based on the services you use:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong>Service Fees:</strong> We charge fees for our talent
                  management services
                </li>
                <li>
                  <strong>Payment Schedule:</strong> Payments are typically
                  processed monthly or per project
                </li>
                <li>
                  <strong>Late Payments:</strong> Late payments may incur
                  additional charges
                </li>
                <li>
                  <strong>Refunds:</strong> Refund policies vary by service type
                </li>
                <li>
                  <strong>Taxes:</strong> All fees are subject to applicable
                  taxes
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔒</span>
                </div>
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection and use of
                personal information is governed by our Privacy Policy, which is
                incorporated into these terms by reference.
              </p>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your data
                and comply with applicable data protection laws and regulations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🚫</span>
                </div>
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You agree not to use our platform for any unlawful purpose or in
                any way that could damage, disable, overburden, or impair our
                services.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Harassing, abusing, or harming other users</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using automated tools to access our services</li>
                <li>Sharing false or misleading information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">⚖️</span>
                </div>
                Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our platform and its original content, features, and
                functionality are owned by Sourcelander and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                You retain ownership of any content you submit to our platform,
                but you grant us a license to use, modify, and distribute such
                content in connection with our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🛡️</span>
                </div>
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, Sourcelander shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages, including without limitation, loss of
                profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-muted-foreground">
                Our total liability to you for any claims arising from these
                terms or your use of our services shall not exceed the amount
                you paid us in the twelve months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🔧</span>
                </div>
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We strive to provide reliable and uninterrupted service, but we
                cannot guarantee that our platform will be available at all
                times. We may need to perform maintenance, updates, or other
                changes that could temporarily affect service availability.
              </p>
              <p className="text-muted-foreground">
                We will provide reasonable notice for scheduled maintenance and
                will work to minimize any service disruptions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📅</span>
                </div>
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You may terminate your account at any time by contacting our
                support team. We may terminate or suspend your account
                immediately, without prior notice, for conduct that we believe
                violates these terms or is harmful to other users or our
                platform.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your right to use our services will cease
                immediately. We may retain certain information as required by
                law or for legitimate business purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🌍</span>
                </div>
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance
                with the laws of the jurisdiction where Sourcelander is
                incorporated, without regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Any disputes arising from these terms or your use of our
                services shall be resolved through binding arbitration in
                accordance with the rules of the relevant arbitration
                association.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📝</span>
                </div>
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes by posting the new terms on
                our platform and updating the "Last Updated" date.
              </p>
              <p className="text-muted-foreground">
                Your continued use of our services after any changes constitutes
                acceptance of the new terms. If you do not agree to the new
                terms, you should discontinue use of our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📞</span>
                </div>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@sourcelander.com</p>
                <p>Address: 123 Business Street, Tech City, TC 12345</p>
                <p>Phone: +1 (555) 123-4567</p>
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
