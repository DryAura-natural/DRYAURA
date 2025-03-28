import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import CustomerForm from "./BillingForm";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface BillingDialogProps {
  title: string;
  subtitle?: string;
  triggerLabel: string;
  onSuccess?: () => void;
}

const BillingDialog = ({ 
  title, 
  subtitle, 
  triggerLabel, 
  onSuccess 
}: BillingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess?.();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] md:max-w-[600px] bg-white/90 backdrop-blur-sm p-4 md:p-6 mx-2 md:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          {subtitle && (
            <DialogDescription className="text-gray-600">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        <CustomerForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default BillingDialog;