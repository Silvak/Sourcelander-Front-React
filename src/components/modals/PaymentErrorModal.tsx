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
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface PaymentErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function PaymentErrorModal({
  isOpen,
  onClose,
  onRetry,
}: PaymentErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Error en el Pago
          </DialogTitle>
          <DialogDescription>
            Ocurrió un problema con el método de pago. Por favor, revisa la
            información e intenta nuevamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Message */}
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Error en el procesamiento del pago
              </p>
              <p className="text-xs text-red-600">
                Verifica los datos de tu tarjeta y vuelve a intentar
              </p>
            </div>
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              Error
            </Badge>
          </div>

          {/* Possible Causes */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Posibles causas:</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Información de tarjeta incorrecta o incompleta</p>
              <p>• Tarjeta expirada o bloqueada</p>
              <p>• Fondos insuficientes</p>
              <p>• Problema temporal con el procesador de pagos</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar Nuevamente
            </Button>
            <Link href="/cart" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Carrito
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-muted-foreground text-center">
            ¿Necesitas ayuda?{" "}
            <a href="/contact/support" className="text-primary hover:underline">
              Contacta a nuestro equipo de soporte
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
