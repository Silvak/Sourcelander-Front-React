"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { useCartStore, type CartItem } from "@/store/cart/cartStore";
import {
  useProjectStore,
  type ProjectData,
} from "@/store/project/projectStore";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth/authStore";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateHours,
    getTotalCost,
    getTotalHours,
    getItemCount,
    getManagementFee,
  } = useCartStore();

  const { projectData, setProjectData } = useProjectStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleProjectDataChange = (field: keyof ProjectData, value: string) => {
    setProjectData({ [field]: value });
  };

  const handleCreateProjectTeam = async () => {
    if (!isAuthenticated) {
      toast.error("Por favor inicia sesión para crear tu equipo de proyecto");
      return;
    }

    // Validate required fields
    if (!projectData.name.trim()) {
      toast.error("Por favor ingresa un nombre para el proyecto");
      return;
    }

    if (!projectData.description.trim()) {
      toast.error("Por favor ingresa una descripción del proyecto");
      return;
    }

    if (!projectData.startDate) {
      toast.error("Por favor selecciona una fecha de inicio");
      return;
    }

    // Redirect to payments page
    router.push("/payments");
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
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-semibold mb-4">Your team is empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Add freelancers to build your project team and start your project
          </p>
          <Link href="/freelancer">
            <Button className="px-8">Browse Freelancers</Button>
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
            <Link href="/freelancer">
              <Button variant="ghost" size="sm" className="gap-2 w-fit">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Freelancers</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Project Team
              </h1>
              <Badge variant="secondary" className="ml-2">
                {getItemCount()} {getItemCount() === 1 ? "member" : "members"}
              </Badge>
            </div>
          </div>

          {/* Project Details Form */}
          <div className="mb-8 ">
            <Card className="border rounded-none bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="project-name"
                      className="text-sm font-medium"
                    >
                      Project Name *
                    </label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={projectData.name}
                      onChange={(e) =>
                        handleProjectDataChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="start-date" className="text-sm font-medium">
                      Start Date *
                    </label>
                    <Input
                      id="start-date"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) =>
                        handleProjectDataChange("startDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Project Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, goals, and key deliverables..."
                    rows={4}
                    value={projectData.description}
                    onChange={(e) =>
                      handleProjectDataChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">
                      Estimated Duration
                    </label>
                    <Select
                      value={projectData.duration}
                      onValueChange={(value) =>
                        handleProjectDataChange("duration", value)
                      }
                    >
                      <SelectTrigger className="min-h-[40px] w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2-3 months">2-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6+ months">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium">
                      Industry
                    </label>
                    <Select
                      value={projectData.industry}
                      onValueChange={(value) =>
                        handleProjectDataChange("industry", value)
                      }
                    >
                      <SelectTrigger className="min-h-[40px] w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="complexity" className="text-sm font-medium">
                      Project Complexity
                    </label>
                    <Select
                      value={projectData.complexity}
                      onValueChange={(value) =>
                        handleProjectDataChange("complexity", value)
                      }
                    >
                      <SelectTrigger className="min-h-[40px] w-full">
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="complex">Complex</SelectItem>
                        <SelectItem value="very-complex">
                          Very Complex
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">
                    Additional Budget (Optional)
                  </label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter additional budget amount"
                    value={projectData.budget}
                    onChange={(e) =>
                      handleProjectDataChange("budget", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 order-1">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard
                    key={item.freelancer.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateHours={updateHours}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <Card className="lg:sticky lg:top-8">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Total Hours:</span>
                      <span className="font-medium">{getTotalHours()}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Labor Cost:</span>
                      <span>{formatCurrency(getTotalCost())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Project Management:</span>
                      <span>{formatCurrency(getManagementFee())}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Cost:</span>
                      <span className="text-primary">
                        {formatCurrency(getTotalWithManagement())}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateProjectTeam}
                    className="w-full h-12"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Continuar al Pago
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: (freelancerId: string) => void;
  onUpdateHours: (freelancerId: string, hours: number) => void;
}

function CartItemCard({ item, onRemove, onUpdateHours }: CartItemCardProps) {
  const { freelancer, hours, totalCost } = item;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleHoursChange = (newHours: number) => {
    if (newHours >= 1) {
      onUpdateHours(freelancer.id, newHours);
    }
  };

  return (
    <Card className="border rounded-none bg-white">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-4 sm:flex-shrink-0">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback className="text-lg font-medium">
                {freelancer.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 sm:hidden">
              <h3 className="font-semibold text-lg truncate">
                {freelancer.name}
              </h3>
              <p className="text-muted-foreground truncate">
                {freelancer.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-sm">
                  {formatCurrency(freelancer.hourlyRate)}/h
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ⭐ {freelancer.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 hidden sm:block">
                <h3 className="font-semibold text-lg truncate">
                  {freelancer.name}
                </h3>
                <p className="text-muted-foreground truncate">
                  {freelancer.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-sm">
                    {formatCurrency(freelancer.hourlyRate)}/h
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ⭐ {freelancer.rating}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(freelancer.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Hours:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleHoursChange(hours - 1)}
                      disabled={hours <= 8}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={hours}
                      onChange={(e) =>
                        handleHoursChange(parseInt(e.target.value) || 8)
                      }
                      className="w-20 h-8 text-center text-sm"
                      min="8"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleHoursChange(hours + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <div className="text-lg font-semibold text-primary">
                    {formatCurrency(totalCost)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
