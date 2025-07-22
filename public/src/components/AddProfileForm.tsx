import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, Twitter } from "lucide-react";

interface AddProfileFormProps {
  onAddProfile: (url: string) => boolean;
}

export function AddProfileForm({ onAddProfile }: AddProfileFormProps) {
  const [url, setUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      console.log(
        "URL Required: Please enter a Twitter/X profile URL or username."
      );
      return;
    }

    setIsAdding(true);

    const success = onAddProfile(url.trim());

    if (success) {
      setUrl("");
      console.log(
        "Profile Added: Twitter profile has been added to your list."
      );
    } else {
      console.log(
        "Unable to Add Profile: Invalid URL or profile already exists."
      );
    }

    setIsAdding(false);
  };

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Twitter className="h-5 w-5 text-primary" />
          Add Twitter Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter Twitter/X URL or @username"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-background/50"
            disabled={isAdding}
          />
          <Button type="submit" className="w-full" disabled={isAdding}>
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? "Adding..." : "Add Profile"}
          </Button>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>Supported formats:</p>
          <ul className="mt-1 space-y-1">
            <li>• https://x.com/username</li>
            <li>• https://twitter.com/username</li>
            <li>• @username</li>
            <li>• username</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
