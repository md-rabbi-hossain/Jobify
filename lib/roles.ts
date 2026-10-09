export type Role = "seeker" | "poster";

export const ROLE_COOKIE = "jobify_role";

export const ROLE_LABEL: Record<Role, string> = {
  seeker: "Job seeker",
  poster: "Job poster",
};

export const isRole = (value: unknown): value is Role =>
  value === "seeker" || value === "poster";
