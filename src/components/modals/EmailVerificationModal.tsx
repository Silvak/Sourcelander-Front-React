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
import { Mail, CheckCircle } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
  onVerified,
}: EmailVerificationModalProps) {
  const handleClose = () => {
    onClose();
    // Automatically trigger the verified callback when modal is closed
    onVerified();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Verification Required
          </DialogTitle>
          <DialogDescription>
            Please verify your email address to complete your purchase and
            receive project updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email Sent Confirmation */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Verification email sent!
              </p>
              <p className="text-xs text-green-600">
                Please check your email and click the verification link
              </p>
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Sent
            </Badge>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Check your email inbox for the verification link</p>
            <p>• Click the verification link in the email</p>
            <p>• You can now close this modal to continue</p>
          </div>

          {/* Action Button */}
          <Button onClick={handleClose} className="w-full">
            <CheckCircle className="h-4 w-4 mr-2" />
            Close & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
