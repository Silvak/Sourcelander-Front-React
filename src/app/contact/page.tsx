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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    companyName: "",
    phoneNumber: "",
    reason: "",
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
    console.log("Form data:", formData);

    setIsSubmitting(false);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      companyName: "",
      phoneNumber: "",
      reason: "",
      message: "",
    });
  };

  return (
    <div>
      <Container className="py-12 min-h-[100vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Message Section */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-primary uppercase text-sm mb-4">
                Get in Touch
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contact Our <span className="text-primary">Team</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We&apos;d love to hear from you. Send us your questions about
                Sourcelander and we&apos;ll schedule a time to learn and share
                more with you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team is here to help you with any questions or concerns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold">Secure Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Your information is protected with enterprise-grade
                    security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Business Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="jobTitle" className="text-sm font-medium">
                    Job Title *
                  </label>
                  <Input
                    id="jobTitle"
                    type="text"
                    placeholder="Your current role"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    Company Name *
                  </label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Contact Reason */}
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason for Contacting Us *
                </label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => handleInputChange("reason", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="partnership">
                      Partnership or Collaboration
                    </SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="feedback">
                      Feedback or Suggestions
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  For technical or billing issues, please contact support.
                </p>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  className="min-h-[100px]"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>

              {/* Privacy Policy */}
              <p className="text-xs text-muted-foreground text-center">
                By submitting you agree to our{" "}
                <a
                  href="/policies/privacy"
                  className="text-primary hover:underline"
                >
                  privacy policy
                </a>{" "}
                and to receive information from Sourcelander related to our
                products. You can unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
