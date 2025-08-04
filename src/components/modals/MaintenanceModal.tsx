"use client";

import { Button } from "@/components/ui/button";
import { Globe, X } from "lucide-react";

interface MaintenanceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MaintenanceModal({
  open,
  onClose,
}: MaintenanceModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center relative border border-gray-200">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center gap-4">
          <Globe className="w-10 h-10 text-primary mb-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Scheduled Maintenance
          </h2>
          <p className="text-gray-600 text-center leading-relaxed">
            We&apos;re currently performing scheduled maintenance to improve
            your experience.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full">
            <p className="text-sm text-blue-800">
              💡 We&apos;ll be back soon with enhanced features and better
              performance!
            </p>
          </div>
          <Button onClick={onClose} className="mt-4 w-full">
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
}
