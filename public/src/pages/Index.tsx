import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddProfileForm } from "../components/AddProfileForm";
import { ProfileCard } from "../components/ProfileCard";
import { StatsCard } from "../components/StatsCard";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F8D347] mb-3 bg-clip-text">
            Blist
          </h1>
          <p className="text-base sm:text-base text-muted-foreground">
            Your smart X interaction tracker • {currentTime}
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
              <Card className="border border-[#DCDCDC] shadow-md">
                <CardHeader className="pb-4 px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                    <List className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="truncate">
                      Your Profiles ({profiles.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 ">
                  <div className="space-y-4 ">
                    {profiles
                      .sort((a, b) => {
                        if (a.isInteractedToday && !b.isInteractedToday)
                          return -1;
                        if (!a.isInteractedToday && b.isInteractedToday)
                          return 1;
                        return a.username.localeCompare(b.username);
                      })
                      .map((profile) => (
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
            <Card className="border border-[#DCDCDC] shadow-md">
              <CardContent className="text-center py-12 px-6">
                <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-3">
                  No profiles yet
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Add your first X profile above to get started with daily
                  interaction tracking.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <RefreshCw className="h-4 w-4 flex-shrink-0" />
            <span>Interactions reset daily at midnight</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
