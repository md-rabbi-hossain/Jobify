import type { Metadata } from "next";
import PostForm from "../Component/Forms/PostForm";

export const metadata: Metadata = { title: "Post a job" };

export default function PostPage() {
  return (
    <div className="mx-auto w-[92%] max-w-2xl py-12">
      <h1 className="font-display text-4xl text-ink">Post a job</h1>
      <p className="mt-2 text-ink/70">
        Tell people what the role involves and what you need.
      </p>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
