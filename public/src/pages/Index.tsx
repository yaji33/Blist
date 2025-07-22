import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddProfileForm } from "../components/AddProfileForm";
import { ProfileCard } from "../components/ProfileCard";
import { StatsCard } from "../components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { List, RefreshCw } from "lucide-react";

const Index = () => {
  const { profiles, addProfile, removeProfile, toggleInteraction } =
    useLocalStorage();

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-gradient-subtle ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
            BlessList
          </h1>
          <p className="text-muted-foreground">
            Daily Twitter interaction tracker • {currentTime}
          </p>
        </div>
        <div className="mb-8">
          <StatsCard profiles={profiles} />
        </div>
        <div className="mb-8">
          <AddProfileForm onAddProfile={addProfile} />
        </div>
        <div className="space-y-6">
          {profiles.length > 0 ? (
            <>
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <List className="h-5 w-5 text-primary" />
                    Your Profiles ({profiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profiles.map((profile) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        onToggleInteraction={toggleInteraction}
                        onRemove={removeProfile}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-gradient-card shadow-soft">
              <CardContent className="text-center py-12">
                <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No profiles yet
                </h3>
                <p className="text-muted-foreground">
                  Add your first Twitter profile above to get started with daily
                  interaction tracking.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Interactions reset daily at midnight
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
