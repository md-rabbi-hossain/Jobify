"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { JobData } from "@/data";
import type { Job, JobCategory } from "@/data";

export type AppContextType = {
  jobData: JobCategory[];
  allJobs: Job[];
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const value = useMemo<AppContextType>(
    () => ({
      jobData: JobData,
      allJobs: JobData.flatMap((category) => category.jobs),
    }),
    []
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Use this instead of useContext(AppContext) so you never get `undefined`. */
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside <AppWrapper>");
  }
  return context;
}
