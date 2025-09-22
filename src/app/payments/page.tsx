"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  ArrowLeft,
  Lock,
  Calendar,
  User,
  Shield,
} from "lucide-react";
import { useCartStore } from "@/store/cart/cartStore";
import { useAuthStore } from "@/store/auth/authStore";
import { toast } from "sonner";
import Link from "next/link";
import Container from "@/components/common/Container";
import PaymentErrorModal from "@/components/modals/PaymentErrorModal";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

export default function PaymentsPage() {
  const { items, getTotalCost, getTotalHours, getItemCount, getManagementFee } =
    useCartStore();

  const { isAuthenticated } = useAuthStore();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handlePaymentDataChange = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    handlePaymentDataChange("cardNumber", formatted);
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    handlePaymentDataChange("expiryDate", formatted);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error("Por favor inicia sesión para continuar con el pago");
      return;
    }

    // Validar campos requeridos
    if (!paymentData.cardNumber.replace(/\s/g, "")) {
      toast.error("Por favor ingresa el número de tarjeta");
      return;
    }

    if (!paymentData.expiryDate) {
      toast.error("Por favor ingresa la fecha de expiración");
      return;
    }

    if (!paymentData.cvv) {
      toast.error("Por favor ingresa el CVV");
      return;
    }

    if (!paymentData.cardholderName.trim()) {
      toast.error("Por favor ingresa el nombre del titular");
      return;
    }

    if (!paymentData.billingAddress.trim()) {
      toast.error("Por favor ingresa la dirección de facturación");
      return;
    }

    if (!paymentData.city.trim()) {
      toast.error("Por favor ingresa la ciudad");
      return;
    }

    if (!paymentData.zipCode.trim()) {
      toast.error("Por favor ingresa el código postal");
      return;
    }

    if (!paymentData.country.trim()) {
      toast.error("Por favor ingresa el país");
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      // Simular error de pago
      setShowErrorModal(true);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTotalWithManagement = () => {
    return getTotalCost() + getManagementFee();
  };

  if (items.length === 0) {
    return (
      <Container className="min-h-[100vh]">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-12 px-4">
          <CreditCard className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-semibold mb-4">
            No hay items en el carrito
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Agrega freelancers a tu equipo de proyecto para continuar con el
            pago
          </p>
          <Link href="/freelancer">
            <Button className="px-8">Explorar Freelancers</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="min-h-[100vh]">
        <div className="py-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="gap-2 w-fit">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Volver al Carrito</span>
                <span className="sm:hidden">Volver</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Información de Pago
              </h1>
              <Badge variant="secondary" className="ml-2">
                {getItemCount()} {getItemCount() === 1 ? "miembro" : "miembros"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 order-1">
              <Card className="border rounded-none bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Información de la Tarjeta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Card Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="card-number"
                        className="text-sm font-medium"
                      >
                        Número de Tarjeta *
                      </label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        maxLength={19}
                        className="font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="expiry-date"
                          className="text-sm font-medium"
                        >
                          Fecha de Expiración *
                        </label>
                        <Input
                          id="expiry-date"
                          placeholder="MM/AA"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            handleExpiryDateChange(e.target.value)
                          }
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cvv" className="text-sm font-medium">
                          CVV *
                        </label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            handlePaymentDataChange(
                              "cvv",
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="cardholder-name"
                        className="text-sm font-medium"
                      >
                        Nombre del Titular *
                      </label>
                      <Input
                        id="cardholder-name"
                        placeholder="Como aparece en la tarjeta"
                        value={paymentData.cardholderName}
                        onChange={(e) =>
                          handlePaymentDataChange(
                            "cardholderName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dirección de Facturación
                    </h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="billing-address"
                        className="text-sm font-medium"
                      >
                        Dirección *
                      </label>
                      <Input
                        id="billing-address"
                        placeholder="Calle y número"
                        value={paymentData.billingAddress}
                        onChange={(e) =>
                          handlePaymentDataChange(
                            "billingAddress",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-medium">
                          Ciudad *
                        </label>
                        <Input
                          id="city"
                          placeholder="Ciudad"
                          value={paymentData.city}
                          onChange={(e) =>
                            handlePaymentDataChange("city", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="zip-code"
                          className="text-sm font-medium"
                        >
                          Código Postal *
                        </label>
                        <Input
                          id="zip-code"
                          placeholder="12345"
                          value={paymentData.zipCode}
                          onChange={(e) =>
                            handlePaymentDataChange("zipCode", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        País *
                      </label>
                      <Input
                        id="country"
                        placeholder="País"
                        value={paymentData.country}
                        onChange={(e) =>
                          handlePaymentDataChange("country", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">
                        Información Segura
                      </p>
                      <p className="text-blue-700">
                        Tu información de pago está protegida con encriptación
                        SSL de 256 bits. No almacenamos los datos de tu tarjeta
                        de crédito.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-2">
              <Card className="lg:sticky lg:top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Horas:</span>
                      <span className="font-medium">{getTotalHours()}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Costo de Mano de Obra:</span>
                      <span>{formatCurrency(getTotalCost())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gestión de Proyecto:</span>
                      <span>{formatCurrency(getManagementFee())}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total a Pagar:</span>
                      <span className="text-primary">
                        {formatCurrency(getTotalWithManagement())}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-12"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Pagar Ahora
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Al hacer clic en &quot;Pagar Ahora&quot;, aceptas nuestros{" "}
                    <Link
                      href="/policies/terms"
                      className="text-primary hover:underline"
                    >
                      Términos de Servicio
                    </Link>{" "}
                    y{" "}
                    <Link
                      href="/policies/privacy"
                      className="text-primary hover:underline"
                    >
                      Política de Privacidad
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>

      <PaymentErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onRetry={() => setShowErrorModal(false)}
      />
    </>
  );
}
