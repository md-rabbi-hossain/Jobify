import type { Metadata } from "next";
import SignUpPage from "../Component/Auth/signup";
import { isRole } from "@/lib/roles";
import type { Role } from "@/lib/roles";

export const metadata: Metadata = { title: "Sign in" };

type Params = { [key: string]: string | string[] | undefined };

const one = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** Keep only a local path, so a crafted link can never send people off-site. */
function safePath(raw?: string) {
  if (!raw) return undefined;
  try {
    const url = new URL(raw, "http://local");
    if (url.pathname.startsWith("//")) return undefined;
    return url.pathname + url.search;
  } catch {
    return undefined;
  }
}

export default function Page({ searchParams }: { searchParams: Params }) {
  const callbackUrl = safePath(one(searchParams.callbackUrl));
  const requested = one(searchParams.role);

  let defaultRole: Role = "seeker";
  if (isRole(requested)) defaultRole = requested;
  else if (callbackUrl?.startsWith("/post")) defaultRole = "poster";

  return (
    <div className="py-12 sm:py-16">
      <SignUpPage defaultRole={defaultRole} callbackUrl={callbackUrl} />
    </div>
  );
}
