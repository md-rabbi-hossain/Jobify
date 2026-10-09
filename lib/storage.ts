import { useCallback, useEffect, useState } from "react";

/*
 * Browser-only storage (localStorage). There is no database in this project yet,
 * so profile details and activity live in the visitor's own browser.
 * Replace these with API calls when you add a database.
 */

export type ApplicationRecord = {
  jobId?: number;
  title: string;
  company: string;
  date: string;
};

export type PostRecord = {
  title: string;
  company: string;
  location: string;
  category: string;
  date: string;
};

export type Details = {
  headline: string;
  phone: string;
  location: string;
  about: string;
  company: string;
  website: string;
};

export const emptyDetails: Details = {
  headline: "",
  phone: "",
  location: "",
  about: "",
  company: "",
  website: "",
};

export const storageKeys = {
  profile: (email: string) => `jobify:profile:${email}`,
  applications: (email: string) => `jobify:applications:${email}`,
  posts: (email: string) => `jobify:posts:${email}`,
};

export function appendStored<T>(key: string, item: T) {
  try {
    const raw = window.localStorage.getItem(key);
    const list: T[] = raw ? JSON.parse(raw) : [];
    list.unshift(item);
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage can be blocked (private mode, full). Failing silently is fine here.
  }
}

export function useStoredState<T>(key: string | null, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!key) return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore unreadable data
    }
    setLoaded(true);
  }, [key]);

  const save = useCallback(
    (next: T) => {
      setValue(next);
      if (!key) return;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [key]
  );

  return [value, save, loaded] as const;
}
