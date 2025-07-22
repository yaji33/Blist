import { useState } from "react";
import { TwitterProfile } from "../types/profile";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardContent } from "../components/ui/card";
import { ExternalLink, Trash2, User } from "lucide-react";

interface ProfileCardProps {
  profile: TwitterProfile;
  onToggleInteraction: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ProfileCard({
  profile,
  onToggleInteraction,
  onRemove,
}: ProfileCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(profile.id);
    }, 200);
  };

  return (
    <Card
      className={`bg-gradient-card shadow-soft hover:shadow-button transition-all duration-200 ${
        isRemoving ? "animate-scale-out opacity-50" : "animate-fade-in"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                @{profile.username}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile.lastInteractionDate
                  ? `Last: ${new Date(
                      profile.lastInteractionDate
                    ).toLocaleDateString()}`
                  : "No interactions yet"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`interaction-${profile.id}`}
                checked={profile.isInteractedToday}
                onCheckedChange={() => onToggleInteraction(profile.id)}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              <label
                htmlFor={`interaction-${profile.id}`}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Today
              </label>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(profile.profileUrl, "_blank")}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
