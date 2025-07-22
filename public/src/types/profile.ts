export interface TwitterProfile {
  id: string;
  username: string;
  profileUrl: string;
  lastInteractionDate: string | null;
  isInteractedToday: boolean;
  createdAt: string;
}

export interface StorageData {
  profiles: TwitterProfile[];
  lastResetDate: string;
}
