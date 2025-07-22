import { TwitterProfile } from "../types/profile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CheckCircle, Users, Calendar } from "lucide-react";

interface StatsCardProps {
  profiles: TwitterProfile[];
}

export function StatsCard({ profiles }: StatsCardProps) {
  const totalProfiles = profiles.length;
  const interactedToday = profiles.filter((p) => p.isInteractedToday).length;
  const completionRate =
    totalProfiles > 0 ? Math.round((interactedToday / totalProfiles) * 100) : 0;

  return (
    <Card className="border border-[#DCDCDC] shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5 text-primary" />
          Today's Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-[#FEF3C7] rounded-full mx-auto mb-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totalProfiles}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-[#FEF3C7] rounded-full mx-auto mb-2">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {interactedToday}
            </p>
            <p className="text-sm text-muted-foreground">Done</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-[#FEF3C7] rounded-full mx-auto mb-2">
              <span className="text-sm font-bold text-accent">%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {completionRate}%
            </p>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
        </div>

        {totalProfiles > 0 && (
          <div className="mt-4">
            <div className="w-full bg-[#FFFBEB] rounded-full h-2">
              <div
                className="bg-[#F8D347] h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
