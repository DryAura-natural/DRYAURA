import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import CustomerForm from "./BillingForm";
import { Pencil } from "lucide-react";

interface BillingDialogProps {
  title: string;
  subtitle?: string;
  triggerLabel: string;
  onSuccess: () => void;
}

const BillingDialog = ({ title, subtitle, triggerLabel, onSuccess }: BillingDialogProps) => {
  const dialogStyles = {
    maxHeight: '80vh',
    overflowY: 'auto',
    padding: '20px',
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline"><Pencil className="mr-2 h-4 w-4" />{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] md:max-w-[600px] bg-white/90 backdrop-blur-sm p-4 md:p-6 mx-2 md:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && (
            <DialogDescription className="text-gray-600">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        <CustomerForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default BillingDialog;
