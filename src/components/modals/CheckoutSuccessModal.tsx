"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Calendar, Users } from "lucide-react";

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectDetails?: {
    totalCost: number;
    totalHours: number;
    itemCount: number;
  };
}

export default function CheckoutSuccessModal({
  isOpen,
  onClose,
  projectDetails,
}: CheckoutSuccessModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Project Team Created Successfully!
          </DialogTitle>
          <DialogDescription>
            Your project team has been assembled and you&apos;ll receive
            confirmation details via email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Success Message */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Project team created successfully!
              </p>
              <p className="text-xs text-green-600">
                Check your email for confirmation and next steps
              </p>
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Success
            </Badge>
          </div>

          {/* Project Summary */}
          {projectDetails && (
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <h4 className="text-sm font-medium">Project Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Team Members:
                  </span>
                  <span className="font-medium">
                    {projectDetails.itemCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Total Hours:
                  </span>
                  <span className="font-medium">
                    {projectDetails.totalHours}h
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-primary">
                  <span>Total Cost:</span>
                  <span>{formatCurrency(projectDetails.totalCost)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">What happens next?</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                • You&apos;ll receive a confirmation email with project details
              </p>
              <p>• Our team will review your project requirements</p>
              <p>• We&apos;ll schedule an initial consultation call</p>
              <p>• Project kickoff will be scheduled within 24-48 hours</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={onClose} className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Check Email
            </Button>
            <Button variant="outline" onClick={onClose}>
              Continue Browsing
            </Button>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-muted-foreground text-center">
            Need immediate assistance?{" "}
            <a href="/contact/support" className="text-primary hover:underline">
              Contact our support team
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
