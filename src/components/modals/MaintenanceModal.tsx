"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Mail } from "lucide-react";

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function MaintenanceModal({
  isOpen,
  onClose,
}: MaintenanceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="h-6 w-6 text-orange-500" />
            System Maintenance
          </DialogTitle>
          <DialogDescription className="text-base">
            We&apos;re currently performing system maintenance to improve your
            experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-3 text-lg">
                  Temporary Service Unavailable
                </h4>
                <p className="text-orange-700 leading-relaxed">
                  Our hiring system is currently under maintenance. Please
                  contact our sales team directly for immediate assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    info@sourcelander.org
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Note:</strong> Our team will respond within 2 hours
                  during business hours (9 AM - 6 PM EST).
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={() => onClose(false)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Got it, thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
