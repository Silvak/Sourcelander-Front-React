"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here would go the real form submission logic
    console.log("Support form data:", formData);

    toast.success(
      "Support request sent successfully! We'll get back to you soon."
    );
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      priority: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#FBFBFC]">
      <Container className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Support Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Need <span className="text-primary">Help?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our support team is here to help you with any questions or issues
            you might have with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Support Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Support Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Support Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Expert Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team is here to help you with any questions or
                      concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Communication</h3>
                    <p className="text-sm text-muted-foreground">
                      Your information is protected with enterprise-grade
                      security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="hidden border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">
                      support@sourcelander.com
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Business Hours:</strong>
                    <br />
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                    <br />
                    Saturday: 10:00 AM - 4:00 PM EST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Subject and Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority Level *
                      </label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - General Question
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Feature Request
                          </SelectItem>
                          <SelectItem value="high">
                            High - Bug Report
                          </SelectItem>
                          <SelectItem value="urgent">
                            Urgent - System Issue
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Detailed Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue or question in detail..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Include any error messages, steps to reproduce, or
                      additional context that might help us assist you better.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12"
                  >
                    {isSubmitting
                      ? "Sending Request..."
                      : "Submit Support Request"}
                  </Button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a
                      href="/policies/privacy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </a>
                    . We&apos;ll use this information to provide you with the
                    best possible support.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
