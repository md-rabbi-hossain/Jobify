import type { Metadata } from "next";
import ProfileView from "../Component/Profile/ProfileView";

export const metadata: Metadata = { title: "My profile" };

export default function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const notice = Array.isArray(searchParams.notice)
    ? searchParams.notice[0]
    : searchParams.notice;

  return (
    <div className="mx-auto w-[92%] max-w-5xl py-12">
      <ProfileView notice={notice} />
    </div>
  );
}
