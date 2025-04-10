
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, DollarSign, Shield } from "lucide-react";

interface PolicyCardProps {
  type: string;
  provider: string;
  coverage: string;
  premium: string;
  renewalDate: string;
  status: "active" | "pending" | "expired";
}

const statusColors = {
  active: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  expired: "bg-red-100 text-red-800 hover:bg-red-200"
};

const statusLabels = {
  active: "Active",
  pending: "Pending",
  expired: "Expired"
};

const PolicyCard = ({
  type,
  provider,
  coverage,
  premium,
  renewalDate,
  status
}: PolicyCardProps) => {
  return (
    <Card className="card-hover overflow-hidden border-t-4 border-t-insure-teal">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{type}</CardTitle>
            <CardDescription>{provider}</CardDescription>
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-500">Coverage</span>
          </div>
          <div className="font-medium text-right">{coverage}</div>
          
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-500">Premium</span>
          </div>
          <div className="font-medium text-right">{premium}</div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-500">Renewal</span>
          </div>
          <div className="font-medium text-right">{renewalDate}</div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          View Details
        </Button>
        <Button variant="default" size="sm" className="bg-insure-teal hover:bg-insure-teal/90">
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PolicyCard;
