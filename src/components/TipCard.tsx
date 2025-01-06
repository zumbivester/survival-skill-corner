import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface TipCardProps {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export function TipCard({ title, description, category, icon: Icon }: TipCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-1 flex flex-row items-start gap-4 pb-4">
        <div className="mt-1 h-8 w-8 rounded-lg bg-survival-100 p-2 text-survival-500">
          <Icon className="h-full w-full" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="secondary" className="bg-survival-100 text-survival-500">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}