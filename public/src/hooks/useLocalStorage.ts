import { useState, useEffect } from "react";
import { StorageData, TwitterProfile } from "../types/profile";

const STORAGE_KEY = "bless-list-data";

const defaultData: StorageData = {
  profiles: [],
  lastResetDate: new Date().toDateString(),
};

export function useLocalStorage() {
  const [data, setData] = useState<StorageData>(defaultData);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setData(parsedData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [data]);

  // Check if we need to reset daily interactions
  useEffect(() => {
    const today = new Date().toDateString();
    if (data.lastResetDate !== today) {
      setData((prev) => ({
        ...prev,
        profiles: prev.profiles.map((profile) => ({
          ...profile,
          isInteractedToday: false,
        })),
        lastResetDate: today,
      }));
    }
  }, [data.lastResetDate]);

  const addProfile = (profileUrl: string) => {
    const username = extractUsernameFromUrl(profileUrl);
    if (!username) return false;

    // Check if profile already exists
    const exists = data.profiles.some(
      (p) => p.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) return false;

    const newProfile: TwitterProfile = {
      id: crypto.randomUUID(),
      username,
      profileUrl: normalizeProfileUrl(profileUrl),
      lastInteractionDate: null,
      isInteractedToday: false,
      createdAt: new Date().toISOString(),
    };

    setData((prev) => ({
      ...prev,
      profiles: [...prev.profiles, newProfile],
    }));

    return true;
  };

  const removeProfile = (id: string) => {
    setData((prev) => ({
      ...prev,
      profiles: prev.profiles.filter((p) => p.id !== id),
    }));
  };

  const toggleInteraction = (id: string) => {
    setData((prev) => ({
      ...prev,
      profiles: prev.profiles.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              isInteractedToday: !profile.isInteractedToday,
              lastInteractionDate: !profile.isInteractedToday
                ? new Date().toISOString()
                : profile.lastInteractionDate,
            }
          : profile
      ),
    }));
  };

  return {
    profiles: data.profiles,
    addProfile,
    removeProfile,
    toggleInteraction,
  };
}

function extractUsernameFromUrl(url: string): string | null {
  try {
    // Handle various Twitter/X URL formats
    const patterns = [
      /(?:twitter\.com|x\.com)\/([^\/\?#]+)/i,
      /^@?([a-zA-Z0-9_]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1].replace("@", "");
      }
    }

    return null;
  } catch {
    return null;
  }
}

function normalizeProfileUrl(input: string): string {
  const username = extractUsernameFromUrl(input);
  if (!username) return input;

  return `https://x.com/${username}`;
}
